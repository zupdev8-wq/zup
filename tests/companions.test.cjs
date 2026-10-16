'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {companions,evolution,evolutionStages,companionById}=require('../app/.test-build/companions.js');
test('four distinct original companions and four evolution stages',()=>{
  assert.equal(companions.length,4);assert.equal(evolutionStages.length,4);
  assert.equal(new Set(companions.map(c=>c.id)).size,4);
  for(const c of companions){assert.ok(c.name&&c.description);assert.equal(companionById(c.id).id,c.id);}
});
test('evolution only changes at 0 / 800 / 2200 / 4800 XP',()=>{
  for(const [xp,stage] of [[0,0],[799,0],[800,1],[2199,1],[2200,2],[4799,2],[4800,3],[99999,3]]){
    assert.equal(evolution(xp).stage.id,stage,`XP ${xp}`);
    const e=evolution(xp);assert.ok(e.fraction>=0&&e.fraction<=1);assert.ok(e.remaining>=0);
  }
});
test('evolution invalid input is safe and strength is bounded',()=>{
  for(const v of [-1,NaN,Infinity])assert.equal(evolution(v).stage.id,0);
  assert.equal(evolution(999999).power,999);
  assert.equal(evolution(4800).next,null);
});
test('same player XP gives same stage regardless of companion choice',()=>{
  const p={xp:2345,companionId:'capilu'};
  for(const c of companions)assert.equal(evolution({...p,companionId:c.id}.xp).stage.id,2);
});
