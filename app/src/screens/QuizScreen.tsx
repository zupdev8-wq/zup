import React,{useEffect,useState} from 'react';
import {ImageBackground,View,Pressable,ScrollView,StyleSheet} from 'react-native';
import type {Session} from '../types';
import {questionMap} from '../game';
import {getCategory} from '../catalog';
import {CategoryArt} from '../components/CategoryArt';
import {questionPhoto} from '../photos';
import {Txt,Chip,Button,IconButton} from '../components/UI';
import {Icon} from '../components/Icon';
import {openHTTPS,reportQuestion} from '../links';
import {C,MAX_WIDTH} from '../theme';

export function QuizScreen({session,bottom,select,submit,pause}:{session:Session;bottom:number;select:(index:number)=>void;submit:()=>void;pause:()=>void}) {
  const item=session.items[session.index], q=item?questionMap.get(item.questionId):undefined;
  const [imageError,setImageError]=useState(false);
  const [imageLoaded,setImageLoaded]=useState(false);
  useEffect(()=>{setImageError(false);setImageLoaded(false);},[q?.id]);
  if(!q||!item)return <View style={{flex:1,backgroundColor:C.cream,justifyContent:'center',padding:28,gap:16}}><Txt size={22} bold>Questão temporariamente indisponível</Txt><Txt size={15} color={C.muted}>Este quiz precisa de um conteúdo que não está salvo no aparelho. Conecte-se à internet para atualizar a matéria ou volte e comece outro quiz. Seu progresso anterior continua salvo.</Txt><Button title="Voltar ao ZUP!" onPress={pause}/></View>;
  const c=getCategory(q.category);
  const correct=session.revealed&&session.answers[session.index]?.correct;
  let combo=0;for(let i=session.answers.length-1;i>=0;i--){if(session.answers[i]?.correct)combo++;else break;}
  return <View style={{flex:1,backgroundColor:C.cream}}>
    <View style={styles.top}>
      <IconButton icon="close" label="Pausar e sair do quiz" onPress={pause}/>
      <View style={{flex:1}} accessibilityLabel={`Pergunta ${session.index+1} de ${session.items.length}`}>
        {session.items.length<=12 ? <View style={{flexDirection:'row',gap:4}}>{session.items.map((it,i)=><View key={it.questionId} style={{flex:1,height:7,borderRadius:9,backgroundColor:i<session.index?C.green:i===session.index?C.yellow:C.line}}/>)}</View> : <View style={{height:7,borderRadius:9,backgroundColor:C.line,overflow:'hidden'}}><View style={{height:'100%',width:`${((session.index+1)/session.items.length)*100}%`,backgroundColor:C.yellow,borderRadius:9}}/></View>}
      </View><Txt size={12} bold>{session.index+1}/{session.items.length}</Txt>
    </View>

    <ScrollView key={q.id} contentInsetAdjustmentBehavior="never" contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={[StyleSheet.absoluteFillObject,{backgroundColor:c.light,alignItems:'center',justifyContent:'center'}]}>
          <CategoryArt id={q.category} size={94}/>
        </View>
        {!imageError&&<ImageBackground source={{uri:questionPhoto(q)}} onLoad={()=>setImageLoaded(true)} onError={()=>{setImageError(true);setImageLoaded(false);}} resizeMode="cover" accessibilityRole="image" accessibilityLabel={q.imageAlt??`Imagem relacionada a ${c.label}`} style={StyleSheet.absoluteFillObject}/>}
        {imageLoaded&&!imageError&&<View pointerEvents="none" style={{position:'absolute',left:0,right:0,bottom:0,height:'72%',backgroundColor:'#0000008B'}}/>}
        <View style={{position:'absolute',left:0,right:0,bottom:0,padding:14,flexDirection:'row',alignItems:'flex-end',gap:8}}>
          <Chip color={imageLoaded&&!imageError?'#FFFFFFE8':C.white}>{c.label.toUpperCase()}</Chip>
          <View style={{flex:1}}/>
          {combo>=2&&<Chip color={C.yellow}>🔥 COMBO {combo}</Chip>}
          <Chip color={imageLoaded&&!imageError?'#FFFFFFE8':C.white}>+20 XP</Chip>
        </View>
      </View>

      <View style={{gap:5}}>{session.mode==='exam'&&session.examTitle&&<Txt size={11} bold color={C.muted}>{session.examTitle.toUpperCase()}</Txt>}<Txt size={11} bold color={C.muted}>PERGUNTA {session.index+1}</Txt><Txt size={25} bold accessibilityRole="header">{q.question}</Txt><Txt size={12} color={C.muted}>{q.id.startsWith('t-')||q.kind==='discover'?'Pergunta de fonte identificada. Descubra a resposta e veja a explicação.':'Escolha a alternativa. Depois, confira o raciocínio.'}</Txt></View>

      <View style={{gap:10,marginVertical:4}}>
        {item.order.map((canonical,index)=>{
          const selected=session.selected===index;
          const isAnswer=session.revealed&&canonical===q.answer;
          const isWrong=session.revealed&&selected&&!isAnswer;
          return <Pressable key={canonical} disabled={session.revealed} onPress={()=>select(index)} accessibilityRole="radio"
            accessibilityState={{selected,disabled:session.revealed}}
            accessibilityLabel={`${String.fromCharCode(65+index)}. ${q.choices[canonical]}. ${isAnswer?'Resposta correta.':isWrong?'Sua resposta, incorreta.':''}`}
            style={({pressed})=>[styles.answer,{borderColor:isAnswer?C.success:isWrong?C.red:selected?C.ink:C.line,backgroundColor:isAnswer?C.greenLight:isWrong?C.pinkLight:selected?C.lemon:C.white,opacity:pressed?0.82:1,transform:[{scale:pressed?0.99:1}]}]}>
            <View style={[styles.letter,{backgroundColor:selected?C.ink:C.silver}]}><Txt size={14} bold color={selected?C.white:C.ink}>{String.fromCharCode(65+index)}</Txt></View>
            <Txt size={15} bold style={{flex:1}}>{q.choices[canonical]}</Txt>
            {(isAnswer||isWrong)&&<Icon name={isAnswer?'check':'close'} size={22} color={isAnswer?C.success:C.red}/>}          
          </Pressable>;
        })}
      </View>

      {session.revealed&&<View style={[styles.fact,{backgroundColor:correct?C.greenLight:C.pinkLight}]}>
        <View style={{flexDirection:'row',alignItems:'center',gap:8}}><Icon name={correct?'sparkles':'book'} size={22} color={correct?C.success:C.ink}/><Txt size={17} bold accessibilityLiveRegion="polite">{correct?'Acertou. Entenda por que funciona.':'Ainda não. Veja o raciocínio.'}</Txt></View>
        {!correct&&<Txt size={14} bold>Resposta: {q.choices[q.answer]}</Txt>}
        <Txt size={15} style={{lineHeight:22}}>{q.fact}</Txt>
        {q.universe&&<Txt size={12} color={C.muted}>Universo: {q.universe}</Txt>}
        {q.workTitle&&<Txt size={12} color={C.muted}>Obra: {q.workTitle}</Txt>}
        {q.sourceLabel&&!q.source&&<Txt size={12} color={C.muted}>Origem: {q.sourceLabel}</Txt>}
        {q.source&&<Pressable accessibilityRole="link" onPress={()=>void openHTTPS(q.source!.url)} style={styles.link}><Txt color={C.muted} size={12} style={{flex:1}}>Fonte: {q.source.title}</Txt><Icon name="external" size={16} color={C.muted}/></Pressable>}
        {q.sourceLicense&&<Txt size={11} color={C.muted}>Licença registrada: {q.sourceLicense}</Txt>}
        {q.attribution&&<Txt size={11} color={C.muted}>Créditos: {q.attribution}</Txt>}
        {q.licenseUrl&&<Pressable accessibilityRole="link" onPress={()=>void openHTTPS(q.licenseUrl!)} style={styles.link}><Txt color={C.muted} size={11} style={{flex:1}}>Consultar licença de reutilização</Txt><Icon name="external" size={15} color={C.muted}/></Pressable>}
        {q.imageSource&&<Pressable accessibilityRole="link" onPress={()=>void openHTTPS(q.imageSource!.url)} style={styles.link}><Txt color={C.muted} size={11} style={{flex:1}}>Imagem: {q.imageSource.title}</Txt><Icon name="external" size={15} color={C.muted}/></Pressable>}
        <Pressable onPress={()=>void reportQuestion(q)} accessibilityRole="button" style={styles.link}><Txt size={11} color={C.muted}>Sugerir revisão desta pergunta</Txt></Pressable>
      </View>}
    </ScrollView>

    <View style={[styles.footer,{paddingBottom:bottom+10}]}><View style={{width:'100%',maxWidth:MAX_WIDTH-40,alignSelf:'center'}}><Button disabled={session.selected===null}
      title={!session.revealed?'Conferir':session.index===session.items.length-1?'Ver resultado':'Próxima pergunta'} onPress={submit}/></View></View>
  </View>;
}
const styles=StyleSheet.create({
  top:{flexDirection:'row',alignItems:'center',gap:12,paddingLeft:8,paddingRight:20,paddingVertical:7,width:'100%',maxWidth:MAX_WIDTH,alignSelf:'center'},
  content:{paddingHorizontal:20,paddingTop:6,paddingBottom:22,gap:14,width:'100%',maxWidth:MAX_WIDTH,alignSelf:'center'},
  hero:{height:154,borderRadius:24,overflow:'hidden',backgroundColor:C.silver},
  answer:{padding:12,borderWidth:2,borderRadius:19,minHeight:62,flexDirection:'row',alignItems:'center',gap:11},
  letter:{height:32,width:32,borderRadius:11,alignItems:'center',justifyContent:'center'},
  fact:{padding:18,borderRadius:22,gap:10},
  link:{minHeight:40,flexDirection:'row',alignItems:'center',gap:8},
  footer:{paddingHorizontal:20,paddingTop:10,backgroundColor:C.cream,borderTopWidth:1,borderColor:C.line},
});
