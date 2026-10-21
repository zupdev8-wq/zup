'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {publishedBundles,registerPublishedBundle,removePublishedBundle,validPublishedBundle,validManifest}=require('../app/.test-build/liveContent.js');
const {questionMap,refreshQuestionCatalog,studyQuestions,createCuriosityCardSession}=require('../app/.test-build/game.js');
const {microLessons,lessonMap,refreshLessonCatalog,buildForYouFeed}=require('../app/.test-build/learning.js');
const {initialProgress}=require('../app/.test-build/types.js');
const {normalizeSession}=require('../app/.test-build/progress.js');
const {chooseAnswer,revealAnswer}=require('../app/.test-build/game.js');
const {mergeContent}=require('../scripts/publish-content-seed.cjs');
const sample=()=>{
  const example=lessonMap.get('lesson-brasil-02');
  assert.ok(example);
  return {schemaVersion:1,revision:11,category:'brasil',
    questions:[{id:'u-000000009999',category:'brasil',question:'Em qual situacao aparece o efeito estudado na aula?',choices:['Situacao A','Situacao B','Situacao C','Situacao D'],answer:2,fact:'A situacao correta se relaciona com as condicoes previstas na explicacao desta aula.',kind:'discover',tracks:['brasil'],difficulty:'facil',sourceLabel:'Acervo editorial',sourceLicense:'AUTORIZADO',rightsBasis:'Autorizacao editorial confirmada em contrato.'}],
    lessons:[{...example,title:'A Amazônia depois da atualização',summary:'Uma explicacao nova da materia com informacao adicional sobre rios e atmosfera.',body:['O estudo permite relacionar o ciclo das chuvas e as atividades locais com consequencias climaticas mais amplas.'],readMore:{heading:'Ler mais sobre o tema',sections:[{title:'Conexoes',text:'A combinacao de clima e cobertura vegetal explica diferencas regionais e efeitos de longo prazo sobre os rios.'}]}}],
    retiredQuestionIds:[],retiredLessonIds:[]};
};
function refresh(){refreshQuestionCatalog();refreshLessonCatalog();}
test('remote seed updates explanations, deep dives, questions and feed without resetting progress',()=>{
  const before=questionMap.size,prior=lessonMap.get('lesson-brasil-02');
  const bundle=sample();
  const progress={...initialProgress,xp:470,completedIds:['brasil-03'],savedLessonIds:['lesson-brasil-02'],preferredTracks:['brasil']};
  try{
    assert.equal(validPublishedBundle(bundle),true);
    assert.equal(registerPublishedBundle(bundle),true);refresh();
    assert.equal(questionMap.size,before+1);
    assert.equal(questionMap.get('u-000000009999').answer,2);
    assert.ok(studyQuestions.some(q=>q.id==='u-000000009999'));
    assert.equal(lessonMap.get('lesson-brasil-02').title,'A Amazônia depois da atualização');
    assert.equal(lessonMap.get('lesson-brasil-02').readMore.sections[0].title,'Conexoes');
    assert.ok(microLessons.some(l=>l.id==='lesson-brasil-02'));
    assert.equal(progress.xp,470);
    assert.deepEqual(progress.savedLessonIds,['lesson-brasil-02']);
    assert.ok(createCuriosityCardSession(progress,'u-000000009999'));
    assert.ok(buildForYouFeed(progress,'geral',new Date('2026-10-21')).some(x=>x.kind==='curiosity'&&x.question.id==='u-000000009999'));
  }finally{
    removePublishedBundle('brasil');refresh();
    assert.equal(questionMap.size,before);
    assert.equal(lessonMap.get('lesson-brasil-02'),prior);
  }
});
test('withdraws a wrong question and rollback restores the earlier correct revision',()=>{
  const initial=sample();const retired={...initial,revision:12,questions:[],retiredQuestionIds:['brasil-03']};
  try{
    registerPublishedBundle(retired);refresh();
    assert.equal(questionMap.has('brasil-03'),false);
    assert.ok(!studyQuestions.some(q=>q.id==='brasil-03'));
    assert.equal(registerPublishedBundle({...initial,revision:11}),true);
    refresh();
    assert.equal(questionMap.has('brasil-03'),true);
  }finally{removePublishedBundle('brasil');refresh();}
});
test('seed publication merges additions, lesson corrections and explicit retirement by stable ID',()=>{
  const base=sample();
  const plus={...base,questions:[{...base.questions[0],id:'u-000000009998'}],lessons:[{...base.lessons[0],title:'Nova explicacao'}],retiredQuestionIds:['u-000000009999']};
  const merged=mergeContent(base,plus);
  assert.deepEqual(merged.questions.map(q=>q.id),['u-000000009998']);
  assert.equal(merged.lessons.length,1);
  assert.equal(merged.lessons[0].title,'Nova explicacao');
  assert.deepEqual(merged.retiredQuestionIds,['u-000000009999']);
});
test('payload refuses mismatched categories, broken references and invalid manifest revisions',()=>{
  const s=sample();
  assert.equal(validPublishedBundle({...s,category:'medicina'}),false);
  assert.equal(validPublishedBundle({...s,questions:[{...s.questions[0],answer:55}]}),false);
  assert.equal(validManifest({schemaVersion:1,categories:[{category:'brasil',revision:11,sha256:'a'.repeat(64),questionCount:1,lessonCount:1}]}),true);
  assert.equal(validManifest({schemaVersion:1,categories:[{category:'brasil',revision:0,sha256:'a'.repeat(64),questionCount:1,lessonCount:1}]}),false);
});

test('five-option remote questions preserve the E choice, grading and resumable session',()=>{
  const bundle=sample();
  const q={...bundle.questions[0],id:'u-fivechoice9999',choices:['Opcao A','Opcao B','Opcao C','Opcao D','Opcao E'],answer:4};
  bundle.questions=[q];
  try{
    assert.equal(validPublishedBundle(bundle),true);
    registerPublishedBundle(bundle);refresh();
    const session=createCuriosityCardSession(initialProgress,q.id,()=>0.42,10100);
    assert.equal(session?.items[0].order.length,5);
    assert.equal(normalizeSession(session)?.items[0].order.length,5);
    assert.equal(chooseAnswer(session,4).selected,4,'last visible button must be tappable');
    assert.equal(chooseAnswer(session,5),session,'sixth option does not exist');
    const selectedIndex=session.items[0].order.indexOf(4);
    const selected=chooseAnswer(session,selectedIndex);
    const answer=revealAnswer(selected);
    assert.equal(answer.answers[0].correct,true);
    assert.equal(normalizeSession(answer)?.answers[0].choice,4);
  }finally{removePublishedBundle('brasil');refresh();}
});
