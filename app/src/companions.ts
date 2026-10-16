import type { CompanionId } from './types';
export type Companion = {id:CompanionId;name:string;animal:string;title:string;description:string;color:string;pale:string;accent:string;skill:string};
export const companions: Companion[] = [
  {id:'capilu',name:'Lumi',animal:'criatura de maré',title:'Curiosidade em estado líquido',description:'Um sticker vivo, luminoso e inquieto. As antenas e a aura mudam conforme seu repertório cresce.',color:'#F18BB4',pale:'#FCE4EF',accent:'#9D456F',skill:'Pulso curioso'},
  {id:'oniri',name:'Jaci',animal:'felino solar',title:'Energia para ir até o fim',description:'Compacto, confiante e cheio de expressão. As marcas solares ficam mais raras a cada evolução.',color:'#F5C53D',pale:'#FFF1B9',accent:'#805A17',skill:'Salto solar'},
  {id:'arumi',name:'Zavi',animal:'criatura celeste',title:'Ideias em alta velocidade',description:'Um companheiro leve de formas aerodinâmicas. As asas aparecem conforme você avança no jogo.',color:'#73BDF2',pale:'#DDEFFF',accent:'#2A6591',skill:'Rastro azul'},
  {id:'guarim',name:'Nox',animal:'raposa de folha',title:'Instinto para encontrar padrões',description:'Observador, minimalista e esperto. O visual ganha coroa de folhas e aura conforme você aprende.',color:'#6FD1A1',pale:'#E0F5E9',accent:'#2E7657',skill:'Trilha viva'},
];
export type EvolutionStage={id:0|1|2|3;label:string;minXP:number;level:number};
export const evolutionStages:EvolutionStage[]=[
  {id:0,label:'Faísca',minXP:0,level:1},{id:1,label:'Impulso',minXP:800,level:5},{id:2,label:'Ascendente',minXP:2200,level:12},{id:3,label:'Lendário',minXP:4800,level:25},
];
export const companionById=(id:CompanionId)=>companions.find(c=>c.id===id)??companions[0]!;
export function evolution(xp:number){const safe=Number.isFinite(xp)?Math.max(0,xp):0;let stage=evolutionStages[0]!;for(const item of evolutionStages)if(safe>=item.minXP)stage=item;const next=evolutionStages[stage.id+1]??null;const span=next?next.minXP-stage.minXP:1;const fraction=next?Math.max(0,Math.min(1,(safe-stage.minXP)/span)):1;const remaining=next?Math.max(0,next.minXP-safe):0;const power=Math.min(999,Math.max(1,Math.floor(10+safe/22+stage.id*14)));return {stage,next,fraction,remaining,power};}
