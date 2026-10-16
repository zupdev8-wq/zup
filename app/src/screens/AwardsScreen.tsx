import React from 'react';
import {View} from 'react-native';
import type {Progress} from '../types';
import type {IconName} from '../components/Icon';
import {Icon} from '../components/Icon';
import {Txt,Page,Card,ProgressBar,Chip} from '../components/UI';
import {questions} from '../questions';
import {effectiveStreak} from '../game';
import {C} from '../theme';
export function AwardsScreen({p,now}:{p:Progress;now:Date}) {
  const brazil=p.completedIds.filter(id=>questions.find(q=>q.id===id)?.brazil).length;
  const badges:{id:string;title:string;description:string;icon:IconName;color:string;value:number}[]=[
    {id:'primeiro',title:'Primeira descoberta',description:'Conclua sua primeira rodada.',icon:'star',color:C.lemon,value:p.completedIds.length},
    {id:'curioso',title:'Curiosidade sem fim',description:'Conheça 25 perguntas diferentes.',icon:'search',color:C.blueLight,value:p.completedIds.length/25},
    {id:'explorador',title:'Grande explorador',description:'Conheça 75 perguntas diferentes.',icon:'globe',color:C.greenLight,value:p.completedIds.length/75},
    {id:'semana',title:'Uma semana de descobertas',description:'Jogue em 7 dias seguidos.',icon:'flame',color:C.pinkLight,value:effectiveStreak(p,now)/7},
    {id:'mestre',title:'Mestre do conhecimento',description:'Conquiste 2.000 XP.',icon:'trophy',color:C.lemon,value:p.xp/2000},
    {id:'brasil',title:'O Brasil na ponta da língua',description:'Conheça 100 perguntas brasileiras.',icon:'flag',color:C.greenLight,value:brazil/100},
    {id:'perfeito',title:'Rodada brilhante',description:'Acerte as 5 perguntas de uma rodada.',icon:'sparkles',color:C.blueLight,value:p.badges.includes('perfeito')?1:0},
    {id:'superacao',title:'Virada de jogo',description:'Zere sua lista de revisão depois de errar.',icon:'refresh',color:C.pinkLight,value:p.badges.includes('superacao')?1:0},
  ];
  return <Page><Txt size={29} bold accessibilityRole="header">Suas conquistas</Txt><Txt color={C.muted} size={14}>Cada medalha conta um pedacinho da sua jornada.</Txt>
    <Chip color={C.lemon} icon="trophy">{badges.filter(b=>p.badges.includes(b.id)).length} de {badges.length} medalhas</Chip>
    {badges.map(b=>{const won=p.badges.includes(b.id);return <Card key={b.id}>
      <View style={{flexDirection:'row',alignItems:'center',gap:14}}>
        <View style={{padding:15,borderRadius:20,backgroundColor:won?b.color:C.silver}}><Icon name={b.icon} size={29} color={won?C.ink:C.muted}/></View>
        <View style={{flex:1,gap:4}}><Txt bold>{b.title}</Txt><Txt size={13} color={C.muted}>{b.description}</Txt></View>
        {won&&<Icon name="check" color={C.success} size={21}/>}
      </View><ProgressBar value={won?1:b.value} color={won?C.green:C.yellow} label={`Conquista: ${b.title}`}/>
      <Txt size={11} bold color={won?C.success:C.muted}>{won?'CONQUISTADA':'EM DESCOBERTA'}</Txt>
    </Card>;})}
  </Page>;
}
