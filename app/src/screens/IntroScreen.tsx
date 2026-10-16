import React from 'react';
import {View} from 'react-native';
import type {CategoryId,GameMode} from '../types';
import {getCategory} from '../catalog';
import {CategoryArt} from '../components/CategoryArt';
import {Txt,Page,Chip,Card,Button} from '../components/UI';
import {Icon} from '../components/Icon';
import {C} from '../theme';
export function IntroScreen({category,mode,count,start}:{category:CategoryId;mode:GameMode;count:number;start:()=>void}) {
  const c=getCategory(category), mixed=mode==='mixed', marathon=mode==='marathon';
  return <Page contentContainerStyle={{flexGrow:1,justifyContent:'center',gap:22}}>
    <Card color={mode==='review'?C.greenLight:(mixed||marathon)?C.blueLight:c.light} outlined style={{alignItems:'center',paddingVertical:30}}>
      {mode==='review'?<Icon name="refresh" size={80} color={C.success}/>:marathon?<Icon name="bolt" size={80} color={C.ink}/>:<CategoryArt id={category} size={140}/>}      
      <Chip color={C.white}>{mode==='daily'?'DESAFIO DO DIA':mode==='review'?'REVISÃO':marathon?'MARATONA PREMIUM':mixed?'QUIZ PERSONALIZADO':c.label.toUpperCase()}</Chip>
      <Txt size={29} bold style={{textAlign:'center'}}>{mode==='review'?'Uma nova chance de aprender':mode==='daily'?'Assuntos variados sem repetir':marathon?'10 perguntas para entrar no fluxo':mixed?'Misture seus temas favoritos':c.subtitle}</Txt>
    </Card>
    <View style={{gap:14}}>
      <View style={{flexDirection:'row',alignItems:'center',gap:12}}><Icon name="book" color={C.muted}/><Txt style={{flex:1}}>{count} perguntas, uma descoberta de cada vez.</Txt></View>
      <View style={{flexDirection:'row',alignItems:'center',gap:12}}><Icon name="bolt" color="#9B7119"/><Txt style={{flex:1}}>Até {count*20+20} XP para fortalecer seu companheiro.</Txt></View>
      <View style={{flexDirection:'row',alignItems:'center',gap:12}}><Icon name="heart" color="#B95B80"/><Txt style={{flex:1}}>Sem pressão. Errar também faz parte do aprendizado.</Txt></View>
    </View>
    <Button title="Começar quiz" onPress={start}/>
  </Page>;
}
