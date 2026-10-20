import type {CategoryId,Progress,Question,Session} from './types';
import {shuffle,studyQuestions,conceptKey,distinctConcepts,unseenStudyQuestions} from './game';

export type ExamPreset={
  id:string;
  title:string;
  subtitle:string;
  keywords:string[];
  categories:CategoryId[];
};

export type ExamPlan={
  title:string;
  query:string;
  categories:CategoryId[];
  banca?:string;
  questionCount:number;
  note:string;
};

export const examPresets:ExamPreset[]=[
  {id:'revalida',title:'Revalida · geral',subtitle:'Clínica, pediatria, gineco-obstetrícia, cirurgia, urgência, ética e SUS.',keywords:['revalida','inep revalida','medico exterior','médico exterior','revalidacao medicina','revalidação medicina'],categories:['revalida','medicina','farmacia','biologia','cidadania']},
  {id:'revalida-clinica',title:'Revalida · Clínica e urgência',subtitle:'Casos clínicos, emergências, raciocínio e prioridades de segurança.',keywords:['revalida clinica','revalida clínica','revalida urgencia','revalida urgência'],categories:['revalida','medicina','farmacia']},
  {id:'cebraspe-adm',title:'Cebraspe · área administrativa',subtitle:'Português, lógica, constitucional, administrativo, informática e atualidades.',keywords:['cebraspe','cespe','administrativo','assistente','tecnico administrativo'],categories:['portugues','raciocinio','constituicao','direito','administracao','informatica','geopolitica','brasil']},
  {id:'camara',title:'Câmara Municipal · nível médio',subtitle:'Base ampla para cargos administrativos e legislativos municipais.',keywords:['camara','câmara','legislativo municipal','vereador'],categories:['portugues','raciocinio','constituicao','direito','administracao','informatica','brasil','historia','geografia']},
  {id:'prefeitura',title:'Prefeitura · área administrativa',subtitle:'Base recorrente de concursos municipais.',keywords:['prefeitura','municipio','município','agente administrativo'],categories:['portugues','raciocinio','administracao','direito','constituicao','informatica','brasil','geografia']},
  {id:'policial',title:'Carreiras policiais',subtitle:'Direito, constitucional, lógica, português, informática e atualidades.',keywords:['policia','polícia','pf','prf','pc','pm','investigador','escrivao','escrivão','delegado'],categories:['direito','constituicao','portugues','raciocinio','informatica','geopolitica','brasil']},
  {id:'fiscal',title:'Área fiscal e controle',subtitle:'Contabilidade, administração, direito, economia, português e raciocínio.',keywords:['fiscal','auditor','receita','controladoria','controle','sefaz','tce','tcu'],categories:['contabilidade','administracao','direito','constituicao','economia','portugues','raciocinio','informatica']},
  {id:'saude',title:'Concursos da saúde',subtitle:'Biologia, saúde, português, SUS/cidadania e conhecimentos gerais.',keywords:['saude','saúde','enfermagem','enfermeiro','medicina','medico','médico','farmacia','farmácia','biomedicina'],categories:['medicina','enfermagem','farmacia','biomedicina','biologia','portugues','cidadania','brasil']},
  {id:'ti',title:'Tecnologia e TI',subtitle:'Computação, informática, tecnologia, lógica e português.',keywords:['ti','tecnologia','analista de sistemas','computacao','computação','informatica','informática','desenvolvedor'],categories:['computacao','informatica','tecnologia','raciocinio','portugues','administracao']},
  {id:'engenharia',title:'Engenharia',subtitle:'Exatas, raciocínio, engenharia, informática e português.',keywords:['engenharia','engenheiro','civil','eletrica','elétrica','mecanica','mecânica'],categories:['engenharia','matematica','fisica','raciocinio','informatica','portugues']},
  {id:'oab',title:'OAB · 1ª fase',subtitle:'Direito e Constituição com treino rápido e explicações.',keywords:['oab','ordem dos advogados'],categories:['direito','constituicao','portugues','cidadania']},
  {id:'enem',title:'ENEM · geral',subtitle:'Humanas, linguagens, natureza e matemática em uma sessão longa.',keywords:['enem','exame nacional do ensino medio','exame nacional do ensino médio'],categories:['portugues','literatura','historia','geografia','filosofia','sociologia','matematica','fisica','quimica','biologia','artes']},
  {id:'medicina-faculdade',title:'Faculdade · Medicina',subtitle:'Biologia, medicina, química, fisiologia e saúde.',keywords:['faculdade medicina','prova medicina','anatomia','fisiologia'],categories:['medicina','biologia','quimica','biomedicina','farmacia']},
  {id:'direito-faculdade',title:'Faculdade · Direito',subtitle:'Constitucional, teoria do direito, cidadania e interpretação.',keywords:['faculdade direito','prova direito','constitucional'],categories:['direito','constituicao','portugues','filosofia','cidadania']},
  {id:'contabilidade-faculdade',title:'Faculdade · Contabilidade',subtitle:'Contabilidade, economia, administração e matemática.',keywords:['faculdade contabilidade','crc','cfc','contabil','contábil'],categories:['contabilidade','economia','administracao','matematica','raciocinio']},
];

const normalize=(value:string)=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const unique=<T,>(xs:T[])=>[...new Set(xs)];

