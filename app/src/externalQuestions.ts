/**
 * Curiosidades locais mínimas, com fonte específica verificável.
 * Todo crescimento do acervo passa a ser feito por seeds remotos revisados.
 */
import type {Question} from './types';
import {importedQuestions} from './importedQuestions';

const userCuriosity=(id:number,question:string,choices:[string,string,string,string],answer:number,fact:string,source:Question['source']):Question=>({
  id:`t-${String(id).padStart(4,'0')}`,category:'natureza',topic:'curiosidades-natureza',concept:`curiosidade-${id}`,
  question,choices,answer,fact,source,tracks:['entretenimento','ciencia','animais','biologicas','geral'],difficulty:'facil',kind:'discover',
});

// As duas questões abaixo têm fonte específica, resposta inequívoca e explicação contextual.
export const verifiedNatureQuestions:Question[]=[
  userCuriosity(26,'O que os ursos-polares comem principalmente?',['Focas','Pinguins','Bambu','Coalas'],0,'Explicação: focas-aneladas e focas-barbudas estão entre as presas mais importantes do urso-polar no Ártico. A associação com pinguins é enganosa porque pinguins vivem no Hemisfério Sul. Dica: antes de escolher, compare também o habitat do predador e das possíveis presas.',{title:'WWF · Polar Bear',url:'https://www.worldwildlife.org/species/polar-bear/'}),
  userCuriosity(27,'Qual ave pode alcançar as maiores velocidades durante um mergulho de caça?',['Falcão-peregrino','Avestruz','Albatroz','Águia-pescadora'],0,'Explicação: o falcão-peregrino pode ultrapassar 300 km/h durante o mergulho de caça. Esse recorde se refere ao mergulho, não ao voo horizontal sustentado. Dica: diferencie velocidade em queda controlada de velocidade de cruzeiro.',{title:'Guinness World Records · Fastest bird (diving)',url:'https://www.guinnessworldrecords.com/world-records/70929-fastest-bird-diving'}),
];

// Compatibilidade com imports antigos: o antigo lote OpenTDB local foi retirado da build.
export const licensedTriviaQuestions:Question[]=[];
export const sourcedCuriosityQuestions:Question[]=[...verifiedNatureQuestions,...importedQuestions.filter(q=>q.kind==='discover')];
