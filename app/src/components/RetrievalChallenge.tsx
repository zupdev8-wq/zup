import React,{useState} from 'react';
import {Pressable,View} from 'react-native';
import {Card,Txt} from './UI';
import {Icon} from './Icon';
import {C} from '../theme';

export function RetrievalChallenge({check}:{check:{question:string;hint:string}}){
  const [visible,setVisible]=useState(false);
  return <Card color={C.blueLight} style={{gap:9}}>
    <View style={{flexDirection:'row',alignItems:'center',gap:8}}><Icon name="brain" size={21}/><Txt size={12} bold>ANTES DE CONTINUAR, PENSE</Txt></View>
    <Txt size={16} bold style={{lineHeight:24}}>{check.question}</Txt>
    <Txt size={13} color={C.muted}>Tente responder com suas palavras, sem reler o texto. Esta etapa não vale pontos.</Txt>
    <Pressable onPress={()=>setVisible(s=>!s)} accessibilityRole="button"
      accessibilityState={{expanded:visible}} accessibilityLabel={visible?'Esconder a pista':'Ver caminho de raciocínio'}
      style={({pressed})=>({minHeight:44,paddingVertical:7,flexDirection:'row',alignItems:'center',gap:8,opacity:pressed?0.7:1})}>
      <Icon name="sparkles" size={18}/><Txt size={13} bold>{visible?'Esconder a pista':'Ver caminho de raciocínio'}</Txt>
    </Pressable>
    {visible&&<View style={{padding:12,borderRadius:14,backgroundColor:C.white,gap:4}}>
      <Txt size={11} bold>PARA CONFERIR SEU RACIOCÍNIO</Txt>
      <Txt size={14} style={{lineHeight:21}}>{check.hint}</Txt>
    </View>}
  </Card>;
}
