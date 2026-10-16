'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {ProgressStorage,STORAGE_KEY,BACKUP_KEY}=require('../app/.test-build/storage.js');
const {normalizeProgress}=require('../app/.test-build/progress.js');
function fake(initial={}){
  const data=new Map(Object.entries(initial)),writes=[];
  let fail=false,delay=0;
  return {data,writes,set fail(v){fail=v;},set delay(v){delay=v;},
    async getItem(k){return data.get(k)??null;},
    async setItem(k,v){if(delay)await new Promise(r=>setTimeout(r,delay));if(fail)throw new Error('disk_full');writes.push(k);data.set(k,v);},
    async multiRemove(keys){if(fail)throw new Error('denied');keys.forEach(k=>data.delete(k));}
  };
}
const p=(xp=0)=>({...normalizeProgress(null),xp});
test('storage key is unchanged from the app that already worked',()=>{
  assert.equal(STORAGE_KEY,'zup-v1-progress');assert.equal(BACKUP_KEY,'zup-v1-progress-backup');
});
test('empty storage creates defaults without writing or erasing anything',async()=>{
  const adapter=fake(),store=new ProgressStorage(adapter);
  const result=await store.load();assert.deepEqual(result.progress,p());assert.equal(adapter.writes.length,0);
});
test('concurrent saves are serialized and newest snapshot wins',async()=>{
  const adapter=fake(),store=new ProgressStorage(adapter);adapter.delay=1;
  await Promise.all(Array.from({length:20},(_,i)=>store.save(p(i))));
  await store.flush();
  assert.equal(JSON.parse(adapter.data.get(STORAGE_KEY)).xp,19);
  assert.equal(JSON.parse(adapter.data.get(BACKUP_KEY)).xp,18);
});
test('corrupt main data recovers from previous good snapshot',async()=>{
  const adapter=fake({[STORAGE_KEY]:'{invalid',[BACKUP_KEY]:JSON.stringify(p(200))});
  const result=await new ProgressStorage(adapter).load();
  assert.equal(result.recovered,true);assert.equal(result.progress.xp,200);assert.equal(adapter.writes.length,0);
});
test('a missing main snapshot can recover the backup',async()=>{
  const result=await new ProgressStorage(fake({[BACKUP_KEY]:JSON.stringify(p(40))})).load();
  assert.equal(result.recovered,true);assert.equal(result.progress.xp,40);
});
test('unreadable data fails loudly and remains untouched',async()=>{
  const adapter=fake({[STORAGE_KEY]:'bad',[BACKUP_KEY]:'also bad'});
  await assert.rejects(new ProgressStorage(adapter).load(),/saved_data_unreadable/);
  assert.equal(adapter.data.get(STORAGE_KEY),'bad');assert.equal(adapter.writes.length,0);
});
test('failed writes report errors; next save can still succeed',async()=>{
  const adapter=fake(),store=new ProgressStorage(adapter);
  await store.save(p(120));
  adapter.fail=true;await assert.rejects(store.save(p(240)),/disk_full/);
  assert.equal(JSON.parse(adapter.data.get(STORAGE_KEY)).xp,120);
  adapter.fail=false;await store.save(p(300));
  assert.equal(JSON.parse(adapter.data.get(STORAGE_KEY)).xp,300);
  assert.equal(JSON.parse(adapter.data.get(BACKUP_KEY)).xp,120);
});
test('reset waits for queued writes then deletes main and backup only',async()=>{
  const adapter=fake({unrelated:'keep'}),store=new ProgressStorage(adapter);adapter.delay=1;
  const a=store.save(p(10)),b=store.save(p(20));await store.clear();await Promise.all([a,b]);
  assert.equal(adapter.data.has(STORAGE_KEY),false);assert.equal(adapter.data.has(BACKUP_KEY),false);
  assert.equal(adapter.data.get('unrelated'),'keep');
  await store.save(p(0));assert.equal(adapter.data.has(BACKUP_KEY),false);
});
test('reset failures reject without silently resetting UI state',async()=>{
  const adapter=fake({[STORAGE_KEY]:JSON.stringify(p(120))}),store=new ProgressStorage(adapter);adapter.fail=true;
  await assert.rejects(store.clear(),/denied/);assert.equal(JSON.parse(adapter.data.get(STORAGE_KEY)).xp,120);
});
test('loading a v1 snapshot preserves it as the next backup',async()=>{
  const adapter=fake({[STORAGE_KEY]:JSON.stringify({xp:80,answered:4,correct:4,nickname:'Ana'})}),store=new ProgressStorage(adapter);
  const loaded=await store.load();await store.save({...loaded.progress,xp:200});
  assert.equal(JSON.parse(adapter.data.get(BACKUP_KEY)).nickname,'Ana');
  assert.equal(JSON.parse(adapter.data.get(BACKUP_KEY)).xp,80);
});
