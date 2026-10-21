'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {transformRow,processRows}=require('../scripts/prepare-curadoria-seeds.cjs');
const cats=new Set(['literatura']),tracks=new Set(['livros','entretenimento']);
const row=(fifth=false)=>({
  id:fifth?'MMMLU-LIT-05':'OpenTDB-LIT-04',category:'literatura',topic:'literatura',question:'Qual obra combina com este resumo de leitura?',
  choice_a:'Obra Alpha',choice_b:'Obra Beta',choice_c:'Obra Gama',choice_d:'Obra Delta',
  ...(fifth?{choice_e:'Obra Epsilon'}:{}),correct:fifth?'E':'D',
  explanation:'A alternativa selecionada corresponde ao gabarito revisado, com origem documentada na fonte.',
  difficulty:'medio',kind:'discover',tracks:'livros|entretenimento',source_title:'Licenced source',source_url:'https://example.org/dados',
  license:'MIT',license_url:'https://opensource.org/license/mit',rights_basis:'Permissao prevista na licenca MIT da colecao.',
  language:'pt-BR',review_status:'aprovado',rights_status:'verificado',reviewer:'Prof. Revisor',reviewed_at:'2026-10-20',quality_flags:''
});
test('curadoria never publishes a draft even with a source-provided answer',()=>{
  const unreviewed={...row(),review_status:'rascunho'};
  const {result,groups}=processRows([unreviewed],cats,tracks);
  assert.equal(result.received,1);assert.equal(result.ready,0);assert.equal(groups.size,0);
});
test('approval without checked rights is a hard error',()=>{
  const {result}=processRows([{...row(),rights_status:'licenca_declarada'}],cats,tracks);
  assert.equal(result.ready,0);assert.equal(result.errors.length,1);
});
test('four and five original options are preserved and source ID is traceable',()=>{
  const four=transformRow(row(false),cats,tracks),five=transformRow(row(true),cats,tracks);
  assert.deepEqual(four.errors,[]);assert.deepEqual(five.errors,[]);
  assert.equal(four.question.choices.length,4);assert.equal(five.question.choices.length,5);
  assert.equal(five.question.answer,4);
  assert.equal(five.question.sourceItemId.startsWith('MMMLU-LIT-05'),true);
  assert.match(five.question.id,/^u-[a-f0-9]{12}$/);
});
test('quality flags prevent unreviewed translations from slipping into approved seeds',()=>{
  const r=transformRow({...row(),quality_flags:'traducao_assistida | revisao_humana_pendente'},cats,tracks);
  assert.ok(r.errors.some(e=>e.includes('flags')));
});
