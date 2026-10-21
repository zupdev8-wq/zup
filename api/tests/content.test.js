import test from 'node:test';
import assert from 'node:assert/strict';
import {validateContentBundle} from '../src/contentSchema.js';
const sample={
  schemaVersion:1,category:'literatura',review:{reviewedBy:'Equipe de Revisao',reviewedAt:'2026-10-20',rightsChecked:true,accuracyChecked:true},
  questions:[{id:'u-aaaaaaaaaaaa',category:'literatura',question:'Qual obra corresponde ao enredo previamente apresentado?',choices:['Obra Alfa','Obra Beta','Obra Gama','Obra Delta'],answer:1,fact:'A obra Beta corresponde aos elementos narrativos apresentados no enunciado, conforme a fonte licenciada.',kind:'discover',difficulty:'medio',tracks:['livros','entretenimento'],sourceLabel:'Acervo de teste licenciado',sourceLicense:'CC BY 4.0',rightsBasis:'Licenca de uso de teste com atribuicao e link.',source:{title:'Acervo de teste',url:'https://example.org/origem'}}],
  lessons:[{id:'lesson-literatura-teste',category:'literatura',quizQuestionId:'u-aaaaaaaaaaaa',title:'Leitura e narrativa',hook:'Os detalhes da narrativa exigem atencao e interpretacao.',summary:'Uma narrativa pode apresentar personagens, conflitos e escolhas com diferentes implicacoes.',body:['Ao analisar uma obra, acompanhe as relacoes entre personagens, espaco e momento narrativo. Isso permite localizar mudancas de perspectiva.'],takeaway:'Analise o efeito das escolhas narrativas antes de concluir o sentido de uma obra.',tracks:['livros'],minutes:2,updatedAt:'2026-10-20',evergreen:true,sources:[{title:'Biblioteca nacional',url:'https://www.gov.br/bn/pt-br'}],readMore:{heading:'Aprofundamento',sections:[{title:'Narrador e perspectiva',text:'Diferentes narradores podem produzir efeitos diversos sobre a confianca do leitor e sua interpretacao da historia.'}]},recommendedReadings:[{kind:'book',title:'Obra de exemplo',creators:'Autor ficticio',focus:'Identificar estrategias narrativas sem copiar definicoes.'}]}],
  retiredQuestionIds:[],retiredLessonIds:[]
};
test('content bundle permits questions AND pedagogical explanations in the same seeded revision',()=>{
  assert.deepEqual(validateContentBundle(sample),{valid:true,errors:[]});
});
test('content rejects unreviewed, repeated, unlicensed, cross-category, and unsafe references',()=>{
  const invalid=structuredClone(sample);
  invalid.review.rightsChecked=false;
  invalid.questions[0].sourceLicense='COPIADO_DO_JOGO';
  invalid.questions[0].choices[3]=invalid.questions[0].choices[2];
  invalid.questions[0].category='natureza';
  invalid.lessons[0].body[0]=invalid.lessons[0].summary;
  invalid.lessons[0].sources[0].url='javascript:alert(1)';
  const result=validateContentBundle(invalid);
  assert.equal(result.valid,false);
  assert.ok(result.errors.some(x=>x.includes('review')));
  assert.ok(result.errors.some(x=>x.includes('sourceLicense')));
  assert.ok(result.errors.some(x=>x.includes('alternativas')));
  assert.ok(result.errors.some(x=>x.includes('categoria')));
  assert.ok(result.errors.some(x=>x.includes('definicao repetida')));
  assert.ok(result.errors.some(x=>x.includes('HTTPS')));
});
test('malformed seeds give validation errors rather than throwing',()=>{
  for(const payload of [null,[],{schemaVersion:1,questions:{}},{...sample,questions:[42]},{...sample,lessons:[null]},
    {...sample,retiredQuestionIds:['u-aaaaaaaaaaaa']}]){
    const result=validateContentBundle(payload);
    assert.equal(result.valid,false);
    assert.ok(result.errors.length);
  }
});
test('one category can hold at least 1000 independently identified licensed questions',()=>{
  const many={...sample,questions:Array.from({length:1000},(_,i)=>({...sample.questions[0],id:`u-${i.toString(16).padStart(12,'0')}`,question:`Qual obra corresponde ao enredo ${i} previamente apresentado?`}))};
  assert.deepEqual(validateContentBundle(many),{valid:true,errors:[]});
  assert.equal(validateContentBundle({...many,questions:[...many.questions,...many.questions.slice(0,201)]}).valid,false);
});

test('remote content accepts genuine five-choice exam questions without discarding E',()=>{
  const item={...sample.questions[0],choices:['Resposta A','Resposta B','Resposta C','Resposta D','Resposta E'],answer:4,
    id:'u-fivechoices2026',sourceLicense:'MIT',licenseUrl:'https://opensource.org/license/mit'};
  const value={...sample,questions:[item]};
  assert.deepEqual(validateContentBundle(value),{valid:true,errors:[]});
  assert.equal(validateContentBundle({...value,questions:[{...item,answer:5}]}).valid,false);
  assert.equal(validateContentBundle({...value,questions:[{...item,choices:[] }]}).valid,false);
});
