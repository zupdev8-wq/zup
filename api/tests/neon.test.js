import test from 'node:test';
import assert from 'node:assert/strict';
import {postgresConfig} from '../src/dbConfig.js';
const url='postgresql://editor:secret@ep-fun-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require';
test('Neon pooled PostgreSQL uses verified TLS and a small pool',()=>{
  const conf=postgresConfig({DATABASE_URL:url,DB_PROVIDER:'neon'});
  assert.equal(conf.host,'ep-fun-pooler.us-east-2.aws.neon.tech');
  assert.equal(conf.max,3);
  assert.deepEqual(conf.ssl,{rejectUnauthorized:true});
  assert.equal(conf.password,'secret');
});
test('never let sslmode or environment disable TLS for Neon',()=>{
  assert.throws(()=>postgresConfig({DATABASE_URL:url.replace('sslmode=require','sslmode=disable')}),/TLS/);
  assert.throws(()=>postgresConfig({DATABASE_URL:url.replace('.neon.tech','.other.tech'),DB_PROVIDER:'neon'}),/neon/);
  assert.equal(postgresConfig({}),null);
});
test('explicit local test database may avoid TLS only for localhost',()=>{
  const local=postgresConfig({DATABASE_URL:'postgresql://test:password@localhost:5432/zup',DB_PROVIDER:'local',ALLOW_LOCAL_DB_NO_TLS:'true'});
  assert.equal(local.ssl,false);
  const remote=postgresConfig({DATABASE_URL:'postgresql://test:password@prod.example.org:5432/zup',DB_PROVIDER:'local',ALLOW_LOCAL_DB_NO_TLS:'true'});
  assert.deepEqual(remote.ssl,{rejectUnauthorized:true});
});
