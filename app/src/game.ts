import type {Question, Progress, CategoryId, Session, GameMode, ReviewState, TrackId} from './types';
import {questions} from './questions';
import {sourcedCuriosityQuestions} from './externalQuestions';
import {publishedBundles} from './liveContent';

export const LESSON_SIZE = 5;
export const PREMIUM_MARATHON_SIZE = 10;
export const questionMap = new Map(questions.map(q=>[q.id,q]));
export const localDate = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
export const available = (cat:CategoryId) => studyQuestions.filter(q=>q.category===cat);
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
/**
 * Somente questões editoriais com raciocínio, problemas ou aplicação. O catálogo
 * antigo g-/x- contém dezenas de versões da mesma definição; mantém-se nos
 * dados de migração, mas NUNCA aparece em quizzes ou revisões.
 */
const definitionPrompt=/^(?:o que e\b|qual (?:a )?definicao\b|defina\b|como (?:se )?define\b)/;
const approved=(q:Question)=>!q.id.startsWith('g-')&&!q.id.startsWith('x-')&&!definitionPrompt.test(q.question.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim());
export const studyQuestions:Question[]=questions.filter(approved);
// Snapshot static packs once. Update the *same* exported arrays/maps when a
// verified category seed is hydrated; all existing quiz code sees new content.
const bundledQuestions=[...questions];
const bundledCuriosities=[...sourcedCuriosityQuestions];
export function refreshQuestionCatalog():void {
  const overrides=new Map<string,Question>();
  const removed=new Set<string>();
  const owners=new Map(bundledQuestions.map(q=>[q.id,q.category]));
  for(const bundle of publishedBundles.values()){
    for(const id of bundle.retiredQuestionIds)if(!owners.has(id)||owners.get(id)===bundle.category)removed.add(id);
    for(const q of bundle.questions){
      if(owners.has(q.id)&&owners.get(q.id)!==bundle.category)continue;
      owners.set(q.id,bundle.category);overrides.set(q.id,q);
    }
  }
  const next=new Map<string,Question>();
  for(const q of bundledQuestions)if(!removed.has(q.id))next.set(q.id,overrides.get(q.id)??q);
  for(const q of overrides.values())if(!removed.has(q.id))next.set(q.id,q);
  questions.splice(0,questions.length,...next.values());
  questionMap.clear();
  for(const q of questions)questionMap.set(q.id,q);
  studyQuestions.splice(0,studyQuestions.length,...questions.filter(approved));
  const curiosities=new Map<string,Question>();
  for(const q of bundledCuriosities)if(!removed.has(q.id)){const updated=overrides.get(q.id)??q;if(updated.kind==='discover')curiosities.set(q.id,updated);}
  for(const q of overrides.values())if(!removed.has(q.id)&&q.kind==='discover')curiosities.set(q.id,q);
  sourcedCuriosityQuestions.splice(0,sourcedCuriosityQuestions.length,...curiosities.values());
}

/** Assuntos podem voltar para exercitar raciocínio; textos de definição e
 * justificativas iguais não podem reaparecer com outro ID ou outra frase. */
