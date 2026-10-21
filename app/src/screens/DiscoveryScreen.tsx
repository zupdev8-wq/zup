import React from 'react';
import {Pressable} from 'react-native';
import type {Question} from '../types';
import {getCategory} from '../catalog';
import {CategoryArt} from '../components/CategoryArt';
import {Txt,Page,Card,Button,Chip} from '../components/UI';
import {openHTTPS,reportQuestion} from '../links';
import {C} from '../theme';
export function DiscoveryScreen({q,start}:{q:Question;start:()=>void}) {
  const c=getCategory(q.category);
  return <Page><Chip color={c.light} icon="sparkles">VOCÊ SABIA?</Chip>
    <Card color={c.light} style={{alignItems:'center',paddingVertical:24}}><CategoryArt id={q.category} size={155}/></Card>
    <Txt size={28} bold accessibilityRole="header">{q.question}</Txt><Txt size={22} bold>{q.choices[q.answer]}</Txt><Txt size={18}>{q.fact}</Txt>
    {q.source&&<Button title={q.source.title} icon="external" variant="outline" onPress={()=>void openHTTPS(q.source!.url)}/>}
    {q.sourceLabel&&!q.source&&<Txt size={12} color={C.muted}>Origem: {q.sourceLabel}</Txt>}
    {q.sourceLicense&&<Txt size={11} color={C.muted}>Licença registrada: {q.sourceLicense}</Txt>}
    {q.attribution&&<Txt size={11} color={C.muted}>Créditos: {q.attribution}</Txt>}
    {q.licenseUrl&&<Button title="Consultar licença de reutilização" variant="outline" onPress={()=>void openHTTPS(q.licenseUrl!)}/>}
    <Button title="Explorar este universo" variant="dark" onPress={start}/>
    <Pressable onPress={()=>void reportQuestion(q)} accessibilityRole="button" style={{minHeight:48,justifyContent:'center'}}><Txt size={12} color={C.muted}>Sugerir revisão desta descoberta</Txt></Pressable>
  </Page>;
}
