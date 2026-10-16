import crypto from 'node:crypto';

export const PREMIUM_PRICE=9.99;
export const PREMIUM_DAYS=30;
const RECOVERY_ALPHABET='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function premiumPayload(player){
  const until=player?.premium_until?new Date(player.premium_until):null;
  const active=Boolean(until&&!Number.isNaN(until.getTime())&&until.getTime()>Date.now());
  return {active,plan:active?'premium':'free',premiumSince:player?.premium_since?new Date(player.premium_since).toISOString():null,premiumUntil:active?until.toISOString():null,price:PREMIUM_PRICE,periodDays:PREMIUM_DAYS};
}
export function parseExternal(ref){const m=String(ref||'').match(/^zup-premium:([0-9a-f-]{36}):([0-9a-f-]{36})$/i);return m?{purchaseId:m[1],playerId:m[2]}:null;}
export function verifyMercadoPagoSignature({signature,requestId,dataId,secret}){
  if(!signature||!requestId||!dataId||!secret)return false;
  const parts=Object.fromEntries(String(signature).split(',').map(p=>p.trim().split('=').map(x=>x.trim())).filter(x=>x.length===2));
  if(!parts.ts||!parts.v1)return false;
  const manifest=`id:${String(dataId).toLowerCase()};request-id:${requestId};ts:${parts.ts};`;
  const expected=crypto.createHmac('sha256',secret).update(manifest).digest('hex');
  const a=Buffer.from(expected,'hex'),b=Buffer.from(parts.v1,'hex');return a.length===b.length&&crypto.timingSafeEqual(a,b);
}
export function generateRecoveryCode(randomBytes=crypto.randomBytes){
  const bytes=randomBytes(12);
  let body='';
  for(let i=0;i<12;i++)body+=RECOVERY_ALPHABET[bytes[i]%RECOVERY_ALPHABET.length];
  return `ZUP-${body.slice(0,4)}-${body.slice(4,8)}-${body.slice(8,12)}`;
}
export function normalizeRecoveryCode(value){
  const compact=String(value||'').toUpperCase().replace(/[^A-Z0-9]/g,'');
  if(!/^ZUP[A-HJ-NP-Z2-9]{12}$/.test(compact))return null;
  return compact;
}
