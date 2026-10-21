#!/usr/bin/env node
'use strict';
/**
 * Publication is a backend data operation, not a React Native / EAS build.
 * --check does not use the network. --publish merges by stable ID with the live
 * category snapshot. --list and --rollback operate on immutable revisions.
 */
const fs=require('node:fs');
const path=require('node:path');
const API=(process.env.ZUP_CONTENT_API_URL||'https://zup-api.onrender.com').replace(/\/+$/,'');
const token=process.env.ZUP_CONTENT_ADMIN_TOKEN;
function mergeContent(current,delta){
  const questions=new Map((current?.questions??[]).map(x=>[x.id,x]));
  const lessons=new Map((current?.lessons??[]).map(x=>[x.id,x]));
  const retiredQuestionIds=new Set(current?.retiredQuestionIds??[]);
  const retiredLessonIds=new Set(current?.retiredLessonIds??[]);
  for(const id of delta.retiredQuestionIds){questions.delete(id);retiredQuestionIds.add(id);}
  for(const id of delta.retiredLessonIds){lessons.delete(id);retiredLessonIds.add(id);}
  for(const q of delta.questions){questions.set(q.id,q);retiredQuestionIds.delete(q.id);}
  for(const l of delta.lessons){lessons.set(l.id,l);retiredLessonIds.delete(l.id);}
  return {...delta,questions:[...questions.values()],lessons:[...lessons.values()],retiredQuestionIds:[...retiredQuestionIds],retiredLessonIds:[...retiredLessonIds]};
}
async function request(url,method='GET',payload,expectedRevision){
  if(!token||token.length<32)throw new Error('Configure ZUP_CONTENT_ADMIN_TOKEN com ao menos 32 caracteres em uma variavel local.');
  const response=await fetch(url,{method,headers:{Authorization:`Bearer ${token}`,Accept:'application/json',...(payload?{'Content-Type':'application/json'}:{}),...(expectedRevision!==undefined?{'X-ZUP-Expected-Revision':String(expectedRevision)}:{})},body:payload?JSON.stringify(payload):undefined,signal:AbortSignal.timeout(45000)});
  let data;try{data=await response.json()}catch{data={}};
  if(!response.ok)throw new Error(`HTTP ${response.status}: ${JSON.stringify(data)}`);
  return data;
}
async function main(argv=process.argv.slice(2)){
  const {validateContentBundle}=await import('../api/src/contentSchema.js');
  const cmd=argv[0],arg=argv[1];
  if(!['--check','--publish','--list','--rollback'].includes(cmd)||!arg)throw new Error('Uso: node scripts/publish-content-seed.cjs --check|--publish ARQUIVO.json\n     node scripts/publish-content-seed.cjs --list CATEGORIA\n     node scripts/publish-content-seed.cjs --rollback CATEGORIA NUMERO_REVISAO');
  if(cmd==='--list')return request(`${API}/v1/content/admin/revisions/${encodeURIComponent(arg)}`).then(r=>console.log(JSON.stringify(r,null,2)));
  if(cmd==='--rollback'){
    if(!/^\d+$/.test(argv[2]??''))throw new Error('Informe o numero de revisao exibido em --list.');
    if(!argv.includes('--confirm'))throw new Error('Rollback nao realizado. Adicione --confirm para confirmar a revisao anterior.');
    return request(`${API}/v1/content/admin/rollback`,'POST',{category:arg,revision:Number(argv[2])}).then(r=>console.log(JSON.stringify(r,null,2)));
  }
  const file=path.resolve(arg),delta=JSON.parse(fs.readFileSync(file,'utf8'));
  const audit=validateContentBundle(delta);
  if(!audit.valid)throw new Error(`Seed rejeitado:\n${audit.errors.slice(0,40).join('\n')}`);
  console.log(`Validado ${delta.category}: ${delta.questions.length} perguntas, ${delta.lessons.length} aulas, ${delta.retiredQuestionIds.length+delta.retiredLessonIds.length} retiradas.`);
  if(cmd==='--check'){console.log('Sem conexao ao servidor e sem publicacao.');return;}
  // Each category is a full versioned snapshot on the server. Merge means an
  // additive seed never removes the previously published questions or lessons.
  let current=null;
  const response=await fetch(`${API}/v1/content/bundles/${encodeURIComponent(delta.category)}`,{signal:AbortSignal.timeout(30000)});
  if(response.ok){current=await response.json();}
  else if(response.status!==404)throw new Error(`Nao foi possivel consultar o pacote atual: HTTP ${response.status}`);
  const combined=mergeContent(current,delta);
  const auditMerged=validateContentBundle(combined);
  if(!auditMerged.valid)throw new Error(`A mesclagem do acervo existente nao passou nas validacoes:\n${auditMerged.errors.join('\n')}`);
  const result=await request(`${API}/v1/content/admin/publish`,'POST',combined,Number(current?.revision??0));
  console.log(JSON.stringify(result,null,2));
  console.log('O app sincroniza esta revisao ao entrar, ao voltar ao primeiro plano ou ao abrir a categoria. Nao gere nova build.');
}
if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=1});
module.exports={mergeContent};
