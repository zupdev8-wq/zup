import React from 'react';
import {ScrollView,View,useWindowDimensions} from 'react-native';
import {Txt,Button,FloatingCompanion} from '../components/UI';
import {CreatureArt} from '../components/CreatureArt';
import {Icon} from '../components/Icon';
import {C} from '../theme';
export function WelcomeScreen({onContinue,bottom}:{onContinue:()=>void;bottom:number}) {
  const {width}=useWindowDimensions();
  return <ScrollView contentInsetAdjustmentBehavior="never" contentContainerStyle={{flexGrow:1,alignItems:'center',justifyContent:'space-evenly',gap:18,paddingHorizontal:24,paddingTop:24,paddingBottom:bottom+24}}>
    <View style={{alignItems:'center',gap:4}}><Txt size={13} bold style={{letterSpacing:2.6}}>DESCUBRA · JOGUE · EVOLUA</Txt><View style={{flexDirection:'row',alignItems:'center',gap:5}}><Icon name="sparkles" size={22} color={C.green}/><Txt size={82} bold style={{letterSpacing:-6,lineHeight:101}}>ZUP!</Txt><Icon name="sparkles" size={23} color={C.pink}/></View><Txt size={19} bold style={{textAlign:'center'}}>Conhecimento que vira progresso.</Txt></View>
    <View style={{width:Math.min(width-48,380),height:260,alignItems:'center',justifyContent:'center'}}><View style={{position:'absolute',left:-6,bottom:9,transform:[{rotate:'-10deg'}]}}><CreatureArt id="capilu" size={118}/></View><View style={{position:'absolute',right:-8,bottom:8,transform:[{rotate:'10deg'}]}}><CreatureArt id="arumi" size={118}/></View><FloatingCompanion id="oniri" stage={0} size={210}/></View>
    <View style={{width:'100%',maxWidth:420,gap:16}}><Txt size={15} color={C.ink} style={{textAlign:'center'}}>Quizzes curtos, curiosidades do Brasil e criaturas que evoluem junto com o seu conhecimento.</Txt><Button title="Escolher minha criatura" icon="paw" onPress={onContinue}/><Txt size={11} color="#60583B" style={{textAlign:'center'}}>Centenas de perguntas e microlições para começar. Seu progresso fica com você.</Txt></View>
  </ScrollView>;
}
