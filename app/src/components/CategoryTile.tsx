import React from 'react';
import {Pressable,StyleSheet,View} from 'react-native';
import type {Category} from '../catalog';
import {questions} from '../questions';
import {CategoryArt} from './CategoryArt';
import {Txt,ProgressBar} from './UI';
import {Icon} from './Icon';
import {C} from '../theme';
export function CategoryTile({category,completed,onPress,width}:{category:Category;completed:string[];onPress:()=>void;width:number}) {
  const list=questions.filter(q=>q.category===category.id), done=new Set(completed);
  const count=list.filter(q=>done.has(q.id)).length;
  return <Pressable onPress={onPress} accessibilityRole="button"
    accessibilityLabel={`${category.label}. ${count} de ${list.length} descobertas. Começar uma lição.`}
    style={({pressed})=>[styles.card,{width,backgroundColor:category.light,opacity:pressed ? 0.8 : 1}]}>
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
      <CategoryArt id={category.id} size={82}/>
      <View style={styles.arrow}><Icon name="chevron" size={15}/></View>
    </View>
    <Txt size={18} bold>{category.label}</Txt>
    <Txt size={11} color={C.muted}>{count} de {list.length} descobertas</Txt>
    <ProgressBar value={count/list.length} color={category.color} label={`Progresso em ${category.label}`}/>
  </Pressable>;
}
const styles=StyleSheet.create({
  card:{borderRadius:23,padding:14,gap:8,minHeight:188,borderWidth:1,borderColor:'#00000004'},
  arrow:{height:29,width:29,borderRadius:15,backgroundColor:C.white,alignItems:'center',justifyContent:'center'},
});
