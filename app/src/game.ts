import type {Question, Progress, CategoryId, Session, GameMode, ReviewState} from './types';
import {questions} from './questions';

export const LESSON_SIZE = 5;
export const PREMIUM_MARATHON_SIZE = 10;
export const questionMap = new Map(questions.map(q=>[q.id,q]));
export const localDate = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
export const available = (cat:CategoryId) => questions.filter(q=>q.category===cat);
export const level = (xp:number) => 1+Math.floor(Math.max(0,xp)/200);
export const levelXP = (xp:number) => Math.max(0,xp)%200;

export function shuffle<T>(items: readonly T[], random = Math.random): T[] {
  const result = [...items];
  for(let i=result.length-1;i>0;i--) {
    const j = Math.min(i,Math.max(0,Math.floor(random()*(i+1))));
    [result[i],result[j]]=[result[j]!,result[i]!];
  }
  return result;
}
const dateValue=(value:string)=>/^\d{4}-\d{2}-\d{2}$/.test(value)?new Date(`${value}T12:00:00`):null;
const addDays=(d:Date,days:number)=>{const x=new Date(d);x.setDate(x.getDate()+days);return localDate(x);};
const gapDays=(from:string,to:string)=>{const a=dateValue(from),b=dateValue(to);return a&&b?Math.round((b.getTime()-a.getTime())/86_400_000):999;};

export function dueReviewIds(p:Progress,now=new Date()):string[] {
  const today=localDate(now),weak=new Set(p.weakIds);
  const due=Object.entries(p.reviewSchedule).filter(([id,state])=>questionMap.has(id)&&state.due<=today).map(([id])=>id);
  return [...new Set([...p.weakIds,...due])].sort((a,b)=>Number(weak.has(b))-Number(weak.has(a)));
}
const unseenOnly=(pool:Question[],p:Progress)=>{const done=new Set(p.completedIds);return pool.filter(q=>!done.has(q.id));};

/** Normal play never repeats a question already answered. Repetition lives only in explicit review mode. */
export function lesson(cat:CategoryId,p:Progress,random=Math.random,size=LESSON_SIZE):Question[] {
  return shuffle(unseenOnly(available(cat),p),random).slice(0,size);
}
export function dailyQuestions(p:Progress,random=Math.random,size=LESSON_SIZE):Question[] {
  const unseen=unseenOnly(questions,p);
  if(!unseen.length)return [];
  const brazil=shuffle(unseen.filter(q=>q.brazil),random).slice(0,Math.min(2,size));
  const ids=new Set(brazil.map(q=>q.id));
  const rest=shuffle(unseen.filter(q=>!ids.has(q.id)),random).slice(0,Math.max(0,size-brazil.length));
  return shuffle([...brazil,...rest],random).slice(0,size);
}
export function questionOfDay(d=new Date()):Question {
  let hash=0;
  for(const char of localDate(d)) hash=(Math.imul(hash,31)+char.charCodeAt(0))>>>0;
  const pool=questions.filter(q=>q.brazil);
  return (pool.length?pool:questions)[hash%(pool.length||questions.length)]!;
}
export function mixedLesson(topicIds:readonly CategoryId[],p:Progress,random=Math.random,size=LESSON_SIZE):Question[] {
  const allowed=new Set(topicIds.length?topicIds:['brasil']);
  const pool=unseenOnly(questions.filter(q=>allowed.has(q.category)),p);
  return shuffle(pool,random).slice(0,size);
}

function sessionFrom(list:Question[],p:Progress,cat:CategoryId,mode:GameMode,random:()=>number,now:number,topics?:CategoryId[],sourceQuestionId?:string):Session|null {
  if(!list.length)return null;
  return {
    id:`${now.toString(36)}-${Math.floor(random()*0x100000000).toString(36)}-${p.answered.toString(36)}`,
    mode,category:cat,...(topics?.length?{topicIds:topics}:{}),...(sourceQuestionId?{sourceQuestionId}:{}),
    items:list.map(q=>({questionId:q.id,order:shuffle([0,1,2,3],random)})),
    index:0,selected:null,revealed:false,answers:[],startedAt:now,
  };
}

