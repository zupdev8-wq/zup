import AsyncStorage from '@react-native-async-storage/async-storage';
import type {CategoryId,TrackId} from '../types';
import {categories} from '../catalog';
import {microLessons,questionTracks,refreshLessonCatalog} from '../learning';
import {refreshQuestionCatalog} from '../game';
import {questions} from '../questions';
import {publishedBundles,registerPublishedBundle,removePublishedBundle,validManifest,validPublishedBundle} from '../liveContent';
import type {ContentManifest,PublishedBundle} from '../liveContent';

/** No account, login, or app build is required to read published content. */
const BASE=(process.env.EXPO_PUBLIC_CONTENT_URL||process.env.EXPO_PUBLIC_API_URL||'https://zup-api.onrender.com').trim().replace(/\/+$/,'');
const INDEX_KEY='zup-content-index-v1';
const CACHE_BYTES_MAX=3_000_000; // AsyncStorage Android has a small default SQLite budget.
const MAX_CACHED_CATEGORIES=7;
const RETRY_MS=5*60_000;
const CACHE_PREFIX='zup-content-v1-';
type Entry={category:CategoryId;revision:number;bytes:number;touched:number};
type Index={version:1;entries:Entry[]};
let index:Index={version:1,entries:[]};
let currentManifest:ContentManifest|null=null;
let manifestAt=0;
let lastManifestAttempt=0;
let manifestPromise:Promise<ContentManifest|null>|null=null;
let writes:Promise<void>=Promise.resolve();
let hydrated=false;
const validCategory=(v:string):v is CategoryId=>categories.some(c=>c.id===v);
const key=(c:CategoryId,rev:number)=>`${CACHE_PREFIX}${c}-${rev}`;
async function getJson(url:string,timeoutMs=9000):Promise<unknown>{
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),timeoutMs);
  try{const response=await fetch(url,{headers:{Accept:'application/json'},signal:controller.signal});
    if(!response.ok)throw new Error(`content_http_${response.status}`);
    return await response.json();
  }finally{clearTimeout(timer)}
}
const apply=(bundle:PublishedBundle):boolean=>{
  const changed=registerPublishedBundle(bundle);
  if(changed){refreshQuestionCatalog();refreshLessonCatalog();}
  return changed;
};
/** Cache corruption cannot erase the user's saved progress or stop the app. */
export async function hydrateCachedContent():Promise<boolean>{
  if(hydrated)return false;
  let changed=false;
  try{
    const raw=await AsyncStorage.getItem(INDEX_KEY);
    const candidate:unknown=raw?JSON.parse(raw):null;
    if(candidate&&typeof candidate==='object'&&'version' in candidate&&(candidate as Index).version===1&&Array.isArray((candidate as Index).entries)){
      const entries=(candidate as Index).entries.filter(e=>e&&validCategory(e.category)&&Number.isSafeInteger(e.revision)&&e.revision>0&&Number.isFinite(e.bytes));
      index={version:1,entries:entries.slice(0,MAX_CACHED_CATEGORIES)};
      for(const entry of index.entries){
        try{
          const content=await AsyncStorage.getItem(key(entry.category,entry.revision));
          const data:unknown=content?JSON.parse(content):null;
          if(validPublishedBundle(data)&&data.category===entry.category&&data.revision===entry.revision){
            if(registerPublishedBundle(data))changed=true;
          }
        }catch{/* Broken category cache falls back to packaged content. */}
      }
      if(changed){refreshQuestionCatalog();refreshLessonCatalog();}
    }
  }catch{/* Content is optional: packaged lessons remain available offline. */}
  hydrated=true;
  return changed;
}
async function fetchManifest(force=false):Promise<ContentManifest|null>{
  if(!force&&Date.now()-lastManifestAttempt<RETRY_MS)return currentManifest;
  if(manifestPromise)return manifestPromise;
  manifestPromise=(async()=>{
    lastManifestAttempt=Date.now();
    try{
      const result=await getJson(`${BASE}/v1/content/manifest`,10000);
      if(!validManifest(result))return currentManifest;
      currentManifest=result;manifestAt=Date.now();return result;
    }catch{return currentManifest;}
  })();
  try{return await manifestPromise;}finally{manifestPromise=null;}
}
function queueCacheWrite(bundle:PublishedBundle){
  writes=writes.catch(()=>{}).then(async()=>{
    const serialized=JSON.stringify(bundle),bytes=serialized.length*2;
    if(bytes>CACHE_BYTES_MAX)return; // Keep the live data without breaking other local storage.
    const item:Entry={category:bundle.category,revision:bundle.revision,bytes,touched:Date.now()};
    let remaining=index.entries.filter(e=>e.category!==bundle.category);
    remaining.push(item);
    remaining.sort((a,b)=>b.touched-a.touched);
    const removed:Entry[]=[];
    while(remaining.length>MAX_CACHED_CATEGORIES||remaining.reduce((n,e)=>n+e.bytes,0)>CACHE_BYTES_MAX){
      const evicted=remaining.pop();if(evicted)removed.push(evicted);
    }
    // Write the bundle first. A crash before the index write keeps the old index valid.
    await AsyncStorage.setItem(key(bundle.category,bundle.revision),serialized);
    const old=index.entries;
    await AsyncStorage.setItem(INDEX_KEY,JSON.stringify({version:1,entries:remaining}));
    index={version:1,entries:remaining};
    const orphans=[...old.filter(e=>e.category===bundle.category),...removed].filter(e=>!remaining.some(x=>key(x.category,x.revision)===key(e.category,e.revision)));
    if(orphans.length)await AsyncStorage.multiRemove(orphans.map(e=>key(e.category,e.revision))).catch(()=>{});
  });
  return writes.catch(()=>{});
}
async function syncUsingManifest(category:CategoryId,manifest:ContentManifest,canApply=()=>true):Promise<boolean>{
  const entry=manifest.categories.find(x=>x.category===category);
  if(!entry)return false;
  if(publishedBundles.get(category)?.revision===entry.revision)return false;
  try{
    const content=await getJson(`${BASE}/v1/content/bundles/${category}?revision=${entry.revision}`,30000);
    if(!validPublishedBundle(content)||content.category!==category||content.revision!==entry.revision||
      content.questions.length!==entry.questionCount||content.lessons.length!==entry.lessonCount)return false;
    if(!canApply())return false;
    const changed=apply(content);
    if(changed)await queueCacheWrite(content);
    return changed;
  }catch{return false;}
}
/** Prioritize the member's subjects; avoid fetching a 44-category corpus on every opening. */
export function categoriesForInterests(tracks:readonly TrackId[]):CategoryId[]{
  const interest=new Set<TrackId>(tracks.filter(t=>t!=='geral'));
  const counts=new Map<CategoryId,number>();
  for(const l of microLessons)counts.set(l.category,(counts.get(l.category)??0)+(l.tracks.some(t=>interest.has(t))?3:0));
  for(const q of questions.filter(q=>!q.id.startsWith('g-')&&!q.id.startsWith('x-'))){
    if((q.tracks??questionTracks(q)).some(t=>interest.has(t)))counts.set(q.category,(counts.get(q.category)??0)+1);
  }
  return categories.map(c=>c.id).sort((a,b)=>(counts.get(b)??0)-(counts.get(a)??0));
}
/** Called only when there is no active quiz: questions must not change mid-round. */
export async function syncPreferredContent(tracks:readonly TrackId[],onChanged:()=>void,force=false,canApply=()=>true):Promise<number>{
  await hydrateCachedContent();
  const manifest=await fetchManifest(force);if(!manifest)return 0;
  const preferred=categoriesForInterests(tracks).filter(cat=>manifest.categories.some(x=>x.category===cat));
  let count=0;
  // A small foreground prefetch. Other categories load when the student requests them.
  for(const category of preferred.slice(0,5)){
    if(!canApply())break;
    if(await syncUsingManifest(category,manifest,canApply)){count++;onChanged();}
  }
  return count;
}
/** A new category is fetched on demand; offline users fall back to the built-in questions. */
export async function syncCategoryContent(category:CategoryId,onChanged:()=>void,canApply=()=>true):Promise<boolean>{
  await hydrateCachedContent();
  const manifest=await fetchManifest();if(!manifest)return false;
  const changed=await syncUsingManifest(category,manifest,canApply);
  if(changed)onChanged();
  return changed;
}
export async function flushContentCacheForTests(){await writes;}
