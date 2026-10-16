import React,{useEffect,useRef,useState} from 'react';
import {ActivityIndicator,Alert,AppState,BackHandler,KeyboardAvoidingView,Platform,Pressable,ScrollView,StyleSheet,View,useWindowDimensions} from 'react-native';
import type {NativeScrollEvent,NativeSyntheticEvent} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import * as Haptics from 'expo-haptics';
import {SafeAreaProvider,SafeAreaView,initialWindowMetrics,useSafeAreaInsets} from 'react-native-safe-area-context';
import Svg,{Circle,Path} from 'react-native-svg';
import type {CategoryId,GameMode,CompanionId,MicroLesson,TrackId} from './src/types';
import {useProgress} from './src/hooks/useProgress';
import {createSession,createMicroSession,chooseAnswer,revealAnswer,nextQuestion,finishSession,dueReviewIds} from './src/game';
import {createExamSession} from './src/exams';
import type {ExamPlan} from './src/exams';
import {buyStreakFreeze,completeLesson,openLesson,toggleSavedLesson} from './src/learning';
import {Icon} from './src/components/Icon';
import type {IconName} from './src/components/Icon';
import {Txt,Button,IconButton} from './src/components/UI';
import {ErrorBoundary} from './src/components/ErrorBoundary';
import {CreatureArt} from './src/components/CreatureArt';
import {OnboardingScreen} from './src/screens/OnboardingScreen';
import {HomeScreen} from './src/screens/HomeScreen';
import {ExploreScreen} from './src/screens/ExploreScreen';
import {LibraryScreen} from './src/screens/LibraryScreen';
import {AwardsScreen} from './src/screens/AwardsScreen';
import {ProfileScreen} from './src/screens/ProfileScreen';
import {CompanionsScreen} from './src/screens/CompanionsScreen';
import {IntroScreen} from './src/screens/IntroScreen';
import {QuizScreen} from './src/screens/QuizScreen';
import {ResultScreen} from './src/screens/ResultScreen';
import type {RoundResult} from './src/screens/ResultScreen';
import {AboutScreen} from './src/screens/AboutScreen';
import {LessonScreen} from './src/screens/LessonScreen';
import {ExamBuilderScreen} from './src/screens/ExamBuilderScreen';
import {C} from './src/theme';

type Screen='onboarding'|'tabs'|'companions'|'intro'|'quiz'|'result'|'about'|'lesson'|'awards'|'examBuilder';
type Tab='home'|'quizhub'|'library'|'profile';
const tabs:{id:Tab;label:string;icon:IconName}[]=[
  {id:'home',label:'Início',icon:'home'},{id:'quizhub',label:'Quiz',icon:'brain'},{id:'library',label:'Biblioteca',icon:'book'},{id:'profile',label:'Perfil',icon:'paw'},
];