const normalizeConcept=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const fillerWords=new Set(['sobre','neste','nesta','nesse','nessa','assim','essa','esse','esta','este','isso','isto','aquela','aquele','caso','mesmo','mesma','pelos','pelas','para','pela','pelo','como','sendo','outra','outro','outras','outros','mais','muito','muita','pode','podem','tambem','quando','ainda','entre','cada','apenas','depois','antes','seus','suas','porque','onde','quais','qual','quem','desse','dessa','esses','essas']);
const keyTerms=(s:string)=>new Set(normalizeConcept(s).split(' ').filter(word=>word.length>=5&&!fillerWords.has(word)));
const repeatsExplanation=(a:string,b:string):boolean=>{
  const left=normalizeConcept(a),right=normalizeConcept(b);
  if(!left||!right)return false;
  if(left===right)return true;
  const aa=keyTerms(left),bb=keyTerms(right),shorter=Math.min(aa.size,bb.size);
  if(shorter<5)return false;
  const common=[...aa].filter(term=>bb.has(term)).length;
  return common>=5&&common/shorter>=0.8;
};
const equivalentPractice:Record<string,string>={
  'l-0031':'raciocinio:velocidade-media-em-trechos',
  'l-0057':'raciocinio:velocidade-media-em-trechos',
};
export const conceptKey=(q:Question)=>equivalentPractice[q.id]??`${q.category}:${q.concept?normalizeConcept(q.concept):q.id}`;
const tier=(q:Question)=>q.id.startsWith('t-')?4:q.id.startsWith('h-')||q.id.startsWith('p-')?3:2;
const completedQuestions=(p:Progress)=>p.completedIds.map(id=>questionMap.get(id)).filter((q):q is Question=>Boolean(q));
const seenConcepts=(p:Progress)=>new Set(completedQuestions(p).map(conceptKey));
const newQuestions=(p:Progress,pool:Question[])=>{
  const done=new Set(p.completedIds),prior=completedQuestions(p),seen=seenConcepts(p);
  const openedFacts=[...p.openedLessonIds,...p.learnedLessonIds]
    .map(id=>id.startsWith('lesson-')?questionMap.get(id.slice(7)):undefined)
    .filter((q):q is Question=>Boolean(q));
  return pool.filter(q=>!done.has(q.id)&&!seen.has(conceptKey(q))&&
    !prior.some(old=>old.category===q.category&&repeatsExplanation(old.fact,q.fact))&&
    !openedFacts.some(lessonSource=>lessonSource.category===q.category&&repeatsExplanation(lessonSource.fact,q.fact)));
};
/** Uso em simulados: a mesma regra de exclusão que protege o estudo diário. */
export function unseenStudyQuestions(p:Progress,pool:Question[]):Question[]{return newQuestions(p,pool);}

/** Never recycle paraphrases of previously answered concepts outside explicit review. */
export function distinctConcepts(pool:Question[],random:()=>number,size:number,initialConcepts=new Set<string>()):Question[]{
  if(size<=0)return [];
  const ordered=shuffle(pool,random).sort((a,b)=>tier(b)-tier(a));
  const out:Question[]=[],used=new Set(initialConcepts);
  for(const q of ordered){
    const key=conceptKey(q);
    if(used.has(key)||out.some(prev=>prev.category===q.category&&repeatsExplanation(prev.fact,q.fact)))continue;
    used.add(key);out.push(q);if(out.length===size)break;
  }
  return out;
}

/** Only approved, unseen concepts appear in everyday study; deliberate revision is separate. */
export function lesson(cat:CategoryId,p:Progress,random=Math.random,size=LESSON_SIZE):Question[] {
  return distinctConcepts(newQuestions(p,available(cat)),random,size);
}
export function dailyQuestions(p:Progress,random=Math.random,size=LESSON_SIZE):Question[] {
  const unseen=newQuestions(p,studyQuestions);
  if(!unseen.length)return [];
  const brazil=distinctConcepts(unseen.filter(q=>q.brazil),random,Math.min(2,size));
  const used=new Set(brazil.map(q=>q.id));
  const curiosities=distinctConcepts(unseen.filter(q=>q.id.startsWith('t-')&&!used.has(q.id)),random,Math.min(1,Math.max(0,size-brazil.length)),new Set(brazil.map(conceptKey)));
  for(const q of curiosities)used.add(q.id);
  const rest=distinctConcepts(unseen.filter(q=>!used.has(q.id)),random,Math.max(0,size-brazil.length-curiosities.length),new Set([...brazil,...curiosities].map(conceptKey)));
  return shuffle(distinctConcepts([...brazil,...curiosities,...rest],random,size),random);
}
export function questionOfDay(d=new Date()):Question {
  let hash=0;
  for(const char of localDate(d)) hash=(Math.imul(hash,31)+char.charCodeAt(0))>>>0;
  const pool=studyQuestions.filter(q=>q.brazil);
  return (pool.length?pool:studyQuestions)[hash%(pool.length||studyQuestions.length)]!;
}
export function curiosityLesson(p:Progress,random=Math.random,size=LESSON_SIZE):Question[] {
  const pool=newQuestions(p,sourcedCuriosityQuestions);
  const pref=new Set<TrackId>(p.preferredTracks.filter(t=>t!=='geral'));
  const isPreferred=(q:Question)=>(q.tracks??[]).some(t=>pref.has(t));
  const selected=distinctConcepts(pool.filter(isPreferred),random,Math.ceil(size*0.8));
  const more=distinctConcepts(pool.filter(q=>!selected.includes(q)),random,size-selected.length,new Set(selected.map(conceptKey)));
  return [...selected,...more];
}

