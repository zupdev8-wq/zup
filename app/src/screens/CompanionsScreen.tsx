import React,{useState} from 'react';
import {Pressable,View,useWindowDimensions} from 'react-native';
import type {Progress,CompanionId} from '../types';
import {companions,companionById,evolution,evolutionStages} from '../companions';
import {Txt,Page,Chip,Card,Button,FloatingCompanion,ProgressBar} from '../components/UI';
import {CreatureArt} from '../components/CreatureArt';
import {Icon} from '../components/Icon';
import {C,MAX_WIDTH} from '../theme';
export function CompanionsScreen({p,onChoose,onboarding=false}:{p:Progress;onChoose:(id:CompanionId)=>void;onboarding?:boolean}) {
  const evo=evolution(p.xp),[selected,setSelected]=useState(p.companionId),[preview,setPreview]=useState<number>(evo.stage.id);
  const pet=companionById(selected),{width}=useWindowDimensions(),cardWidth=(Math.min(width,MAX_WIDTH)-52)/2;
  return <Page>
    <Txt size={28} bold accessibilityRole="header">{onboarding?'Quem vai com você?':'Seu companheiro'}</Txt>
    <Txt size={14} color={C.muted}>Quatro criaturas originais com visual colecionável. Escolha a sua e desbloqueie novas formas conforme aprende.</Txt>
    <Card color={pet.pale} outlined style={{alignItems:'center'}}>
      <Chip color={C.white} icon="paw">{evolutionStages[preview]!.label.toUpperCase()}</Chip>
      <FloatingCompanion id={selected} stage={preview} size={210} enabled={p.motion}/>
      <Txt size={30} bold>{pet.name}</Txt><Txt size={14} bold>{pet.title}</Txt>
      <Txt size={14} color={C.muted} style={{textAlign:'center'}}>{pet.description}</Txt>
      <View style={{flexDirection:'row',alignItems:'center',gap:6}}><Icon name="bolt" size={18} color={pet.accent}/><Txt size={13} bold>{pet.skill}</Txt></View>
      {preview>evo.stage.id&&<Chip color={C.white} icon="lock">PRÉVIA · NÍVEL {evolutionStages[preview]!.level}</Chip>}
    </Card>
    <View style={{flexDirection:'row',gap:7}}>
      {evolutionStages.map(stage=><Pressable key={stage.id} onPress={()=>setPreview(stage.id)} accessibilityRole="button"
        accessibilityState={{selected:preview===stage.id}} accessibilityLabel={`${stage.label}, nível ${stage.level}. ${stage.id>evo.stage.id?'Ver prévia da próxima forma':'Forma conquistada'}.`}
        style={{flex:1,minHeight:76,borderRadius:16,borderWidth:2,borderColor:preview===stage.id?pet.accent:C.line,backgroundColor:preview===stage.id?pet.pale:C.white,padding:8,alignItems:'center',gap:5}}>
        <Icon name={stage.id>evo.stage.id?'lock':'star'} size={19} color={stage.id>evo.stage.id?C.muted:pet.accent}/>
        <Txt size={10} bold style={{textAlign:'center'}}>Nível {stage.level}</Txt>
      </Pressable>)}
    </View>
    <View style={{gap:7}}>
      <ProgressBar value={evo.fraction} color={pet.color} label="Evolução real do seu companheiro"/>
      <Txt size={12} color={C.muted}>{evo.next?`Faltam ${evo.remaining} XP para a forma ${evo.next.label.toLowerCase()}.`:'Sua forma lendária já está desbloqueada.'}</Txt>
    </View>
    <Txt size={19} bold>Escolha sua criatura</Txt>
    <View style={{flexDirection:'row',flexWrap:'wrap',gap:12}}>
      {companions.map(c=><Pressable key={c.id} onPress={()=>setSelected(c.id)} accessibilityRole="button"
        accessibilityState={{selected:selected===c.id}} accessibilityLabel={`${c.name}, inspirado em ${c.animal}`}
        style={{width:cardWidth,borderRadius:22,borderWidth:2,borderColor:selected===c.id?c.accent:C.line,backgroundColor:selected===c.id?c.pale:C.white,padding:12,alignItems:'center',gap:4}}>
        <CreatureArt id={c.id} stage={evo.stage.id} size={Math.min(125,cardWidth-26)}/>
        <View style={{flexDirection:'row',alignItems:'center',gap:5}}><Txt size={18} bold>{c.name}</Txt>{selected===c.id&&<Icon name="check" size={17} color={c.accent}/>}</View>
        <Txt size={12} color={C.muted}>{c.animal}</Txt>
      </Pressable>)}
    </View>
    <Button title={onboarding?`Começar com ${pet.name}`:`Escolher ${pet.name}`} icon="paw" variant="dark" onPress={()=>onChoose(selected)}/>
    <Txt size={12} color={C.muted} style={{textAlign:'center'}}>O XP é seu: você pode trocar de companheiro sem perder a evolução. As formas de nível maior são apenas prévias até serem conquistadas.</Txt>
  </Page>;
}
