import {useCallback,useEffect,useRef,useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProgressStorage} from '../storage';
import {normalizeProgress} from '../progress';
import type {Progress} from '../types';
export function useProgress() {
  const store=useRef(new ProgressStorage(AsyncStorage)).current;
  const current=useRef<Progress>(normalizeProgress(null));
  const revision=useRef(0), mounted=useRef(true);
  const [progress,setProgress]=useState(current.current);
  const [loading,setLoading]=useState(true), [loadError,setLoadError]=useState(false);
  const [saveError,setSaveError]=useState(false), [saving,setSaving]=useState(false), [recovered,setRecovered]=useState(false);
  const load=useCallback(async()=>{
    setLoading(true);setLoadError(false);
    try{
      const result=await store.load();
      if(mounted.current){current.current=result.progress;setProgress(result.progress);setRecovered(result.recovered);}
    }catch{if(mounted.current)setLoadError(true);}
    finally{if(mounted.current)setLoading(false);}
  },[store]);
  useEffect(()=>{mounted.current=true;void load();return()=>{mounted.current=false;};},[load]);
  const persist=useCallback((next:Progress)=>{
    const rev=++revision.current;
    setSaving(true);
    void store.save(next).then(()=>{
      if(mounted.current&&rev===revision.current){setSaveError(false);setSaving(false);}
    }).catch(()=>{
      if(mounted.current&&rev===revision.current){setSaveError(true);setSaving(false);}
    });
  },[store]);
  const update=useCallback((change:(p:Progress)=>Progress):Progress=>{
    const previous=current.current, next=change(previous);
    if(next===previous)return previous;
    current.current=next;setProgress(next);persist(next);return next;
  },[persist]);
  const reset=useCallback(async()=>{
    ++revision.current;
    await store.clear();
    const fresh=normalizeProgress(null);
    current.current=fresh;setProgress(fresh);setLoadError(false);setSaveError(false);setRecovered(false);setSaving(false);
  },[store]);
  return {progress,current,loading,loadError,saveError,saving,recovered,update,reset,
    retry:()=>persist(current.current),reload:load,dismissRecovery:()=>setRecovered(false)};
}
