'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {initialProgress}=require('../app/.test-build/types.js');
const {questions}=require('../app/.test-build/questions.js');
const {categories}=require('../app/.test-build/catalog.js');
const {createSession,createMicroSession,chooseAnswer,revealAnswer,nextQuestion,finishSession,sessionScore,questionMap,dailyQuestions,questionOfDay,shuffle,updateProgress,effectiveStreak,localDate}=require('../app/.test-build/game.js');
const {normalizeProgress,normalizeSession}=require('../app/.test-build/progress.js');
const {buildExamPlan,createExamSession}=require('../app/.test-build/exams.js');
const fresh=()=>structuredClone(initialProgress);
function answerAll(s,correct=true){while(true){const item=s.items[s.index],q=questionMap.get(item.questionId),canonical=correct?q.answer:(q.answer+1)%4;s=revealAnswer(chooseAnswer(s,item.order.indexOf(canonical)));if(s.index===s.items.length-1)return s;s=nextQuestion(s);}}
test('choices are permuted and canonical answer mapping scores correctly',()=>{let s=createSession(fresh(),'brasil','category',()=>0,1);assert.ok(s);assert.notDeepEqual(s.items[0].order,[0,1,2,3]);s=answerAll(s);assert.equal(s.answers.filter(a=>a.correct).length,5);assert.equal(sessionScore(s),120);});
test('invalid taps and premature confirmations are no-ops',()=>{const s=createSession(fresh(),'brasil');assert.ok(s);assert.equal(revealAnswer(s),s);assert.equal(nextQuestion(s),s);for(const bad of [-1,4,NaN,1.5])assert.equal(chooseAnswer(s,bad),s);const shown=revealAnswer(chooseAnswer(s,0));assert.equal(chooseAnswer(shown,1),shown);assert.equal(revealAnswer(shown),shown);});
test('active session survives JSON hydration',()=>{let s=createSession(fresh(),'historia');s=nextQuestion(revealAnswer(chooseAnswer(s,2)));s=chooseAnswer(s,1);assert.deepEqual(normalizeProgress(JSON.parse(JSON.stringify({...fresh(),activeSession:s}))).activeSession,s);});
test('finishing is atomic and idempotent',()=>{const s=answerAll(createSession(fresh(),'brasil'));const p={...fresh(),activeSession:s};const next=finishSession(p,s,new Date(2026,9,15,12));assert.equal(next.xp,120);assert.equal(next.answered,5);assert.equal(next.activeSession,null);assert.equal(finishSession(next,s),next);});
test('microlearning opens up to five related unseen questions and then moves card to learned',()=>{const s=createMicroSession(fresh(),'x-0001',()=>0.4,123);assert.ok(s);assert.equal(s.mode,'micro');assert.equal(s.items.length,5);assert.equal(new Set(s.items.map(x=>x.questionId)).size,5);const done=answerAll(s);const next=finishSession({...fresh(),activeSession:done},done,new Date(2026,9,16,12));assert.ok(next.learnedLessonIds.includes('lesson-x-0001'));for(const it of done.items)assert.ok(next.completedIds.includes(it.questionId));});
test('answered questions do not return in a second micro quiz',()=>{let s=answerAll(createMicroSession(fresh(),'x-0001',()=>0.2,1));let p=finishSession({...fresh(),activeSession:s},s);const s2=createMicroSession(p,'x-0001',()=>0.3,2);if(s2)for(const item of s2.items)assert.ok(!p.completedIds.includes(item.questionId));});
test('review is the only normal route that can repeat due questions',()=>{const wrong=answerAll(createSession(fresh(),'brasil'),false);const p=finishSession({...fresh(),activeSession:wrong},wrong);const review=createSession(p,'brasil','review');assert.ok(review);assert.ok(review.items.every(x=>p.completedIds.includes(x.questionId)));});
test('premium marathon has ten unseen questions while free mode remains five',()=>{const free=createSession(fresh(),'brasil','marathon',()=>0.2,1,['brasil','historia']);assert.ok(free);assert.equal(free.items.length,5);const premium=createSession(fresh(),'brasil','marathon',()=>0.2,1,['brasil','historia'],true);assert.ok(premium);assert.equal(premium.items.length,10);});

