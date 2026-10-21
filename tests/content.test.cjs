'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {questions,generatedQuestions}=require('../app/.test-build/questions.js');
const {categories,tracks}=require('../app/.test-build/catalog.js');
const {microLessons,lessonByQuestion,buildFeed}=require('../app/.test-build/learning.js');
const {studyQuestions,conceptKey,microPracticeQuestions}=require('../app/.test-build/game.js');
const {initialProgress}=require('../app/.test-build/types.js');

test('massive catalog covers broad learning areas without becoming medicine-only',()=>{
  assert.equal(generatedQuestions.length,10000);
  assert.ok(questions.length>=11000); // The large historical catalog is retained for progress migration.
  assert.equal(categories.length,44);
  assert.equal(tracks.length,25);
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
  for(const q of questions){assert.match(q.id,/^(?:g-\d{5}|x-\d{4}|[thpl]-\d{4}|[a-z]+-\d{2})$/);assert.ok(categories.some(c=>c.id===q.category),q.id);}
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

test('only rich and genuinely different lessons are published across all 44 categories',()=>{
  assert.ok(microLessons.length>=90&&microLessons.length<=150);
  assert.equal(new Set(microLessons.map(l=>l.category)).size,44);
  assert.equal(new Set(microLessons.map(l=>l.id)).size,microLessons.length);
  const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const summarySet=new Set(),conceptSet=new Set();
  for(const lesson of microLessons){
    assert.ok(lesson.summary.length>20);
    assert.ok(lesson.body.length>=1);
    assert.ok(lesson.example||lesson.readMore||lesson.body.length>=2,lesson.title);
    assert.ok(lesson.takeaway.length>10,lesson.title);
    const summary=normalize(lesson.summary),key=`${lesson.category}|${normalize(lesson.title)}`;
    assert.ok(!summarySet.has(summary),`Repeated lesson definition: ${lesson.title}`);
    assert.ok(!conceptSet.has(key),`Repeated lesson concept: ${lesson.title}`);
    summarySet.add(summary);conceptSet.add(key);
    const sections=[lesson.summary,lesson.hook,...lesson.body,lesson.takeaway,lesson.example,lesson.comparison,...(lesson.readMore?.sections??[]).map(x=>x.text)].filter(Boolean).map(normalize);
    assert.equal(new Set(sections).size,sections.length,`Repeated paragraph in ${lesson.title}`);
    const tokens=x=>new Set(x.split(' ').filter(w=>w.length>3));
    for(let i=0;i<sections.length;i++)for(let j=i+1;j<sections.length;j++){
      const a=tokens(sections[i]),b=tokens(sections[j]);
      const nearDuplicate=[...a].filter(w=>b.has(w)).length/Math.min(a.size,b.size);
      assert.ok(nearDuplicate<0.82,`Paraphrased definition in ${lesson.title}: sections ${i} and ${j}`);
    }
  }
  assert.ok(buildFeed(initialProgress).length>=90);
  assert.equal(buildFeed({...initialProgress,learnedLessonIds:microLessons.map(l=>l.id)}).length,0,'Never recycle completed definitions');
  assert.equal(buildFeed({...initialProgress,openedLessonIds:microLessons.map(l=>l.id)}).length,0,'Never recycle previously viewed definitions');
  assert.ok(lessonByQuestion.has('x-0317'),'Question history still resolves to curated lesson');
});

test('every published lesson has a unique question about its own subject rather than a paraphrase',()=>{
  const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  assert.ok(questions.filter(q=>q.id.startsWith('l-')).length>=60);
  for(const l of microLessons){
    const items=microPracticeQuestions(initialProgress,l.quizQuestionId,()=>0.42);
    assert.ok(items.length>=1&&items.length<=5,`No real exercises: ${l.title}`);
    assert.ok(items.every(q=>q.id!==l.quizQuestionId),l.title);
    const stems=new Set(items.map(q=>norm(q.question)));
    assert.equal(stems.size,items.length,l.title);
    for(const q of items){
      assert.notEqual(norm(q.fact),norm(l.summary),`${q.id}: feedback is a copied definition`);
      assert.notEqual(norm(q.question),norm(l.summary),`${q.id}: question is a copied definition`);
    }
  }
  assert.equal(microLessons.some(l=>l.quizQuestionId==='g-04014'),false,'Duplicated speed lesson suppressed');
  assert.equal(microLessons.some(l=>l.quizQuestionId==='h-0052'),false,'Duplicated cost opportunity lesson suppressed');
});

test('normal play only includes contextual questions, never mass-produced definition templates',()=>{
  assert.ok(studyQuestions.length>=500);
  const cats=new Map();
  for(const q of studyQuestions){
    assert.ok(!q.id.startsWith('g-')&&!q.id.startsWith('x-'),q.id);
    assert.ok(q.question.length>=12&&q.fact.length>=12,q.id);
    if(q.id.startsWith('p-')||q.id.startsWith('h-'))assert.ok(q.question.length>35,q.id);
    assert.ok(!q.question.includes(q.fact),`Definition copied into question ${q.id}`);
    const set=cats.get(q.category)??new Set();set.add(conceptKey(q));cats.set(q.category,set);
  }
  const allLessonText=new Set(microLessons.flatMap(l=>[l.summary,l.hook,...l.body,l.takeaway,l.example,l.comparison,...(l.readMore?.sections??[]).map(x=>x.text)].filter(Boolean)).map(x=>x.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()));
  for(const q of studyQuestions){const normalized=q.fact.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();assert.ok(!allLessonText.has(normalized),`Definition recycled as feedback for ${q.id}`);}
  assert.equal(cats.size,44);
  for(const [category,unique] of cats)assert.ok(unique.size>=5,category);
});

test('catalog JSON and mobile dataset stay synchronized',()=>{
  const file=JSON.parse(fs.readFileSync(path.join(__dirname,'../docs/content/catalog.json'),'utf8'));
  assert.equal(file.length,questions.length);
  for(let i=0;i<questions.length;i++)assert.equal(JSON.stringify(file[i]),JSON.stringify(questions[i]),`Catalog position ${i}`);
});

test('editorial correction: 1500 belongs to the fifteenth century',()=>{
  const q=questions.find(q=>q.id==='historia-04');assert.ok(q.choices[q.answer].includes('XV'));assert.ok(!q.choices[q.answer].includes('XVI'));
});

test('all published lessons have meaningful complementary readings, without made-up article links',()=>{
  const publishedIds=new Set(microLessons.map(l=>l.quizQuestionId));
  assert.equal(publishedIds.size,94);
  let books=0,papers=0,primaries=0;
  for(const l of microLessons){
    const items=l.recommendedReadings;
    assert.ok(items?.length>0,`Reading missing for ${l.title}`);
    const titles=new Set();
    for(const item of items){
      assert.ok(['book','paper','primary'].includes(item.kind));
      assert.ok(item.title.trim().length>=7,`Title missing in ${l.title}`);
      assert.ok(item.creators.trim().length>=(item.kind==='primary'?3:5),`Author missing in ${l.title}`);
      assert.ok(item.focus.trim().length>35,`Reading objective is generic in ${l.title}`);
      const unique=`${item.title}|${item.kind}`.toLowerCase();
      assert.ok(!titles.has(unique),`Duplicate source in ${l.title}`);titles.add(unique);
      if(item.url){
        assert.match(item.url,/^https:\/\/[a-z0-9.-]+\//i,`Invalid bibliographic URL in ${l.title}`);
        const host=new URL(item.url).hostname;
        assert.ok(!host.includes('example')&&!host.includes('localhost'),item.url);
      }
      if(item.kind==='book')books++;
      if(item.kind==='paper'){
        papers++;
        assert.match(item.url??'',/^https:\/\/doi\.org\/10\./,'Scientific paper must use a DOI');
      }
      if(item.kind==='primary'){primaries++;assert.ok(item.url,'Official documents must link to source');}
    }
  }
  assert.ok(books>=90,`Bibliographic books: ${books}`);
  assert.ok(papers>=5,`Verified DOI-backed scientific papers: ${papers}`);
  assert.ok(primaries>=8,`Official documentary links: ${primaries}`);
});

test('self-explanation challenges differ from definitions and are optional',()=>{
  const withChallenge=microLessons.filter(l=>l.selfCheck);
  assert.ok(withChallenge.length>=15);
  const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  for(const l of withChallenge){
    const check=l.selfCheck;
    assert.ok(check.question.trim().length>35&&check.hint.trim().length>40,l.title);
    assert.notEqual(norm(check.question),norm(l.summary));
    assert.notEqual(norm(check.hint),norm(l.summary));
    assert.ok(!/^(o que e|qual a definicao|defina)\b/i.test(norm(check.question)),l.title);
  }
});
