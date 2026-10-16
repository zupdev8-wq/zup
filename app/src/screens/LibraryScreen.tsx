import React,{useMemo,useState} from 'react';
import {ImageBackground,Pressable,TextInput,View} from 'react-native';
import type {MicroLesson,Progress} from '../types';
import {lessonMap} from '../learning';
import {getCategory} from '../catalog';
import {Icon} from '../components/Icon';
import {lessonPhoto} from '../photos';
import {Txt,Page,Card,Chip} from '../components/UI';
import {C} from '../theme';

type Shelf='learned'|'saved'|'ongoing';
export function LibraryScreen({p,read}:{p:Progress;read:(lesson:MicroLesson)=>void}){
  const [search,setSearch]=useState(''),[shelf,setShelf]=useState<Shelf>('learned');
  const norm=(v:string)=>v.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const list=useMemo(()=>{
    const ids=shelf==='learned'?p.learnedLessonIds:shelf==='saved'?p.savedLessonIds:p.openedLessonIds.filter(id=>!p.learnedLessonIds.includes(id));
    return [...ids].reverse().map(id=>lessonMap.get(id)).filter((x):x is MicroLesson=>Boolean(x));
  },[shelf,p.learnedLessonIds,p.savedLessonIds,p.openedLessonIds]);
  const shown=list.filter(l=>norm(`${l.title} ${l.summary} ${getCategory(l.category).label}`).includes(norm(search)));
  return <Page contentContainerStyle={{paddingBottom:42,gap:15}}>
    <View><Txt size={28} bold accessibilityRole="header">Biblioteca</Txt><Txt size={13} color={C.muted}>O conhecimento que você encontrou não precisa desaparecer no feed.</Txt></View>
    <View style={{flexDirection:'row',padding:4,borderRadius:20,backgroundColor:C.silver,gap:4}}>
      {([['learned','Aprendidos'],['saved','Salvos'],['ongoing','Em andamento']] as const).map(([id,label])=><Pressable key={id} onPress={()=>setShelf(id)} accessibilityRole="tab" accessibilityState={{selected:shelf===id}} style={{flex:1,minHeight:42,borderRadius:16,backgroundColor:shelf===id?C.white:'transparent',alignItems:'center',justifyContent:'center'}}><Txt size={11} bold>{label}</Txt></Pressable>)}
    </View>
    <View style={{flexDirection:'row',alignItems:'center',gap:10,borderWidth:1,borderColor:C.line,borderRadius:20,backgroundColor:C.white,paddingHorizontal:14}}>
      <Icon name="search" size={19} color={C.muted}/><TextInput value={search} onChangeText={setSearch} placeholder="Buscar no que você aprendeu" placeholderTextColor={C.muted} style={{flex:1,minHeight:48,fontSize:14,color:C.ink}}/>
    </View>
    <View style={{flexDirection:'row',gap:8}}>
      <Card style={{flex:1,alignItems:'center',padding:11}}><Txt size={22} bold>{p.learnedLessonIds.length}</Txt><Txt size={9} color={C.muted}>aprendidos</Txt></Card>
      <Card style={{flex:1,alignItems:'center',padding:11}}><Txt size={22} bold>{p.savedLessonIds.length}</Txt><Txt size={9} color={C.muted}>salvos</Txt></Card>
      <Card style={{flex:1,alignItems:'center',padding:11}}><Txt size={22} bold>{p.weakIds.length}</Txt><Txt size={9} color={C.muted}>revisar</Txt></Card>
    </View>
    {!shown.length?<View style={{minHeight:420,alignItems:'center',justifyContent:'center',gap:14,paddingHorizontal:24}}><View style={{width:112,height:96,borderRadius:30,backgroundColor:C.lemon,borderWidth:1.5,borderColor:C.ink,alignItems:'center',justifyContent:'center'}}><Icon name={shelf==='saved'?'bookmark':'book'} size={47}/></View><Txt size={20} bold style={{textAlign:'center'}}>{search?'Nada encontrado':shelf==='learned'?'Seu primeiro aprendizado vai aparecer aqui':shelf==='saved'?'Salve cards do feed para ler depois':'Abra um conteúdo do feed e continue quando quiser'}</Txt><Txt size={13} color={C.muted} style={{textAlign:'center'}}>A biblioteca funciona no aparelho e acompanha seu progresso.</Txt></View>:
      <View style={{gap:10}}>{shown.map(lesson=>{const c=getCategory(lesson.category);return <Pressable key={lesson.id} onPress={()=>read(lesson)} accessibilityRole="button"><Card outlined style={{flexDirection:'row',alignItems:'center',padding:12,gap:11}}>
        <View style={{width:70,height:70,borderRadius:19,overflow:'hidden',backgroundColor:c.light}}><ImageBackground source={{uri:lessonPhoto(lesson)}} resizeMode="cover" style={{flex:1}}><View style={{flex:1,backgroundColor:'#00000018'}}/></ImageBackground></View>
        <View style={{flex:1,gap:3}}><View style={{flexDirection:'row',gap:5,alignItems:'center'}}><Txt size={9} bold color={C.muted}>{c.label.toUpperCase()}</Txt>{p.savedLessonIds.includes(lesson.id)&&<Icon name="bookmark" size={13} filled/>}</View><Txt size={15} bold numberOfLines={2}>{lesson.title}</Txt><Txt size={10} color={C.muted}>{lesson.minutes} min · {lesson.tracks.slice(0,2).join(' · ')}</Txt></View><Icon name="chevron" size={17}/>
      </Card></Pressable>})}</View>}
  </Page>;
}
