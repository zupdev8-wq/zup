import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {rateLimit} from 'express-rate-limit';
import crypto from 'node:crypto';
import pg from 'pg';
import {PREMIUM_PRICE,PREMIUM_DAYS,premiumPayload,parseExternal,verifyMercadoPagoSignature,generateRecoveryCode,normalizeRecoveryCode} from './premium.js';
import {legalRouter} from './legal.js';

const app=express();
const port=Number(process.env.PORT||3000);
const MP_API='https://api.mercadopago.com';

app.disable('x-powered-by');
app.set('trust proxy',1);
app.use(helmet({contentSecurityPolicy:false}));
const origins=(process.env.CORS_ORIGINS||'').split(',').map(x=>x.trim()).filter(Boolean);
app.use(cors({origin:(origin,cb)=>cb(null,!origin||origins.length===0||origins.includes(origin)),methods:['GET','POST','DELETE']}));
app.use(express.json({limit:'32kb'}));
app.use(rateLimit({windowMs:60_000,limit:120,standardHeaders:'draft-7',legacyHeaders:false}));
const paymentLimit=rateLimit({windowMs:10*60_000,limit:12,standardHeaders:'draft-7',legacyHeaders:false});
const recoveryLimit=rateLimit({windowMs:15*60_000,limit:8,standardHeaders:'draft-7',legacyHeaders:false});

app.use(legalRouter());

