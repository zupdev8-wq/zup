import React from 'react';
import {Pressable,View} from 'react-native';
import type {PhotoAsset} from '../photos';
import {openHTTPS} from '../links';
import {Txt} from './UI';

/** Crédito compacto e links para a fonte/licença da imagem realmente exibida. */
export function PhotoCredit({asset}:{asset?:PhotoAsset}) {
  if(!asset)return null;
  const author=asset.author.length>26?`${asset.author.slice(0,24)}…`:asset.author;
  return <View style={{alignSelf:'flex-start',maxWidth:'100%',flexDirection:'row',alignItems:'center',flexWrap:'wrap',gap:5}}>
    <Pressable accessibilityRole="link" accessibilityLabel={`Ver origem da imagem de ${asset.author}`}
      onPress={()=>void openHTTPS(asset.sourceUrl)}
      style={{alignSelf:'flex-start',borderRadius:12,backgroundColor:'#030609B8',paddingHorizontal:8,paddingVertical:5,borderWidth:1,borderColor:'#FFFFFF24'}}>
      <Txt size={9} color="#FFFFFF" numberOfLines={1}>Imagem: {author}</Txt>
    </Pressable>
    <Pressable accessibilityRole="link" accessibilityLabel={`Ver licença ${asset.license}`}
      onPress={()=>void openHTTPS(asset.licenseUrl)}
      style={{alignSelf:'flex-start',borderRadius:12,backgroundColor:'#030609B8',paddingHorizontal:8,paddingVertical:5,borderWidth:1,borderColor:'#FFFFFF24'}}>
      <Txt size={9} color="#FFFFFF">{asset.license}</Txt>
    </Pressable>
  </View>;
}
