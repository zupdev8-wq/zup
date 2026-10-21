'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const {load,expand,toSvg,app,setWidth}=require('./helpers/render.cjs');
const {initialProgress}=require('../app/.test-build/types.js');
const {createSession,chooseAnswer,revealAnswer,nextQuestion,questionMap}=require('../app/.test-build/game.js');
const {companions}=require('../app/.test-build/companions.js');
const {categories}=require('../app/.test-build/catalog.js');
const {microLessons}=require('../app/.test-build/learning.js');
const fresh=()=>structuredClone(initialProgress),noop=()=>{};
function verify(node,parent){
  if(Array.isArray(node)){node.forEach(n=>verify(n,parent));return;}
  if(node==null)return;
  if(typeof node==='string'||typeof node==='number'){
    if(node==='')return; // React omits empty-string children.
    assert.equal(parent,'Text',`Raw text ${JSON.stringify(node)} must only appear inside a Text host`);return;
  }
  assert.equal(typeof node.type,'string');
  const p=node.props;
  if(node.type==='Pressable'&&p.accessibilityRole==='button')assert.equal(typeof p.onPress,'function');
  verify(p.children,node.type);
}
test('all 16 original companion forms render vector trees',()=>{
  const {CreatureArt}=load(path.join(app,'src/components/CreatureArt.tsx'));
  const seen=new Set();
  for(const pet of companions)for(let stage=0;stage<4;stage++){
    const tree=expand(CreatureArt({id:pet.id,stage,size:200})),svg=toSvg(tree);
    assert.ok(svg.includes('<svg')&&svg.includes('<path'));
    assert.ok(!/NaN|undefined|null/.test(svg));
    seen.add(svg);
  }
  assert.equal(seen.size,16);
});
test('all interface glyphs and category artworks render',()=>{
  const {Icon}=load(path.join(app,'src/components/Icon.tsx'));
  const text=fs.readFileSync(path.join(app,'src/components/Icon.tsx'),'utf8');
  const names=[...text.match(/export type IconName=(.*);/)[1].matchAll(/'([^']+)'/g)].map(x=>x[1]);
  assert.ok(names.length>=33);
  for(const name of names){const svg=toSvg(expand(Icon({name})));assert.ok(/<(?:path|circle|rect|ellipse)\s/.test(svg),name);}
  const {CategoryArt}=load(path.join(app,'src/components/CategoryArt.tsx'));
  for(const c of categories)assert.ok(toSvg(expand(CategoryArt({id:c.id}))).length>180,c.id);
});
test('each screen evaluates its initial tree at 320, 390 and 768 px widths',()=>{
  const s=createSession(fresh(),'brasil');
  const cases=[
    ['WelcomeScreen',{onContinue:noop,bottom:34}],
    ['HomeScreen',{p:fresh(),now:new Date(),topInset:47,bottomInset:92,start:noop,resume:noop,profile:noop,companions:noop,explore:noop,read:noop,save:noop,open:noop,microQuiz:noop}],
    ['ExploreScreen',{p:fresh(),start:noop,smartExam:noop}],
    ['LibraryScreen',{p:fresh(),read:noop}],
    ['AwardsScreen',{p:fresh(),now:new Date()}],
    ['ProfileScreen',{p:fresh(),update:noop,companions:noop,about:noop,reset:noop,buyFreeze:noop,now:new Date()}],
    ['CompanionsScreen',{p:fresh(),onChoose:noop,onboarding:true}],
    ['IntroScreen',{category:'brasil',mode:'category',count:5,start:noop}],
    ['LessonScreen',{lesson:microLessons[0],p:fresh(),complete:noop,save:noop,quiz:noop}],
    ['PremiumScreen',{p:fresh(),status:{active:false,plan:'free',premiumSince:null,premiumUntil:null,price:9.99,periodDays:30},loading:false,error:null,refresh:async()=>({active:false,plan:'free',premiumSince:null,premiumUntil:null,price:9.99,periodDays:30}),exam:noop,marathon:noop}],
    ['ExamBuilderScreen',{p:fresh(),start:noop}],
    ['QuizScreen',{session:s,bottom:34,select:noop,submit:noop,pause:noop}],
    ['AboutScreen',{}],
    ['DiscoveryScreen',{q:questionMap.get('brasil-01'),start:noop}],
  ];
  for(const width of [320,390,768]){
    setWidth(width);
    for(const [name,props] of cases){
      const Component=load(path.join(app,`src/screens/${name}.tsx`))[name];
      try { verify(expand(Component(props)),null); } catch (e) { throw new Error(`${name} @ ${width}: ${e.message}`, {cause:e}); }
    }
  }
});
test('quiz feedback, resumed home and an evolved result produce valid trees',()=>{
  let s=createSession(fresh(),'brasil');
  while(true){
    const q=questionMap.get(s.items[s.index].questionId);
    s=revealAnswer(chooseAnswer(s,s.items[s.index].order.indexOf(q.answer)));
    if(s.index===s.items.length-1)break;s=nextQuestion(s);
  }
  const Quiz=load(path.join(app,'src/screens/QuizScreen.tsx')).QuizScreen;
  verify(expand(Quiz({session:s,bottom:34,select:noop,submit:noop,pause:noop})));
  const Result=load(path.join(app,'src/screens/ResultScreen.tsx')).ResultScreen;
  verify(expand(Result({p:{...fresh(),xp:800,weakIds:['brasil-01']},result:{session:s,beforeXP:680,afterXP:800},bottom:34,home:noop,again:noop,review:noop})));
  const Home=load(path.join(app,'src/screens/HomeScreen.tsx')).HomeScreen;
  verify(expand(Home({p:{...fresh(),activeSession:s,xp:800},now:new Date(),topInset:47,bottomInset:92,start:noop,resume:noop,profile:noop,companions:noop,explore:noop,read:noop,save:noop,open:noop,microQuiz:noop})));
});

test('complementary readings are rendered with real references and accessible links',()=>{
  const {RecommendedReadings}=load(path.join(app,'src/components/RecommendedReadings.tsx'));
  let linked=0,unlinked=0;
  const visit=node=>{
    if(node==null||typeof node==='string'||typeof node==='number')return;
    if(Array.isArray(node)){node.forEach(visit);return;}
    if(node.type==='Pressable'&&node.props.accessibilityRole==='link'){
      assert.equal(typeof node.props.onPress,'function');linked++;
    }
    visit(node.props.children);
  };
  for(const lesson of microLessons){
    const tree=expand(RecommendedReadings({readings:lesson.recommendedReadings??[]}));
    verify(tree,null);visit(tree);
    unlinked+=(lesson.recommendedReadings??[]).filter(item=>!item.url).length;
  }
  assert.ok(linked>=15);
  assert.ok(unlinked>=60);
});

test('optional thinking prompts render without revealing the hint by default',()=>{
  const {RetrievalChallenge}=load(path.join(app,'src/components/RetrievalChallenge.tsx'));
  for(const lesson of microLessons.filter(l=>l.selfCheck)){
    const tree=expand(RetrievalChallenge({check:lesson.selfCheck}));
    verify(tree,null);
    const text=JSON.stringify(tree);
    assert.ok(text.includes(lesson.selfCheck.question));
    assert.ok(!text.includes(lesson.selfCheck.hint));
    assert.ok(text.includes('Ver caminho de racioc'));
  }
});
