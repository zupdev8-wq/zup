import React,{useMemo,useRef,useState} from 'react';
import {FlatList,ImageBackground,Pressable,ScrollView,View} from 'react-native';
import Svg,{Defs,LinearGradient,Rect,Stop} from 'react-native-svg';
import type {ViewToken} from 'react-native';
import type {Progress,GameMode,CategoryId,MicroLesson,TrackId,Question} from '../types';
import {effectiveStreak,level,questionMap,studyQuestions} from '../game';
import {buildForYouFeed} from '../learning';
import type {ForYouUnit} from '../learning';
import {tracks,getCategory,getTrack} from '../catalog';
import {companionById} from '../companions';
import {lessonPhoto,questionPhoto} from '../photos';
import {CategoryArt} from '../components/CategoryArt';
import {Txt,Chip} from '../components/UI';
import {Icon} from '../components/Icon';
import {C} from '../theme';


type Props={
  p:Progress;now:Date;topInset:number;bottomInset:number;contentEpoch?:number;
  start:(cat:CategoryId,mode?:GameMode)=>void;resume:()=>void;profile:()=>void;companions:()=>void;explore:()=>void;
  read:(lesson:MicroLesson)=>void;save:(lessonId:string)=>void;open:(lessonId:string)=>void;microQuiz:(questionId:string)=>void;curiosityQuiz:(questionId:string)=>void;
};

function TinyStat({icon,value,label}:{icon:'flame'|'star'|'bolt';value:string;label:string}){
  return <View style={{flexDirection:'row',alignItems:'center',gap:5,backgroundColor:'#07080ABF',borderRadius:17,paddingHorizontal:9,paddingVertical:6,borderWidth:1,borderColor:'#FFFFFF24'}}>
    <Icon name={icon} size={14} color={icon==='flame'?C.orange:icon==='star'?C.yellow:C.white}/><Txt size={11} bold color={C.white}>{value}</Txt><Txt size={9} color="#E9EAEE">{label}</Txt>
  </View>;
}

