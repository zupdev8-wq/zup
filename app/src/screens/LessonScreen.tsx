import React,{useState} from 'react';
import {ImageBackground,Pressable,View} from 'react-native';
import type {MicroLesson,Progress} from '../types';
import {getCategory,getTrack} from '../catalog';
import {lessonPhoto} from '../photos';
import {Txt,Page,Card,Chip} from '../components/UI';
import {Icon} from '../components/Icon';
import {openHTTPS} from '../links';
import {C} from '../theme';
import {microPracticeQuestions} from '../game';
import {RecommendedReadings} from '../components/RecommendedReadings';
import {RetrievalChallenge} from '../components/RetrievalChallenge';

export function LessonScreen({lesson,p,complete,save,quiz}:{lesson:MicroLesson;p:Progress;complete:()=>void;save:()=>void;quiz:()=>void}){
  const c=getCategory(lesson.category),learned=p.learnedLessonIds.includes(lesson.id),saved=p.savedLessonIds.includes(lesson.id);
  const [expanded,setExpanded]=useState(false);
  const availableQuestions=microPracticeQuestions(p,lesson.quizQuestionId,()=>0.37).length;
  const extraParagraphs=lesson.body.slice(1);
  const hasReadMore=extraParagraphs.length>0||Boolean(lesson.example)||Boolean(lesson.comparison)||Boolean(lesson.readMore?.sections.length)||Boolean(lesson.recommendedReadings?.length)||Boolean(lesson.selfCheck);
  return <Page contentContainerStyle={{paddingBottom:46,gap:16}}>
    <View style={{height:230,borderRadius:28,overflow:'hidden',backgroundColor:c.light}}>
      <ImageBackground source={{uri:lessonPhoto(lesson)}} resizeMode="cover" style={{flex:1,justifyContent:'flex-end'}}>
        <View style={{position:'absolute',left:0,right:0,bottom:0,height:'68%',backgroundColor:'#0000008A'}}/>
        <View style={{padding:17,gap:8}}>
          <View style={{flexDirection:'row',gap:7,flexWrap:'wrap'}}><Chip color="#FFFFFFE8">{c.label.toUpperCase()}</Chip>{lesson.tracks.slice(0,2).map(t=><Chip key={t} color="#FFFFFFE8">{getTrack(t).shortLabel.toUpperCase()}</Chip>)}</View>
          <Txt size={29} bold color={C.white} style={{lineHeight:34,textShadowColor:'#000',textShadowOffset:{width:0,height:1},textShadowRadius:7}}>{lesson.title}</Txt>
        </View>
      </ImageBackground>
    </View>

    <Card color={C.white} outlined style={{gap:8}}>
      <View style={{flexDirection:'row',alignItems:'center',gap:8}}><Icon name="sparkles" size={21}/><Txt size={12} bold color={C.muted}>ENTENDA RÁPIDO · {lesson.minutes} MIN</Txt></View>
      <Txt size={19} bold>{lesson.summary}</Txt>
      {!!lesson.hook&&lesson.hook.trim()!==lesson.summary.trim()&&<Txt size={14} color="#50525A">{lesson.hook}</Txt>}
    </Card>

    <View style={{gap:13}}>
      <Txt size={11} bold color={C.muted}>{lesson.bodyLabel??'ENTENDA MELHOR'}</Txt>
      {lesson.body.slice(0,1).map((pgh,i)=><Txt key={i} size={16} style={{lineHeight:25}}>{pgh}</Txt>)}
    </View>

    {hasReadMore&&<View style={{gap:12}}>
      <Pressable onPress={()=>setExpanded(current=>!current)} accessibilityRole="button" accessibilityLabel={expanded?'Mostrar menos conteúdo':'Ler mais sobre este assunto'} accessibilityState={{expanded}}
        style={({pressed})=>({minHeight:67,borderWidth:1.6,borderColor:C.ink,borderRadius:21,backgroundColor:expanded?C.blueLight:C.white,paddingHorizontal:17,paddingVertical:12,flexDirection:'row',alignItems:'center',gap:12,opacity:pressed?0.83:1})}>
        <View style={{width:40,height:40,borderRadius:13,backgroundColor:C.yellow,alignItems:'center',justifyContent:'center'}}><Icon name="book" size={22}/></View>
        <View style={{flex:1,gap:4}}>
          <Txt size={16} bold>{expanded?'Mostrar menos':'Ler mais'}</Txt>
          <Txt size={12} color={C.muted}>{expanded?'Voltar à leitura rápida':'Exemplos, atividades e leituras recomendadas'}</Txt>
        </View>
        <View style={{transform:[{rotate:expanded?'270deg':'90deg'}]}}><Icon name="chevron" size={21}/></View>
      </Pressable>
      {expanded&&<View style={{gap:16,paddingHorizontal:3}}>
        {extraParagraphs.map((pgh,i)=><Txt key={`mais-${i}`} size={15} style={{lineHeight:24}}>{pgh}</Txt>)}
        {lesson.readMore&&<View style={{gap:13}}>
          <Txt size={18} bold>{lesson.readMore.heading}</Txt>
          {lesson.readMore.sections.map((section,i)=><View key={`${i}-${section.title}`} style={{gap:5}}>
            <Txt size={15} bold>{section.title}</Txt>
            <Txt size={15} style={{lineHeight:24}}>{section.text}</Txt>
          </View>)}
        </View>}
        {!!lesson.example&&<Card color={C.blueLight} outlined style={{gap:7}}>
          <View style={{flexDirection:'row',alignItems:'center',gap:8}}><Icon name="sparkles" size={21}/><Txt size={11} bold>EXEMPLO NA PRÁTICA</Txt></View>
          <Txt size={15} style={{lineHeight:24}}>{lesson.example}</Txt>
        </Card>}
        {!!lesson.comparison&&<View style={{gap:7,paddingHorizontal:4}}>
          <Txt size={11} bold color={C.muted}>NÃO CONFUNDA</Txt>
          <Txt size={15} style={{lineHeight:24}}>{lesson.comparison}</Txt>
        </View>}
        {lesson.selfCheck&&<RetrievalChallenge check={lesson.selfCheck}/>}
        {!!lesson.recommendedReadings?.length&&<RecommendedReadings readings={lesson.recommendedReadings}/>}
      </View>}
    </View>}

    <Card color={C.lemon} outlined><View style={{flexDirection:'row',alignItems:'flex-start',gap:10}}><Icon name="brain" size={25}/><View style={{flex:1,gap:5}}><Txt size={11} bold>{lesson.takeawayLabel??'IDEIA QUE VALE GUARDAR'}</Txt><Txt size={16} bold>{lesson.takeaway}</Txt></View></View></Card>

    <Pressable onPress={quiz} disabled={!availableQuestions} accessibilityRole="button" accessibilityState={{disabled:!availableQuestions}} style={({pressed})=>({minHeight:68,borderRadius:23,backgroundColor:C.ink,paddingHorizontal:17,flexDirection:'row',alignItems:'center',gap:12,opacity:!availableQuestions?0.55:pressed?0.85:1})}>
      <View style={{width:42,height:42,borderRadius:14,backgroundColor:C.yellow,alignItems:'center',justifyContent:'center'}}><Icon name="brain" size={22}/></View>
      <View style={{flex:1}}><Txt size={17} bold color={C.white}>{availableQuestions?`Jogar ${availableQuestions} pergunta${availableQuestions>1?'s':''}`:'Novas perguntas em preparação'}</Txt><Txt size={11} color="#D8DADE">Apenas desafios inéditos deste tema, sem repetir definições ou justificativas.</Txt></View><Icon name="arrow" size={20} color={C.white}/>
    </Pressable>

    <View style={{flexDirection:'row',gap:9}}>
      <Pressable onPress={save} accessibilityRole="button" style={{flex:1,minHeight:52,borderRadius:18,borderWidth:1,borderColor:C.line,backgroundColor:saved?C.yellow:C.white,alignItems:'center',justifyContent:'center',flexDirection:'row',gap:7}}><Icon name="bookmark" size={18} filled={saved}/><Txt size={13} bold>{saved?'Salvo':'Salvar'}</Txt></Pressable>
      <Pressable disabled={learned} onPress={complete} accessibilityRole="button" accessibilityState={{disabled:learned}} style={{flex:1,minHeight:52,borderRadius:18,borderWidth:1,borderColor:C.line,backgroundColor:learned?C.greenLight:C.white,alignItems:'center',justifyContent:'center',flexDirection:'row',gap:7,opacity:learned?0.8:1}}><Icon name={learned?'check':'star'} size={18}/><Txt size={12} bold style={{textAlign:'center'}}>{learned?'Já aprendido':'Marcar aprendido'}</Txt></Pressable>
    </View>

    {lesson.sources.length>0&&<View style={{gap:9}}><Txt size={16} bold>Fontes</Txt>{lesson.sources.map((s,i)=><Pressable key={`${s.url}-${i}`} onPress={()=>void openHTTPS(s.url)} accessibilityRole="link" style={{minHeight:50,borderRadius:17,borderWidth:1,borderColor:C.line,backgroundColor:C.white,paddingHorizontal:14,flexDirection:'row',alignItems:'center',gap:10}}><Icon name="external" size={18}/><Txt size={13} bold style={{flex:1}}>{s.title}</Txt></Pressable>)}</View>}
    {!lesson.evergreen&&<Txt size={11} color={C.muted}>Conteúdo atualizado em {lesson.updatedAt}. Em temas de atualidades, confira as fontes antes de usar como referência.</Txt>}
  </Page>;
}