export function mixedLesson(topicIds:readonly CategoryId[],p:Progress,random=Math.random,size=LESSON_SIZE):Question[] {
  const allowed=new Set(topicIds.length?topicIds:['brasil']);
  return distinctConcepts(newQuestions(p,studyQuestions.filter(q=>allowed.has(q.category))),random,size);
}

function sessionFrom(list:Question[],p:Progress,cat:CategoryId,mode:GameMode,random:()=>number,now:number,topics?:CategoryId[],sourceQuestionId?:string):Session|null {
  if(!list.length)return null;
  return {
    id:`${now.toString(36)}-${Math.floor(random()*0x100000000).toString(36)}-${p.answered.toString(36)}`,
    mode,category:cat,...(topics?.length?{topicIds:topics}:{}),...(sourceQuestionId?{sourceQuestionId}:{}),
    items:list.map(q=>({questionId:q.id,order:shuffle(q.choices.map((_,i)=>i),random)})),
    index:0,selected:null,revealed:false,answers:[],startedAt:now,
  };
}

/** Revisa dificuldades com casos novos, nunca reapresentando o enunciado,
 * a explicação nem uma paráfrase da definição anterior. Sem caso novo, não
 * se inventa uma rodada repetida. */
export function reviewPracticeQuestions(p:Progress,random=Math.random,size=LESSON_SIZE,now=Date.now()):Question[] {
  const due=dueReviewIds(p,new Date(now)).map(id=>questionMap.get(id)).filter((q):q is Question=>Boolean(q));
  if(!due.length)return [];
  const pool=newQuestions(p,studyQuestions);
  const related=(q:Question)=>due.reduce((best,old)=>{
    if(q.category!==old.category)return best;
    const sameConcept=q.concept&&old.concept&&normalizeConcept(q.concept)===normalizeConcept(old.concept);
    if(sameConcept)return Math.max(best,200);
    if(q.topic&&old.topic&&q.topic===old.topic)return Math.max(best,120);
    const oldTerms=keyTerms(`${old.concept??''} ${old.question} ${old.fact}`);
    const newTerms=keyTerms(`${q.concept??''} ${q.question} ${q.fact}`);
    const overlap=[...oldTerms].filter(term=>newTerms.has(term)).length;
    if(overlap>=2)return Math.max(best,50+overlap*10);
    // Nenhum quiz aleatório da disciplina é apresentado como revisão do erro.
    return best;
  },0);
  const candidates=shuffle(pool,random).filter(q=>related(q)>0).sort((a,b)=>related(b)-related(a)||tier(b)-tier(a));
  return distinctConcepts(candidates,random,size);
}

