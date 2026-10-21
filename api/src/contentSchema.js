/** Shared publication contract used by the API and the publisher CLI.
 * Publishing content is NOT publishing executable code.
 */
export const CONTENT_SCHEMA_VERSION=1;
export const CATEGORIES=new Set(`brasil historia natureza espaco ciencia cultura geografia esportes tecnologia gastronomia artes mundo geopolitica constituicao portugues economia raciocinio cinema series musica games literatura filosofia sociologia psicologia religioes teologia midia cidadania matematica fisica quimica biologia direito administracao contabilidade informatica medicina enfermagem farmacia biomedicina engenharia computacao revalida`.split(' '));
export const TRACKS=new Set(`geral brasil brasil-vivido geopolitica enem concursos faculdade humanas exatas biologicas entretenimento cinema series livros religioes pensamento historia ciencia artes tecnologia revalida games esportes musica animais`.split(' '));
const LICENSES=new Set(['MIT','CC0','CC BY 4.0','CC BY-SA 4.0','DOMINIO_PUBLICO','AUTORIZADO','ORIGINAL_PROPRIO']);
const isRecord=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const hasText=(s,min=1,max=4000)=>typeof s==='string'&&s.trim().length>=min&&s.length<=max;
const text=(obj,key,min,max,errors,prefix)=>{if(!hasText(obj?.[key],min,max))errors.push(`${prefix}.${key}: texto invalido (${min}-${max} caracteres)`)};
const https=s=>typeof s==='string'&&/^https:\/\/[^\s]+$/i.test(s)&&s.length<=1500;
const normalize=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
function checkSource(source,errors,path){
  if(!isRecord(source)||!hasText(source.title,3,260)||!https(source.url))errors.push(`${path}: fonte deve ter titulo e URL HTTPS`);
}
function checkQuestion(q,category,errors,i){
  const at=`questions[${i}]`;
  if(!isRecord(q)){errors.push(`${at}: objeto esperado`);return;}
  text(q,'id',3,110,errors,at);text(q,'question',12,650,errors,at);text(q,'fact',30,3500,errors,at);
  if(q.category!==category)errors.push(`${at}: categoria diferente do pacote`);
  if(!/^([a-z0-9_-]+)$/.test(q.id??''))errors.push(`${at}.id invalido`);
  if(/^([gx]-)/.test(q.id??''))errors.push(`${at}: gerador de repeticoes bloqueado`);
  if(!Array.isArray(q.choices)||![4,5].includes(q.choices.length)||q.choices.some(s=>!hasText(s,1,250))||new Set(q.choices.map(s=>normalize(String(s)))).size!==q.choices.length)errors.push(`${at}.choices: quatro ou cinco alternativas distintas obrigatorias`);
  if(!Number.isInteger(q.answer)||q.answer<0||(Array.isArray(q.choices)&&q.answer>=q.choices.length))errors.push(`${at}.answer: use 0-3`);
  if(!['discover','study'].includes(q.kind))errors.push(`${at}.kind: discover ou study`);
  if(!Array.isArray(q.tracks)||!q.tracks.length||q.tracks.some(t=>!TRACKS.has(t)))errors.push(`${at}.tracks: trilhas invalidas`);
  if(q.kind==='study'&&(!Array.isArray(q.tracks)||!q.tracks.some(t=>['concursos','enem','faculdade','humanas','exatas','biologicas','revalida'].includes(t))))errors.push(`${at}: estudo precisa de trilha academica`);
  if(!['facil','medio','dificil'].includes(q.difficulty))errors.push(`${at}.difficulty invalida`);
  text(q,'sourceLabel',3,250,errors,at);text(q,'rightsBasis',8,1000,errors,at);
  if(!LICENSES.has(q.sourceLicense))errors.push(`${at}.sourceLicense: licenca nao reconhecida`);
  if(q.sourceLicense?.startsWith('CC ')&&!https(q.source?.url))errors.push(`${at}: Creative Commons exige URL da fonte`);
  if(q.sourceLicense==='AUTORIZADO'&&!/autoriz|contrato|licenc/i.test(q.rightsBasis??''))errors.push(`${at}: informe evidencia documental da autorizacao`);
  if(q.source!==undefined)checkSource(q.source,errors,`${at}.source`);
  if(q.sourceLicense==='MIT'&&!https(q.licenseUrl))errors.push(`${at}: licença MIT exige link da licenca`);
  if(q.licenseUrl!==undefined&&!https(q.licenseUrl))errors.push(`${at}.licenseUrl invalida`);
  if(q.rightsStatus!==undefined&&q.rightsStatus!=='verificado')errors.push(`${at}.rightsStatus: apenas direitos verificados podem ser publicados`);
  if(q.sourceYear!==undefined&&!/^\d{4}$/.test(q.sourceYear))errors.push(`${at}.sourceYear invalido`);
}
function checkLesson(l,category,errors,i){
  const at=`lessons[${i}]`;
  if(!isRecord(l)){errors.push(`${at}: objeto esperado`);return;}
  for(const [key,min,max] of [['id',4,120],['title',5,180],['hook',10,400],['summary',25,900],['takeaway',12,600],['quizQuestionId',3,110]])text(l,key,min,max,errors,at);
  if(l.category!==category)errors.push(`${at}.category diferente do pacote`);
  if(!/^lesson-[a-z0-9_-]+$/.test(l.id??''))errors.push(`${at}.id: use lesson-... estavel`);
  if(!Array.isArray(l.tracks)||!l.tracks.length||l.tracks.some(t=>!TRACKS.has(t)))errors.push(`${at}.tracks: trilhas invalidas`);
  if(!Array.isArray(l.body)||!l.body.length||l.body.length>16||l.body.some(s=>!hasText(s,35,3000)))errors.push(`${at}.body: explicacoes completas em paragrafos`);
  if((Array.isArray(l.body)&&l.body.some(s=>normalize(s)===normalize(l.summary??'')))||normalize(l.takeaway??'')===normalize(l.summary??''))errors.push(`${at}: definicao repetida em secoes`);
  if(![1,2,3,5].includes(l.minutes))errors.push(`${at}.minutes invalido`);
  if(!/^\d{4}-\d{2}-\d{2}$/.test(l.updatedAt??''))errors.push(`${at}.updatedAt: use AAAA-MM-DD`);
  if(typeof l.evergreen!=='boolean')errors.push(`${at}.evergreen: booleano esperado`);
  if(!Array.isArray(l.sources)||!l.sources.length||l.sources.length>12)errors.push(`${at}.sources: ao menos uma fonte obrigatoria`);
  else l.sources.forEach((s,n)=>checkSource(s,errors,`${at}.sources[${n}]`));
  if(l.readMore!==undefined){
    if(!isRecord(l.readMore)||!hasText(l.readMore.heading,4,150)||!Array.isArray(l.readMore.sections)||!l.readMore.sections.length||l.readMore.sections.length>20)errors.push(`${at}.readMore invalido`);
    else l.readMore.sections.forEach((s,n)=>{if(!isRecord(s)||!hasText(s.title,3,180)||!hasText(s.text,50,4000))errors.push(`${at}.readMore.sections[${n}] invalida`)});
  }
  if(l.recommendedReadings!==undefined){
    if(!Array.isArray(l.recommendedReadings)||l.recommendedReadings.length>20)errors.push(`${at}.recommendedReadings invalidas`);
    else l.recommendedReadings.forEach((r,n)=>{
      if(!isRecord(r)||!['book','paper','primary'].includes(r.kind)||!hasText(r.title,3,300)||!hasText(r.creators,2,300)||!hasText(r.focus,10,700)||(r.url!==undefined&&!https(r.url)))errors.push(`${at}.recommendedReadings[${n}] invalida`);
    });
  }
  if(l.selfCheck!==undefined&&(!hasText(l.selfCheck?.question,12,500)||!hasText(l.selfCheck?.hint,12,500)))errors.push(`${at}.selfCheck invalido`);
}
export function validateContentBundle(bundle){
  const errors=[];
  if(!isRecord(bundle))return {valid:false,errors:['O seed deve ser um objeto JSON']};
  if(bundle.schemaVersion!==CONTENT_SCHEMA_VERSION)errors.push('schemaVersion: esta versao do aplicativo aceita somente 1');
  if(!CATEGORIES.has(bundle.category))errors.push('category: desconhecida');
  if(!Array.isArray(bundle.questions)||bundle.questions.length>1200)errors.push('questions: lista obrigatoria com no maximo 1.200 itens');
  if(!Array.isArray(bundle.lessons)||bundle.lessons.length>250)errors.push('lessons: lista obrigatoria com no maximo 250 itens');
  if(!Array.isArray(bundle.retiredQuestionIds)||bundle.retiredQuestionIds.length>1200)errors.push('retiredQuestionIds: lista obrigatoria');
  if(!Array.isArray(bundle.retiredLessonIds)||bundle.retiredLessonIds.length>250)errors.push('retiredLessonIds: lista obrigatoria');
  if(!isRecord(bundle.review)||!hasText(bundle.review.reviewedBy,3,120)||!/^\d{4}-\d{2}-\d{2}$/.test(bundle.review.reviewedAt??'')||bundle.review.accuracyChecked!==true||bundle.review.rightsChecked!==true)errors.push('review: responsavel, data e duas verificacoes obrigatorias');
  if(bundle.questions?.length===0&&bundle.lessons?.length===0&&bundle.retiredQuestionIds?.length===0&&bundle.retiredLessonIds?.length===0)errors.push('seed vazio');
  if(Array.isArray(bundle.questions))bundle.questions.forEach((q,i)=>checkQuestion(q,bundle.category,errors,i));
  if(Array.isArray(bundle.lessons))bundle.lessons.forEach((l,i)=>checkLesson(l,bundle.category,errors,i));
  for(const field of ['retiredQuestionIds','retiredLessonIds'])if(Array.isArray(bundle[field])&&bundle[field].some(s=>!hasText(s,3,120)||!/^[a-z0-9_-]+$/.test(s)))errors.push(`${field}: identificador invalido`);
  const allQuestionIds=Array.isArray(bundle.questions)?bundle.questions.map(q=>q?.id):[];
  const allLessonIds=Array.isArray(bundle.lessons)?bundle.lessons.map(l=>l?.id):[];
  for(const [name,ids] of [['questions',allQuestionIds],['lessons',allLessonIds],['retiredQuestionIds',bundle.retiredQuestionIds??[]],['retiredLessonIds',bundle.retiredLessonIds??[]]])if(new Set(ids).size!==ids.length)errors.push(`${name}: IDs duplicados`);
  if(Array.isArray(bundle.retiredQuestionIds)&&bundle.retiredQuestionIds.some(id=>allQuestionIds.includes(id)))errors.push('uma questao nao pode ser publicada e retirada no mesmo seed');
  if(Array.isArray(bundle.retiredLessonIds)&&bundle.retiredLessonIds.some(id=>allLessonIds.includes(id)))errors.push('uma aula nao pode ser publicada e retirada no mesmo seed');
  const normalized=new Set();
  for(const q of Array.isArray(bundle.questions)?bundle.questions:[]){if(typeof q.question==='string'){
    const key=normalize(q.question);
    if(normalized.has(key))errors.push('questions: enunciados duplicados');
    normalized.add(key);
  }}
  if(Buffer.byteLength(JSON.stringify(bundle))>8*1024*1024)errors.push('seed maior que 8 MB; divida por assunto');
  return {valid:errors.length===0,errors};
}
