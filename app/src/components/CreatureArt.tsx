import React,{useId} from 'react';
import Svg,{Circle,Defs,Ellipse,G,LinearGradient,Path,Stop} from 'react-native-svg';
import type {CompanionId} from '../types';
import {companionById} from '../companions';
import {C} from '../theme';

/** ZUP! mascots: original sticker-style creatures. The silhouettes are intentionally simple at small sizes. */
export function CreatureArt({id,stage=0,size=180}:{id:CompanionId;stage?:number;size?:number}){
  const pet=companionById(id),s=Math.max(0,Math.min(3,stage));
  const uid=useId().replace(/[^a-zA-Z0-9]/g,''),grad=`pet${uid}`,glow=`glow${uid}`;
  const Face=({y=101}:{y?:number})=><G><Ellipse cx="91" cy={y} rx="6" ry="8" fill={C.ink}/><Ellipse cx="129" cy={y} rx="6" ry="8" fill={C.ink}/><Circle cx="89" cy={y-3} r="2" fill="white"/><Circle cx="127" cy={y-3} r="2" fill="white"/><Path d={`M103 ${y+15}q7 7 14 0`} fill="none" stroke={C.ink} strokeWidth="3" strokeLinecap="round"/></G>;
  const Aura=()=>s>=2?<><Circle cx="110" cy="108" r="91" fill="none" stroke={pet.color} strokeWidth="2" strokeDasharray="3 11" opacity={0.55}/>{s===3&&<Circle cx="110" cy="108" r="101" fill="none" stroke="#F4C318" strokeWidth="3" opacity={0.42}/>}</>:null;
  const Badge=()=>s===3?<G><Path d="m110 18 5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2Z" fill="#F4C318" stroke={C.ink} strokeWidth="2"/></G>:null;
  return <Svg width={size} height={size} viewBox="0 0 220 220" accessible={false}>
    <Defs><LinearGradient id={grad} x1="0" y1="0" x2="1" y2="1"><Stop offset="0" stopColor="#FFFFFF"/><Stop offset="0.3" stopColor={pet.color}/><Stop offset="1" stopColor={pet.accent}/></LinearGradient><LinearGradient id={glow} x1="0" y1="0" x2="0" y2="1"><Stop offset="0" stopColor={pet.pale}/><Stop offset="1" stopColor="#FFFFFF" stopOpacity="0"/></LinearGradient></Defs>
    <Circle cx="110" cy="108" r="102" fill={`url(#${glow})`}/><Aura/><Ellipse cx="110" cy="193" rx="55" ry="9" fill={C.ink} opacity={0.08}/><Badge/>
    {id==='capilu'&&<>
      <Path d="M60 82 39 67q-12-8-15 4 13 7 28 24m108-13 21-15q12-8 15 4-13 7-28 24" fill={pet.color} stroke={C.ink} strokeWidth="4" strokeLinecap="round"/>
      <Path d="M63 69 47 46m18 14-2-29m94 38 16-23m-18 14 2-29" stroke="#FFB5D0" strokeWidth="10" strokeLinecap="round"/>
      <Path d="M70 91q0-38 40-44 40 6 40 44v44q0 48-40 48t-40-48Z" fill={`url(#${grad})`} stroke={C.ink} strokeWidth="4"/>
      <Ellipse cx="110" cy="133" rx="31" ry="25" fill="#FFEAF2" opacity={0.92}/><Face y={101}/>
      <Ellipse cx="78" cy="120" rx="9" ry="5" fill="#FF78A8" opacity={0.6}/><Ellipse cx="142" cy="120" rx="9" ry="5" fill="#FF78A8" opacity={0.6}/>
      <Path d="M79 159q-20 7-16 21 4 10 24-4m54-17q20 7 16 21-4 10-24-4" fill={pet.color} stroke={C.ink} strokeWidth="4" strokeLinecap="round"/>
      {s>=1&&<Path d="M79 145q31 17 62 0l-5 18q-26 12-52 0Z" fill="#24262A"/>}
      {s>=2&&<Path d="m88 61 22-25 22 25-10 8-12-9-12 9Z" fill="#FFFFFFC8" stroke={C.ink} strokeWidth="3"/>}
    </>}
    {id==='oniri'&&<>
      <Path d="m70 73-21-39 40 19m61 20 21-39-40 19" fill="#F5C83A" stroke={C.ink} strokeWidth="4" strokeLinejoin="round"/><Path d="m58 47 17 9-11 8m98-17-17 9 11 8" fill="#222428"/>
      <Path d="M62 99q0-47 48-52 48 5 48 52v37q0 47-48 47t-48-47Z" fill={`url(#${grad})`} stroke={C.ink} strokeWidth="4"/>
      <Ellipse cx="110" cy="135" rx="34" ry="27" fill="#FFF3C9"/><Face y={100}/><Path d="m104 116 6 6 6-6-6-4Z" fill={C.ink}/>
      <Path d="M73 158q-19 7-15 20 4 10 24-3m65-17q19 7 15 20-4 10-24-3" fill="#F5C83A" stroke={C.ink} strokeWidth="4"/>
      <Path d="M151 160q42-2 40-30-2-19-20-15" fill="none" stroke={C.ink} strokeWidth="14" strokeLinecap="round"/><Path d="M151 160q35-2 34-27" fill="none" stroke="#F5C83A" strokeWidth="8" strokeLinecap="round"/>
      {[80,140].map((x,i)=><Path key={i} d={`M${x-7} 78q7-10 14 0-7 9-14 0Z`} fill="#25272A"/>)}
      {s>=1&&<Path d="M82 145q28 14 56 0l-4 17q-24 10-48 0Z" fill="#24262A"/>}
      {s>=2&&<Path d="m88 59 9-27 13 17 13-17 9 27-22-8Z" fill="#FFF6CA" stroke={C.ink} strokeWidth="3"/>}
    </>}
    {id==='arumi'&&<>
      {s>=2&&<><Path d="M73 107Q27 94 31 60q25 3 43 29m73 18q46-13 42-47-25 3-43 29" fill="#A9E2FF" stroke={C.ink} strokeWidth="4"/></>}
      <Path d="M74 89q0-39 36-48 36 9 36 48v49q0 45-36 45t-36-45Z" fill={`url(#${grad})`} stroke={C.ink} strokeWidth="4"/>
      <Path d="M92 48q6-24 18-30 6 17 0 30m5 0q10-19 24-18-4 17-24 25" fill="#79C8F5" stroke={C.ink} strokeWidth="3"/>
      <Ellipse cx="91" cy="101" rx="18" ry="22" fill="#F7FCFF"/><Ellipse cx="129" cy="101" rx="18" ry="22" fill="#F7FCFF"/><Face y={101}/>
      <Path d="m99 119 11 14 11-14-11-7Z" fill="#F4C318" stroke={C.ink} strokeWidth="3"/>
      <Path d="M79 157q-18 4-17 17 2 12 23 0m56-17q18 4 17 17-2 12-23 0" fill="#73BDF2" stroke={C.ink} strokeWidth="4"/>
      {s>=1&&<Path d="M84 145q26 12 52 0l-4 17q-22 9-44 0Z" fill="#24262A"/>}
      {s===3&&<Path d="m94 175 16 27 16-27-16 8Z" fill="#F4C318" stroke={C.ink} strokeWidth="3"/>}
    </>}
    {id==='guarim'&&<>
      <Path d="m67 74-23-43 43 24m66 19 23-43-43 24" fill="#78D6A7" stroke={C.ink} strokeWidth="4" strokeLinejoin="round"/><Path d="m53 44 25 14-15 12m104-26-25 14 15 12" fill="#254A3D"/>
      <Path d="M59 102q4-50 51-55 47 5 51 55l-13 31q-3 50-38 50t-38-50Z" fill={`url(#${grad})`} stroke={C.ink} strokeWidth="4"/>
      <Path d="m77 128 33-19 33 19-14 29H91Z" fill="#ECF9E8"/><Face y={99}/><Path d="m104 116 6 6 6-6-6-4Z" fill="#234B3C"/>
      <Path d="M77 160q-19 6-16 20 4 10 24-4m58-16q19 6 16 20-4 10-24-4" fill="#70D2A1" stroke={C.ink} strokeWidth="4"/>
      <Path d="M145 160q45-15 46 15 0 25-39 17" fill="#70D2A1" stroke={C.ink} strokeWidth="4"/><Path d="M178 172q7 7-2 15" fill="none" stroke="#ECF9E8" strokeWidth="9" strokeLinecap="round"/>
      {s>=1&&<Path d="M82 146q28 14 56 0l-4 17q-24 10-48 0Z" fill="#24262A"/>}
      {s>=2&&<Path d="m86 62 8-29 16 19 16-19 8 29-24-8Z" fill="#E8F8EA" stroke={C.ink} strokeWidth="3"/>}
    </>}
  </Svg>;
}
