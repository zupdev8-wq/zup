import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {PREMIUM_PRICE,parseExternal,verifyMercadoPagoSignature,premiumPayload,generateRecoveryCode,normalizeRecoveryCode} from '../src/premium.js';

test('premium price is fixed at R$ 9.99',()=>assert.equal(PREMIUM_PRICE,9.99));
test('recovery codes have a readable strong format',()=>{const code=generateRecoveryCode(size=>Buffer.alloc(size,7));assert.match(code,/^ZUP-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/);assert.equal(normalizeRecoveryCode(code),code.replaceAll('-',''));assert.equal(normalizeRecoveryCode('invalid'),null);});
test('external reference binds purchase and player UUIDs',()=>{const p='11111111-1111-4111-8111-111111111111',u='22222222-2222-4222-8222-222222222222';assert.deepEqual(parseExternal(`zup-premium:${p}:${u}`),{purchaseId:p,playerId:u});assert.equal(parseExternal('other'),null);});
test('webhook signature verification follows HMAC manifest',()=>{const secret='test-secret',dataId='ABC123',requestId='req-9',ts='1742505638683';const manifest=`id:${dataId.toLowerCase()};request-id:${requestId};ts:${ts};`;const v1=crypto.createHmac('sha256',secret).update(manifest).digest('hex');assert.equal(verifyMercadoPagoSignature({signature:`ts=${ts},v1=${v1}`,requestId,dataId,secret}),true);assert.equal(verifyMercadoPagoSignature({signature:`ts=${ts},v1=${'0'.repeat(64)}`,requestId,dataId,secret}),false);});
test('expired premium is blocked by backend payload',()=>{const past=new Date(Date.now()-60_000).toISOString(),future=new Date(Date.now()+60_000).toISOString();assert.equal(premiumPayload({premium_until:past}).active,false);assert.equal(premiumPayload({premium_until:future}).active,true);});
