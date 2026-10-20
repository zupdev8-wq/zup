import React from 'react';
import {Pressable,View} from 'react-native';
import type {SupplementalReading} from '../types';
import {Card,Chip,Txt} from './UI';
import {Icon} from './Icon';
import {openHTTPS} from '../links';
import {C} from '../theme';

const KIND={book:'LIVRO',paper:'ARTIGO CIENTÍFICO',primary:'DOCUMENTO OFICIAL'} as const;
const LINK={book:'Abrir livro',paper:'Abrir artigo',primary:'Consultar documento'} as const;

export function RecommendedReadings({readings}:{readings:SupplementalReading[]}) {
  if(!readings.length)return null;
  return <View style={{gap:11}}>
    <View style={{gap:5}}>
      <Txt size={19} bold accessibilityRole="header">Leituras complementares</Txt>
      <Txt size={13} color={C.muted} style={{lineHeight:19}}>Para aprofundar de verdade. Cada indicação traz o que observar na leitura. Artigos podem exigir acesso da revista.</Txt>
    </View>
    {readings.map((item,index)=><Card key={`${item.kind}-${item.title}-${index}`} color={C.white} style={{gap:9,borderRadius:20,padding:15}}>
      <View style={{flexDirection:'row',alignItems:'center',gap:7,flexWrap:'wrap'}}>
        <Chip color={item.kind==='paper'?C.greenLight:C.blueLight}>{KIND[item.kind]}</Chip>
        {item.language==='en'&&<Chip color={C.silver}>EM INGLÊS</Chip>}
      </View>
      <Txt size={16} bold>{item.title}</Txt>
      <Txt size={12} color={C.muted}>{item.creators}</Txt>
      <View style={{gap:4,marginTop:2}}>
        <Txt size={11} bold>O QUE BUSCAR NESSA LEITURA</Txt>
        <Txt size={14} style={{lineHeight:21}}>{item.focus}</Txt>
      </View>
      {item.url ? <Pressable accessibilityRole="link" accessibilityLabel={`${LINK[item.kind]}: ${item.title}`}
        onPress={()=>void openHTTPS(item.url!)}
        style={({pressed})=>({minHeight:44,marginTop:2,borderRadius:14,paddingHorizontal:12,backgroundColor:C.lemon,
          flexDirection:'row',alignItems:'center',gap:8,opacity:pressed?0.7:1})}>
        <Icon name="external" size={17}/><Txt size={13} bold style={{flex:1}}>{LINK[item.kind]}</Txt><Icon name="arrow" size={17}/>
      </Pressable> : <Txt size={12} color={C.muted}>Referência bibliográfica: procure pelo título e autor em bibliotecas ou livrarias.</Txt>}
    </Card>)}
    <Txt size={11} color={C.muted}>Links externos abrem no navegador. A indicação não substitui livros didáticos completos ou a orientação de um professor.</Txt>
  </View>;
}