test('smart exam builds up to 45 unique unseen questions from the requested areas',()=>{const plan=buildExamPlan('Cebraspe Câmara Municipal cargo administrativo',undefined,45);const s=createExamSession(fresh(),plan,()=>0.3,44);assert.ok(s);assert.equal(s.mode,'exam');assert.equal(s.items.length,45);assert.equal(new Set(s.items.map(x=>x.questionId)).size,45);assert.match(s.examTitle,/Cebraspe|Câmara/i);assert.ok(s.topicIds.length>1);});
test('smart exam never reuses questions already completed in normal play',()=>{const plan=buildExamPlan('Cebraspe Câmara Municipal cargo administrativo',undefined,45);const first=createExamSession(fresh(),plan,()=>0.2,1);assert.ok(first);const completed=first.items.map(x=>x.questionId);const second=createExamSession({...fresh(),completedIds:completed},plan,()=>0.4,2);assert.ok(second);assert.ok(second.items.every(x=>!completed.includes(x.questionId)));});
test('daily questions are unique, unseen and broadly mixed',()=>{const batch=dailyQuestions(fresh());assert.equal(batch.length,5);assert.equal(new Set(batch.map(q=>q.id)).size,5);assert.ok(batch.filter(q=>q.brazil).length>=2);const p={...fresh(),completedIds:batch.map(q=>q.id)};assert.ok(dailyQuestions(p).every(q=>!p.completedIds.includes(q.id)));});
test('daily discovery is deterministic for the local date',()=>{const a=questionOfDay(new Date(2026,9,15,1)),b=questionOfDay(new Date(2026,9,15,23));assert.equal(a.id,b.id);assert.ok(a.brazil);});
test('streak handles transitions and freezes',()=>{assert.equal(effectiveStreak({...fresh(),lastPlayed:'2025-12-31',streak:7},new Date(2026,0,1,12)),7);assert.equal(effectiveStreak({...fresh(),streakFreezes:0,lastPlayed:'2025-12-30',streak:7},new Date(2026,0,1,12)),0);assert.equal(effectiveStreak({...fresh(),streakFreezes:1,lastPlayed:'2025-12-30',streak:7},new Date(2026,0,1,12)),7);assert.equal(localDate(new Date(2026,0,1,0)),'2026-01-01');});
test('all questions can be completed once without forced repetition',()=>{
  let p=fresh(),round=0;
  for(const c of categories){
    while(true){
      const raw=createSession(p,c.id,'category',()=>0.4,1000+round++);
      if(!raw)break;
      const s=answerAll(normalizeSession(JSON.parse(JSON.stringify(raw))));
      p=normalizeProgress(JSON.parse(JSON.stringify(finishSession({...p,activeSession:s},s))));
    }
  }
  assert.equal(p.completedIds.length,questions.length);assert.equal(p.masteredIds.length,questions.length);assert.equal(p.answered,questions.length);assert.ok(p.xp>=questions.length*20);assert.equal(p.completedSessions.length,150);
});
test('corrupt session shapes are rejected and correctness is recomputed',()=>{const s=createSession(fresh(),'brasil');for(const x of [{...s,index:99},{...s,selected:6},{...s,mode:'bad'},{...s,items:[{...s.items[0],order:[0,0,2,3]}]},{...s,items:[{...s.items[0],questionId:'deleted'}]},{...s,items:[s.items[0],s.items[0]]},{...s,revealed:true}])assert.equal(normalizeSession(x),null);let done=answerAll(createSession(fresh(),'brasil'),false);done.answers=done.answers.map(a=>({...a,correct:true}));assert.ok(normalizeSession(done).answers.every(a=>!a.correct));});
test('shuffle preserves source and permutation',()=>{const a=[0,1,2,3];for(const f of [()=>0,()=>.5,()=>.999999])assert.deepEqual([...shuffle(a,f)].sort(),a);assert.deepEqual(a,[0,1,2,3]);});
