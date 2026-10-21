#!/usr/bin/env node
'use strict';
/** Turns the existing reviewed CSV import schema into remote seeds, one per category.
 * This command NEVER certifies legal rights nor changes an app build. */
const fs=require('node:fs'),path=require('node:path');
const {readRows,check,convert}=require('./import-question-bank.cjs');
const get=(argv,flag)=>argv[argv.indexOf(flag)+1];
function prepare(file,{reviewer,accuracyChecked=false,rightsChecked=false,date=new Date().toISOString().slice(0,10)}={}){
  if(!reviewer||reviewer.trim().length<3||!accuracyChecked||!rightsChecked)throw new Error('Informe --reviewer NOME --confirm-accuracy --confirm-rights. Declaracoes devem ser verdadeiras e comprovadas.');
  const rows=readRows(file),groups=new Map(),seenId=new Set(),seenText=new Set();
  for(const row of rows){
    const audit=check(row);
    if(audit.errors.length)throw new Error(`Linha ${row._row}: ${audit.errors.join('; ')}`);
    const q=convert(row,audit);
    const text=q.question.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ');
    if(seenId.has(q.id)||seenText.has(text))throw new Error(`Questao duplicada ou ID reutilizado: ${q.id}`);
    seenId.add(q.id);seenText.add(text);
    if(!groups.has(q.category))groups.set(q.category,[]);
    groups.get(q.category).push(q);
  }
  return [...groups].map(([category,questions])=>({schemaVersion:1,category,questions,lessons:[],retiredQuestionIds:[],retiredLessonIds:[],review:{reviewedBy:reviewer.trim(),reviewedAt:date,accuracyChecked,rightsChecked}}));
}
async function main(args=process.argv.slice(2)){
  const file=args[0],out=args.includes('--out')?get(args,'--out'):'docs/content-seeds/ready';
  if(!file)throw new Error('Uso: node scripts/prepare-content-seed.cjs perguntas.csv --out ./seeds --reviewer NOME --confirm-accuracy --confirm-rights');
  const seeds=prepare(path.resolve(file),{reviewer:get(args,'--reviewer'),accuracyChecked:args.includes('--confirm-accuracy'),rightsChecked:args.includes('--confirm-rights')});
  const {validateContentBundle}=await import('../api/src/contentSchema.js');
  for(const seed of seeds){const r=validateContentBundle(seed);if(!r.valid)throw new Error(`${seed.category}: ${r.errors.join('; ')}`);}
  fs.mkdirSync(out,{recursive:true});
  for(const seed of seeds){const target=path.join(out,`${seed.category}.json`);fs.writeFileSync(target,JSON.stringify(seed,null,2)+'\n');console.log(`${target}: ${seed.questions.length} perguntas`);}
  if(!seeds.length)throw new Error('Arquivo sem linhas; nenhum seed foi gerado.');
  console.log('Nenhum seed foi publicado. Rode --check e --publish para cada arquivo.');
}
if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=1});
module.exports={prepare};
