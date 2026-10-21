#!/usr/bin/env node
'use strict';
/**
 * Imports the user's curadoria CSVs (4 OR 5 alternatives) as REMOTE seeds.
 * Unreviewed and rights-unverified records NEVER enter a publishable bundle.
 * No AI-generated explanations, fake reviewers or fabricated licences.
 */
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const {readRows}=require('./import-question-bank.cjs');
const normalize=x=>String(x??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const text=(row,k)=>String(row[k]??'').trim();
const isDate=x=>/^\d{4}-\d{2}-\d{2}$/.test(x)&&!Number.isNaN(Date.parse(x+'T12:00:00Z'))&&new Date(x+'T12:00:00Z').toISOString().slice(0,10)===x;
const suspectFlags=/pendente|bloquear|incorret|imprecis|ambigui|suspeito|duplicat|sem_?gabarito|copyright|erro/i;
function transformRow(row,categorySet,trackSet){
  const id=text(row,'id'),category=text(row,'category');
  const errors=[];
  if(!id||!categorySet.has(category))errors.push('ID ou categoria invalida');
  const choices=['choice_a','choice_b','choice_c','choice_d'].map(k=>text(row,k));
  const hasFifth=text(row,'choice_e').length>0;
  if(hasFifth)choices.push(text(row,'choice_e'));
  if(choices.some(x=>!x||x.length>250)||new Set(choices.map(normalize)).size!==choices.length)errors.push('Alternativas invalidas ou repetidas');
  const answer=String('ABCDE').indexOf(text(row,'correct').toUpperCase());
  if(answer<0||answer>=choices.length)errors.push('Gabarito ausente ou fora das alternativas');
  const question=text(row,'question'),fact=text(row,'explanation');
  if(question.length<12||question.length>650)errors.push('Enunciado fora de 12-650 caracteres');
  if(fact.length<30||fact.length>3500)errors.push('Explicacao ainda nao revisada ou fora de 30-3500 caracteres');
  if(!['facil','medio','dificil'].includes(text(row,'difficulty')))errors.push('Dificuldade precisa ser classificada');
  const kind=text(row,'kind'),tracks=text(row,'tracks').split(/[|;,]/).map(x=>x.trim()).filter(Boolean);
  if(!['study','discover'].includes(kind)||!tracks.length||tracks.some(t=>!trackSet.has(t)))errors.push('Modo/trilhas invalidos');
  if(kind==='study'&&!tracks.some(x=>['concursos','enem','faculdade','humanas','exatas','biologicas','revalida'].includes(x)))errors.push('Falta trilha de estudo');
  const license=text(row,'license'),sourceUrl=text(row,'source_url'),licenseUrl=text(row,'license_url');
  if(!['MIT','CC0','CC BY 4.0','CC BY-SA 4.0','DOMINIO_PUBLICO','AUTORIZADO','ORIGINAL_PROPRIO'].includes(license))errors.push('Licenca nao suportada');
  if(!/^https:\/\/[^\s]+$/.test(sourceUrl))errors.push('URL HTTPS da fonte obrigatoria');
  if(license==='MIT'&&!/^https:\/\/[^\s]+$/.test(licenseUrl))errors.push('Link da licenca MIT obrigatorio');
  if(text(row,'rights_basis').length<8)errors.push('Fundamentacao juridica da reutilizacao ausente');
  if(!text(row,'source_title'))errors.push('Titulo da fonte ausente');
  const year=text(row,'source_year');if(year&&!/^\d{4}$/.test(year))errors.push('Ano da origem invalido');
  if(text(row,'language')!=='pt-BR')errors.push('Somente perguntas em pt-BR');
  const reviewer=text(row,'reviewer'),reviewedAt=text(row,'reviewed_at');
  if(reviewer.length<3||!isDate(reviewedAt))errors.push('Revisor humano e data real de revisao obrigatorios');
  if(text(row,'quality_flags')&&suspectFlags.test(text(row,'quality_flags')))errors.push('Ha flags editoriais pendentes');
  const generatedId=`u-${crypto.createHash('sha256').update(id).digest('hex').slice(0,12)}`;
  const q={id:generatedId,category,question,choices,answer,fact,kind,difficulty:text(row,'difficulty'),tracks,
    sourceLabel:text(row,'source_title'),sourceLicense:license,rightsBasis:text(row,'rights_basis'),
    rightsStatus:'verificado',source:{title:text(row,'source_title'),url:sourceUrl},
    sourceItemId:`${id} | ${text(row,'source_item_id')}`};
  if(text(row,'topic'))q.topic=text(row,'topic');
  if(text(row,'universe'))q.universe=text(row,'universe');
  if(text(row,'work_title'))q.workTitle=text(row,'work_title');
  if(text(row,'attribution'))q.attribution=text(row,'attribution');
  if(licenseUrl)q.licenseUrl=licenseUrl;
  if(year)q.sourceYear=year;
  q.concept=`source:${generatedId}`;
  return {errors,question:q,reviewer,reviewedAt,sourceId:id,review_status:text(row,'review_status'),rights_status:text(row,'rights_status')};
}
function processRows(rows,categorySet,trackSet){
  const groups=new Map(),seenQuestions=new Map(),seenId=new Set(),reasons=new Map();
  const result={received:0,ready:0,draft:0,rightsPending:0,errors:[],byCategory:{},bySource:{},byStatus:{}};
  const inc=(map,key)=>{map[key]=(map[key]??0)+1;};
  for(const row of rows){
    result.received++;
    inc(result.byCategory,text(row,'category')||'(vazio)');
    inc(result.bySource,text(row,'source_title')||'(vazio)');
    inc(result.byStatus,text(row,'review_status')||'(vazio)');
    if(text(row,'review_status')!=='aprovado'){result.draft++;continue;}
    if(text(row,'rights_status')!=='verificado'){
      result.rightsPending++;
      result.errors.push(`${text(row,'id')}: rights_status precisa ser verificado.`);
      continue;
    }
    const checked=transformRow(row,categorySet,trackSet);
    if(checked.errors.length){result.errors.push(`${checked.sourceId}: ${checked.errors.join('; ')}`);continue;}
    const key=normalize(checked.question.question),before=seenQuestions.get(key);
    if(before||seenId.has(checked.question.id)){
      result.errors.push(`${checked.sourceId}: duplicata do enunciado ${before??checked.sourceId}`);
      continue;
    }
    seenId.add(checked.question.id);seenQuestions.set(key,checked.sourceId);
    if(!groups.has(checked.question.category))groups.set(checked.question.category,[]);
    groups.get(checked.question.category).push(checked);result.ready++;
  }
  return {result,groups};
}
async function prepare(files,{out,write=false}={}){
  if(!files.length)throw new Error('Forneca pelo menos um CSV de curadoria.');
  const {CATEGORIES,TRACKS,validateContentBundle}=await import('../api/src/contentSchema.js');
  const rows=files.flatMap(file=>readRows(path.resolve(file)));
  const {result,groups}=processRows(rows,CATEGORIES,TRACKS);
  const seeds=[];
  for(const [category,items] of groups){
    if(items.length>1200){result.errors.push(`${category}: mais de 1.200 questoes; divida o acervo em temas ou aumente o limite apos testes.`);continue;}
    const reviewers=[...new Set(items.map(x=>x.reviewer))];
    const reviewedBy=reviewers.length===1?reviewers[0]:'Equipe de curadoria ZUP';
    const seed={schemaVersion:1,category,questions:items.map(x=>x.question),lessons:[],retiredQuestionIds:[],retiredLessonIds:[],
      review:{reviewedBy,reviewedAt:items.map(x=>x.reviewedAt).sort().at(-1),accuracyChecked:true,rightsChecked:true}};
    const audit=validateContentBundle(seed);
    if(!audit.valid){result.errors.push(`${category}: ${audit.errors.slice(0,20).join('; ')}`);continue;}
    seeds.push(seed);
  }
  result.publishableBundles=seeds.length;result.readyInBundles=seeds.reduce((n,b)=>n+b.questions.length,0);
  if(write){
    if(result.errors.length)throw new Error(`Aprovados com pendencias (${result.errors.length}): ${result.errors.slice(0,10).join(' | ')}`);
    if(!seeds.length)throw new Error('Nenhum registro esta aprovado com direitos, gabarito e explicacao revisados. Nenhum seed foi criado.');
    fs.mkdirSync(out,{recursive:true});
    for(const seed of seeds)fs.writeFileSync(path.join(out,`${seed.category}.json`),JSON.stringify(seed,null,2)+'\n');
  }
  return {result,seeds};
}
async function cli(){
  const args=process.argv.slice(2),files=[];
  let out='docs/content-seeds/curadoria-revisada',write=false,report=null;
  for(let i=0;i<args.length;i++){
    if(args[i]==='--input')files.push(args[++i]);
    else if(args[i]==='--out')out=args[++i];
    else if(args[i]==='--report')report=args[++i];
    else if(args[i]==='--write')write=true;
    else if(args[i]==='--check')write=false;
    else throw new Error(`Argumento desconhecido ${args[i]}. Uso: node scripts/prepare-curadoria-seeds.cjs --input perguntas-4-alternativas.csv --input perguntas-5-alternativas.csv --check|--write [--out DIR] [--report arquivo.json]`);
  }
  const {result}=await prepare(files,{out,write});
  if(report)fs.writeFileSync(report,JSON.stringify(result,null,2)+'\n');
  console.log(JSON.stringify(result,null,2));
  if(result.errors.length)process.exitCode=1;
}
if(require.main===module)cli().catch(e=>{console.error(e.message);process.exitCode=1;});
module.exports={transformRow,processRows,prepare};
