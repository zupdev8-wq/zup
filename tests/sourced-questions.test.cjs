'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {licensedTriviaQuestions,verifiedNatureQuestions,sourcedCuriosityQuestions}=require('../app/.test-build/externalQuestions.js');
const {studyQuestions,curiosityLesson,createSession,questionMap,dailyQuestions}=require('../app/.test-build/game.js');
const {initialProgress}=require('../app/.test-build/types.js');
const {normalizeProgress,normalizeSession}=require('../app/.test-build/progress.js');
const {createExamSession,availableExamQuestionCount}=require('../app/.test-build/exams.js');
const root=path.resolve(__dirname,'..');

test('curiosities have attributable external origins, distinct answers and no generated templates',()=>{
  assert.equal(licensedTriviaQuestions.length,24);
  assert.equal(verifiedNatureQuestions.length,2);
  assert.equal(sourcedCuriosityQuestions.length,26);
  const stems=new Set(),ids=new Set();
  for(const q of sourcedCuriosityQuestions){
    assert.match(q.id,/^t-\d{4}$/);
    assert.ok(!ids.has(q.id));ids.add(q.id);
    assert.ok(!stems.has(q.question.toLowerCase()));stems.add(q.question.toLowerCase());
    assert.match(q.source?.url??'',/^https:\/\//);
    assert.equal(q.choices.length,4);
    assert.equal(new Set(q.choices.map(s=>s.toLowerCase())).size,4);
    assert.ok(q.question.includes('?'));
    assert.ok(q.fact.length>30);
    assert.ok(!q.question.includes(q.fact));
    assert.ok(!/revis[aã]o conceitual|associe a descri[cç][aã]o/i.test(q.question));
    assert.equal(questionMap.get(q.id),q);
    assert.ok(studyQuestions.includes(q));
  }
  assert.ok(licensedTriviaQuestions.every(q=>q.source?.title.includes('CC BY-SA 4.0')));
  assert.ok(verifiedNatureQuestions.every(q=>!q.source?.title.includes('Open Trivia')));
});

test('discover mode chooses only distinct, sourced, unanswered curiosities',()=>{
  const selected=curiosityLesson(initialProgress,()=>0.37,5);
  assert.equal(selected.length,5);
  assert.equal(new Set(selected.map(q=>q.concept)).size,5);
  const session=createSession(initialProgress,'natureza','discover',()=>0.37,12345);
  assert.ok(session);
  assert.equal(session.mode,'discover');
  assert.equal(session.items.length,5);
  assert.ok(session.items.every(item=>item.questionId.startsWith('t-')));
  assert.ok(normalizeSession(session));
  const completed={...initialProgress,completedIds:session.items.map(item=>item.questionId)};
  const next=curiosityLesson(completed,()=>0.37,5);
  assert.ok(next.every(q=>!completed.completedIds.includes(q.id)));
  assert.equal(new Set(next.map(q=>q.id)).size,next.length);
  assert.equal(curiosityLesson({...initialProgress,completedIds:sourcedCuriosityQuestions.map(q=>q.id)}).length,0);
});

test('legacy generated sessions are dropped without wiping completed progress or XP',()=>{
  const session=createSession(initialProgress,'natureza','discover',()=>0.37,400);
  const legacy={...session,mode:'category',category:'brasil',items:[{questionId:'g-00001',order:[0,1,2,3]}]};
  assert.equal(normalizeSession(legacy),null);
  const record={...initialProgress,xp:420,answered:33,correct:21,activeSession:legacy,completedIds:['g-00001','t-0001']};
  const restored=normalizeProgress(record);
  assert.equal(restored.activeSession,null);
  assert.equal(restored.xp,420);
  assert.equal(restored.answered,33);
  assert.equal(restored.correct,21);
  assert.ok(restored.completedIds.includes('g-00001'),'old completed IDs still preserve historical progress');
  assert.ok(restored.completedIds.includes('t-0001'));
});

test('official exam builder never mislabels casual trivia as academic exam questions',()=>{
  const p=initialProgress;
  const plan={title:'Ciências e natureza',query:'natureza biologia ciência',categories:['natureza','ciencia','biologia'],questionCount:20};
  const exam=createExamSession(p,plan,()=>0.42,123);
  assert.ok(exam);
  assert.ok(exam.items.every(item=>!item.questionId.startsWith('t-')));
  assert.ok(availableExamQuestionCount(p,plan)>=exam.items.length);
  const mixed=dailyQuestions(p,()=>0.37,5);
  assert.ok(mixed.some(q=>q.id.startsWith('t-')),'one curiosity in the daily mix');
  assert.ok(mixed.every(q=>!q.id.startsWith('g-')&&!q.id.startsWith('x-')));
});

test('UI exposes separate discovery, academic primary sources and linked source credit',()=>{
  const explore=fs.readFileSync(path.join(root,'app/src/screens/ExploreScreen.tsx'),'utf8');
  const quiz=fs.readFileSync(path.join(root,'app/src/screens/QuizScreen.tsx'),'utf8');
  const about=fs.readFileSync(path.join(root,'app/src/screens/AboutScreen.tsx'),'utf8');
  assert.match(explore,/Curiosidades divertidas/);
  assert.match(explore,/'discover'/);
  assert.match(explore,/Provas oficiais para estudar/);
  assert.match(explore,/www\.gov\.br\/inep/);
  assert.match(quiz,/Fonte: \{q\.source\.title\}/);
  assert.match(quiz,/setImageError\(true\)/);
  assert.match(about,/Creative Commons Atribui[cç][aã]o-CompartilhaIgual 4\.0/);
  assert.ok(fs.existsSync(path.join(root,'docs/FONTES-QUESTOES-EXTERNAS.md')));
});
