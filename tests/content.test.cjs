'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {questions,generatedQuestions}=require('../app/.test-build/questions.js');
const {categories,tracks}=require('../app/.test-build/catalog.js');
const {microLessons,lessonByQuestion}=require('../app/.test-build/learning.js');

test('massive catalog covers broad learning areas without becoming medicine-only',()=>{
  assert.equal(generatedQuestions.length,10000);
  assert.equal(questions.length,10960);
  assert.equal(categories.length,44);
  assert.equal(tracks.length,21);
  for(const c of categories)assert.ok(questions.filter(q=>q.category===c.id).length>=100,c.id);
  assert.ok(questions.filter(q=>q.category==='medicina').length>=850);
  assert.ok(questions.filter(q=>q.category==='revalida').length>=600);
  assert.ok(questions.filter(q=>['medicina','revalida','farmacia','enfermagem','biomedicina'].includes(q.category)).length<questions.length/3,'health must not dominate the catalog');
  assert.ok(questions.filter(q=>['historia','geografia','brasil','cidadania','geopolitica','literatura','filosofia','sociologia','religioes','teologia','midia'].includes(q.category)).length>2000);
  assert.ok(questions.filter(q=>['matematica','fisica','quimica','raciocinio','computacao','engenharia','informatica'].includes(q.category)).length>2000);
});

test('all original 122 stable IDs remain reachable',()=>{
  const ids=new Set(questions.map(q=>q.id));
  const original=['brasil','historia','geografia','ciencia','natureza','espaco','artes','tecnologia','esportes','gastronomia','cultura','mundo'];
  for(const id of original)for(let i=1;i<=(id==='brasil'?12:10);i++)assert.ok(ids.has(`${id}-${String(i).padStart(2,'0')}`));
});

test('stable unique IDs, unique prompts and existing categories',()=>{
  assert.equal(new Set(questions.map(q=>q.id)).size,questions.length);
  assert.equal(new Set(questions.map(q=>q.question.toLowerCase().trim())).size,questions.length);
  for(const q of questions){assert.match(q.id,/^(?:g-\d{5}|x-\d{4}|[a-z]+-\d{2})$/);assert.ok(categories.some(c=>c.id===q.category),q.id);}
});

test('four distinct answers and nonempty explanation per question',()=>{
  for(const q of questions){assert.equal(q.choices.length,4,q.id);assert.equal(new Set(q.choices.map(v=>v.toLowerCase().trim())).size,4,q.id);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4,q.id);for(const text of [q.question,q.fact,...q.choices])assert.ok(typeof text==='string'&&text.trim().length>0&&!text.includes('\ufffd'),q.id);}
});

test('medicine, pharmacology and Revalida include visual anatomy content and exam tracks',()=>{
  const visual=questions.filter(q=>q.imageUrl&&['medicina','revalida','farmacia','enfermagem','biomedicina'].includes(q.category));
  assert.ok(visual.length>=150,`medical image questions: ${visual.length}`);
  assert.ok(visual.every(q=>/^https:\/\//.test(q.imageUrl)&&q.imageAlt&&q.imageSource?.url));
  const text=JSON.stringify(questions.filter(q=>['medicina','revalida','farmacia'].includes(q.category))).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  for(const term of ['anatomia','fisiologia','nefron','alveolo','farmacocinetica','farmacovigilancia','pre-eclampsia','atencao primaria','sepse'])assert.ok(text.includes(term),term);
  assert.ok(tracks.some(t=>t.id==='revalida'));
});

test('Brazil, states, lived Brazil and religious literacy remain strongly represented',()=>{
  assert.ok(questions.filter(q=>q.brazil).length>=500);
  const concepts=new Set(questions.map(q=>q.concept).filter(Boolean));
  for(const state of ['Acre','Amapá','Amazonas','Pará','Rondônia','Roraima','Tocantins','Alagoas','Bahia','Ceará','Maranhão','Paraíba','Pernambuco','Piauí','Rio Grande do Norte','Sergipe','Distrito Federal','Goiás','Mato Grosso','Mato Grosso do Sul','Espírito Santo','Minas Gerais','Rio de Janeiro','São Paulo','Paraná','Rio Grande do Sul','Santa Catarina'])assert.ok(concepts.has(state),state);
  assert.ok(questions.filter(q=>q.category==='religioes'||q.category==='teologia').length>=300);
  const text=JSON.stringify(questions).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  for(const term of ['favela','fronteira seca','ponta pora','candomble','umbanda','isla','judaismo','budismo','literatura','vies cognitivo'])assert.ok(text.includes(term),term);
});

test('every question maps to a microlearning card while related concepts are intentionally grouped',()=>{
  assert.ok(microLessons.length>=1200&&microLessons.length<questions.length);
  assert.equal(new Set(microLessons.map(x=>x.id)).size,microLessons.length);
  for(const q of questions){const lesson=lessonByQuestion.get(q.id);assert.ok(lesson,q.id);assert.ok(lesson.summary.length>20);assert.ok(lesson.body.length>=1);}
});

test('catalog JSON and mobile dataset stay synchronized',()=>{
  const file=JSON.parse(fs.readFileSync(path.join(__dirname,'../docs/content/catalog.json'),'utf8'));
  assert.deepEqual(file,questions);
});

test('editorial correction: 1500 belongs to the fifteenth century',()=>{
  const q=questions.find(q=>q.id==='historia-04');assert.ok(q.choices[q.answer].includes('XV'));assert.ok(!q.choices[q.answer].includes('XVI'));
});
