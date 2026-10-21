#!/usr/bin/env node
'use strict';
/**
 * Games: three operational batches of 250 existing, adapted questions.
 * --check is local and accepts only the explicit missing-human-review error.
 * --prepare records a review actually completed by the named human; it never
 * publishes. Publication uses the project's existing publish-content-seed.cjs.
 */
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const ROOT=path.resolve(__dirname,'..');
const INPUT=path.join(ROOT,'docs/content-seeds/games-2026-10-21');
const normalize=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const REVIEW_ERROR='review: responsavel, data e duas verificacoes obrigatorias';
const usage='Uso:\n  node scripts/preparar-games.cjs --check\n  node scripts/preparar-games.cjs --prepare --reviewer "NOME DO REVISOR" --reviewed-at AAAA-MM-DD --confirm-human-review --confirm-accuracy --confirm-rights';
function parse(argv){
  const options={};
  for(let i=0;i<argv.length;i++){
    const key=argv[i];
    if(['--check','--prepare','--confirm-human-review','--confirm-accuracy','--confirm-rights'].includes(key))options[key]=true;
    else if(['--reviewer','--reviewed-at'].includes(key)){
      if(!argv[i+1]||argv[i+1].startsWith('--'))throw new Error(`Valor ausente para ${key}.`);
      options[key]=argv[++i];
    }else throw new Error(`Argumento desconhecido: ${key}.\n${usage}`);
  }
  if(Boolean(options['--check'])===Boolean(options['--prepare']))throw new Error(usage);
  return options;
}
function validDate(value){
  return /^\d{4}-\d{2}-\d{2}$/.test(value??'')&&!Number.isNaN(Date.parse(`${value}T12:00:00Z`))&&new Date(`${value}T12:00:00Z`).toISOString().slice(0,10)===value;
}
async function run(argv=process.argv.slice(2)){
  const options=parse(argv);
  const {validateContentBundle}=await import(pathToFileURL(path.join(ROOT,'api/src/contentSchema.js')).href);
  const ids=new Set(),texts=new Set(),drafts=[];
  for(let batch=1;batch<=3;batch++){
    const name=`games-lote-${String(batch).padStart(2,'0')}`;
    const draft=JSON.parse(fs.readFileSync(path.join(INPUT,`${name}.rascunho.json`),'utf8'));
    if(draft.category!=='games'||draft.questions?.length!==250)throw new Error(`${name}: esperadas exatamente 250 perguntas de Games.`);
    if(draft.editorialStatus?.stage!=='revisado_por_ia'||draft.editorialStatus?.humanReview!=='pendente'||draft.editorialStatus?.published!==false)throw new Error(`${name}: situação editorial do rascunho não reconhecida.`);
    if(draft.review?.accuracyChecked!==false||draft.review?.rightsChecked!==false||draft.review?.reviewedBy!==''||draft.review?.reviewedAt!=='')throw new Error(`${name}: o rascunho deve manter a aprovação humana em branco.`);
    const audit=validateContentBundle(draft);
    if(audit.errors.length!==1||audit.errors[0]!==REVIEW_ERROR)throw new Error(`${name}: ${audit.errors.join('; ')||'aprovação inesperada no rascunho'}`);
    for(const q of draft.questions){
      const key=normalize(q.question);
      if(ids.has(q.id)||texts.has(key))throw new Error(`${name}: pergunta duplicada entre os três lotes: ${q.id}.`);
      ids.add(q.id);texts.add(key);
      if(!Array.isArray(q.explanationSources)||!q.explanationSources.length||q.explanationSources.some(s=>!s?.title||!/^https:\/\/\S+$/.test(s?.url??'')))throw new Error(`${q.id}: fonte da explicação ausente ou inválida.`);
      if(!q.attribution||!q.sourceItemId)throw new Error(`${q.id}: origem ou créditos ausentes.`);
    }
    drafts.push({name,draft});
  }
  console.log('Conteúdo validado: Games, 750 perguntas distintas, 3 lotes de 250.');
  if(options['--check']){
    console.log('Aprovação humana pendente. Nenhuma conexão de rede e nenhuma publicação.');
    return {questions:750,batches:3,humanReview:'pendente',published:false};
  }
  const reviewer=String(options['--reviewer']??'').trim(),date=options['--reviewed-at'];
  if(reviewer.length<3||reviewer.length>120||/^(NOME DO REVISOR|REVISOR|ChatGPT|IA)$/i.test(reviewer)||!validDate(date)||!options['--confirm-human-review']||!options['--confirm-accuracy']||!options['--confirm-rights']){
    throw new Error('O projeto exige revisão humana real, nome e data, conferência de exatidão e dos direitos. Execute --prepare somente depois dessa revisão.\n'+usage);
  }
  const ready=drafts.map(({name,draft})=>{
    const {editorialStatus,...base}=draft;
    const seed={...base,review:{reviewedBy:reviewer,reviewedAt:date,accuracyChecked:true,rightsChecked:true}};
    const audit=validateContentBundle(seed);
    if(!audit.valid)throw new Error(`${name}: ${audit.errors.join('; ')}`);
    return {name,seed};
  });
  const output=path.join(INPUT,'prontos');
  fs.mkdirSync(output,{recursive:true});
  for(const {name,seed} of ready){
    const target=path.join(output,`${name}.json`);
    fs.writeFileSync(target,JSON.stringify(seed,null,2)+'\n','utf8');
    console.log(`${path.relative(ROOT,target)}: 250 perguntas.`);
  }
  console.log('Seeds preparados com a revisão informada. Nenhum seed foi publicado.');
  console.log('Use o publicador existente, na ordem: lote 01, lote 02, lote 03.');
  return {questions:750,batches:3,humanReview:'registrada_pelo_operador',published:false};
}
if(require.main===module)run().catch(error=>{console.error(error.message);process.exitCode=1;});
module.exports={run};