export function createSession(p:Progress,cat:CategoryId,mode:GameMode='category',random=Math.random,now=Date.now(),topicIds:readonly CategoryId[]=[],premiumEnabled=false):Session|null {
  const reviewSize=mode==='marathon'&&premiumEnabled?PREMIUM_MARATHON_SIZE:LESSON_SIZE;
  const review=shuffle(dueReviewIds(p,new Date(now)).map(id=>questionMap.get(id)).filter((q):q is Question=>Boolean(q)),random).slice(0,reviewSize);
  const topics=[...new Set(topicIds)].filter(id=>questions.some(q=>q.category===id));
  const size=mode==='marathon'&&premiumEnabled?PREMIUM_MARATHON_SIZE:LESSON_SIZE;
  const list=mode==='review'?review
    :mode==='daily'?dailyQuestions(p,random,size)
    :mode==='mixed'||mode==='marathon'?mixedLesson(topics.length?topics:[cat],p,random,size)
    :lesson(cat,p,random,size);
  return sessionFrom(list,p,cat,mode,random,now,(mode==='mixed'||mode==='marathon')?(topics.length?topics:[cat]):undefined);
}

/** A feed lesson opens a short 5-question game around the same topic, then the lesson moves to the learned library. */
export function createMicroSession(p:Progress,questionId:string,random=Math.random,now=Date.now()):Session|null {
  const primary=questionMap.get(questionId);if(!primary)return null;
  const done=new Set(p.completedIds);
  const sameTopic=primary.topic?questions.filter(q=>q.id!==primary.id&&q.topic===primary.topic):[];
  const sameCategory=questions.filter(q=>q.id!==primary.id&&q.category===primary.category&&!sameTopic.some(x=>x.id===q.id));
  const preferred=[
    ...(!done.has(primary.id)?[primary]:[]),
    ...shuffle(sameTopic.filter(q=>!done.has(q.id)),random),
    ...shuffle(sameCategory.filter(q=>!done.has(q.id)),random),
  ];
  const unique:Question[]=[];const ids=new Set<string>();
  for(const q of preferred){if(ids.has(q.id))continue;ids.add(q.id);unique.push(q);if(unique.length===LESSON_SIZE)break;}
  return sessionFrom(unique,p,primary.category,'micro',random,now,undefined,primary.id);
}

