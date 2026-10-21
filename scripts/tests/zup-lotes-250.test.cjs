'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const tool = require('../zup-lotes-250.cjs');
function base(i){return {
  id:'u-'+String(i).padStart(12,'0'),category:'games',
  question:`No universo de testes numero ${i}, qual personagem lidera a exploracao?`,
  choices:[`Explorador ${i}`,`Pescador ${i}`,`Construtor ${i}`,`Escritor ${i}`],answer:0,
  fact:`Na historia ficticia do caso ${i}, o explorador lidera a expedicao, enquanto os demais personagens realizam outras atividades no cenario especial.` ,
  sourceLabel:'Fonte demonstrativa',sourceItemId:`ref-${i}`,sourceLicense:'ORIGINAL_PROPRIO',rightsBasis:'Cenario imaginario criado apenas para teste local e nunca publicavel.',rightsStatus:'verificado',attribution:'Teste local'
}}
test('questoes independentes nao geram pendencias de duplicidade',()=>{
  assert.deepEqual(tool.problems([base(1),base(2)]),[]);
});
test('bloqueia questao repetida por enunciado',()=>{
  const a=base(1),b={...base(2),question:a.question};
  assert.ok(tool.problems([a,b]).some(x=>x.includes('Pergunta repetida')));
});
test('bloqueia explicacao copiada entre questoes',()=>{
  const a=base(1),b={...base(2),fact:a.fact};
  assert.ok(tool.problems([a,b]).some(x=>x.includes('Explicacao repetida')));
});
test('bloqueia mesmo item de origem com IDs diferentes',()=>{
  const a=base(1),b={...base(2),sourceItemId:a.sourceItemId};
  assert.ok(tool.problems([a,b]).some(x=>x.includes('Mesma origem repetida')));
});
test('gera arquivos cjs autoexecutaveis com confirmacao de publicacao',()=>{
  const script=tool.makeExecutable({schemaVersion:1,category:'games',questions:[]},'games',1);
  assert.ok(script.includes('--check'));
  assert.ok(script.includes('--publish'));
  assert.ok(script.includes('--confirm PUBLICAR'));
  assert.ok(script.includes('module.exports=bundle'));
});
test('publicacao sem confirmacao nao tenta usar a rede',async()=>{
  await assert.rejects(tool.run(['--publish','games','1']),/confirmar/);
});