function FeedCard({lesson,photoUrl,p,height,topInset,bottomInset,onRead,onSave,onQuiz,now,index}:{lesson:MicroLesson;photoUrl:string;p:Progress;height:number;topInset:number;bottomInset:number;onRead:()=>void;onSave:()=>void;onQuiz:()=>void;now:Date;index:number}){
  const c=getCategory(lesson.category),saved=p.savedLessonIds.includes(lesson.id),track=getTrack(lesson.tracks[0]??'geral'),q=questionMap.get(lesson.quizQuestionId);
  const questionCard=Boolean(q)&&studyQuestions.includes(q!)&&index%5===2&&!p.completedIds.includes(lesson.quizQuestionId);
  const headline=questionCard?q!.question:lesson.title;
  const summary=questionCard?'Resolva um desafio prático: uma pergunta inédita, sem repetir a explicação da aula.':lesson.summary;
  const titleSize=headline.length>95?23:headline.length>80?25:headline.length>62?27:headline.length>42?30:34;
  const shadeId=`feedShade-${index}`;
  return <View style={{height,backgroundColor:C.ink,overflow:'hidden'}}>

    <ImageBackground source={{uri:photoUrl}} resizeMode="cover" style={{position:'absolute',left:0,right:0,top:0,bottom:0}}>
      <Svg width="100%" height="100%" style={{position:'absolute',left:0,right:0,top:0,bottom:0}} pointerEvents="none">
        <Defs>
          <LinearGradient id={shadeId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#000000" stopOpacity={0.38}/>
            <Stop offset="0.25" stopColor="#000000" stopOpacity={0.16}/>
            <Stop offset="0.46" stopColor="#000000" stopOpacity={0.18}/>
            <Stop offset="0.62" stopColor="#000000" stopOpacity={0.48}/>
            <Stop offset="0.79" stopColor="#000000" stopOpacity={0.72}/>
            <Stop offset="1" stopColor="#000000" stopOpacity={0.90}/>
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${shadeId})`}/>
      </Svg>
    </ImageBackground>

    <View style={{flex:1,paddingHorizontal:18,paddingTop:topInset+118,paddingBottom:bottomInset+12,justifyContent:'flex-end'}}>
      <View style={{alignSelf:'flex-start',marginBottom:10}}><Chip color="#08090BB8"><Txt size={11} bold color={C.white}>ZUP! • {track.shortLabel.toUpperCase()}</Txt></Chip></View>
      <View style={{flexDirection:'row',gap:7,flexWrap:'wrap',marginBottom:13}}>
        <TinyStat icon="flame" value={`${effectiveStreak(p,now)}`} label="dias"/><TinyStat icon="star" value={`${p.stars}`} label="estrelas"/><TinyStat icon="bolt" value={`${level(p.xp)}`} label="nível"/>
      </View>

      <Txt size={11} bold color="#F7F7F8" style={{letterSpacing:1.35,textShadowColor:'#000',textShadowOffset:{width:0,height:1},textShadowRadius:6}}>{questionCard?'PERGUNTA RELÂMPAGO':c.label.toUpperCase()} · {lesson.minutes} MIN</Txt>
      <Txt size={titleSize} bold color={C.white} style={{lineHeight:titleSize+6,marginTop:5,textShadowColor:'#000000E6',textShadowOffset:{width:0,height:2},textShadowRadius:10}}>{headline}</Txt>
      <View style={{backgroundColor:'#08090A80',borderRadius:17,paddingHorizontal:14,paddingVertical:11,marginTop:11,borderWidth:1,borderColor:'#FFFFFF18'}}>
        <Txt size={15} color="#F7F7F8" style={{lineHeight:21}} numberOfLines={3}>{summary}</Txt>
      </View>

      <View style={{paddingTop:15,gap:9}}>
        <Pressable onPress={questionCard?onQuiz:onRead} accessibilityRole="button" style={({pressed})=>({minHeight:56,borderRadius:22,backgroundColor:C.white,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:9,opacity:pressed?0.84:1})}>
          <Icon name={questionCard?'brain':'book'} size={20}/><Txt size={17} bold>{questionCard?'Responder e ganhar XP':`Aprender em ${lesson.minutes} min`}</Txt><Icon name="arrow" size={19}/>
        </Pressable>
        <View style={{flexDirection:'row',gap:9}}>
          <Pressable onPress={questionCard?onRead:onQuiz} accessibilityRole="button" style={{flex:1,minHeight:49,borderRadius:19,backgroundColor:'#0C0D11D9',borderWidth:1,borderColor:'#FFFFFF2C',alignItems:'center',justifyContent:'center',flexDirection:'row',gap:7}}><Icon name={questionCard?'book':'brain'} size={18} color={C.white}/><Txt size={14} bold color={C.white}>{questionCard?'Entender antes':'Jogar quiz'}</Txt></Pressable>
          <Pressable onPress={onSave} accessibilityRole="button" accessibilityLabel={saved?'Remover dos salvos':'Salvar descoberta'} style={{width:52,minHeight:49,borderRadius:19,backgroundColor:saved?C.yellow:'#FFFFFFEE',alignItems:'center',justifyContent:'center'}}><Icon name="bookmark" size={20} filled={saved}/></Pressable>
        </View>
        <View style={{alignItems:'center',gap:1,paddingTop:1}}><Icon name="chevron" size={14} color={C.white}/><Txt size={9} bold color={C.white}>DESLIZE PARA CIMA</Txt></View>
      </View>
    </View>
  </View>;
}


function CuriosityFeedCard({q,photoUrl,height,topInset,bottomInset,onQuiz,index}:{q:Question;photoUrl:string;height:number;topInset:number;bottomInset:number;onQuiz:()=>void;index:number}){
  const c=getCategory(q.category);
  const titleSize=q.question.length>95?25:q.question.length>70?29:34;
  const shadeId=`triviaShade-${index}`;
  return <View style={{height,backgroundColor:C.ink,overflow:'hidden'}}>
    <View style={{position:'absolute',top:0,bottom:0,left:0,right:0,backgroundColor:c.color,alignItems:'center',justifyContent:'center'}}><CategoryArt id={q.category} size={220}/></View>
    <ImageBackground source={{uri:photoUrl}} resizeMode="cover" style={{position:'absolute',top:0,bottom:0,left:0,right:0}}>
      <Svg width="100%" height="100%" pointerEvents="none">
        <Defs><LinearGradient id={shadeId} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#000000" stopOpacity={0.40}/>
          <Stop offset="0.35" stopColor="#000000" stopOpacity={0.20}/>
          <Stop offset="0.68" stopColor="#000000" stopOpacity={0.67}/>
          <Stop offset="1" stopColor="#000000" stopOpacity={0.92}/>
        </LinearGradient></Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${shadeId})`}/>
      </Svg>
    </ImageBackground>
    <View style={{flex:1,justifyContent:'flex-end',paddingHorizontal:18,paddingTop:topInset+118,paddingBottom:bottomInset+12}}>
      <View style={{flexDirection:'row',gap:8,flexWrap:'wrap',marginBottom:14}}>
        <Chip color="#FFFFFFE8"><Txt size={11} bold>{c.label.toUpperCase()}</Txt></Chip>
        <Chip color={C.yellow}><Txt size={11} bold>PERGUNTA COM FONTE</Txt></Chip>
      </View>
      <Txt size={11} bold color={C.white} style={{letterSpacing:1.2}}>DESCUBRA A RESPOSTA</Txt>
      <Txt size={titleSize} bold color={C.white} style={{lineHeight:titleSize+6,marginTop:8,textShadowColor:'#000000CC',textShadowOffset:{width:0,height:2},textShadowRadius:6}}>{q.question}</Txt>
      <View style={{borderRadius:18,backgroundColor:'#00000080',padding:14,marginTop:16}}>
        <Txt size={15} color={C.white}>Uma curiosidade de fonte identificada. Responda, veja a explicação e descubra mais.</Txt>
      </View>
      <Pressable onPress={onQuiz} accessibilityRole="button" style={{minHeight:57,borderRadius:22,backgroundColor:C.white,marginTop:17,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:8}}>
        <Icon name="brain" size={20}/><Txt size={17} bold>Responder pergunta</Txt><Icon name="arrow" size={18}/>
      </Pressable>
      <View style={{alignItems:'center',gap:1,paddingTop:10}}><Icon name="chevron" size={14} color={C.white}/><Txt size={9} bold color={C.white}>DESLIZE PARA CIMA</Txt></View>
    </View>
  </View>;
}