export function createSession(p:Progress,cat:CategoryId,mode:GameMode='category',random=Math.random,now=Date.now(),topicIds:readonly CategoryId[]=[],premiumEnabled=false):Session|null {
  const reviewSize=mode==='marathon'&&premiumEnabled?PREMIUM_MARATHON_SIZE:LESSON_SIZE;
  const review=reviewPracticeQuestions(p,random,reviewSize,now);
  const topics=[...new Set(topicIds)].filter(id=>questions.some(q=>q.category===id));
  const size=mode==='marathon'&&premiumEnabled?PREMIUM_MARATHON_SIZE:LESSON_SIZE;
  const list=mode==='review'?review
    :mode==='discover'?curiosityLesson(p,random,size)
    :mode==='daily'?dailyQuestions(p,random,size)
    :mode==='mixed'||mode==='marathon'?mixedLesson(topics.length?topics:[cat],p,random,size)
    :lesson(cat,p,random,size);
  return sessionFrom(list,p,cat,mode,random,now,(mode==='mixed'||mode==='marathon')?(topics.length?topics:[cat]):undefined);
}

/** O quiz de uma aula usa SOMENTE perguntas de aplicação do seu tema.
 * Não há preenchimento com questões aleatórias para chegar a cinco itens. */
export function microPracticeQuestions(p:Progress,questionId:string,random=Math.random,size=LESSON_SIZE):Question[] {
  const primary=questionMap.get(questionId);if(!primary)return [];
  const subject=normalizeConcept(primary.concept??'');
  const subjectSlug=subject.replace(/ /g,'-');
  const primaryTerms=keyTerms(`${primary.concept??''} ${primary.question} ${primary.fact}`);
  const primaryDefinition=normalizeConcept(primary.fact);
  const pool=newQuestions(p,studyQuestions.filter(q=>q.category===primary.category&&q.id!==primary.id&&
    normalizeConcept(q.fact)!==primaryDefinition&&!repeatsExplanation(q.fact,primary.fact)));
  const scored=pool.map(q=>{
    const topic=normalizeConcept(q.topic??'');
    const words=keyTerms(`${q.concept??''} ${q.topic??''} ${q.question} ${q.fact}`);
    const matching=[...words].filter(w=>primaryTerms.has(w));
    const namedSubject=subject.length>=6&&(normalizeConcept(q.concept??'').includes(subject)||normalizeConcept(q.question).includes(subject));
    const subjectTopic=(subjectSlug.length>=6&&q.topic===subjectSlug)||q.topic===`lesson:${primary.id}`;
    const sameTopic=Boolean(primary.topic&&q.topic===primary.topic);
    const score=(subjectTopic?240:0)+(namedSubject?180:0)+(sameTopic?115:0)+matching.length*12;
    return {q,score};
  }).filter(x=>x.score>=60).sort((a,b)=>b.score-a.score||tier(b.q)-tier(a.q));
  return distinctConcepts(scored.map(x=>x.q),random,size);
}


/** Opens an existing and unanswered sourced curiosity exactly as shown in the For You card. */
export function createCuriosityCardSession(p:Progress,questionId:string,random=Math.random,now=Date.now()):Session|null{
  const q=sourcedCuriosityQuestions.find(candidate=>candidate.id===questionId);
  if(!q)return null;
  const unseen=newQuestions(p,[q]);
  return sessionFrom(unseen,p,q.category,'discover',random,now);
}

export function createMicroSession(p:Progress,questionId:string,random=Math.random,now=Date.now(),skipIntro=true):Session|null {
  const primary=questionMap.get(questionId);if(!primary)return null;
  void skipIntro; // Nunca recolocar a pergunta de origem, inclusive no modo rápido.
  const result=microPracticeQuestions(p,questionId,random,LESSON_SIZE);
  return sessionFrom(result,p,primary.category,'micro',random,now,undefined,primary.id);
}

export function chooseAnswer(s:Session,choice:number):Session {
  return !s.revealed && Number.isInteger(choice) && choice>=0 && choice<(s.items[s.index]?.order.length??0) ? {...s,selected:choice} : s;
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
