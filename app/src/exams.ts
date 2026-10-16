import type {CategoryId,Progress,Question,Session} from './types';
import {questions} from './questions';
import {shuffle} from './game';

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
  const result:Question[]=[];const used=new Set<string>(),concepts=new Set<string>();let cursor=0;
  while(result.length<count&&cursor<count*categories.length*3){
    const cat=categories[cursor%categories.length]!;const bucket=buckets.get(cat)??[];const q=bucket.shift();
    if(q&&!used.has(q.id)){const key=`${q.category}:${q.topic??''}:${q.concept??q.id}`;if(!concepts.has(key)){used.add(q.id);concepts.add(key);result.push(q);}else bucket.push(q);}cursor++;
    if([...buckets.values()].every(x=>x.length===0))break;
  }
  if(result.length<count){for(const q of shuffle(pool,random)){if(used.has(q.id))continue;used.add(q.id);result.push(q);if(result.length===count)break;}}
  return result;
}

export function createExamSession(p:Progress,plan:ExamPlan,random=Math.random,now=Date.now()):Session|null{
  const done=new Set(p.completedIds);
  const allowed=new Set(plan.categories);
  const relevant=questions.filter(q=>allowed.has(q.category)&&!done.has(q.id));
  const selected=roundRobin(relevant,plan.categories,random,plan.questionCount);
  if(selected.length<plan.questionCount){
    const used=new Set(selected.map(q=>q.id));
    const fallback=shuffle(questions.filter(q=>!done.has(q.id)&&!used.has(q.id)&&(q.tracks?.includes('concursos')||q.tracks?.includes('enem'))),random);
    for(const q of fallback){selected.push(q);used.add(q.id);if(selected.length===plan.questionCount)break;}
  }
  if(!selected.length)return null;
  return {
    id:`exam-${now.toString(36)}-${Math.floor(random()*0x100000000).toString(36)}`,
    mode:'exam',category:selected[0]!.category,topicIds:unique(selected.map(q=>q.category)),examTitle:plan.title,examQuery:plan.query,
    items:selected.map(q=>({questionId:q.id,order:shuffle([0,1,2,3],random)})),index:0,selected:null,revealed:false,answers:[],startedAt:now,
  };
}

export function availableExamQuestionCount(p:Progress,plan:ExamPlan):number{
  const done=new Set(p.completedIds),allowed=new Set(plan.categories);
  return questions.filter(q=>allowed.has(q.category)&&!done.has(q.id)).length;
}
