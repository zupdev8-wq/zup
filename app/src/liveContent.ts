import type {CategoryId,MicroLesson,Question} from './types';
import {categories} from './catalog';

export const CONTENT_SCHEMA_VERSION=1;
export type PublishedBundle={
  schemaVersion:1;revision:number;category:CategoryId;
  questions:Question[];lessons:MicroLesson[];
  retiredQuestionIds:string[];retiredLessonIds:string[];
};
export type ContentManifest={schemaVersion:1;categories:Array<{category:CategoryId;revision:number;sha256:string;questionCount:number;lessonCount:number}>};
export const publishedBundles=new Map<CategoryId,PublishedBundle>();
const knownCategories=new Set(categories.map(x=>x.id));
const validText=(value:unknown)=>typeof value==='string'&&value.length>0;
const validHttps=(source:unknown)=>{
  if(!source||typeof source!=='object')return false;
  const candidate=source as {url?:unknown;title?:unknown};
  return validText(candidate.title)&&typeof candidate.url==='string'&&/^https:\/\/\S+$/i.test(candidate.url);
};
/** Never trust a remote or corrupted cached payload as valid TypeScript. */
export function validPublishedBundle(value:unknown):value is PublishedBundle {
  if(!value||typeof value!=='object'||Array.isArray(value))return false;
  const b=value as Partial<PublishedBundle>;
  if(b.schemaVersion!==1||!Number.isSafeInteger(b.revision)||Number(b.revision)<1||!b.category||!knownCategories.has(b.category))return false;
  if(!Array.isArray(b.questions)||b.questions.length>1200||!Array.isArray(b.lessons)||b.lessons.length>250||
    !Array.isArray(b.retiredQuestionIds)||!Array.isArray(b.retiredLessonIds)||b.retiredQuestionIds.length>1200||b.retiredLessonIds.length>250)return false;
  const questionIds=new Set<string>(),lessonIds=new Set<string>();
  for(const q of b.questions){
    if(!q||q.category!==b.category||!validText(q.id)||!validText(q.question)||!validText(q.fact)||
      /^([gx]-)/.test(q.id)||!Array.isArray(q.choices)||![4,5].includes(q.choices.length)||q.choices.some(c=>!validText(c))||
      !Number.isInteger(q.answer)||q.answer<0||q.answer>=q.choices.length||!['discover','study'].includes(q.kind??'')||
      !validText(q.sourceLabel)||!validText(q.sourceLicense)||!validText(q.rightsBasis)||!Array.isArray(q.tracks)||!q.tracks.length||
      (q.source!==undefined&&!validHttps(q.source))||questionIds.has(q.id))return false;
    questionIds.add(q.id);
  }
  for(const l of b.lessons){
    if(!l||l.category!==b.category||!/^lesson-/.test(l.id)||!validText(l.title)||!validText(l.summary)||!validText(l.takeaway)||
      !validText(l.quizQuestionId)||!Array.isArray(l.body)||!l.body.length||l.body.some(s=>!validText(s))||
      !Array.isArray(l.tracks)||!l.tracks.length||!Array.isArray(l.sources)||!l.sources.length||l.sources.some(s=>!validHttps(s))||lessonIds.has(l.id))return false;
    if(l.readMore&&(!Array.isArray(l.readMore.sections)||l.readMore.sections.some(s=>!s||!validText(s.title)||!validText(s.text))))return false;
    if(l.recommendedReadings!==undefined&&(!Array.isArray(l.recommendedReadings)||l.recommendedReadings.some(r=>!r||!validText(r.title)||!validText(r.creators)||(r.url&&!/^https:\/\//i.test(r.url)))))return false;
    lessonIds.add(l.id);
  }
  return b.retiredQuestionIds.every(id=>validText(id)&&!questionIds.has(id))&&
    b.retiredLessonIds.every(id=>validText(id)&&!lessonIds.has(id));
}
export function validManifest(value:unknown):value is ContentManifest {
  if(!value||typeof value!=='object')return false;
  const m=value as Partial<ContentManifest>;
  return m.schemaVersion===1&&Array.isArray(m.categories)&&m.categories.length<=knownCategories.size&&
    new Set(m.categories.map(e=>e.category)).size===m.categories.length&&
    m.categories.every(e=>knownCategories.has(e.category)&&Number.isSafeInteger(e.revision)&&e.revision>0&&
      /^[a-f0-9]{64}$/.test(e.sha256)&&Number.isInteger(e.questionCount)&&Number.isInteger(e.lessonCount));
}
/** Registry changes first; callers then refresh question and lesson indexes together. */
export function registerPublishedBundle(bundle:PublishedBundle):boolean {
  if(!validPublishedBundle(bundle))return false;
  if(publishedBundles.get(bundle.category)?.revision===bundle.revision)return false;
  publishedBundles.set(bundle.category,bundle);
  return true;
}
export function removePublishedBundle(category:CategoryId):boolean{return publishedBundles.delete(category);}
