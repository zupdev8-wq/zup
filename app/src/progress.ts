import {initialProgress} from './types';
import type {Progress,Session,SessionItem,SessionAnswer,TrackId,ReviewState} from './types';
import {questionMap} from './game';
import {companions} from './companions';
import {isRetiredLocalQuestionId} from './retiredQuestions';

const integer=(v:unknown,fallback=0):number=>typeof v==='number'&&Number.isSafeInteger(v)&&v>=0?v:fallback;
const strings=(v:unknown):string[]=>Array.isArray(v)?[...new Set(v.filter((s):s is string=>typeof s==='string'&&s.length<180))]:[];
const ids=(v:unknown)=>strings(v).filter(id=>questionMap.has(id)||isRetiredLocalQuestionId(id));
const lessonIds=(v:unknown)=>strings(v).filter(id=>id.startsWith('lesson-'));
const record=(v:unknown):Record<string,unknown>=>v!==null&&typeof v==='object'&&!Array.isArray(v)?v as Record<string,unknown>:{ };
const tracks:TrackId[]=['geral','brasil','brasil-vivido','geopolitica','enem','concursos','faculdade','humanas','exatas','biologicas','entretenimento','cinema','series','livros','religioes','pensamento','historia','ciencia','artes','tecnologia','games','esportes','musica','animais'];
function date(v:unknown):string {
  if(typeof v!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(v))return '';
  const d=new Date(`${v}T12:00:00Z`);
  return !Number.isNaN(d.getTime())&&d.toISOString().slice(0,10)===v?v:'';
}
export function normalizeSession(value:unknown):Session|null {
  const v=record(value);
  if(typeof v.id!=='string'||v.id.length>120||!v.id || !Array.isArray(v.items) || v.items.length<1 || v.items.length>60)return null;
  if(!['category','daily','review','mixed','micro','marathon','exam','discover'].includes(String(v.mode)))return null;
  if(![...questionMap.values()].some(q=>q.category===v.category))return null;
  const items:SessionItem[]=[];
  for(const raw of v.items) {
    const item=record(raw);
    // Sessões antigas montadas por templates genéricos não podem reaparecer depois desta atualização.
    if(typeof item.questionId!=='string'||!questionMap.has(item.questionId)||!Array.isArray(item.order))return null;
    if(item.questionId.startsWith('g-')||item.questionId.startsWith('x-'))return null;
    const answerCount=questionMap.get(item.questionId)!.choices.length;
    if(item.order.length!==answerCount||new Set(item.order).size!==answerCount||!item.order.every(n=>Number.isInteger(n)&&n>=0&&n<answerCount))return null;
    items.push({questionId:item.questionId,order:[...item.order] as number[]});
  }
  if(new Set(items.map(i=>i.questionId)).size!==items.length)return null;
  if(v.mode==='discover'&&items.some(item=>{const q=questionMap.get(item.questionId)!;return !item.questionId.startsWith('t-')&&q.kind!=='discover';}))return null;
  if(!Number.isInteger(v.index)||Number(v.index)<0||Number(v.index)>=items.length)return null;
  const index=Number(v.index), revealed=v.revealed===true;
  const selected=v.selected===null?null:integer(v.selected,-1);
  if(selected!==null&&(selected<0||selected>=items[index]!.order.length))return null;
  if(revealed&&selected===null)return null;
  if(!Array.isArray(v.answers)||v.answers.length!==index+(revealed?1:0))return null;
  const answers:SessionAnswer[]=[];
  for(let i=0;i<v.answers.length;i++) {
    const a=record(v.answers[i]), item=items[i]!;
    if(a.questionId!==item.questionId||!Number.isInteger(a.choice)||Number(a.choice)<0||Number(a.choice)>=questionMap.get(item.questionId)!.choices.length)return null;
    const q=questionMap.get(item.questionId)!;
    answers.push({questionId:q.id,choice:Number(a.choice),correct:Number(a.choice)===q.answer});
  }
  if(revealed&&answers[index]?.choice!==items[index]!.order[selected!])return null;
  const topicIds=Array.isArray(v.topicIds)?[...new Set(v.topicIds.filter((id):id is Session['category']=>typeof id==='string'&&[...questionMap.values()].some(q=>q.category===id)))]:[];
  if(v.mode==='mixed'||v.mode==='marathon'||v.mode==='exam'){
    if(!topicIds.length)topicIds.push(v.category as Session['category']);
    if(items.some(item=>!topicIds.includes(questionMap.get(item.questionId)!.category)))return null;
  }
  const sourceQuestionId=typeof v.sourceQuestionId==='string'&&questionMap.has(v.sourceQuestionId)?v.sourceQuestionId:undefined;
  const examTitle=typeof v.examTitle==='string'?v.examTitle.trim().slice(0,120):undefined;
  const examQuery=typeof v.examQuery==='string'?v.examQuery.trim().slice(0,300):undefined;
  return {id:v.id,mode:v.mode as Session['mode'],category:v.category as Session['category'],...((v.mode==='mixed'||v.mode==='marathon'||v.mode==='exam')?{topicIds}:{}),...(sourceQuestionId?{sourceQuestionId}:{}),...(examTitle?{examTitle}:{}),...(examQuery?{examQuery}:{}),items,index,selected,
    revealed,answers,startedAt:integer(v.startedAt)};
}
function normalizeReviews(value:unknown):Record<string,ReviewState>{
  const result:Record<string,ReviewState>={};
  for(const [id,raw] of Object.entries(record(value))){
    if(!questionMap.has(id))continue;
    const state=record(raw),due=date(state.due);if(!due)continue;
    result[id]={due,intervalDays:Math.min(365,integer(state.intervalDays)),strength:Math.min(5,integer(state.strength)),attempts:Math.min(9999,integer(state.attempts)),lastCorrect:state.lastCorrect===true};
  }
  return result;
}
/** Migrates old snapshots into the v5 feed/game model without losing quiz progress. Premium access is server-authoritative. */
export function normalizeProgress(value:unknown):Progress {
  const raw=record(value), answered=integer(raw.answered);
  const nickname=typeof raw.nickname==='string'?raw.nickname.replace(/[\u0000-\u001f\u007f]/g,'').trim().slice(0,18):'';
  const companion=companions.find(c=>c.id===raw.companionId)?.id??initialProgress.companionId;
  const activity:Record<string,number>={};
  for(const [key,val] of Object.entries(record(raw.activity)).sort(([a],[b])=>a.localeCompare(b)).slice(-90)) {
    if(date(key)&&integer(val)>0)activity[key]=integer(val);
  }
  const dailyDate=date(raw.dailyDate), dailyDone=integer(raw.dailyDone);
  if(dailyDate&&dailyDone&&!activity[dailyDate])activity[dailyDate]=dailyDone;
  const completedSessions=strings(raw.completedSessions).slice(-150);
  let activeSession=normalizeSession(raw.activeSession);
  if(activeSession&&completedSessions.includes(activeSession.id))activeSession=null;
  const preferredTracks=strings(raw.preferredTracks).filter((id):id is TrackId=>tracks.includes(id as TrackId));
  const dailyGoal=[3,5,10].includes(integer(raw.dailyGoal))?integer(raw.dailyGoal):initialProgress.dailyGoal;
  return {
    ...initialProgress,schemaVersion:5,xp:integer(raw.xp),stars:integer(raw.stars),answered,correct:Math.min(answered,integer(raw.correct)),
    completedIds:ids(raw.completedIds),masteredIds:ids(raw.masteredIds),weakIds:ids(raw.weakIds),reviewSchedule:normalizeReviews(raw.reviewSchedule),
    badges:strings(raw.badges),streak:integer(raw.streak),streakFreezes:Math.min(3,integer(raw.streakFreezes,1)),lastPlayed:date(raw.lastPlayed),
    dailyDate,dailyDone,dailyGoal,activity:Object.fromEntries(Object.entries(activity).sort(([a],[b])=>a.localeCompare(b)).slice(-90)),nickname:nickname||initialProgress.nickname,companionId:companion,
    preferredTracks:preferredTracks.length?preferredTracks:initialProgress.preferredTracks,
    sound:typeof raw.sound==='boolean'?raw.sound:true,motion:typeof raw.motion==='boolean'?raw.motion:true,
    onboardingCompleted:typeof raw.onboardingCompleted==='boolean'?raw.onboardingCompleted:Object.keys(raw).length>0,
    activeSession,completedSessions,
    openedLessonIds:lessonIds(raw.openedLessonIds),learnedLessonIds:lessonIds(raw.learnedLessonIds),savedLessonIds:lessonIds(raw.savedLessonIds)
  };
}
