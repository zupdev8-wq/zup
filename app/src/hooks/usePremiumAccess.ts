import {useCallback,useEffect,useRef,useState} from 'react';
import {AppState} from 'react-native';
import {backendConfigured,getPremiumStatus} from '../services/backend';
import type {PremiumStatus} from '../services/backend';

const empty:PremiumStatus={active:false,plan:'free',premiumSince:null,premiumUntil:null,price:9.99,periodDays:30};
export function usePremiumAccess(nickname:string){
  const [status,setStatus]=useState<PremiumStatus>(empty),[loading,setLoading]=useState(backendConfigured()),[error,setError]=useState<string|null>(null);
  const mounted=useRef(true);
  const refresh=useCallback(async()=>{
    if(!backendConfigured()){setStatus(empty);setLoading(false);setError('api_not_configured');return empty;}
    setLoading(true);
    try{
      const next=await getPremiumStatus(nickname||'Explorador');
      if(mounted.current){setStatus(next);setError(null);}return next;
    }catch(err){if(mounted.current){setStatus(empty);setError(err instanceof Error?err.message:'network_error');}return empty;}
    finally{if(mounted.current)setLoading(false);}
  },[nickname]);
  useEffect(()=>{mounted.current=true;void refresh();const sub=AppState.addEventListener('change',s=>{if(s==='active')void refresh();});return()=>{mounted.current=false;sub.remove();};},[refresh]);
  return {status,loading,error,refresh,configured:backendConfigured()};
}