function Shell(){
  const {progress:p,current,loading,loadError,saveError,recovered,update,reset,retry,reload,dismissRecovery}=useProgress();
  const insets=useSafeAreaInsets(),{width}=useWindowDimensions(),pageWidth=Math.max(280,width-insets.left-insets.right),pager=useRef<ScrollView>(null);
  const [screen,setScreen]=useState<Screen>('onboarding'),[tab,setTab]=useState<Tab>('home');
  const [pending,setPending]=useState<{category:CategoryId;mode:GameMode;topics?:CategoryId[]}>({category:'brasil',mode:'category'});
  const [result,setResult]=useState<RoundResult|null>(null),[activeLesson,setActiveLesson]=useState<MicroLesson|null>(null);
  const [now,setNow]=useState(new Date()),[resetting,setResetting]=useState(false);
  const hydrated=useRef(false),background=screen==='onboarding'?C.lemon:C.cream;
  const immersiveHome=screen==='tabs'&&tab==='home';
  const statusStyle=immersiveHome?'light':'dark';

  useEffect(()=>{if(!loading&&!loadError&&!hydrated.current){hydrated.current=true;setScreen(p.onboardingCompleted?'tabs':'onboarding');}},[loading,loadError,p.onboardingCompleted]);
  useEffect(()=>{if(Platform.OS!=='web')void SystemUI.setBackgroundColorAsync(background).catch(()=>{});},[background]);
  useEffect(()=>{const listener=AppState.addEventListener('change',state=>{if(state==='active')setNow(new Date());});const timer=setInterval(()=>{if(AppState.currentState==='active')setNow(new Date());},60_000);return()=>{listener.remove();clearInterval(timer);};},[]);
  useEffect(()=>{if(screen!=='tabs')return;const index=tabs.findIndex(t=>t.id===tab);const timer=setTimeout(()=>pager.current?.scrollTo({x:index*pageWidth,animated:false}),0);return()=>clearTimeout(timer);},[screen,pageWidth]);

  function tap(kind:'select'|'success'|'error'='select'){if(!current.current.sound||Platform.OS==='web')return;const action=kind==='select'?Haptics.selectionAsync():Haptics.notificationAsync(kind==='success'?Haptics.NotificationFeedbackType.Success:Haptics.NotificationFeedbackType.Error);void action.catch(()=>{});}
  function goTab(next:Tab,animated=true){setTab(next);const index=tabs.findIndex(t=>t.id===next);requestAnimationFrame(()=>pager.current?.scrollTo({x:index*pageWidth,animated}));tap();}
  function onPagerEnd(e:NativeSyntheticEvent<NativeScrollEvent>){const index=Math.max(0,Math.min(tabs.length-1,Math.round(e.nativeEvent.contentOffset.x/pageWidth)));const next=tabs[index]?.id;if(next&&next!==tab){setTab(next);tap();}}
  function pause(){Alert.alert('Pausar este quiz?','Suas respostas ficam salvas neste aparelho para você continuar depois.',[{text:'Continuar jogando',style:'cancel'},{text:'Pausar',onPress:()=>{setScreen('tabs');setTab('home');}}]);}
  function back(){if(screen==='quiz'){pause();return;}if(screen==='examBuilder'){setScreen('tabs');setTab('quizhub');return;}if(screen==='awards'){setScreen('tabs');setTab('profile');return;}if(screen!=='tabs'&&screen!=='onboarding'){setScreen('tabs');setTab('home');return;}if(tab!=='home')goTab('home');}
  useEffect(()=>{const sub=BackHandler.addEventListener('hardwareBackPress',()=>{if(resetting)return true;if((screen==='tabs'&&tab==='home')||screen==='onboarding')return false;back();return true;});return()=>sub.remove();},[screen,tab,resetting,pageWidth]);

  function requestStart(category:CategoryId,mode:GameMode='category',topics?:CategoryId[]){
    const open=()=>{setPending({category,mode,topics});setScreen('intro');tap();};
    if(mode==='review'&&!dueReviewIds(current.current).length){Alert.alert('Revisão em dia','Ainda não há itens vencidos. Continue aprendendo e o ZUP traz cada tema de volta na hora certa.');return;}
    if(current.current.activeSession){Alert.alert('Você tem um quiz em andamento','Pode retomá-lo ou começar outro.',[{text:'Cancelar',style:'cancel'},{text:'Retomar',onPress:()=>setScreen('quiz')},{text:'Novo quiz',onPress:open}]);}else open();
  }
  function begin(){const s=createSession(current.current,pending.category,pending.mode,Math.random,Date.now(),pending.topics??[],true);if(!s){Alert.alert('Tudo revisado','Explore outro tema para descobrir mais.');setScreen('tabs');return;}update(prev=>({...prev,activeSession:s}));setScreen('quiz');tap();}
  function microQuiz(questionId:string){
    const open=()=>{const s=createMicroSession(current.current,questionId,Math.random,Date.now());if(!s){Alert.alert('Tema concluído','Você já respondeu as perguntas disponíveis deste tema. Ele continua na sua Biblioteca e pode voltar no modo Revisão.');return;}update(prev=>({...prev,activeSession:s}));setScreen('quiz');tap();};
    if(current.current.activeSession){Alert.alert('Quiz em andamento','Retome o quiz atual ou troque por esta pergunta rápida.',[{text:'Cancelar',style:'cancel'},{text:'Retomar',onPress:()=>setScreen('quiz')},{text:'Trocar',onPress:open}]);}else open();
  }
  function select(choice:number){update(prev=>{if(!prev.activeSession)return prev;const s=chooseAnswer(prev.activeSession,choice);return s===prev.activeSession?prev:{...prev,activeSession:s};});tap();}
  function submit(){const before=current.current,s=before.activeSession;if(!s||s.selected===null)return;if(!s.revealed){const next=revealAnswer(s);if(next===s)return;update(prev=>prev.activeSession?.id===s.id?{...prev,activeSession:next}:prev);tap(next.answers[next.index]?.correct?'success':'error');return;}if(s.index<s.items.length-1){update(prev=>prev.activeSession?.id===s.id?{...prev,activeSession:nextQuestion(prev.activeSession)}:prev);return;}const after=update(prev=>finishSession(prev,s));if(after===before)return;setResult({session:s,beforeXP:before.xp,afterXP:after.xp});setScreen('result');setNow(new Date());tap('success');}
  function startSmartExam(plan:ExamPlan){
    const s=createExamSession(current.current,plan,Math.random,Date.now());
    if(!s){Alert.alert('Sem questões novas suficientes','Você já respondeu tudo que encontramos para esse plano. Use Revisão ou tente outras matérias.');return;}
    update(prev=>({...prev,activeSession:s}));setScreen('quiz');tap();
  }
  function choosePet(id:CompanionId){update(prev=>({...prev,companionId:id}));setScreen('tabs');setTab('profile');tap('success');}
  function finishOnboarding(settings:{nickname:string;tracks:TrackId[];companionId:CompanionId;dailyGoal:number}){update(prev=>({...prev,nickname:settings.nickname,preferredTracks:settings.tracks,companionId:settings.companionId,dailyGoal:settings.dailyGoal,onboardingCompleted:true}));setScreen('tabs');setTab('home');tap('success');}
  function readLesson(lesson:MicroLesson){setActiveLesson(lesson);update(prev=>openLesson(prev,lesson.id));setScreen('lesson');tap();}
  function confirmReset(){Alert.alert('Apagar seus dados locais?','Isso remove apelido, XP, estrelas, biblioteca, evoluções, respostas e a cópia local de recuperação. Não é possível desfazer.',[{text:'Cancelar',style:'cancel'},{text:'Apagar',style:'destructive',onPress:()=>{setResetting(true);void reset().then(()=>{setResult(null);setActiveLesson(null);setScreen('onboarding');setTab('home');}).catch(()=>Alert.alert('Não foi possível apagar','Seus dados não foram redefinidos. Tente novamente.')).finally(()=>setResetting(false));}}]);}

  if(loading)return <View style={[styles.center,{backgroundColor:C.lemon}]}><CreatureArt id="oniri" size={130}/><ActivityIndicator color={C.ink}/><Txt bold>Preparando seu feed...</Txt></View>;
  if(loadError)return <SafeAreaView style={styles.center}><Icon name="shield" size={46}/><Txt size={25} bold>Vamos proteger seu progresso</Txt><Txt color={C.muted} style={{textAlign:'center'}}>Não foi possível ler os dados locais. Tente novamente antes de reiniciar sua jornada.</Txt><Button title="Tentar novamente" disabled={resetting} onPress={()=>void reload()}/><Button title={resetting?'Apagando dados...':'Apagar dados e recomeçar'} disabled={resetting} variant="outline" icon="trash" onPress={confirmReset}/></SafeAreaView>;

  const secondary=screen==='companions'||screen==='intro'||screen==='about'||screen==='lesson'||screen==='awards'||screen==='examBuilder';
  const headerTitle=screen==='companions'?'Companheiros':screen==='intro'?'Novo quiz':screen==='about'?'Sobre o ZUP!':screen==='awards'?'Conquistas':screen==='examBuilder'?'Simulado Inteligente':'Aprendizado';
  const session=p.activeSession;

  return <View style={[styles.root,{backgroundColor:background}]}>
    <StatusBar style={statusStyle}/>
    {screen==='onboarding'&&<View pointerEvents="none" style={StyleSheet.absoluteFill}><Svg width="100%" height="100%" viewBox="0 0 400 850" preserveAspectRatio="xMidYMid slice"><Circle cx="22" cy="12" r="135" fill="#FFDE62" opacity={0.65}/><Path d="M400 170C249 229 461 360 309 426s-72 115 91 144Z" fill="#FFE075" opacity={0.75}/><Circle cx="13" cy="828" r="173" fill="#FFD953" opacity={0.45}/></Svg></View>}
    <SafeAreaView edges={immersiveHome?['left','right']:['top','left','right']} style={styles.root}>
      <KeyboardAvoidingView style={styles.root} behavior={Platform.OS==='ios'?'padding':undefined}>
        {(saveError||recovered)&&<View style={[styles.banner,{paddingTop:immersiveHome?insets.top+4:0,backgroundColor:saveError?C.pinkLight:C.blueLight}]}><Txt size={12} style={{flex:1}}>{saveError?'Seu progresso está na memória, mas ainda não foi salvo.':'Recuperamos uma cópia local anterior do seu progresso.'}</Txt><Pressable accessibilityRole="button" onPress={saveError?retry:dismissRecovery} style={{minHeight:44,justifyContent:'center',padding:8}}><Txt size={12} bold>{saveError?'Tentar salvar':'Entendi'}</Txt></Pressable></View>}
        {screen==='onboarding'&&<OnboardingScreen p={p} finish={finishOnboarding}/>}        
        {screen==='tabs'&&<View style={styles.root}>
          <ScrollView ref={pager} horizontal pagingEnabled bounces={false} directionalLockEnabled nestedScrollEnabled showsHorizontalScrollIndicator={false} onMomentumScrollEnd={onPagerEnd} scrollEventThrottle={16} style={styles.root} contentContainerStyle={{flexGrow:1}}>
            <View style={{width:pageWidth,flex:1}}><HomeScreen p={p} now={now} topInset={insets.top} bottomInset={insets.bottom+58} start={requestStart} resume={()=>setScreen('quiz')} profile={()=>goTab('profile')} companions={()=>setScreen('companions')} explore={()=>goTab('quizhub')} read={readLesson} save={id=>update(prev=>toggleSavedLesson(prev,id))} open={id=>update(prev=>openLesson(prev,id))} microQuiz={microQuiz}/></View>
            <View style={{width:pageWidth,flex:1}}><ExploreScreen p={p} start={requestStart} smartExam={()=>setScreen('examBuilder')}/></View>
            <View style={{width:pageWidth,flex:1}}><LibraryScreen p={p} read={readLesson}/></View>
            <View style={{width:pageWidth,flex:1}}><ProfileScreen p={p} now={now} update={update} companions={()=>setScreen('companions')} awards={()=>setScreen('awards')} about={()=>setScreen('about')} reset={confirmReset} buyFreeze={()=>update(prev=>buyStreakFreeze(prev))}/></View>
          </ScrollView>
          <View style={[immersiveHome?styles.tabbarHome:styles.tabbar,{paddingBottom:Math.max(8,insets.bottom),bottom:0}]}>{tabs.map((t,index)=>{const active=tab===t.id;const fg=immersiveHome?(active?C.yellow:C.white):(active?C.ink:C.muted);return <Pressable key={t.id} onPress={()=>goTab(t.id)} accessibilityRole="tab" accessibilityLabel={t.label} accessibilityState={{selected:active}} style={styles.tab}><View style={[styles.tabIcon,{backgroundColor:immersiveHome?'transparent':active?C.yellow:'transparent'}]}><Icon name={t.icon} size={22} color={fg} filled={active&&index===0}/></View><Txt size={10} bold={active} color={fg} style={{textAlign:'center'}}>{t.label}</Txt></Pressable>;})}</View>
        </View>}
        {secondary&&(
          <>
            <View style={[styles.topbar,{paddingTop:4}]}>
              <IconButton icon="back" label="Voltar" onPress={back}/>
              <Txt bold size={16}>{headerTitle}</Txt>
              <View style={{width:46}}/>
            </View>
            <SafeAreaView edges={['bottom']} style={styles.root}>
              {screen==='companions'&&<CompanionsScreen p={p} onChoose={choosePet}/>}
              {screen==='intro'&&<IntroScreen category={pending.category} mode={pending.mode} count={pending.mode==='review'?Math.min(5,dueReviewIds(p,now).length):pending.mode==='marathon'?10:5} start={begin}/>}
              {screen==='about'&&<AboutScreen/>}
              {screen==='examBuilder'&&<ExamBuilderScreen p={p} start={startSmartExam}/>}
              {screen==='lesson'&&activeLesson&&<LessonScreen lesson={activeLesson} p={p} save={()=>update(prev=>toggleSavedLesson(prev,activeLesson.id))} complete={()=>{const before=current.current.learnedLessonIds.length;const after=update(prev=>completeLesson(prev,activeLesson.id,new Date()));if(after.learnedLessonIds.length>before)tap('success');}} quiz={()=>microQuiz(activeLesson.quizQuestionId)}/>}
              {screen==='awards'&&<AwardsScreen p={p} now={now}/>}
            </SafeAreaView>
          </>
        )}
        {screen==='quiz'&&session&&<QuizScreen session={session} bottom={insets.bottom} select={select} submit={submit} pause={pause}/>}        
        {screen==='result'&&result&&<ResultScreen p={p} result={result} bottom={insets.bottom} home={()=>{setScreen('tabs');setTab('home');}} again={()=>result.session.mode==='micro'?microQuiz(result.session.sourceQuestionId??result.session.items[0]!.questionId):result.session.mode==='exam'?startSmartExam({title:result.session.examTitle??'Simulado inteligente',query:result.session.examQuery??'simulado geral',categories:result.session.topicIds??[result.session.category],questionCount:result.session.items.length,note:'Novo simulado com questões ainda não respondidas.'}):requestStart(result.session.category,result.session.mode,result.session.topicIds)} review={()=>requestStart('brasil','review')}/>}        
        {resetting&&<View accessibilityViewIsModal style={[StyleSheet.absoluteFill,styles.resetOverlay]}><ActivityIndicator size="large" color={C.ink}/><Txt bold>Apagando dados locais...</Txt></View>}
      </KeyboardAvoidingView>
    </SafeAreaView>
  </View>;
}
export default function App(){return <SafeAreaProvider initialMetrics={initialWindowMetrics}><ErrorBoundary><Shell/></ErrorBoundary></SafeAreaProvider>;}
const styles=StyleSheet.create({
  root:{flex:1},
  center:{flex:1,backgroundColor:C.cream,justifyContent:'center',alignItems:'center',padding:28,gap:18},
  banner:{paddingHorizontal:16,flexDirection:'row',alignItems:'center',gap:8},
  topbar:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:12,paddingBottom:6},
  tabbar:{position:'absolute',left:0,right:0,backgroundColor:'#FFFFFFFA',flexDirection:'row',paddingTop:7,borderTopWidth:1,borderColor:'#00000012'},
  tabbarHome:{position:'absolute',left:0,right:0,backgroundColor:'#05060899',flexDirection:'row',paddingTop:6,borderTopWidth:1,borderColor:'#FFFFFF18'},
  tab:{flex:1,alignItems:'center',justifyContent:'center',minHeight:58,gap:3,paddingHorizontal:4},
  tabIcon:{width:47,height:31,borderRadius:18,alignItems:'center',justifyContent:'center'},
  resetOverlay:{alignItems:'center',justifyContent:'center',backgroundColor:'#FBFAF7F2',gap:20},
});