export function HomeScreen({p,now,topInset,bottomInset,contentEpoch=0,profile,read,save,open,microQuiz,curiosityQuiz}:Props) {
  const [track,setTrack]=useState<TrackId>('geral'),[height,setHeight]=useState(620);
  const feed=useMemo(()=>buildForYouFeed(p,track,now),[p.learnedLessonIds,p.preferredTracks,p.completedIds,track,now.toDateString(),contentEpoch]);
  const visualFeed=useMemo(()=>{
    const recent:string[]=[];
    return feed.map((item,index)=>{
      let photoUrl=item.kind==='lesson'?lessonPhoto(item.lesson,index):questionPhoto(item.question);
      if(item.kind==='lesson')for(let offset=1;offset<=8&&recent.includes(photoUrl);offset++)photoUrl=lessonPhoto(item.lesson,index+offset);
      recent.push(photoUrl);if(recent.length>3)recent.shift();
      return {item,photoUrl};
    });
  },[feed]);
  const visible=useRef(({viewableItems}:{viewableItems:ViewToken<{item:ForYouUnit;photoUrl:string}>[]})=>{const visible=viewableItems.find(v=>v.isViewable)?.item.item;if(visible?.kind==='lesson')open(visible.lesson.id);}).current;
  const viewability=useRef({itemVisiblePercentThreshold:72,minimumViewTime:300}).current;
  return <View style={{flex:1,backgroundColor:C.ink}} onLayout={e=>{const h=Math.round(e.nativeEvent.layout.height);if(h>300&&Math.abs(h-height)>2)setHeight(h);}}>
    <View style={{position:'absolute',left:0,right:0,top:0,zIndex:5,paddingTop:topInset+8}} pointerEvents="box-none">
      <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:11}}>
        <ScrollView horizontal directionalLockEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:7,paddingRight:74}}>
          {tracks.map(item=>{const active=track===item.id;return <Pressable key={item.id} onPress={()=>setTrack(item.id)} accessibilityRole="button" accessibilityState={{selected:active}} style={{paddingHorizontal:14,minHeight:39,borderRadius:20,backgroundColor:active?'#0A0B0DEB':'#FFFFFFEE',borderWidth:1,borderColor:active?'#FFFFFF30':'#00000014',alignItems:'center',justifyContent:'center'}}><Txt size={11} bold color={active?C.white:C.ink}>{item.shortLabel}</Txt></Pressable>;})}
        </ScrollView>
        <Pressable onPress={profile} accessibilityRole="button" accessibilityLabel="Abrir perfil" style={{position:'absolute',right:11,width:44,height:44,borderRadius:22,backgroundColor:companionById(p.companionId).pale,borderWidth:1.3,borderColor:C.ink,alignItems:'center',justifyContent:'center'}}><Icon name="paw" size={19}/></Pressable>
      </View>
    </View>
    <FlatList data={visualFeed} ListEmptyComponent={<View style={{flex:1,height:height,paddingTop:topInset+130,paddingHorizontal:30,alignItems:'center',justifyContent:'center',gap:16}}><Icon name="check" size={54} color={C.yellow}/><Txt size={28} bold color={C.white} style={{textAlign:'center'}}>Você explorou o conteúdo disponível!</Txt><Txt size={16} color={C.white} style={{textAlign:'center'}}>Para não repetir definições, o ZUP! não recicla aulas já aprendidas. Seus conteúdos salvos continuam na Biblioteca.</Txt></View>} keyExtractor={i=>i.item.kind==='lesson'?i.item.lesson.id:i.item.question.id} pagingEnabled snapToInterval={height} snapToAlignment="start" decelerationRate="fast" disableIntervalMomentum bounces={false} showsVerticalScrollIndicator={false}
      onViewableItemsChanged={visible} viewabilityConfig={viewability} getItemLayout={(_,index)=>({length:height,offset:height*index,index})} initialNumToRender={3} maxToRenderPerBatch={4} windowSize={5} removeClippedSubviews
      renderItem={({item,index})=>{
        if(item.item.kind==='lesson'){
          const lesson=item.item.lesson;
          return <FeedCard lesson={lesson} photoUrl={item.photoUrl} p={p} height={height} topInset={topInset} bottomInset={bottomInset} now={now} index={index} onRead={()=>read(lesson)} onSave={()=>save(lesson.id)} onQuiz={()=>microQuiz(lesson.quizQuestionId)}/>;
        }
        const question=item.item.question;
        return <CuriosityFeedCard q={question} photoUrl={item.photoUrl} height={height} topInset={topInset} bottomInset={bottomInset} index={index} onQuiz={()=>curiosityQuiz(question.id)}/>;
      }}/>
  </View>;
}
