import React,{useState} from 'react';
import {Alert,Pressable,Switch,TextInput,View} from 'react-native';
import type {Progress,TrackId} from '../types';
import {companionById,evolution} from '../companions';
import {dueReviewIds,effectiveStreak,level,levelXP} from '../game';
import {masteryForTrack} from '../learning';
import {tracks} from '../catalog';
import {Txt,Page,Card,Button,FloatingCompanion,ProgressBar,Chip} from '../components/UI';
import {Icon} from '../components/Icon';
import {C} from '../theme';

type Props={p:Progress;premiumActive:boolean;premiumUntil:string|null;update:(change:(p:Progress)=>Progress)=>Progress;companions:()=>void;premium:()=>void;about:()=>void;reset:()=>void;now:Date;awards?:()=>void;buyFreeze:()=>void};
export function ProfileScreen({p,premiumActive,premiumUntil,update,companions,premium,about,reset,now,awards,buyFreeze}:Props) {
  const [name,setName]=useState(p.nickname),[saved,setSaved]=useState(false);
  const pet=companionById(p.companionId),evo=evolution(p.xp),accuracy=p.answered?Math.round(p.correct/p.answered*100):0,due=dueReviewIds(p,now).length;
  const keyTracks=tracks.filter(t=>['brasil','brasil-vivido','geopolitica','enem','concursos','faculdade','humanas','exatas','biologicas','revalida','entretenimento','religioes','pensamento'].includes(t.id));
  const toggleTrack=(id:TrackId)=>update(prev=>{const has=prev.preferredTracks.includes(id);if(has&&prev.preferredTracks.length===1)return prev;return {...prev,preferredTracks:has?prev.preferredTracks.filter(x=>x!==id):[...prev.preferredTracks,id]};});
  return <Page keyboardDismissMode="on-drag" contentContainerStyle={{paddingBottom:44,gap:16}}>
    <View><Txt size={28} bold accessibilityRole="header">Perfil</Txt><Txt size={13} color={C.muted}>Seu conhecimento vira nível, coleção e memória de longo prazo.</Txt></View>
    <Card color={pet.pale} outlined style={{padding:16}}>
      <View style={{flexDirection:'row',alignItems:'center',gap:12}}><View style={{width:112,height:112,alignItems:'center',justifyContent:'center'}}><FloatingCompanion id={p.companionId} stage={evo.stage.id} size={112} enabled={p.motion}/></View><View style={{flex:1,gap:3}}><Chip color={C.white} icon="bolt">NÍVEL {level(p.xp)}</Chip><Txt size={25} bold>{p.nickname}</Txt><Txt size={12} color={C.muted}>{pet.name} · {evo.stage.label}</Txt><Txt size={11} bold>{p.xp} XP · {p.stars} ★</Txt></View></View>
      <ProgressBar value={levelXP(p.xp)/200} label="Progresso do nível" color={pet.color}/><Button title="Ver evolução do companheiro" variant="outline" icon="paw" onPress={companions}/>
    </Card>

    <Pressable onPress={premium} accessibilityRole="button">
      <Card color={premiumActive?C.greenLight:C.lemon} outlined style={{flexDirection:'row',alignItems:'center',gap:12}}>
        <View style={{width:50,height:50,borderRadius:17,backgroundColor:C.ink,alignItems:'center',justifyContent:'center'}}><Icon name="star" size={24} color={C.yellow} filled/></View>
        <View style={{flex:1}}><Chip color={C.white}>{premiumActive?'PREMIUM ATIVO':'ZUP! PREMIUM'}</Chip><Txt size={17} bold>{premiumActive?'Simulados e extras liberados':'Conheça o modo Premium'}</Txt><Txt size={11} color={C.muted}>{premiumActive&&premiumUntil?`Acesso até ${new Date(premiumUntil).toLocaleDateString('pt-BR')}.`:'R$ 9,99 libera 30 dias.'}</Txt></View><Icon name="chevron" size={18}/>
      </Card>
    </Pressable>

    <View style={{flexDirection:'row',gap:8}}>{[[`${effectiveStreak(p,now)}`,'sequência'],[`${accuracy}%`,'acertos'],[`${due}`,'revisões']].map(([value,label])=><View key={label} style={{flex:1,paddingVertical:14,paddingHorizontal:6,borderWidth:1,borderColor:C.line,backgroundColor:C.white,borderRadius:20,alignItems:'center'}}><Txt size={22} bold>{value}</Txt><Txt size={9} color={C.muted}>{label}</Txt></View>)}</View>

    <Card outlined>
      <View style={{flexDirection:'row',alignItems:'center',gap:10}}><View style={{width:44,height:44,borderRadius:14,backgroundColor:C.yellow,alignItems:'center',justifyContent:'center'}}><Icon name="star" size={23} filled/></View><View style={{flex:1}}><Txt bold>Loja de estrelas</Txt><Txt size={12} color={C.muted}>As estrelas são conquistadas jogando e viram recompensas dentro do app.</Txt></View><Txt size={16} bold>{p.stars} ★</Txt></View>
      <View style={{height:1,backgroundColor:C.line}}/>
      <View style={{flexDirection:'row',alignItems:'center',gap:10}}><View style={{flex:1}}><Txt size={14} bold>Proteção de sequência</Txt><Txt size={11} color={C.muted}>Protege um dia perdido. Máximo: 3 · Você tem {p.streakFreezes}.</Txt></View><Pressable disabled={p.stars<60||p.streakFreezes>=3} onPress={()=>{const before=p.streakFreezes;buyFreeze();if(before<3&&p.stars>=60)Alert.alert('Proteção adicionada','Ela será usada automaticamente quando puder salvar sua sequência.');}} accessibilityRole="button" style={{paddingHorizontal:13,minHeight:42,borderRadius:16,backgroundColor:p.stars>=60&&p.streakFreezes<3?C.yellow:C.silver,alignItems:'center',justifyContent:'center'}}><Txt size={12} bold>60 ★</Txt></Pressable></View>
    </Card>

    <Card><Txt size={17} bold>Meta diária</Txt><Txt size={12} color={C.muted}>Aprendizados no feed e quizzes contam para a meta.</Txt><View style={{flexDirection:'row',gap:8}}>{[3,5,10].map(goal=><Pressable key={goal} onPress={()=>update(prev=>({...prev,dailyGoal:goal}))} accessibilityRole="button" accessibilityState={{selected:p.dailyGoal===goal}} style={{flex:1,minHeight:48,borderRadius:16,borderWidth:1.5,borderColor:p.dailyGoal===goal?C.ink:C.line,backgroundColor:p.dailyGoal===goal?C.lemon:C.white,alignItems:'center',justifyContent:'center'}}><Txt bold>{goal}/dia</Txt></Pressable>)}</View></Card>

    <Card><Txt size={17} bold>O que quero ver mais</Txt><Txt size={12} color={C.muted}>Isso reorganiza o feed sem esconder os outros assuntos.</Txt><View style={{flexDirection:'row',flexWrap:'wrap',gap:8}}>{keyTracks.map(t=>{const active=p.preferredTracks.includes(t.id);return <Pressable key={t.id} onPress={()=>toggleTrack(t.id)} accessibilityRole="checkbox" accessibilityState={{checked:active}} style={{paddingHorizontal:12,minHeight:40,borderRadius:18,borderWidth:1,borderColor:active?C.ink:C.line,backgroundColor:active?t.light:C.white,flexDirection:'row',alignItems:'center',gap:6}}>{active&&<Icon name="check" size={14}/>}<Txt size={12} bold>{t.shortLabel}</Txt></Pressable>})}</View></Card>

    <Card><Txt size={17} bold>Mapa de conhecimento</Txt>{keyTracks.map(t=>{const m=masteryForTrack(p,t.id);return <View key={t.id} style={{gap:5}}><View style={{flexDirection:'row'}}><Txt size={12} bold style={{flex:1}}>{t.label}</Txt><Txt size={11} color={C.muted}>{m.done}/{m.total}</Txt></View><ProgressBar value={m.fraction} label={`Domínio em ${t.label}`} color={t.color}/></View>})}</Card>

    {awards&&<Pressable onPress={awards} accessibilityRole="button"><Card outlined style={{flexDirection:'row',alignItems:'center'}}><View style={{width:48,height:48,borderRadius:16,backgroundColor:C.yellow,alignItems:'center',justifyContent:'center'}}><Icon name="trophy" size={24}/></View><View style={{flex:1}}><Txt bold>Conquistas</Txt><Txt size={12} color={C.muted}>{p.badges.length} medalha{p.badges.length===1?'':'s'} desbloqueada{p.badges.length===1?'':'s'}</Txt></View><Icon name="chevron" size={18}/></Card></Pressable>}
    <Card><Txt bold>Seu apelido</Txt><TextInput value={name} onChangeText={v=>{setName(v);setSaved(false);}} accessibilityLabel="Seu apelido" maxLength={18} autoCorrect={false} placeholder="Como quer ser chamado?" placeholderTextColor={C.muted} returnKeyType="done" style={{minHeight:54,borderWidth:1,borderColor:C.line,borderRadius:16,fontSize:16,padding:14,color:C.ink}}/><Button title="Salvar apelido" variant="outline" icon="check" onPress={()=>{update(prev=>({...prev,nickname:name.replace(/[\u0000-\u001f\u007f]/g,'').trim()||'Explorador'}));setSaved(true);}}/>{saved&&<Txt size={12} color={C.success} accessibilityLiveRegion="polite">Apelido atualizado.</Txt>}</Card>
    <Card><View style={{flexDirection:'row',alignItems:'center',gap:14}}><Icon name="volume" size={24}/><View style={{flex:1,gap:3}}><Txt bold>Vibrações</Txt><Txt size={12} color={C.muted}>Retorno tátil durante o jogo.</Txt></View><Switch value={p.sound} onValueChange={sound=>{update(prev=>({...prev,sound}));}} accessibilityLabel="Vibrações" trackColor={{false:'#CCD0D6',true:C.green}} thumbColor={C.white}/></View><View style={{height:1,backgroundColor:C.line,marginVertical:3}}/><View style={{flexDirection:'row',alignItems:'center',gap:14}}><Icon name="sparkles" size={24}/><View style={{flex:1,gap:3}}><Txt bold>Animações</Txt><Txt size={12} color={C.muted}>Movimento suave dos companheiros.</Txt></View><Switch value={p.motion} onValueChange={motion=>{update(prev=>({...prev,motion}));}} accessibilityLabel="Animações" trackColor={{false:'#CCD0D6',true:C.green}} thumbColor={C.white}/></View></Card>
    <Pressable onPress={about} accessibilityRole="button" style={{minHeight:54,flexDirection:'row',alignItems:'center',gap:12,paddingHorizontal:12}}><Icon name="info" size={23}/><Txt bold style={{flex:1}}>Sobre, fontes, privacidade e suporte</Txt><Icon name="chevron" size={18}/></Pressable>
    <Pressable onPress={reset} accessibilityRole="button" style={{minHeight:54,flexDirection:'row',alignItems:'center',gap:12,paddingHorizontal:12}}><Icon name="trash" size={23} color={C.red}/><Txt bold color={C.red}>Apagar meus dados locais</Txt></Pressable>
    <Txt color={C.muted} size={12} style={{textAlign:'center'}}>ZUP! 1.7.0 · feed de conhecimento, jogo e repertório.</Txt>
  </Page>;
}
