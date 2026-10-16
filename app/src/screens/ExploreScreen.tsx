import React,{useMemo,useState} from 'react';
import {Modal,Pressable,ScrollView,View,useWindowDimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {Progress,CategoryId,GameMode,TrackId} from '../types';
import {categories,tracks} from '../catalog';
import {questions} from '../questions';
import {dueReviewIds} from '../game';
import {questionTracks} from '../learning';
import {Txt,Page,Card,Button,ProgressBar,Chip} from '../components/UI';
import {CategoryArt} from '../components/CategoryArt';
import {Icon} from '../components/Icon';
import {C} from '../theme';

type Props={p:Progress;premiumActive:boolean;start:(cat:CategoryId,mode?:GameMode,topics?:CategoryId[])=>void;premium:()=>void};
const groups:{title:string;ids:CategoryId[]}[]=[
  {title:'Brasil & mundo',ids:['brasil','cidadania','geopolitica','historia','geografia','constituicao','economia','mundo']},
  {title:'ENEM & humanas',ids:['portugues','literatura','filosofia','sociologia','artes','cultura','midia']},
  {title:'Exatas & tecnologia',ids:['matematica','raciocinio','fisica','quimica','computacao','engenharia','informatica','tecnologia']},
  {title:'Biológicas & saúde',ids:['biologia','natureza','ciencia','medicina','enfermagem','farmacia','biomedicina','psicologia']},
  {title:'Faculdade & concursos',ids:['direito','administracao','contabilidade','informatica','economia','portugues','constituicao']},
  {title:'Cultura, fé & entretenimento',ids:['cinema','series','musica','games','religioes','teologia','gastronomia','esportes','espaco']},
];

export function ExploreScreen({p,premiumActive,start,premium}:Props) {
  const [filterOpen,setFilterOpen]=useState(false);
  const [selected,setSelected]=useState<CategoryId[]>(['brasil','historia','geopolitica','portugues','raciocinio']);
  const {width}=useWindowDimensions(),due=dueReviewIds(p).length;
  const toggle=(id:CategoryId)=>setSelected(prev=>prev.includes(id)?(prev.length===1?prev:prev.filter(x=>x!==id)):[...prev,id]);
  const primary=selected[0]??'brasil';
  const packs=useMemo(()=>tracks.filter(t=>t.id!=='geral').map(t=>{
    const cats=categories.filter(c=>questions.some(q=>q.category===c.id&&questionTracks(q).includes(t.id))).map(c=>c.id);
    const count=questions.filter(q=>questionTracks(q).includes(t.id)).length;
    return {...t,cats,count};
  }),[]);
  const startTrack=(track:TrackId,cats:CategoryId[])=>{const fallback=cats[0]??'brasil';start(fallback,'mixed',cats);};
  const tileWidth=(Math.min(width,720)-50)/2;
  return <>
    <Page contentContainerStyle={{paddingBottom:110,gap:18}}>
      <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
        <View style={{flex:1}}><Txt size={28} bold accessibilityRole="header">Jogar</Txt><Txt size={13} color={C.muted}>Quizzes novos, rápidos e variados. Pergunta respondida sai da rotação normal.</Txt></View>
        <Pressable accessibilityRole="button" accessibilityLabel="Filtrar matérias" onPress={()=>setFilterOpen(true)} style={{width:48,height:48,borderRadius:24,borderWidth:1,borderColor:C.line,backgroundColor:C.white,alignItems:'center',justifyContent:'center'}}><Icon name="filter" size={21}/></Pressable>
      </View>

      <Card color={C.yellow} outlined style={{padding:17,gap:12}}>
        <View style={{flexDirection:'row',alignItems:'center',gap:12}}><View style={{flex:1,gap:4}}><Chip color="#FFFFFFB8" icon="sparkles">DESAFIO DO DIA</Chip><Txt size={25} bold>5 perguntas inéditas.</Txt><Txt size={13} color="#4C452B">Brasil + assuntos variados + até 120 XP. Nada de repetir o que você já respondeu.</Txt></View><CategoryArt id="brasil" size={84}/></View>
        <Button title="Começar desafio" variant="dark" icon="play" onPress={()=>start('brasil','daily')}/>
      </Card>

      <View style={{flexDirection:'row',gap:10}}>
        <Pressable onPress={()=>start('brasil','review')} disabled={!due} accessibilityRole="button" style={{flex:1}}><Card color={due?C.pinkLight:C.silver} outlined style={{minHeight:132,padding:14}}><Icon name="refresh" size={25}/><Txt size={17} bold>Revisar</Txt><Txt size={11} color={C.muted}>{due?`${due} item${due===1?'':'s'} para rever`:'Só aparece quando chegar a hora'}</Txt></Card></Pressable>
        <Pressable onPress={()=>setFilterOpen(true)} accessibilityRole="button" style={{flex:1}}><Card color={C.blueLight} outlined style={{minHeight:132,padding:14}}><Icon name="settings" size={25}/><Txt size={17} bold>Monte o seu</Txt><Txt size={11} color={C.muted}>{selected.length} matéria{selected.length===1?'':'s'} selecionada{selected.length===1?'':'s'}</Txt></Card></Pressable>
      </View>

      <Pressable onPress={()=>premiumActive?start(primary,'marathon',selected):premium()} accessibilityRole="button">
        <Card color={premiumActive?C.greenLight:C.cream} outlined style={{flexDirection:'row',alignItems:'center',gap:12}}>
          <View style={{width:54,height:54,borderRadius:18,backgroundColor:C.ink,alignItems:'center',justifyContent:'center'}}><Icon name={premiumActive?'bolt':'lock'} size={25} color={C.yellow}/></View>
          <View style={{flex:1}}><Chip color={C.yellow}>PREMIUM</Chip><Txt size={18} bold>Maratona de 10 perguntas</Txt><Txt size={11} color={C.muted}>{premiumActive?'Mistura suas matérias sem repetir perguntas.':'Premium libera simulados inteligentes e modos avançados.'}</Txt></View><Icon name="chevron" size={18}/>
        </Card>
      </Pressable>

      <View style={{gap:4}}><Txt size={21} bold>Escolha um universo</Txt><Txt size={12} color={C.muted}>O ZUP mistura áreas no “Pra você”, mas você também pode mergulhar em uma trilha.</Txt></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:11,paddingRight:18}}>
        {packs.map(pack=><Pressable key={pack.id} onPress={()=>startTrack(pack.id,pack.cats)} accessibilityRole="button" style={{width:190}}><Card color={pack.light} outlined style={{minHeight:165,padding:14}}><Chip color={C.white}>{pack.shortLabel.toUpperCase()}</Chip><Txt size={20} bold>{pack.label}</Txt><Txt size={11} color={C.muted}>{pack.description}</Txt><View style={{marginTop:'auto',flexDirection:'row',gap:6,alignItems:'center'}}><Icon name="brain" size={16}/><Txt size={10} bold>{pack.count} perguntas</Txt></View></Card></Pressable>)}
      </ScrollView>

      <Card outlined>
        <View style={{flexDirection:'row',alignItems:'center',gap:10}}><View style={{flex:1}}><Txt size={17} bold>Meta diária</Txt><Txt size={11} color={C.muted}>{Math.min(p.dailyDone,p.dailyGoal)} de {p.dailyGoal} sessões/aprendizados</Txt></View><Txt size={17} bold>{Math.round(Math.min(1,p.dailyDone/p.dailyGoal)*100)}%</Txt></View>
        <ProgressBar value={p.dailyGoal?Math.min(1,p.dailyDone/p.dailyGoal):0} label="Progresso da meta diária" color={C.green}/>
      </Card>

      {groups.map(group=><View key={group.title} style={{gap:10}}>
        <Txt size={20} bold>{group.title}</Txt>
        <View style={{flexDirection:'row',flexWrap:'wrap',gap:10}}>
          {group.ids.map(id=>{const c=categories.find(x=>x.id===id);if(!c)return null;const remaining=questions.filter(q=>q.category===id&&!p.completedIds.includes(q.id)).length;return <Pressable key={`${group.title}-${id}`} accessibilityRole="button" onPress={()=>start(id)} style={({pressed})=>({width:tileWidth,minHeight:102,borderWidth:1.3,borderColor:C.ink,borderRadius:21,backgroundColor:c.light,padding:11,flexDirection:'row',alignItems:'center',gap:7,opacity:pressed?0.8:1})}><CategoryArt id={id} size={50}/><View style={{flex:1}}><Txt size={14} bold>{c.label}</Txt><Txt size={9} color={C.muted}>{remaining?`${remaining} novas`:'revisão disponível'}</Txt></View></Pressable>;})}
        </View>
      </View>)}
    </Page>

    <Modal visible={filterOpen} animationType="slide" presentationStyle="pageSheet" onRequestClose={()=>setFilterOpen(false)}>
      <SafeAreaView style={{flex:1,backgroundColor:C.white}} edges={['top','bottom','left','right']}>
        <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:14,paddingVertical:10,borderBottomWidth:1,borderColor:C.line}}>
          <Pressable accessibilityRole="button" accessibilityLabel="Fechar" onPress={()=>setFilterOpen(false)} style={{width:44,height:44,borderRadius:22,backgroundColor:C.silver,alignItems:'center',justifyContent:'center'}}><Icon name="close" size={20}/></Pressable>
          <View style={{flex:1,alignItems:'center'}}><Txt size={18} bold>Filtro de tópicos</Txt><Txt size={10} color={C.muted}>{selected.length} selecionado{selected.length===1?'':'s'}</Txt></View>
          <Pressable accessibilityRole="button" accessibilityLabel="Jogar matérias selecionadas" onPress={()=>{setFilterOpen(false);start(primary,'mixed',selected);}} style={{width:44,height:44,borderRadius:22,backgroundColor:C.yellow,alignItems:'center',justifyContent:'center'}}><Icon name="play" size={19} filled/></Pressable>
        </View>
        <ScrollView contentContainerStyle={{padding:12,paddingBottom:40}}>{categories.map(c=>{const active=selected.includes(c.id);return <Pressable key={c.id} onPress={()=>toggle(c.id)} accessibilityRole="checkbox" accessibilityState={{checked:active}} style={{minHeight:58,borderBottomWidth:1,borderColor:C.line,flexDirection:'row',alignItems:'center',gap:10,paddingVertical:7}}><View style={{width:38,height:38,borderRadius:12,backgroundColor:c.light,alignItems:'center',justifyContent:'center'}}><CategoryArt id={c.id} size={34}/></View><View style={{flex:1}}><Txt size={14} bold>{c.label}</Txt><Txt size={9} color={C.muted}>{questions.filter(q=>q.category===c.id&&!p.completedIds.includes(q.id)).length} novas</Txt></View><View style={{width:24,height:24,borderRadius:12,borderWidth:1.5,borderColor:active?C.ink:C.line,backgroundColor:active?C.ink:C.white,alignItems:'center',justifyContent:'center'}}>{active&&<Icon name="check" size={14} color={C.white}/>}</View></Pressable>;})}</ScrollView>
      </SafeAreaView>
    </Modal>
  </>;
}
