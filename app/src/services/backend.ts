import * as SecureStore from 'expo-secure-store';

const API_URL=(process.env.EXPO_PUBLIC_API_URL??'').trim().replace(/\/+$/,'');
const TOKEN_KEY='zup.backend.token.v1';
const PLAYER_KEY='zup.backend.player.v1';
const RECOVERY_KEY='zup.backend.recovery.v1';
let identityPromise:Promise<BackendIdentity>|null=null;

export type BackendIdentity={playerId:string;token:string;nickname:string;recoveryCode?:string};
export type PremiumStatus={
  active:boolean;
  plan:'free'|'premium';
  premiumSince:string|null;
  premiumUntil:string|null;
  price:number;
  periodDays:number;
};
export type CheckoutPurchase={purchaseId:string;status:string;checkoutUrl:string};
export type PurchaseStatus={purchaseId:string;status:string;premium:PremiumStatus};
export type RecoveryResult={playerId:string;token:string;nickname:string;recoveryCode:string;premium:PremiumStatus};

export function backendConfigured(){return /^https?:\/\//i.test(API_URL);}
export function backendBaseUrl(){return API_URL;}

async function request<T>(path:string,init:RequestInit={},token?:string):Promise<T>{
  if(!backendConfigured())throw new Error('api_not_configured');
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),20_000);
  try{
    const headers=new Headers(init.headers);
    if(!headers.has('Content-Type')&&init.body)headers.set('Content-Type','application/json');
    if(token)headers.set('Authorization',`Bearer ${token}`);
    const response=await fetch(`${API_URL}${path}`,{...init,headers,signal:controller.signal});
    let data:unknown=null;try{data=await response.json();}catch{}
    if(!response.ok){
      const message=(data&&typeof data==='object'&&'error' in data)?String((data as {error:unknown}).error):`http_${response.status}`;
      const err=new Error(message);(err as Error&{status?:number}).status=response.status;throw err;
    }
    return data as T;
  } finally {clearTimeout(timer);}
}

async function readIdentity():Promise<BackendIdentity|null>{
  try{
    const [token,playerId,recoveryCode]=await Promise.all([
      SecureStore.getItemAsync(TOKEN_KEY),
      SecureStore.getItemAsync(PLAYER_KEY),
      SecureStore.getItemAsync(RECOVERY_KEY),
    ]);
    if(token&&playerId)return {token,playerId,nickname:'Explorador',recoveryCode:recoveryCode||undefined};
  }catch{}
  return null;
}
async function saveIdentity(identity:BackendIdentity){
  const writes=[
    SecureStore.setItemAsync(TOKEN_KEY,identity.token),
    SecureStore.setItemAsync(PLAYER_KEY,identity.playerId),
  ];
  if(identity.recoveryCode)writes.push(SecureStore.setItemAsync(RECOVERY_KEY,identity.recoveryCode));
  await Promise.all(writes);
}
export async function clearBackendIdentity(){
  identityPromise=null;
  await Promise.allSettled([
    SecureStore.deleteItemAsync(TOKEN_KEY),
    SecureStore.deleteItemAsync(PLAYER_KEY),
    SecureStore.deleteItemAsync(RECOVERY_KEY),
  ]);
}

export async function ensureBackendIdentity(nickname='Explorador'):Promise<BackendIdentity>{
  if(identityPromise)return identityPromise;
  identityPromise=(async()=>{
    const saved=await readIdentity();
    if(saved){
      try{
        const me=await request<{id:string;nickname:string}>('/v1/me',{},saved.token);
        return {...saved,playerId:me.id,nickname:me.nickname};
      }catch(err){
        if((err as Error&{status?:number}).status!==401)throw err;
        await clearBackendIdentity();
      }
    }
    const created=await request<BackendIdentity>('/v1/guests',{method:'POST',body:JSON.stringify({nickname})});
    await saveIdentity(created);
    return created;
  })();
  try{return await identityPromise;}finally{identityPromise=null;}
}

async function authed<T>(path:string,init:RequestInit,nickname:string):Promise<T>{
  const identity=await ensureBackendIdentity(nickname);
  try{return await request<T>(path,init,identity.token);}catch(err){
    if((err as Error&{status?:number}).status!==401)throw err;
    await clearBackendIdentity();
    const fresh=await ensureBackendIdentity(nickname);
    return request<T>(path,init,fresh.token);
  }
}

export async function getPremiumStatus(nickname:string):Promise<PremiumStatus>{
  return authed('/v1/premium/status',{},nickname);
}
export async function createPremiumCheckout(nickname:string):Promise<CheckoutPurchase>{
  return authed('/v1/premium/checkout',{method:'POST',body:JSON.stringify({})},nickname);
}
export async function getPremiumPurchase(purchaseId:string,nickname:string):Promise<PurchaseStatus>{
  return authed(`/v1/premium/purchases/${encodeURIComponent(purchaseId)}`,{},nickname);
}
export async function getRecoveryCode(nickname:string):Promise<string>{
  const identity=await ensureBackendIdentity(nickname);
  if(identity.recoveryCode)return identity.recoveryCode;
  const result=await request<{recoveryCode:string}>('/v1/recovery/code',{method:'POST',body:JSON.stringify({})},identity.token);
  await SecureStore.setItemAsync(RECOVERY_KEY,result.recoveryCode);
  return result.recoveryCode;
}
export async function restorePremiumAccess(code:string,nickname:string):Promise<RecoveryResult>{
  const result=await request<RecoveryResult>('/v1/recovery/restore',{method:'POST',body:JSON.stringify({code,nickname})});
  await clearBackendIdentity();
  await saveIdentity({playerId:result.playerId,token:result.token,nickname:result.nickname,recoveryCode:result.recoveryCode});
  identityPromise=null;
  return result;
}
