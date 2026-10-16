import React from 'react';
import {Pressable,View} from 'react-native';
import type {Question} from '../types';
import {getCategory} from '../catalog';
import {CategoryArt} from './CategoryArt';
import {Icon} from './Icon';
import {Txt} from './UI';
import {C} from '../theme';

export function LearningCard({q,onPress,width=174,completed=false}:{q:Question;onPress:()=>void;width?:number;completed?:boolean}){
  const cat=getCategory(q.category);
  const n=Number(q.id.match(/(\d+)$/)?.[1]??1);
  const difficulty=n%3===0?'Difícil':n%2===0?'Médio':'Fácil';
  const diffColor=difficulty==='Fácil'?C.green:difficulty==='Médio'?C.yellow:C.pink;
  return <Pressable accessibilityRole="button" onPress={onPress} style={({pressed})=>({width,minHeight:218,borderWidth:1.6,borderColor:C.ink,borderRadius:25,
    backgroundColor:C.white,padding:14,gap:10,opacity:pressed ? .82 : 1,transform:[{scale:pressed ? .985 : 1}]})}>
    <View style={{flexDirection:'row',alignItems:'flex-start',justifyContent:'space-between',gap:6}}>
      <View style={{width:62,height:62,borderRadius:20,backgroundColor:cat.light,alignItems:'center',justifyContent:'center'}}><CategoryArt id={q.category} size={52}/></View>
      <View style={{backgroundColor:diffColor,borderRadius:16,paddingHorizontal:9,paddingVertical:5}}><Txt size={10} bold>{difficulty}</Txt></View>
    </View>
    <Txt size={16} bold style={{flex:1}} numberOfLines={4}>{q.question}</Txt>
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:8}}>
      <View style={{flexDirection:'row',alignItems:'center',gap:5,backgroundColor:C.pinkLight,borderRadius:16,paddingHorizontal:9,paddingVertical:5}}>
        <Icon name="star" size={15} color="#B24F78"/><Txt size={11} bold color="#9A456A">{completed?'Visto':'10 XP'}</Txt>
      </View>
      <Icon name="chevron" size={18} color={C.muted}/>
    </View>
  </Pressable>;
}