const pool=process.env.DATABASE_URL?new pg.Pool({connectionString:process.env.DATABASE_URL,ssl:process.env.DATABASE_SSL==='true'?{rejectUnauthorized:true}:undefined,max:10,connectionTimeoutMillis:5000}):null;
const hash=(v)=>crypto.createHash('sha256').update(v).digest('hex');
const uid=()=>crypto.randomUUID();
const newToken=()=>crypto.randomBytes(32).toString('base64url');
const safeName=(v)=>typeof v==='string'&&v.length<=18&&/^[\p{L}\p{N} _-]+$/u.test(v)?v.trim():'Explorador';
const publicApiUrl=()=>String(process.env.PUBLIC_API_URL||'').replace(/\/+$/,'');
const paymentsReady=()=>Boolean(process.env.MERCADO_PAGO_ACCESS_TOKEN&&process.env.MERCADO_PAGO_WEBHOOK_SECRET&&/^https:\/\//.test(publicApiUrl()));

async function migrate(){
  if(!pool)return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS players(
      id uuid PRIMARY KEY,
      token_hash text UNIQUE NOT NULL,
      nickname text NOT NULL DEFAULT 'Explorador',
      xp integer NOT NULL DEFAULT 0 CHECK (xp>=0),
      correct integer NOT NULL DEFAULT 0,
      answered integer NOT NULL DEFAULT 0,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    );
    ALTER TABLE players ADD COLUMN IF NOT EXISTS premium_since timestamptz;
    ALTER TABLE players ADD COLUMN IF NOT EXISTS premium_until timestamptz;
    ALTER TABLE players ADD COLUMN IF NOT EXISTS premium_source text;
    ALTER TABLE players ADD COLUMN IF NOT EXISTS recovery_code_hash text;
    CREATE TABLE IF NOT EXISTS lesson_events(
      id uuid PRIMARY KEY,
      player_id uuid NOT NULL REFERENCES players(id) ON DELETE CASCADE,
      event_key text NOT NULL,
      category text NOT NULL,
      correct integer NOT NULL CHECK(correct>=0 AND correct<=60),
      created_at timestamptz NOT NULL DEFAULT now(),
      UNIQUE(player_id,event_key)
    );
    CREATE TABLE IF NOT EXISTS premium_purchases(
      id uuid PRIMARY KEY,
      player_id uuid NOT NULL REFERENCES players(id) ON DELETE CASCADE,
      external_reference text UNIQUE NOT NULL,
      method text NOT NULL CHECK(method IN ('checkout','pix','card')),
      status text NOT NULL DEFAULT 'pending',
      amount_cents integer NOT NULL DEFAULT 999 CHECK(amount_cents=999),
      provider_payment_id text,
      provider_preference_id text,
      applied_at timestamptz,
      revoked_at timestamptz,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    );
    CREATE UNIQUE INDEX IF NOT EXISTS idx_players_recovery_code_hash ON players(recovery_code_hash) WHERE recovery_code_hash IS NOT NULL;
    CREATE INDEX IF NOT EXISTS idx_players_xp ON players(xp DESC);
    CREATE INDEX IF NOT EXISTS idx_premium_player ON premium_purchases(player_id,created_at DESC);
    ALTER TABLE premium_purchases ADD COLUMN IF NOT EXISTS revoked_at timestamptz;
    ALTER TABLE premium_purchases DROP COLUMN IF EXISTS payer_email;
    ALTER TABLE premium_purchases DROP CONSTRAINT IF EXISTS premium_purchases_method_check;
    ALTER TABLE premium_purchases ADD CONSTRAINT premium_purchases_method_check CHECK(method IN ('checkout','pix','card'));
    CREATE INDEX IF NOT EXISTS idx_premium_provider_payment ON premium_purchases(provider_payment_id);
    CREATE UNIQUE INDEX IF NOT EXISTS idx_premium_provider_payment_unique ON premium_purchases(provider_payment_id) WHERE provider_payment_id IS NOT NULL;
  `);
}
function needDb(req,res,next){if(!pool)return res.status(503).json({error:'backend_not_configured'});next();}
async function auth(req,res,next){
  const bearer=req.headers.authorization?.match(/^Bearer ([A-Za-z0-9_-]{30,})$/);
  if(!bearer)return res.status(401).json({error:'unauthorized'});
  try{
    const {rows}=await pool.query('SELECT id,nickname,xp,correct,answered,premium_since,premium_until,premium_source FROM players WHERE token_hash=$1',[hash(bearer[1])]);
    if(!rows.length)return res.status(401).json({error:'unauthorized'});
    req.player=rows[0];next();
  }catch(e){next(e);}
}
async function freshPlayer(id){const {rows}=await pool.query('SELECT id,nickname,xp,correct,answered,premium_since,premium_until,premium_source FROM players WHERE id=$1',[id]);return rows[0];}

async function mpRequest(path,{method='GET',body,idempotencyKey}={}){
  const access=process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if(!access)throw Object.assign(new Error('mercado_pago_not_configured'),{statusCode:503});
  const headers={Authorization:`Bearer ${access}`,'Content-Type':'application/json'};
  if(idempotencyKey)headers['X-Idempotency-Key']=idempotencyKey;
  const response=await fetch(`${MP_API}${path}`,{method,headers,body:body?JSON.stringify(body):undefined});
  let data=null;try{data=await response.json();}catch{}
  if(!response.ok){const err=new Error('mercado_pago_error');err.statusCode=502;err.providerStatus=response.status;err.providerData=data;throw err;}
  return data;
}
function notificationUrl(){return `${publicApiUrl()}/v1/webhooks/mercadopago`;}
function returnUrl(purchaseId,status){return `${publicApiUrl()}/v1/premium/return?purchase=${encodeURIComponent(purchaseId)}&status=${encodeURIComponent(status)}`;}
function externalReference(purchaseId,playerId){return `zup-premium:${purchaseId}:${playerId}`;}

async function createPurchase(playerId,method){
  const id=uid(),ref=externalReference(id,playerId);
  await pool.query('INSERT INTO premium_purchases(id,player_id,external_reference,method) VALUES($1,$2,$3,$4)',[id,playerId,ref,method]);
  return {id,ref};
}
function recoveryHash(code){const normalized=normalizeRecoveryCode(code);return normalized?hash(normalized):null;}
async function issueRecoveryCode(playerId){
  for(let i=0;i<5;i++){
    const code=generateRecoveryCode(),codeHash=recoveryHash(code);
    try{await pool.query('UPDATE players SET recovery_code_hash=$1,updated_at=now() WHERE id=$2',[codeHash,playerId]);return code;}catch(err){if(err?.code!=='23505')throw err;}
  }
  throw Object.assign(new Error('recovery_code_generation_failed'),{statusCode:500});
}
async function updatePurchaseStatus(id,status,{paymentId,preferenceId}={}){
  await pool.query(`UPDATE premium_purchases SET status=$2,provider_payment_id=COALESCE($3,provider_payment_id),provider_preference_id=COALESCE($4,provider_preference_id),updated_at=now() WHERE id=$1`,[id,String(status||'pending'),paymentId?String(paymentId):null,preferenceId?String(preferenceId):null]);
}
async function applyApprovedPurchase(purchaseId,payment){
  const amount=Number(payment?.transaction_amount);
  const parsed=parseExternal(payment?.external_reference);
  if(payment?.status!=='approved'||Math.abs(amount-PREMIUM_PRICE)>0.001||payment?.currency_id!=='BRL'||!parsed||parsed.purchaseId!==purchaseId)return false;
  const client=await pool.connect();
  try{
    await client.query('BEGIN');
    const {rows}=await client.query('SELECT * FROM premium_purchases WHERE id=$1 FOR UPDATE',[purchaseId]);
    const purchase=rows[0];
    if(!purchase||purchase.player_id!==parsed.playerId){await client.query('ROLLBACK');return false;}
    if(!purchase.applied_at){
      await client.query(`UPDATE players SET premium_since=COALESCE(premium_since,now()),premium_until=GREATEST(COALESCE(premium_until,now()),now()) + interval '${PREMIUM_DAYS} days',premium_source='mercado_pago',updated_at=now() WHERE id=$1`,[purchase.player_id]);
      await client.query('UPDATE premium_purchases SET applied_at=now(),status=$2,provider_payment_id=$3,updated_at=now() WHERE id=$1',[purchaseId,'approved',String(payment.id)]);
    } else {
      await client.query('UPDATE premium_purchases SET status=$2,provider_payment_id=COALESCE(provider_payment_id,$3),updated_at=now() WHERE id=$1',[purchaseId,'approved',String(payment.id)]);
    }
    await client.query('COMMIT');return true;
  }catch(e){await client.query('ROLLBACK');throw e;}finally{client.release();}
}
async function revokePurchaseIfNeeded(purchaseId,status,paymentId){
  const client=await pool.connect();
  try{
    await client.query('BEGIN');
    const {rows}=await client.query('SELECT * FROM premium_purchases WHERE id=$1 FOR UPDATE',[purchaseId]);
    const purchase=rows[0];if(!purchase){await client.query('ROLLBACK');return false;}
    if(purchase.applied_at&&!purchase.revoked_at){
      await client.query(`UPDATE players SET premium_until=GREATEST(now(),COALESCE(premium_until,now()) - interval '${PREMIUM_DAYS} days'),updated_at=now() WHERE id=$1`,[purchase.player_id]);
      await client.query('UPDATE premium_purchases SET status=$2,provider_payment_id=COALESCE(provider_payment_id,$3),revoked_at=now(),updated_at=now() WHERE id=$1',[purchaseId,status,paymentId?String(paymentId):null]);
    }else{
      await client.query('UPDATE premium_purchases SET status=$2,provider_payment_id=COALESCE(provider_payment_id,$3),updated_at=now() WHERE id=$1',[purchaseId,status,paymentId?String(paymentId):null]);
    }
    await client.query('COMMIT');return true;
  }catch(e){await client.query('ROLLBACK');throw e;}finally{client.release();}
}
async function reconcilePayment(payment){
  const parsed=parseExternal(payment?.external_reference);if(!parsed)return false;
  const status=String(payment?.status||'pending').toLowerCase();
  if(status==='approved'){
    const applied=await applyApprovedPurchase(parsed.purchaseId,payment);
    if(!applied)await updatePurchaseStatus(parsed.purchaseId,'invalid',{paymentId:payment?.id});
    return applied;
  }
  if(status==='refunded'||status==='charged_back')return revokePurchaseIfNeeded(parsed.purchaseId,status,payment?.id);
  await updatePurchaseStatus(parsed.purchaseId,status,{paymentId:payment?.id});return false;
}
async function fetchPurchaseProviderState(purchase){
  if(purchase.provider_payment_id){
    const payment=await mpRequest(`/v1/payments/${encodeURIComponent(purchase.provider_payment_id)}`);await reconcilePayment(payment);return payment;
  }
  const search=await mpRequest(`/v1/payments/search?external_reference=${encodeURIComponent(purchase.external_reference)}&sort=date_created&criteria=desc`);
  const items=Array.isArray(search?.results)?search.results:[];
  const payment=items.find(x=>x.status==='approved')??items[0];if(payment)await reconcilePayment(payment);return payment??null;
}


app.get('/health',async(req,res)=>{if(!pool)return res.status(503).json({status:'requires_database'});try{await pool.query('SELECT 1');return res.json({status:'ok',payments:paymentsReady()?'configured':'requires_configuration'})}catch{return res.status(503).json({status:'db_unavailable'})}});
app.post('/v1/guests',needDb,async(req,res,next)=>{
  try{
    const id=uid(),secret=newToken(),name=safeName(req.body?.nickname);
    await pool.query('INSERT INTO players(id,token_hash,nickname) VALUES($1,$2,$3)',[id,hash(secret),name]);
    const recoveryCode=await issueRecoveryCode(id);
    res.status(201).json({playerId:id,token:secret,nickname:name,recoveryCode});
  }catch(e){next(e)}
});
app.get('/v1/me',needDb,auth,(req,res)=>res.json({id:req.player.id,nickname:req.player.nickname,xp:req.player.xp,correct:req.player.correct,answered:req.player.answered}));
app.post('/v1/recovery/code',needDb,auth,recoveryLimit,async(req,res,next)=>{
  try{
    const player=await freshPlayer(req.player.id);
    if(!premiumPayload(player).active)return res.status(403).json({error:'premium_required'});
    const recoveryCode=await issueRecoveryCode(req.player.id);
    res.json({recoveryCode});
  }catch(e){next(e)}
});
app.post('/v1/recovery/restore',needDb,recoveryLimit,async(req,res,next)=>{
  const normalized=normalizeRecoveryCode(req.body?.code);
  if(!normalized)return res.status(400).json({error:'invalid_recovery_code'});
  const client=await pool.connect();
  try{
    await client.query('BEGIN');
    const {rows}=await client.query('SELECT * FROM players WHERE recovery_code_hash=$1 FOR UPDATE',[hash(normalized)]);
    const player=rows[0];
    if(!player){await client.query('ROLLBACK');return res.status(404).json({error:'recovery_not_found'});}
    if(!premiumPayload(player).active){await client.query('ROLLBACK');return res.status(403).json({error:'premium_expired'});}
    const token=newToken(),recoveryCode=generateRecoveryCode(),nextHash=recoveryHash(recoveryCode);
    await client.query('UPDATE players SET token_hash=$1,recovery_code_hash=$2,updated_at=now() WHERE id=$3',[hash(token),nextHash,player.id]);
    const refreshed=(await client.query('SELECT * FROM players WHERE id=$1',[player.id])).rows[0];
    await client.query('COMMIT');
    res.json({playerId:player.id,token,nickname:player.nickname,recoveryCode,premium:premiumPayload(refreshed)});
  }catch(e){await client.query('ROLLBACK').catch(()=>{});next(e);}finally{client.release();}
});
app.post('/v1/me/nickname',needDb,auth,async(req,res,next)=>{try{const nickname=safeName(req.body?.nickname);const {rows}=await pool.query('UPDATE players SET nickname=$1,updated_at=now() WHERE id=$2 RETURNING id,nickname,xp,correct,answered',[nickname,req.player.id]);res.json(rows[0])}catch(e){next(e)}});

app.get('/v1/premium/status',needDb,auth,async(req,res,next)=>{try{res.json(premiumPayload(await freshPlayer(req.player.id)))}catch(e){next(e)}});
app.post('/v1/premium/checkout',needDb,auth,paymentLimit,async(req,res,next)=>{
  let purchase;
  try{
    if(!paymentsReady())return res.status(503).json({error:'payments_not_configured'});
    purchase=await createPurchase(req.player.id,'checkout');
    const pref=await mpRequest('/checkout/preferences',{method:'POST',body:{
      items:[{id:'zup-premium-30',title:'ZUP! Premium - 30 dias',quantity:1,currency_id:'BRL',unit_price:PREMIUM_PRICE}],
      external_reference:purchase.ref,
      notification_url:notificationUrl(),
      back_urls:{success:returnUrl(purchase.id,'success'),pending:returnUrl(purchase.id,'pending'),failure:returnUrl(purchase.id,'failure')},
      auto_return:'approved',
      statement_descriptor:'ZUP PREMIUM',
      payment_methods:{installments:1,excluded_payment_types:[{id:'ticket'},{id:'atm'}]}
    }});
    await updatePurchaseStatus(purchase.id,'pending',{preferenceId:pref?.id});
    if(!pref?.init_point)throw Object.assign(new Error('checkout_url_missing'),{statusCode:502});
    res.status(201).json({purchaseId:purchase.id,status:'pending',checkoutUrl:pref.init_point});
  }catch(e){if(purchase?.id)await updatePurchaseStatus(purchase.id,'error').catch(()=>{});next(e);}
});
app.get('/v1/premium/purchases/:id',needDb,auth,async(req,res,next)=>{
  try{
    const {rows}=await pool.query('SELECT * FROM premium_purchases WHERE id=$1 AND player_id=$2',[req.params.id,req.player.id]);if(!rows.length)return res.status(404).json({error:'purchase_not_found'});
    const purchase=rows[0];if(['pending','in_process','authorized'].includes(purchase.status))await fetchPurchaseProviderState(purchase).catch(()=>null);
    const refreshed=(await pool.query('SELECT status FROM premium_purchases WHERE id=$1',[purchase.id])).rows[0];
    res.json({purchaseId:purchase.id,status:refreshed?.status??purchase.status,premium:premiumPayload(await freshPlayer(req.player.id))});
  }catch(e){next(e);}
});
app.post('/v1/webhooks/mercadopago',needDb,async(req,res,next)=>{
  try{
    const dataId=String(req.query['data.id']??req.query.data_id??req.body?.data?.id??'');
    const secret=process.env.MERCADO_PAGO_WEBHOOK_SECRET;
    if(secret&&!verifyMercadoPagoSignature({signature:req.headers['x-signature'],requestId:req.headers['x-request-id'],dataId,secret}))return res.status(401).json({error:'invalid_signature'});
    if(!secret)return res.status(503).json({error:'webhook_secret_not_configured'});
    const type=String(req.body?.type??req.query.type??'');if(type&&type!=='payment')return res.status(200).json({ok:true,ignored:true});
    if(!dataId)return res.status(200).json({ok:true,ignored:true});
    const payment=await mpRequest(`/v1/payments/${encodeURIComponent(dataId)}`);await reconcilePayment(payment);res.json({ok:true});
  }catch(e){next(e);}
});
app.get('/v1/premium/return',(req,res)=>{const status=String(req.query.status||'pending');res.type('html').send(`<!doctype html><html lang="pt-BR"><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>ZUP! Premium</title><style>body{font-family:system-ui;background:#fff7c8;color:#151515;display:grid;place-items:center;min-height:100vh;margin:0}.c{max-width:520px;padding:32px;text-align:center}.b{display:inline-block;background:#111;color:white;padding:16px 24px;border-radius:18px;text-decoration:none;font-weight:800}</style></head><body><div class="c"><h1>${status==='success'?'Pagamento recebido':'Pagamento em processamento'}</h1><p>Volte ao ZUP! para confirmar a liberação do Premium. O backend só libera o acesso após a confirmação do Mercado Pago.</p><a class="b" href="zup://premium">Voltar ao ZUP!</a></div></body></html>`)});

// Security: points submitted by a client must never be trusted as proof of correct answers.
app.post('/v1/lessons/finish',needDb,auth,(req,res)=>res.status(501).json({error:'server_verified_quiz_not_enabled'}));
app.get('/v1/leaderboard',needDb,async(req,res,next)=>{try{const {rows}=await pool.query('SELECT nickname,xp FROM players WHERE xp>0 ORDER BY xp DESC,created_at ASC LIMIT 50');res.json({players:rows})}catch(e){next(e)}});
app.delete('/v1/me',needDb,auth,async(req,res,next)=>{try{await pool.query('DELETE FROM players WHERE id=$1',[req.player.id]);res.status(204).end()}catch(e){next(e)}});
app.use((err,req,res,next)=>{console.error(err);res.status(err?.statusCode||500).json({error:err?.message||'internal_error'})});
if(process.env.NODE_ENV!=='test'){migrate().then(()=>app.listen(port,'0.0.0.0',()=>console.log('ZUP API listening',port))).catch(e=>{console.error('Database unavailable:',e.message);process.exit(1)})}
export {app,safeName};
