import {Alert,Linking,Share} from 'react-native';
import type {Question} from './types';
export const privacyURL=process.env.EXPO_PUBLIC_PRIVACY_URL?.trim()??'';
export const supportURL=process.env.EXPO_PUBLIC_SUPPORT_URL?.trim()??'';
export async function openHTTPS(url:string) {
  try {
    if(!/^https:\/\//i.test(url))throw new Error('invalid_url');
    const parsed=new URL(url);
    if(!parsed.hostname||parsed.username||parsed.password)throw new Error('invalid_url');
    await Linking.openURL(url);
  }catch{Alert.alert('Não foi possível abrir','Verifique a conexão ou tente novamente mais tarde.');}
}
export async function reportQuestion(q:Question) {
  try {
    await Share.share({title:'Revisão de conteúdo ZUP!',message:`Revisão de conteúdo ZUP! 1.6.0\nQuestão: ${q.id}\n${q.question}\nResposta do catálogo: ${q.choices[q.answer]}\nObservação: `});
  }catch{Alert.alert('Não foi possível compartilhar','Tente novamente.');}
}
