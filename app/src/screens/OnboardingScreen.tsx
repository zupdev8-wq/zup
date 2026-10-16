import React,{useState} from 'react';
import {Pressable,TextInput,View} from 'react-native';
import type {CompanionId,Progress,TrackId} from '../types';
import {tracks} from '../catalog';
import {companions,companionById} from '../companions';
import {CreatureArt} from '../components/CreatureArt';
import {Txt,Page,Button,Card,Chip} from '../components/UI';
import {Icon} from '../components/Icon';
import {C} from '../theme';

type Props={p:Progress;finish:(settings:{nickname:string;tracks:TrackId[];companionId:CompanionId;dailyGoal:number})=>void};
export function OnboardingScreen({p,finish}:Props){
  const [step,setStep]=useState(0),[selected,setSelected]=useState<TrackId[]>(p.preferredTracks),[companionId,setCompanion]=useState<CompanionId>(p.companionId),[dailyGoal,setDailyGoal]=useState(p.dailyGoal),[nickname,setNickname]=useState(p.nickname==='Explorador'?'':p.nickname);
  const focus=tracks.filter(t=>['brasil','brasil-vivido','geopolitica','enem','concursos','faculdade','humanas','exatas','biologicas','revalida','entretenimento','religioes','pensamento'].includes(t.id));
  const toggle=(id:TrackId)=>setSelected(prev=>prev.includes(id)?(prev.length===1?prev:prev.filter(x=>x!==id)):[...prev,id]);
  const pet=companionById(companionId);
  return <Page contentContainerStyle={{flexGrow:1,justifyContent:'space-between',paddingTop:18,paddingBottom:30,gap:18}}>
    <View style={{flexDirection:'row',alignItems:'center',gap:8}}><Txt size={29} bold style={{flex:1}}>ZUP!</Txt><Txt size={11} bold color={C.muted}>{step+1}/4</Txt></View>
    <View style={{height:6,borderRadius:6,backgroundColor:'#FFFFFF80',overflow:'hidden'}}><View style={{height:'100%',width:`${(step+1)*25}%`,backgroundColor:C.ink,borderRadius:6}}/></View>
    {step===0&&<View style={{flex:1,justifyContent:'center',gap:18}}><View style={{alignSelf:'center',width:220,height:220,borderRadius:110,backgroundColor:'#FFFFFF66',alignItems:'center',justifyContent:'center'}}><CreatureArt id="oniri" size={200}/></View><View style={{gap:8}}><Txt size={34} bold>Troque o scroll vazio por repertório.</Txt><Txt size={17}>Brasil, ENEM, concursos, faculdade, geopolítica, ciência, livros, religiões e entretenimento em um feed rápido, gamificado e gratuito.</Txt></View><Card color={C.white}><View style={{flexDirection:'row',gap:10,alignItems:'center'}}><Icon name="sparkles" size={24}/><Txt size={14} style={{flex:1}}>Deslize para aprender. Faça quizzes para provar que lembrou. O ZUP traz de volta o que você estiver prestes a esquecer.</Txt></View></Card></View>}
    {step===1&&<View style={{flex:1,gap:15}}><View><Txt size={30} bold>O que você quer aprender?</Txt><Txt size={14} color={C.muted}>Escolha pelo menos um. Isso só organiza o feed; todo o conteúdo continua disponível.</Txt></View><View style={{gap:10}}>{focus.map(t=>{const active=selected.includes(t.id);return <Pressable key={t.id} onPress={()=>toggle(t.id)} accessibilityRole="checkbox" accessibilityState={{checked:active}} style={{minHeight:67,borderRadius:21,borderWidth:1.5,borderColor:active?C.ink:C.line,backgroundColor:active?t.light:C.white,paddingHorizontal:14,flexDirection:'row',alignItems:'center',gap:11}}><View style={{width:34,height:34,borderRadius:17,backgroundColor:t.color,alignItems:'center',justifyContent:'center'}}>{active?<Icon name="check" size={18}/>:<Icon name="sparkles" size={17}/>}</View><View style={{flex:1}}><Txt size={16} bold>{t.label}</Txt><Txt size={11} color={C.muted}>{t.description}</Txt></View></Pressable>})}</View></View>}
    {step===2&&<View style={{flex:1,gap:14}}><View><Txt size={30} bold>Escolha seu companheiro.</Txt><Txt size={14} color={C.muted}>Ele evolui com seu XP. É só uma camada divertida do jogo — seu desempenho depende de você.</Txt></View><Card color={pet.pale} outlined style={{alignItems:'center',padding:12}}><CreatureArt id={companionId} size={175}/><Txt size={25} bold>{pet.name}</Txt><Txt size={12} color={C.muted}>{pet.title}</Txt></Card><View style={{flexDirection:'row',flexWrap:'wrap',gap:9}}>{companions.map(c=><Pressable key={c.id} onPress={()=>setCompanion(c.id)} accessibilityRole="button" accessibilityState={{selected:c.id===companionId}} style={{width:'48%',borderRadius:20,borderWidth:1.5,borderColor:c.id===companionId?C.ink:C.line,backgroundColor:c.id===companionId?c.pale:C.white,alignItems:'center',padding:8}}><CreatureArt id={c.id} size={96}/><Txt bold>{c.name}</Txt></Pressable>)}</View></View>}
    {step===3&&<View style={{flex:1,gap:18}}><View><Txt size={30} bold>Quanto cabe no seu dia?</Txt><Txt size={14} color={C.muted}>Uma sessão curta já conta. A meta existe para criar hábito, não culpa.</Txt></View><View style={{flexDirection:'row',gap:9}}>{[3,5,10].map(goal=><Pressable key={goal} onPress={()=>setDailyGoal(goal)} accessibilityRole="button" accessibilityState={{selected:dailyGoal===goal}} style={{flex:1,minHeight:92,borderRadius:22,borderWidth:1.5,borderColor:dailyGoal===goal?C.ink:C.line,backgroundColor:dailyGoal===goal?C.yellow:C.white,alignItems:'center',justifyContent:'center',gap:2}}><Txt size={28} bold>{goal}</Txt><Txt size={11}>por dia</Txt></Pressable>)}</View><Card><Txt size={14} bold>Como quer aparecer no jogo?</Txt><TextInput value={nickname} onChangeText={setNickname} maxLength={18} placeholder="Seu apelido (opcional)" placeholderTextColor={C.muted} style={{minHeight:54,borderWidth:1,borderColor:C.line,borderRadius:17,paddingHorizontal:14,fontSize:16,color:C.ink}}/><View style={{flexDirection:'row',gap:6,flexWrap:'wrap'}}>{selected.slice(0,4).map(t=><Chip key={t} color={tracks.find(x=>x.id===t)?.light}>{tracks.find(x=>x.id===t)?.shortLabel}</Chip>)}</View></Card></View>}
    <View style={{gap:9}}>
      {step<3 ? (
        <Button title={step===0?'Quero aprender jogando':'Continuar'} onPress={()=>setStep(s=>Math.min(3,s+1))}/>
      ) : (
        <Button title="Entrar no ZUP!" variant="dark" icon="play" onPress={()=>finish({nickname:nickname.replace(/[\u0000-\u001f\u007f]/g,'').trim()||'Explorador',tracks:selected,companionId,dailyGoal})}/>
      )}
      {step>0 && (
        <Pressable onPress={()=>setStep(s=>Math.max(0,s-1))} accessibilityRole="button" style={{minHeight:42,alignItems:'center',justifyContent:'center'}}>
          <Txt size={12} bold color={C.muted}>Voltar</Txt>
        </Pressable>
      )}
    </View>
  </Page>;
}
