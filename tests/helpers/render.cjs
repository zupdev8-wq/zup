'use strict';
// Structural test adapter only: this is not React, React Native, Yoga or an Expo runtime.
// It evaluates initial component trees and SVG primitives to catch rendering exceptions,
// broken local imports and raw text accidentally inserted into a View.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const app=path.resolve(__dirname,'../../app');
const ts=require(require.resolve('typescript',{paths:[app]}));
const Fragment=Symbol('fragment');
let uid=0,width=390;
const element=(type,props,key)=>({type,props:props||{},key});
const jsx={jsx:element,jsxs:element,Fragment};
class Value{constructor(v){this.v=v;}setValue(v){this.v=v;}interpolate(){return this.v;}}
const native={
  View:'View',Text:'Text',ScrollView:'ScrollView',FlatList:'FlatList',ImageBackground:'ImageBackground',Pressable:'Pressable',TextInput:'TextInput',Switch:'Switch',
  ActivityIndicator:'ActivityIndicator',KeyboardAvoidingView:'KeyboardAvoidingView',Modal:'Modal',
  useWindowDimensions:()=>({width,height:844,scale:3,fontScale:1}),
  Platform:{OS:'ios'},StyleSheet:{create:x=>x,absoluteFill:{position:'absolute',inset:0}},
  AppState:{currentState:'active',addEventListener:()=>({remove(){}})},
  AccessibilityInfo:{isReduceMotionEnabled:()=>Promise.resolve(true),addEventListener:()=>({remove(){}})},
  Animated:{Value,View:'AnimatedView',timing:()=>({}),sequence:()=>({}),loop:()=>({start(){},stop(){}})},
  Alert:{alert(){}},Share:{share:async()=>({action:'sharedAction'})},Linking:{openURL:async()=>{}},
};
const react={
  __esModule:true,
  useState:x=>[typeof x==='function'?x():x,()=>{}],useRef:x=>({current:x}),
  useEffect:()=>{},useCallback:x=>x,useMemo:f=>f(),useId:()=>`test${++uid}`,
};
react.default=react;
const svg={__esModule:true,default:'svg',Path:'path',Circle:'circle',Ellipse:'ellipse',Rect:'rect',
  Polygon:'polygon',G:'g',Defs:'defs',RadialGradient:'radialGradient',LinearGradient:'linearGradient',
  Stop:'stop',ClipPath:'clipPath',Line:'line',Polyline:'polyline'};
const cache=new Map();
function load(filename){
  const file=path.resolve(filename);
  if(cache.has(file))return cache.get(file);
  const module={exports:{}};cache.set(file,module.exports);
  const source=ts.transpileModule(fs.readFileSync(file,'utf8'),{
    fileName:file,compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}
  }).outputText;
  function localRequire(id){
    if(id==='react')return react;if(id==='react/jsx-runtime')return jsx;
    if(id==='react-native')return native;if(id==='react-native-svg')return svg;
    if(id==='react-native-safe-area-context')return {SafeAreaView:'SafeAreaView',SafeAreaProvider:'SafeAreaProvider',useSafeAreaInsets:()=>({top:0,bottom:34,left:0,right:0}),initialWindowMetrics:null};
    if(id==='expo-clipboard')return {setStringAsync:async()=>{}};
    if(id==='expo-secure-store')return {getItemAsync:async()=>null,setItemAsync:async()=>{},deleteItemAsync:async()=>{}};
    if(id.startsWith('.')){
      const base=path.resolve(path.dirname(file),id);
      const actual=['.ts','.tsx','.js',''].map(ext=>base+ext).find(f=>fs.existsSync(f)&&fs.statSync(f).isFile());
      if(!actual)throw new Error(`Missing ${id} from ${file}`);return load(actual);
    }
    throw new Error('Unexpected external module in structural render: '+id);
  }
  vm.runInNewContext(source,{require:localRequire,module,exports:module.exports,process:{env:{}},console,URL,setTimeout,clearTimeout},
    {filename:file,timeout:3000});
  cache.set(file,module.exports);return module.exports;
}
function expand(node){
  if(Array.isArray(node))return node.flatMap(n=>{const v=expand(n);return Array.isArray(v)?v:[v];}).filter(v=>v!==null);
  if(node==null||typeof node==='boolean')return null;
  if(typeof node!=='object')return node;
  if(node.type===Fragment)return expand(node.props.children);
  if(typeof node.type==='function')return expand(node.type(node.props));
  if(!node.type)throw new Error('Undefined host component');
  return {type:node.type,props:{...node.props,children:expand(node.props.children)}};
}
const escape=s=>String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function toSvg(node){
  if(node==null||typeof node==='boolean')return '';
  if(Array.isArray(node))return node.map(toSvg).join('');
  if(typeof node!=='object')return escape(node);
  const p=node.props,attrs=[];
  for(const [k,v] of Object.entries(p)){
    if(['children','accessible','key','origin','rotation'].includes(k)||v==null||typeof v==='object'||typeof v==='function')continue;
    const key=['viewBox','preserveAspectRatio','gradientUnits','gradientTransform'].includes(k)?k:k.replace(/[A-Z]/g,c=>'-'+c.toLowerCase());
    attrs.push(`${key}="${escape(v)}"`);
  }
  if(p.rotation)attrs.push(`transform="rotate(${p.rotation} ${String(p.origin??'0 0').replace(',',' ')})"`);
  if(node.type==='svg')attrs.push('xmlns="http://www.w3.org/2000/svg"');
  return `<${node.type} ${attrs.join(' ')}>${toSvg(p.children)}</${node.type}>`;
}
module.exports={load,expand,toSvg,app,setWidth:v=>{width=v;}};
