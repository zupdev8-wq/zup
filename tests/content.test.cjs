'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {questions}=require('../app/.test-build/questions.js');
const {categories,tracks}=require('../app/.test-build/catalog.js');
const {microLessons,lessonByQuestion}=require('../app/.test-build/learning.js');

test('large catalog covers broad learning areas',()=>{
  assert.equal(questions.length,960);
  assert.equal(categories.length,43);
  assert.equal(tracks.length,20);
  for(const c of categories)assert.ok(questions.filter(q=>q.category===c.id).length>=16,c.id);
});
test('all original 122 stable IDs remain reachable',()=>{
  const ids=new Set(questions.map(q=>q.id));
  const original=['brasil','historia','geografia','ciencia','natureza','espaco','artes','tecnologia','esportes','gastronomia','cultura','mundo'];
  for(const id of original)for(let i=1;i<=(id==='brasil'?12:10);i++)assert.ok(ids.has(`${id}-${String(i).padStart(2,'0')}`));
});
test('stable unique IDs, unique prompts and existing categories',()=>{
  assert.equal(new Set(questions.map(q=>q.id)).size,questions.length);
  assert.equal(new Set(questions.map(q=>q.question.toLowerCase().trim())).size,questions.length);
  for(const q of questions){assert.match(q.id,/^(?:x-\d{4}|[a-z]+-\d{2})$/);assert.ok(categories.some(c=>c.id===q.category),q.id);}
});
test('four distinct answers and nonempty fact per question',()=>{
  for(const q of questions){assert.equal(q.choices.length,4,q.id);assert.equal(new Set(q.choices.map(v=>v.toLowerCase().trim())).size,4,q.id);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4,q.id);for(const text of [q.question,q.fact,...q.choices])assert.ok(typeof text==='string'&&text.trim().length>0&&!text.includes('\ufffd'),q.id);}
});
test('Brazil, states, lived Brazil and religious literacy are strongly represented',()=>{
  assert.ok(questions.filter(q=>q.brazil).length>=350);
  const concepts=new Set(questions.map(q=>q.concept).filter(Boolean));
  for(const state of ['Acre','Amapá','Amazonas','Pará','Rondônia','Roraima','Tocantins','Alagoas','Bahia','Ceará','Maranhão','Paraíba','Pernambuco','Piauí','Rio Grande do Norte','Sergipe','Distrito Federal','Goiás','Mato Grosso','Mato Grosso do Sul','Espírito Santo','Minas Gerais','Rio de Janeiro','São Paulo','Paraná','Rio Grande do Sul','Santa Catarina'])assert.ok(concepts.has(state),state);
  assert.ok(questions.filter(q=>q.category==='religioes'||q.category==='teologia').length>=60);
  const text=JSON.stringify(questions).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  for(const term of ['favela','fronteira seca','ponta pora','candomble','umbanda','isla','judaismo','budismo','literatura','vies cognitivo'])assert.ok(text.includes(term),term);
});
test('every question maps to a microlearning card while related concepts are intentionally grouped',()=>{
  assert.ok(microLessons.length>=650&&microLessons.length<questions.length);
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