export function chooseAnswer(s:Session,choice:number):Session {
  return !s.revealed && Number.isInteger(choice) && choice>=0 && choice<4 ? {...s,selected:choice} : s;
}
export function revealAnswer(s:Session):Session {
  if(s.revealed||s.selected===null)return s;
  const item=s.items[s.index], q=item&&questionMap.get(item.questionId);
  if(!q)return s;
  const choice=item.order[s.selected];
  if(choice===undefined)return s;
  return {...s,revealed:true,answers:[...s.answers,{questionId:q.id,choice,correct:choice===q.answer}]};
}
export function nextQuestion(s:Session):Session {
  if(!s.revealed||s.index>=s.items.length-1)return s;
  return {...s,index:s.index+1,selected:null,revealed:false};
}
export const sessionScore = (s:Session) => s.answers.filter(a=>a.correct).length*20 + (s.answers.length===s.items.length&&s.items.length>1?20:0);
export const effectiveStreak=(p:Progress,now=new Date())=>{
  const today=localDate(now),gap=gapDays(p.lastPlayed,today);
  return gap<=1||(!Number.isFinite(gap))?p.streak:(gap===2&&p.streakFreezes>0?p.streak:0);
};
function nextReview(prev:ReviewState|undefined,correct:boolean,now:Date):ReviewState {
  const old=prev??{due:localDate(now),intervalDays:0,strength:0,attempts:0,lastCorrect:false};
  const strength=correct?Math.min(5,old.strength+1):Math.max(0,old.strength-1);
  const ladder=[1,2,4,7,14,30];
  const intervalDays=correct?ladder[strength]??30:1;
  return {due:addDays(now,intervalDays),intervalDays,strength,attempts:old.attempts+1,lastCorrect:correct};
}
function streakUpdate(p:Progress,now:Date){
  const today=localDate(now),same=p.lastPlayed===today,gap=gapDays(p.lastPlayed,today);
  let streak=p.streak,streakFreezes=p.streakFreezes;
  if(!same){
    if(gap===1)streak=Math.max(1,p.streak+1);
    else if(gap===2&&streakFreezes>0){streak=Math.max(1,p.streak+1);streakFreezes-=1;}
    else streak=1;
  }
  return {today,streak,streakFreezes};
}
export function updateProgress(p:Progress,answers:{q:Question;correct:boolean}[],now=new Date(),bonus=answers.length>=LESSON_SIZE):Progress {
  if(!answers.length)return p;
  const {today,streak,streakFreezes}=streakUpdate(p,now);
  const successes=answers.filter(a=>a.correct);
  const xp=p.xp+successes.length*20+(bonus?20:0);
  const stars=p.stars+successes.length*2+(bonus&&successes.length===answers.length?3:0);
  const completedIds=Array.from(new Set([...p.completedIds,...answers.map(a=>a.q.id)]));
  const masteredIds=Array.from(new Set([...p.masteredIds,...successes.map(a=>a.q.id)]));
  const weak=new Set(p.weakIds),reviewSchedule={...p.reviewSchedule};
  answers.forEach(a=>{a.correct?weak.delete(a.q.id):weak.add(a.q.id);reviewSchedule[a.q.id]=nextReview(reviewSchedule[a.q.id],a.correct,now);});
  const badges=new Set(p.badges);
  if(completedIds.length>=1)badges.add('primeiro');
  if(completedIds.length>=25)badges.add('curioso');
  if(completedIds.length>=75)badges.add('explorador');
  if(completedIds.length>=250)badges.add('enciclopedia');
  if(streak>=7)badges.add('semana');
  if(xp>=2000)badges.add('mestre');
  if(completedIds.filter(id=>questionMap.get(id)?.brazil).length>=100)badges.add('brasil');
  if(p.weakIds.length>0&&weak.size===0)badges.add('superacao');
  if(successes.length===answers.length&&answers.length>=LESSON_SIZE)badges.add('perfeito');
  const activity=Object.fromEntries(Object.entries({...p.activity,[today]:(p.activity[today]??0)+1}).sort(([a],[b])=>a.localeCompare(b)).slice(-90));
  return {...p,xp,stars,answered:p.answered+answers.length,correct:p.correct+successes.length,completedIds,masteredIds,
    weakIds:[...weak],reviewSchedule,streak,streakFreezes,lastPlayed:today,dailyDate:today,dailyDone:(p.dailyDate===today?p.dailyDone:0)+1,
    badges:[...badges],activity};
}

/** A single storage snapshot credits the round, consumes the session and records feed lessons as learned. */
export function finishSession(p:Progress,s:Session,now=new Date()):Progress {
  if(!p.activeSession || p.activeSession.id!==s.id || p.completedSessions.includes(s.id)
    || s.index!==s.items.length-1 || !s.revealed || s.answers.length!==s.items.length)return p;
  const answers:{q:Question;correct:boolean}[]=[];
  for(let i=0;i<s.items.length;i++){
    const item=s.items[i]!, a=s.answers[i], q=questionMap.get(item.questionId);
    if(!a||!q||a.questionId!==q.id||!Number.isInteger(a.choice)||a.choice<0||a.choice>3)return p;
    answers.push({q,correct:a.choice===q.answer});
  }
  const next=updateProgress(p,answers,now,s.items.length>=LESSON_SIZE);
  const learnedLessonIds=s.mode==='micro'&&s.sourceQuestionId
    ?Array.from(new Set([...next.learnedLessonIds,`lesson-${s.sourceQuestionId}`]))
    :next.learnedLessonIds;
  return {...next,learnedLessonIds,activeSession:null,completedSessions:[...p.completedSessions,s.id].slice(-150)};
}
