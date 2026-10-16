import type {Progress} from './types';
import {normalizeProgress} from './progress';
// Never change this key without a migration: it contains the user's v1 progress.
export const STORAGE_KEY='zup-v1-progress';
export const BACKUP_KEY='zup-v1-progress-backup';
export type StorageAdapter={
  getItem(key:string):Promise<string|null>;
  setItem(key:string,value:string):Promise<void>;
  multiRemove(keys:string[]):Promise<void>;
};
function parse(raw:string):Progress {
  const parsed:unknown=JSON.parse(raw);
  if(!parsed||typeof parsed!=='object'||Array.isArray(parsed))throw new Error('invalid_snapshot');
  return normalizeProgress(parsed);
}
export class ProgressStorage {
  private tail:Promise<void>=Promise.resolve();
  private previous:string|null=null;
  constructor(private adapter:StorageAdapter){}
  async load():Promise<{progress:Progress;recovered:boolean}> {
    const raw=await this.adapter.getItem(STORAGE_KEY);
    if(raw!==null) {
      try{const progress=parse(raw);this.previous=JSON.stringify(progress);return {progress,recovered:false};}
      catch{/* Try the last successful snapshot; do not silently overwrite corruption. */}
    }
    const backup=await this.adapter.getItem(BACKUP_KEY);
    if(backup!==null) {
      try{const progress=parse(backup);this.previous=JSON.stringify(progress);return {progress,recovered:true};}
      catch{throw new Error('saved_data_unreadable');}
    }
    if(raw!==null)throw new Error('saved_data_unreadable');
    return {progress:normalizeProgress(null),recovered:false};
  }
  save(progress:Progress):Promise<void> {
    const snapshot=JSON.stringify(progress);
    const task=this.tail.catch(()=>{}).then(async()=>{
      if(this.previous!==null)await this.adapter.setItem(BACKUP_KEY,this.previous);
      await this.adapter.setItem(STORAGE_KEY,snapshot);
      this.previous=snapshot;
    });
    this.tail=task;
    return task;
  }
  clear():Promise<void> {
    const task=this.tail.catch(()=>{}).then(async()=>{
      await this.adapter.multiRemove([STORAGE_KEY,BACKUP_KEY]);
      this.previous=null;
    });
    this.tail=task;
    return task;
  }
  flush():Promise<void>{return this.tail;}
}
