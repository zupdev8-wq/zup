#!/usr/bin/env node
'use strict';
/**
 * ZUP! | lotes editoriais de 250 perguntas por categoria.
 * Metas: 250, 500, 750; somente depois iniciar outra categoria.
 * Usar na RAIZ do ZUP! 2.1.0+, junto de scripts/prepare-curadoria-seeds.cjs.
 *
 * Sem dependencias npm adicionais. --audit, --build e --check sao locais.
 * --publish precisa de ZUP_CONTENT_ADMIN_TOKEN e confirmacao literal PUBLICAR.
 */
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const {spawnSync} = require('node:child_process');
const ROOT = path.resolve(__dirname, '..');
const BATCH_SIZE = 250;
const MAX_BATCHES = 3;
const STATE_PATH = path.join(ROOT, 'lotes', 'controle-publicacoes.json');
const CSV_FILES = ['perguntas-4-alternativas.csv', 'perguntas-5-alternativas.csv'];
const API = (process.env.ZUP_CONTENT_API_URL || 'https://zup-api.onrender.com').replace(/\/+$/, '');
const safeCategory = s => /^[a-z]+$/.test(String(s || ''));
const normalize = s => String(s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const hash = s => crypto.createHash('sha256').update(String(s)).digest('hex');
const round = q => [...new Set(normalize(q).split(' ').filter(w => w.length >= 3 && !new Set(['qual','quais','quando','onde','como','sobre','destes','dessas','desse','destas','para','pela','pelo','seu','sua','são','foi','esta','este','que','uma','das','dos','nos','nas','com','sem','das','não','nao','por']).has(w)))];
const jaccard = (aa, bb) => {
  const a = new Set(aa), b = new Set(bb);
  const intersection = [...a].filter(x => b.has(x)).length;
  return intersection / (a.size + b.size - intersection || 1);
};
const len = x => Array.isArray(x) ? x.length : 0;
const bundleFile = (category, lot) => path.join(ROOT,'lotes',category,`lote-${String(lot).padStart(2,'0')}.cjs`);
function checkName(category, lot) {
  if (!safeCategory(category)) throw Error('Informe a categoria, por exemplo games ou literatura.');
  if (lot !== undefined && (!Number.isInteger(lot) || lot < 1 || lot > MAX_BATCHES))
    throw Error('Os lotes permitidos sao 1, 2 e 3 (250, 500, 750).');
}
function readState() {
  if (!fs.existsSync(STATE_PATH)) return {activeCategory:null,completed:[],history:[]};
  const data = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  if (!Array.isArray(data.history) || !Array.isArray(data.completed)) throw Error('Arquivo de controle invalido; nao publique ate corrigir.');
  return data;
}
function writeState(state) {
  fs.mkdirSync(path.dirname(STATE_PATH), {recursive:true});
  const tmp = STATE_PATH + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(state,null,2) + '\n', {mode:0o600});
  fs.renameSync(tmp, STATE_PATH);
}
function readBundle(category, lot) {
  const file = bundleFile(category,lot);
  if (!fs.existsSync(file)) throw Error(`Nao existe ${path.relative(ROOT,file)}. Primeiro prepare o lote.`);
  // O arquivo CJS exporta APENAS um objeto de seed (sem side effects no require).
  const parsed = require(file);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw Error('Lote deve exportar um objeto.');
  return parsed;
}
async function schema() {
  return import(pathToFileURL(path.join(ROOT, 'api','src','contentSchema.js')).href);
}
const {pathToFileURL}=require('node:url');
function questionIdentity(q) {
  return `${normalize(q.question)}|${(q.choices ?? []).map(normalize).sort().join('|')}`;
}
function sourceIdentity(q) {
  return `${normalize(q.sourceLabel)}|${String(q.sourceItemId ?? '').trim()}`;
}
function problems(questions) {
  const errors = [];
  const ids = new Map(), statements = new Map(), facts = new Map(), sourceIds = new Map(), suspicious=[];
  const previous = [];
  for (const q of questions) {
    if (ids.has(q.id)) errors.push(`ID duplicado: ${q.id}`);
    ids.set(q.id, true);
    const text = normalize(q.question);
    const ident = questionIdentity(q);
    if (statements.has(text)) errors.push(`Pergunta repetida: ${q.id} e ${statements.get(text)}`);
    statements.set(text, q.id);
    const src=sourceIdentity(q);
    if (q.sourceItemId && sourceIds.has(src)) errors.push(`Mesma origem repetida: ${q.id} e ${sourceIds.get(src)}`);
    if (q.sourceItemId) sourceIds.set(src,q.id);
    const currentTokens=round(q.question);
    // Precisao conservadora: apenas enunciados muito proximos, com mesmo gabarito textual.
    // Revisao humana continua necessaria para repetições de conceitos sem semelhança lexical.
    const answer = normalize(q.choices?.[q.answer]);
    for(const p of previous){
      if(p.answer !== answer || currentTokens.length < 5 || p.tokens.length < 5)continue;
      const similarity=jaccard(currentTokens,p.tokens);
      if(similarity>=0.86) errors.push(`Provavel duplicata semantica: ${q.id} e ${p.id} (similaridade ${(similarity*100).toFixed(0)}%).`);
    }
    previous.push({id:q.id,tokens:currentTokens,answer});
    const explanation = normalize(q.fact);
    if(explanation && facts.has(explanation)) errors.push(`Explicacao repetida: ${q.id} e ${facts.get(explanation)}`);
    if(explanation)facts.set(explanation,q.id);
    const tokenWords = new Set(round(q.question + ' ' + (q.choices?.[q.answer] || '')));
    const newWords = round(q.fact).filter(w=>!tokenWords.has(w));
    if(explanation.length < 45 || newWords.length<3) suspicious.push(`${q.id}: justificativa curta ou basicamente repeticao do enunciado/resposta`);
    if(!q.sourceItemId) suspicious.push(`${q.id}: origem sem identificador individual`);
    if(!q.attribution) suspicious.push(`${q.id}: sem texto de atribuicao`);
    if((q.sourceLicense||'').startsWith('CC ')&&!q.licenseUrl) errors.push(`${q.id}: Creative Commons sem URL da licenca`);
    if(!q.rightsBasis || q.rightsStatus!=='verificado') errors.push(`${q.id}: status dos direitos nao verificado`);
    if(q.fact && /^(?:a|o|e|sao)\s+.{0,30}\s+(?:e|foi)\s+(?:a|o)?\s*resposta/i.test(normalize(q.fact))) suspicious.push(`${q.id}: explicacao possivelmente automatica`);
  }
  if(suspicious.length) errors.push(...suspicious);
  return errors;
}
async function checkLocal(category, lot, {quiet=false}={}) {
  checkName(category,lot);
  const {validateContentBundle}=await schema();
  const current=readBundle(category,lot);
  if(current.category!==category) throw Error('Categoria do arquivo diferente da solicitada.');
  if(current.questions?.length!==BATCH_SIZE)throw Error(`O lote precisa ter EXATAMENTE ${BATCH_SIZE} perguntas; encontrado ${current.questions?.length??0}.`);
  if(len(current.lessons)||len(current.retiredQuestionIds)||len(current.retiredLessonIds))throw Error('Lotes de perguntas nao devem alterar aulas nem apagar conteudo.');
  const currentCheck=validateContentBundle(current);
  if(!currentCheck.valid)throw Error(`Schema invalido:\n${currentCheck.errors.slice(0,20).join('\n')}`);
  const all=[...current.questions];
  for(let prev=1;prev<lot;prev++) {
    const old=readBundle(category,prev);
    if(old.category!==category||old.questions?.length!==BATCH_SIZE)throw Error(`Lote ${prev} anterior incompleto.`);
    all.push(...old.questions);
  }
  const issues=problems(all);
  if(issues.length)throw Error(`${issues.length} pendencias detectadas:\n${issues.slice(0,20).join('\n')}`);
  if(!quiet)console.log(`APROVADO LOCALMENTE: ${category} | lote ${lot} | ${BATCH_SIZE} novas | ${all.length} distintas acumuladas.`);
  return {current,all};
}
function readCsvRows(){
  const {readRows}=require('./import-question-bank.cjs');
  const files=CSV_FILES.map(x=>path.join(ROOT,'dados-curadoria',x));
  if(files.some(x=>!fs.existsSync(x)))throw Error('Nao encontrei dados-curadoria/perguntas-4-alternativas.csv e perguntas-5-alternativas.csv na raiz do ZUP!. Extraia antes o pacote de curadoria anterior.');
  return files.flatMap(readRows);
}
async function eligible(category){
  const {CATEGORIES,TRACKS}=await schema();
  const {processRows}=require('./prepare-curadoria-seeds.cjs');
  const rows=readCsvRows().filter(r=>r.category===category);
  const {result,groups}=processRows(rows,CATEGORIES,TRACKS);
  const approved=(groups.get(category)||[]);
  return {total:rows.length,approved,errors:result.errors,drafts:result.draft,rightsPending:result.rightsPending};
}
async function audit(category){
  checkName(category);
  const {CATEGORIES}=await schema();
  if(!CATEGORIES.has(category))throw Error('Categoria nao existe no ZUP!.');
  const result=await eligible(category);
  console.log(`ZUP! / ${category.toUpperCase()} / META 750`);
  console.log(`Candidatas na curadoria: ${result.total}`);
  console.log(`Aprovadas estruturalmente com fonte, justificativa e direitos: ${result.approved.length}`);
  const stronger=result.approved.filter(x=>problems([x.question]).length===0).length;
  console.log(`Passam tambem no filtro extra contra justificativa superficial: ${stronger}`);
  const pending = Math.max(0,BATCH_SIZE - stronger);
  console.log(`Faltam para FORMAR o lote 1: ${pending}`);
  if(result.errors.length)console.log(`Pendencias entre os registros marcados aprovados: ${result.errors.length}\nExemplos:\n${result.errors.slice(0,4).join('\n')}`);
  let stored=0;
  for(let i=1;i<=MAX_BATCHES;i++)if(fs.existsSync(bundleFile(category,i)))stored++;
  console.log(`Arquivos de lote existentes: ${stored}/3. Publicacao: conferir Neon; contagem local nao prova publicacao.`);
  if(pending)console.log('O script nao gera 250 perguntas ficticias. Revise as candidatas ate haver 250 aptas.');
  return result;
}
function makeExecutable(seed, category, lot){
  const payload=JSON.stringify(seed,null,2);
  return `#!/usr/bin/env node\n'use strict';\n/** ZUP! ${category} / lote ${lot} de 3. Conteudo imutavel por ID. */\nconst bundle = ${payload};\nmodule.exports=bundle;\nif(require.main===module){\n  const params=process.argv.slice(2);\n  if(!params.includes('--check')&&!params.includes('--publish')){\n    console.error('Uso: node lotes/${category}/lote-${String(lot).padStart(2,'0')}.cjs --check OU --publish --confirm PUBLICAR');\n    process.exitCode=2;\n  }else{\n    require('../../scripts/zup-lotes-250.cjs').run([params.includes('--publish')?'--publish':'--check','${category}','${lot}',...params.filter(x=>x!=='--publish'&&x!=='--check')]).catch(e=>{console.error('ERRO:',e.message);process.exitCode=1});\n  }\n}\n`;
}
function spread(items) {
  // Distribuicao deterministica por universo/obra/topico; nao favorece 250 perguntas do mesmo titulo.
  const buckets=new Map();
  for(const item of items){const q=item.question;const key=(q.universe || q.workTitle || q.topic || 'outros').slice(0,90).toLowerCase();
    if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(item);
  }
  for(const bucket of buckets.values())bucket.sort((a,b)=>hash(a.sourceId).localeCompare(hash(b.sourceId)));
  const keys=[...buckets.keys()].sort();const result=[];
  while(keys.length){
    for(let i=0;i<keys.length;){
      const q=buckets.get(keys[i]).shift();result.push(q);
      if(!buckets.get(keys[i]).length)keys.splice(i,1);else i++;
    }
  }
  return result;
}
async function build(category, lot){
  checkName(category,lot);
  if(fs.existsSync(bundleFile(category,lot)))throw Error('Este lote ja existe. Nao sobrescreva um seed criado; preserve o historico.');
  if(lot>1)for(let prev=1;prev<lot;prev++)readBundle(category,prev);
  const {approved,total}=await eligible(category);
  let ids=new Set(),sourceIds=new Set(),normalized=new Set();const oldQuestions=[];
  for(let prev=1;prev<lot;prev++)for(const q of readBundle(category,prev).questions){ids.add(q.id);normalized.add(normalize(q.question));sourceIds.add(sourceIdentity(q));oldQuestions.push(q)}
  const subset=spread(approved).filter(x=>!ids.has(x.question.id)&&!normalized.has(normalize(x.question.question))&&!sourceIds.has(sourceIdentity(x.question)));
  // Exige diversidade e verificacao individual; nunca inventa/faz padding para fechar 250.
  const selected=[],errors=[];
  for (const item of subset){
    const check=problems([...oldQuestions,...selected.map(x=>x.question),item.question]);
    if(check.length){errors.push({id:item.sourceId,reason:check[0]});continue;}
    selected.push(item);
    if(selected.length===BATCH_SIZE)break;
  }
  if(selected.length<BATCH_SIZE)throw Error(`Nao foi criado lote ${lot} de ${category}. Existem ${total} candidatas, ${approved.length} aptas pelo importador, mas so ${selected.length}/250 passaram nos filtros adicionais de qualidade e diversidade (exemplos: ${errors.slice(0,5).map(x=>x.id+' '+x.reason).join('; ')}). Aumente a curadoria, sem inventar explicacoes.`);
  const reviewedBy=[...new Set(selected.map(x=>x.reviewer))];
  const seed={schemaVersion:1,category,questions:selected.map(x=>x.question),lessons:[],retiredQuestionIds:[],retiredLessonIds:[],review:{reviewedBy:reviewedBy.length===1?reviewedBy[0]:'Equipe de curadoria ZUP',reviewedAt:selected.map(x=>x.reviewedAt).sort().at(-1),accuracyChecked:true,rightsChecked:true}};
  // Valida ja no gerador antes de criar arquivo.
  const {validateContentBundle}=await schema();
  const check=validateContentBundle(seed);
  if(!check.valid)throw Error('Nao gerou lote: '+check.errors.slice(0,5).join('; '));
  fs.mkdirSync(path.dirname(bundleFile(category,lot)),{recursive:true});
  fs.writeFileSync(bundleFile(category,lot),makeExecutable(seed,category,lot));
  await checkLocal(category,lot);
  console.log(`Lote criado: ${path.relative(ROOT,bundleFile(category,lot))}`);
}
async function fetchCurrent(category){
  const response=await fetch(`${API}/v1/content/bundles/${encodeURIComponent(category)}`,{signal:AbortSignal.timeout(25000)});
  if(response.status===404)return null;
  if(!response.ok)throw Error(`Falha ao consultar Render: HTTP ${response.status}. Nada publicado.`);
  const data=await response.json();
  if(!Array.isArray(data.questions) || data.category!==category)throw Error('Resposta inesperada do servidor: pare antes de publicar.');
  return data;
}
function canonical(obj){
  if(Array.isArray(obj))return obj.map(canonical);
  if(obj&&typeof obj==='object')return Object.fromEntries(Object.keys(obj).sort().map(k=>[k,canonical(obj[k])]));
  return obj;
}
function sameData(a,b){return JSON.stringify(canonical(a))===JSON.stringify(canonical(b))}
async function publish(category,lot,confirm){
  checkName(category,lot);
  if(confirm!=='PUBLICAR')throw Error('Nenhuma pergunta publicada. Para confirmar, use --confirm PUBLICAR.');
  if((process.env.ZUP_CONTENT_ADMIN_TOKEN||'').length<32)throw Error('Configure ZUP_CONTENT_ADMIN_TOKEN no terminal, igual ao Render (nao no codigo).');
  const state=readState();
  if(state.activeCategory&&state.activeCategory!==category)throw Error(`Categoria ${state.activeCategory} ainda em andamento. Conclua 750 antes de iniciar ${category}.`);
  if(state.completed.includes(category))throw Error(`${category} ja concluiu 750 perguntas. Comece outra categoria.`);
  const {current}=await checkLocal(category,lot);
  const before=await fetchCurrent(category);
  const n=before?.questions?.length??0;
  const expectedBefore=(lot-1)*BATCH_SIZE;
  const expectedAfter=lot*BATCH_SIZE;
  const seen=new Map((before?.questions||[]).map(q=>[q.id,q]));
  if(n===expectedAfter){
    const unchanged=current.questions.every(q=>seen.has(q.id)&&sameData(seen.get(q.id),q));
    if(unchanged){console.log(`Lote ${lot} ja publicado com ${n} perguntas identicas. Nada alterado.`);return;}
    throw Error(`Servidor possui ${n} perguntas, mas o lote difere dos dados publicados. Use rollback/revisao editorial, nao force outro lote.`);
  }
  if(n!==expectedBefore)throw Error(`BLOQUEADO: Neon tem ${n} perguntas em ${category}; esperado ${expectedBefore} antes do lote ${lot}. Nao substituir nem misturar historicos automaticamente.`);
  if(lot>1){
    for(let oldLot=1;oldLot<lot;oldLot++){
      const old=readBundle(category,oldLot);
      for(const q of old.questions){
        const db=seen.get(q.id);
        if(!db||!sameData(q,db))throw Error(`Lote ${oldLot} nao corresponde ao publicado: ${q.id}. Pare e confira a revisao.`);
      }
    }
  }
  const seed={...current};const outfile=path.join(os.tmpdir(),`zup-${category}-${lot}-${crypto.randomBytes(8).toString('hex')}.json`);
  try{
    fs.writeFileSync(outfile,JSON.stringify(seed),{mode:0o600});
    const official=path.join(ROOT,'scripts','publish-content-seed.cjs');
    if(!fs.existsSync(official))throw Error('Falta scripts/publish-content-seed.cjs (ZUP! 2.1.0).');
    const command=spawnSync(process.execPath,[official,'--publish',outfile],{stdio:'inherit',env:process.env,timeout:180000});
    if(command.error)throw command.error;
    if(command.status!==0)throw Error(`Publicacao interrompida com codigo ${command.status}. Confira Neon antes de tentar novamente.`);
  }finally{if(fs.existsSync(outfile))fs.unlinkSync(outfile)}
  const after=await fetchCurrent(category);
  if(after?.questions?.length!==expectedAfter)throw Error(`A API nao confirmou as ${expectedAfter} perguntas; nao atualizei o controle local. Verifique o Render.`);
  const finalIds=new Set(after.questions.map(q=>q.id));
  if(current.questions.some(q=>!finalIds.has(q.id)))throw Error('Alguns IDs publicados nao apareceram no retorno. Confira o Render.');
  const next={...state,activeCategory:lot===MAX_BATCHES?null:category,completed:lot===MAX_BATCHES?[...state.completed,category]:state.completed,history:[...state.history,{category,lot,questionCount:expectedAfter,revision:after.revision,at:new Date().toISOString()}]};
  writeState(next);
  console.log(`PUBLICADO: ${category} agora tem ${expectedAfter}/750 perguntas. Proxima categoria ${lot===3?'liberada': 'bloqueada ate concluir os lotes restantes'}.`);
}
async function run(args=process.argv.slice(2)){
  const [cmd,category,arg,...rest]=args;
  if(!['--audit','--build','--check','--publish','--status'].includes(cmd))throw Error('Uso: --audit CATEGORIA | --build CATEGORIA LOTE | --check CATEGORIA LOTE | --publish CATEGORIA LOTE --confirm PUBLICAR | --status');
  if(cmd==='--status'){
    const s=readState();
    console.log(JSON.stringify(s,null,2));return;
  }
  const lot=Number(arg);
  if(cmd==='--audit')return audit(category);
  if(cmd==='--build')return build(category,lot);
  if(cmd==='--check')return checkLocal(category,lot);
  if(cmd==='--publish')return publish(category,lot,rest[rest.indexOf('--confirm')+1]);
}
if(require.main===module)run().catch(err=>{console.error('ERRO:',err.message);process.exitCode=1;});
module.exports={run,problems,round,normalize,jaccard,sourceIdentity,makeExecutable};
