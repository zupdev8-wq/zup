import React,{useState} from 'react';
import {View,Pressable} from 'react-native';
import type {Progress,Session} from '../types';
import {questionMap,level,levelXP,sessionScore} from '../game';
import {companionById,evolution} from '../companions';
import {Txt,Page,Chip,Card,Button,ProgressBar,FloatingCompanion} from '../components/UI';
import {Icon} from '../components/Icon';
import {C} from '../theme';
export type RoundResult={session:Session;beforeXP:number;afterXP:number};
export function ResultScreen({p,result,bottom,home,again,review}:{p:Progress;result:RoundResult;bottom:number;home:()=>void;again:()=>void;review:()=>void}) {
  const [expanded,setExpanded]=useState(false),s=result.session, correct=s.answers.filter(a=>a.correct).length;
  const pet=companionById(p.companionId),evo=evolution(result.afterXP),before=evolution(result.beforeXP);
  const evolved=evo.stage.id>before.stage.id;
  const leveled=level(result.afterXP)>level(result.beforeXP);
  return <Page contentContainerStyle={{alignItems:'center',paddingTop:20,paddingBottom:bottom+24}}>
    <Chip color={C.white} icon={evolved?'paw':'sparkles'}>{evolved?'NOVA EVOLUÇÃO!':correct===s.items.length?'RODADA PERFEITA':'MAIS UMA DESCOBERTA'}</Chip>
    <FloatingCompanion id={p.companionId} stage={evo.stage.id} size={215} enabled={p.motion}/>
    <Txt size={31} bold style={{textAlign:'center'}}>{evolved?`${pet.name} evoluiu!`:correct===s.items.length?'Você brilhou!':correct?'Mandou bem!':'Aprender é uma aventura!'}</Txt>
    <Txt color={C.muted} size={15} style={{textAlign:'center'}}>{evolved?`Agora seu companheiro é ${evo.stage.label.toLowerCase()}.`:`${correct} de ${s.items.length} respostas corretas. Cada tentativa ensina algo novo.`}</Txt>
    <View style={{flexDirection:'row',alignItems:'center',gap:8,backgroundColor:C.white,paddingVertical:14,paddingHorizontal:26,borderRadius:30}}>
      <Icon name="bolt" size={28} color="#A27719"/><Txt size={29} bold>+{sessionScore(s)} XP</Txt>
    </View>
    <Card style={{alignSelf:'stretch'}}>
      <View style={{flexDirection:'row',gap:8,alignItems:'center'}}><Icon name="trophy" size={22}/>
        <Txt bold style={{flex:1}}>{leveled?'Você subiu! ':''}Nível {level(result.afterXP)}</Txt><Txt size={12} color={C.muted}>{levelXP(result.afterXP)} / 200 XP</Txt>
      </View><ProgressBar value={levelXP(result.afterXP)/200} label="Progresso do nível"/>
      <Txt size={13} color={C.muted}>{evo.next?`${evo.remaining} XP até a próxima forma de ${pet.name}.`:`${pet.name} chegou à forma lendária.`}</Txt>
    </Card>
    <View style={{alignSelf:'stretch',gap:10}}>
      <Button title="Continuar minha jornada" variant="dark" onPress={home}/>
      {p.weakIds.length>0&&<Button title="Treinar o que errei" variant="outline" icon="refresh" onPress={review}/>}
      <Pressable onPress={again} accessibilityRole="button" style={{minHeight:48,justifyContent:'center',alignItems:'center'}}><Txt bold color={C.muted} size={14}>Mais uma rodada</Txt></Pressable>
    </View>
    <Pressable onPress={()=>setExpanded(v=>!v)} accessibilityRole="button" accessibilityState={{expanded}}
      style={{alignSelf:'stretch',minHeight:50,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
      <Txt bold>Conferir meu desempenho</Txt><Icon name={expanded?'close':'book'} size={20}/>
    </Pressable>
    {expanded&&s.answers.map(a=>{const q=questionMap.get(a.questionId);if(!q)return null;return <Card key={a.questionId} style={{alignSelf:'stretch'}}>
      <View style={{flexDirection:'row',gap:8}}><Icon name={a.correct?'check':'book'} color={a.correct?C.success:C.muted} size={20}/><Txt bold size={15} style={{flex:1}}>{q.question}</Txt></View>
      <Txt size={14} color={C.muted}>{a.correct?'Resolvida corretamente.':'Resposta adequada:'}</Txt>{!a.correct&&<Txt bold size={14}>{q.choices[q.answer]}</Txt>}
    </Card>;})}
  </Page>;
}
