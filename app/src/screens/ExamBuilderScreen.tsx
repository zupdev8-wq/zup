import React,{useMemo,useState} from 'react';
import {Pressable,TextInput,View} from 'react-native';
import type {Progress} from '../types';
import type {ExamPlan} from '../exams';
import {availableExamQuestionCount,buildExamPlan,examPresets,searchExamPresets} from '../exams';
import {getCategory} from '../catalog';
import {Txt,Page,Card,Chip,Button} from '../components/UI';
import {Icon} from '../components/Icon';
import {C} from '../theme';

type Props={p:Progress;start:(plan:ExamPlan)=>void};
export function ExamBuilderScreen({p,start}:Props){
  const [query,setQuery]=useState(''),[presetId,setPresetId]=useState<string|undefined>(),[count,setCount]=useState(45);
  const matches=useMemo(()=>searchExamPresets(query),[query]);
  const plan=useMemo(()=>buildExamPlan(query,presetId,count),[query,presetId,count]);
  const available=useMemo(()=>availableExamQuestionCount(p,plan),[p.completedIds,plan]);
  const choose=(id:string)=>{const preset=examPresets.find(x=>x.id===id);if(!preset)return;setPresetId(id);setQuery(preset.title);};
  return <Page contentContainerStyle={{paddingBottom:48,gap:16}} keyboardShouldPersistTaps="handled">
    <Card color={C.blueLight} outlined style={{gap:9}}>
      <Chip color={C.white}>SIMULADO INTELIGENTE</Chip>
      <Txt size={29} bold>Qual prova você quer treinar?</Txt>
      <Txt size={14}>Escreva banca, cidade, cargo, curso ou matérias. O ZUP seleciona questões próprias do banco e evita repetir o que você já respondeu.</Txt>
    </Card>
    <View style={{flexDirection:'row',alignItems:'center',gap:9,borderWidth:1.5,borderColor:C.ink,borderRadius:20,paddingHorizontal:14,backgroundColor:C.white}}>
      <Icon name="search" size={21}/><TextInput value={query} onChangeText={v=>{setQuery(v);setPresetId(undefined);}} placeholder="Ex.: Cebraspe Câmara de Ponta Porã cargo administrativo" placeholderTextColor={C.muted} multiline style={{flex:1,minHeight:62,maxHeight:110,fontSize:15,color:C.ink,paddingVertical:12}}/>
    </View>
    <View style={{gap:8}}><Txt size={15} bold>Sugestões</Txt>{(query?matches:examPresets.slice(0,6)).map(item=><Pressable key={item.id} onPress={()=>choose(item.id)} accessibilityRole="button"><Card outlined style={{flexDirection:'row',alignItems:'center',gap:10,padding:13,backgroundColor:presetId===item.id?C.lemon:C.white}}><Icon name="book" size={20}/><View style={{flex:1}}><Txt size={14} bold>{item.title}</Txt><Txt size={11} color={C.muted}>{item.subtitle}</Txt></View><Icon name="chevron" size={17}/></Card></Pressable>)}</View>
    <Card outlined style={{gap:12}}>
      <View><Txt size={12} bold color={C.muted}>PLANO MONTADO PELO ZUP</Txt><Txt size={20} bold>{plan.title}</Txt>{plan.banca&&<Chip color={C.yellow}>{plan.banca}</Chip>}</View>
      <View style={{flexDirection:'row',flexWrap:'wrap',gap:7}}>{plan.categories.map(id=><Chip key={id} color={getCategory(id).light}>{getCategory(id).label}</Chip>)}</View>
      <Txt size={12} color={C.muted}>{plan.note}</Txt>
      <View style={{height:1,backgroundColor:C.line}}/>
      <Txt size={14} bold>Tamanho do simulado</Txt>
      <View style={{flexDirection:'row',gap:8}}>{[20,45,60].map(n=><Pressable key={n} onPress={()=>setCount(n)} accessibilityRole="button" accessibilityState={{selected:count===n}} style={{flex:1,minHeight:48,borderRadius:16,borderWidth:1.5,borderColor:count===n?C.ink:C.line,backgroundColor:count===n?C.yellow:C.white,alignItems:'center',justifyContent:'center'}}><Txt bold>{n}</Txt></Pressable>)}</View>
      <View style={{flexDirection:'row',alignItems:'center',gap:8}}><Icon name="brain" size={19}/><Txt size={12} style={{flex:1}}>{Math.min(count,available)} questões ainda inéditas encontradas diretamente nas áreas principais; o ZUP pode completar com matérias correlatas de ENEM/concursos.</Txt></View>
    </Card>
    <Card color={C.greenLight}><View style={{flexDirection:'row',gap:10,alignItems:'flex-start'}}><Icon name="sparkles" size={23}/><View style={{flex:1}}><Txt bold>Como funciona</Txt><Txt size={13}>Cada resposta recebe uma explicação curta. Ao terminar, as questões entram no seu histórico e deixam de aparecer no jogo normal; revisão é um modo separado.</Txt></View></View></Card>
    <Button title={`Começar simulado de ${count} questões`} variant="dark" icon="play" onPress={()=>start(plan)}/>
  </Page>;
}
