import React,{useEffect,useRef,useState} from 'react';
import {AccessibilityInfo,Animated,AppState,Pressable,ScrollView,StyleSheet,Text,View} from 'react-native';
import type {StyleProp,TextStyle,ViewStyle,ScrollViewProps} from 'react-native';
import {C,MAX_WIDTH,shadow} from '../theme';
import {Icon} from './Icon';
import type {IconName} from './Icon';
import {CreatureArt} from './CreatureArt';
import type {CompanionId} from '../types';

export function Txt({children,size=16,bold=false,color=C.ink,style,...rest}:{
  children:React.ReactNode;size?:number;bold?:boolean;color?:string;style?:StyleProp<TextStyle>;
  accessibilityRole?:'header'|'text';accessibilityLiveRegion?:'none'|'polite'|'assertive';
  accessibilityLabel?:string;numberOfLines?:number;ellipsizeMode?:'head'|'middle'|'tail'|'clip';
}) {
  return <Text {...rest} style={[{fontSize:size,lineHeight:Math.round(size*1.35),fontWeight:bold?'800':'400',color},style]}>{children}</Text>;
}
export function Button({title,onPress,variant='primary',icon='arrow',disabled=false,compact=false}:{
  title:string;onPress:()=>void;variant?:'primary'|'dark'|'outline';icon?:IconName;disabled?:boolean;compact?:boolean;
}) {
  const dark=variant==='dark';
  return <Pressable accessibilityRole="button" accessibilityLabel={title} accessibilityState={{disabled}}
    disabled={disabled} onPress={onPress} style={({pressed})=>[
      styles.button,{backgroundColor:dark?C.ink:variant==='outline'?C.white:C.yellow,
      borderColor:variant==='outline'?C.line:dark?C.ink:C.yellow,opacity:disabled ? 0.45 : pressed ? 0.8 : 1,
      paddingVertical:compact?11:15,transform:[{scale:pressed ? 0.985 : 1}]},
    ]}>
    <Txt size={compact?14:16} bold color={dark?C.white:C.ink} style={{flex:1,textAlign:'center'}}>{title}</Txt>
    <Icon name={icon} size={20} color={dark?C.yellow:C.ink}/>
  </Pressable>;
}
export function IconButton({icon,label,onPress,tint=C.cream}:{
  icon:IconName;label:string;onPress:()=>void;tint?:string;
}) {
  return <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress}
    style={({pressed})=>[styles.iconButton,{backgroundColor:tint,opacity:pressed ? 0.6 : 1}]}><Icon name={icon}/></Pressable>;
}
export function Chip({children,color=C.lemon,icon}:{children:React.ReactNode;color?:string;icon?:IconName}) {
  return <View style={[styles.chip,{backgroundColor:color}]}>{icon&&<Icon name={icon} size={14}/>}<Txt size={11} bold>{children}</Txt></View>;
}
export function ProgressBar({value,color=C.yellow,label}:{value:number;color?:string;label:string}) {
  const pct=Math.max(0,Math.min(1,Number.isFinite(value)?value:0));
  return <View accessibilityRole="progressbar" accessibilityLabel={label} accessibilityValue={{min:0,max:100,now:Math.round(pct*100)}}
    style={styles.track}><View style={{height:'100%',width:`${pct*100}%`,borderRadius:10,backgroundColor:color}}/></View>;
}
export function Card({children,color=C.white,style,outlined=false}:{children:React.ReactNode;color?:string;style?:StyleProp<ViewStyle>;outlined?:boolean}) {
  return <View style={[styles.card,{backgroundColor:color},outlined&&styles.outlinedCard,style]}>{children}</View>;
}
export function Page({children,style,...props}:ScrollViewProps) {
  return <ScrollView {...props} style={[{flex:1},style]} keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="never"
    contentContainerStyle={[styles.page,props.contentContainerStyle]}>{children}</ScrollView>;
}
export function Section({title,action,onPress}:{title:string;action?:string;onPress?:()=>void}) {
  return <View style={styles.section}><Txt size={19} bold accessibilityRole="header" style={{flex:1}}>{title}</Txt>
    {action&&onPress&&<Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={action}
      style={{minHeight:44,justifyContent:'center',paddingLeft:12}}><Txt size={13} bold color={C.muted}>{action}</Txt></Pressable>}</View>;
}
export function FloatingCompanion({id,stage,size=190,enabled=true}:{id:CompanionId;stage:number;size?:number;enabled?:boolean}) {
  const value=useRef(new Animated.Value(0)).current;
  const [systemReduced,setSystemReduced]=useState(true);
  const [active,setActive]=useState(AppState.currentState==='active');
  useEffect(()=>{
    let mounted=true;
    AccessibilityInfo.isReduceMotionEnabled().then(v=>{if(mounted)setSystemReduced(v);}).catch(()=>{});
    const reduced=AccessibilityInfo.addEventListener('reduceMotionChanged',setSystemReduced);
    const state=AppState.addEventListener('change',s=>setActive(s==='active'));
    return()=>{mounted=false;reduced.remove();state.remove();};
  },[]);
  useEffect(()=>{
    if(!enabled||systemReduced||!active){value.setValue(0);return;}
    const loop=Animated.loop(Animated.sequence([
      Animated.timing(value,{toValue:1,duration:1900,useNativeDriver:true,isInteraction:false}),
      Animated.timing(value,{toValue:0,duration:1900,useNativeDriver:true,isInteraction:false}),
    ]));
    loop.start();return()=>{loop.stop();value.setValue(0);};
  },[enabled,systemReduced,active,value]);
  return <Animated.View style={{width:size,height:size*1.05,transform:[{translateY:value.interpolate({inputRange:[0,1],outputRange:[0,-7]})}]}}>
    <CreatureArt id={id} stage={stage} size={size}/>
  </Animated.View>;
}
const styles=StyleSheet.create({
  button:{minHeight:54,borderRadius:20,borderWidth:1,paddingHorizontal:18,flexDirection:'row',alignItems:'center',gap:10},
  iconButton:{width:46,height:46,borderRadius:16,alignItems:'center',justifyContent:'center'},
  chip:{alignSelf:'flex-start',borderRadius:20,paddingHorizontal:11,paddingVertical:6,flexDirection:'row',alignItems:'center',gap:5},
  track:{height:8,borderRadius:10,backgroundColor:'#E6E9E8',overflow:'hidden'},
  card:{borderRadius:25,padding:18,gap:12,borderWidth:1,borderColor:C.line,...shadow},
  outlinedCard:{borderWidth:1.6,borderColor:C.ink,shadowOpacity:0,elevation:0},
  page:{width:'100%',maxWidth:MAX_WIDTH,alignSelf:'center',paddingHorizontal:20,paddingTop:16,paddingBottom:28,gap:16},
  section:{flexDirection:'row',alignItems:'center',gap:8,marginTop:7},
});