const keywordCategories:[string[],CategoryId[]][]=[
  [['portugues','português','lingua portuguesa','língua portuguesa'],['portugues']],
  [['matematica','matemática'],['matematica','raciocinio']],
  [['raciocinio','raciocínio','logica','lógica'],['raciocinio']],
  [['constitucional','constituicao','constituição'],['constituicao','direito']],
  [['administrativo','administracao publica','administração pública'],['administracao','direito']],
  [['informatica','informática','computacao','computação','ti'],['informatica','computacao','tecnologia']],
  [['contabilidade','contabil','contábil'],['contabilidade','economia']],
  [['economia','economico','econômico'],['economia']],
  [['historia','história'],['historia']],
  [['geografia'],['geografia']],
  [['atualidades','geopolitica','geopolítica'],['geopolitica','brasil']],
  [['direito','juridico','jurídico'],['direito','constituicao']],
  [['psicologia'],['psicologia']],
  [['revalida','revalidacao','revalidação'],['revalida','medicina','cidadania']],
  [['medicina','medico','médico'],['medicina','biologia','revalida']],
  [['enfermagem','enfermeiro'],['enfermagem','biologia']],
  [['farmacia','farmácia'],['farmacia','quimica']],
  [['biomedicina'],['biomedicina','biologia']],
  [['engenharia','engenheiro'],['engenharia','matematica','fisica']],
  [['quimica','química'],['quimica']],
  [['fisica','física'],['fisica']],
  [['biologia'],['biologia']],
];

export function searchExamPresets(query:string):ExamPreset[]{
  const q=normalize(query.trim());
  if(!q)return examPresets.slice(0,8);
  return examPresets.map(p=>({p,score:p.keywords.reduce((s,k)=>s+(q.includes(normalize(k))?4:normalize(`${p.title} ${p.subtitle}`).includes(q)?1:0),0)}))
    .filter(x=>x.score>0).sort((a,b)=>b.score-a.score).map(x=>x.p).slice(0,8);
}

export function buildExamPlan(query:string,presetId?:string,count=45):ExamPlan{
  const cleaned=query.trim().replace(/\s+/g,' ');
  const q=normalize(cleaned);
  const preset=examPresets.find(p=>p.id===presetId)??searchExamPresets(cleaned)[0];
  const categories:CategoryId[]=[];
  if(preset)categories.push(...preset.categories);
  for(const [terms,cats] of keywordCategories)if(terms.some(k=>q.includes(normalize(k))))categories.push(...cats);
  if(/camara|câmara|prefeitura|municipal|concurso/.test(q))categories.push('brasil','portugues','raciocinio','constituicao','administracao','informatica');
  if(/cebraspe|cespe/.test(q))categories.push('portugues','raciocinio','constituicao','direito','administracao','informatica','geopolitica');
  if(/revalida|revalidacao|revalidação/.test(q))categories.push('revalida','medicina','farmacia','biologia','cidadania');
  const banca=/cebraspe|cespe/.test(q)?'Cebraspe':/fgv/.test(q)?'FGV':/vunesp/.test(q)?'Vunesp':/fcc/.test(q)?'FCC':undefined;
  const fallback:CategoryId[]=['portugues','raciocinio','brasil','geopolitica','historia','informatica','constituicao'];
  const final=unique<CategoryId>(categories.length?categories:fallback);
  return {
    title:cleaned||preset?.title||'Simulado inteligente',query:cleaned||preset?.title||'simulado geral',categories:final,banca,questionCount:Math.max(10,Math.min(60,count)),
    note:banca?`O ZUP seleciona questões próprias nas áreas compatíveis com ${banca}. Não reproduz uma prova oficial nem substitui a leitura do edital.`:'O ZUP monta o simulado com questões próprias a partir dos assuntos identificados. Para máxima fidelidade, descreva também as matérias do edital.',
  };
}

function roundRobin(pool:Question[],categories:CategoryId[],random:()=>number,count:number):Question[]{
  const buckets=new Map<CategoryId,Question[]>();
  for(const cat of categories)buckets.set(cat,shuffle(pool.filter(q=>q.category===cat),random));
  const result:Question[]=[],seen=new Set<string>();
  while(result.length<count&&[...buckets.values()].some(bucket=>bucket.length>0)){
    for(const cat of categories){
      const bucket=buckets.get(cat),q=bucket?.shift();
      if(!q)continue;
      const key=conceptKey(q);
      if(seen.has(key))continue;
      seen.add(key);result.push(q);
      if(result.length===count)break;
    }
  }
  return result;
}

export function createExamSession(p:Progress,plan:ExamPlan,random=Math.random,now=Date.now()):Session|null{
  const allowed=new Set(plan.categories);
  const relevant=unseenStudyQuestions(p,studyQuestions.filter(q=>allowed.has(q.category)&&q.kind!=='discover'&&!q.id.startsWith('t-')));
  const selected=roundRobin(distinctConcepts(relevant,random,relevant.length),plan.categories,random,plan.questionCount);
  // Se não houver questões novas da matéria, mostramos menos que o total
  // pedido. Nunca preenchemos vagas com perguntas fora do simulado.
  if(!selected.length)return null;
  return {
    id:`exam-${now.toString(36)}-${Math.floor(random()*0x100000000).toString(36)}`,
    mode:'exam',category:selected[0]!.category,topicIds:unique(selected.map(q=>q.category)),examTitle:plan.title,examQuery:plan.query,
    items:selected.map(q=>({questionId:q.id,order:shuffle(q.choices.map((_,i)=>i),random)})),index:0,selected:null,revealed:false,answers:[],startedAt:now,
  };
}

export function availableExamQuestionCount(p:Progress,plan:ExamPlan):number{
  const allowed=new Set(plan.categories);
  return new Set(unseenStudyQuestions(p,studyQuestions.filter(q=>allowed.has(q.category)&&q.kind!=='discover'&&!q.id.startsWith('t-'))).map(conceptKey)).size;
}
