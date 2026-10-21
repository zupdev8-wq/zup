#!/usr/bin/env node
'use strict';
/**
 * ZUP! seed publisher helper: verify all seed hashes and run the project's
 * official content publisher with explicit confirmation. No stored secrets.
 * Usage: node scripts/publicar-lote-curado.cjs --check [--only literatura]
 *        node scripts/publicar-lote-curado.cjs --publish [--only literatura] --confirm PUBLICAR
 */
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const {spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const official=path.join(root,'scripts','publish-content-seed.cjs');
const manifestFile=path.join(root,'manifesto-seeds.json');
function usage(){return 'Use --check [--only categoria] para validar sem internet; para publicar use --publish [--only categoria] --confirm PUBLICAR.';}
function cli(args=process.argv.slice(2)){
  const action=args.includes('--publish')?'--publish':'--check';
  if(args.includes('--publish')&&args.includes('--check'))throw Error('Escolha somente --check ou --publish.');
  if(args.some(x=>x.startsWith('--')&&!['--check','--publish','--only','--confirm'].includes(x)))throw Error(usage());
  const onlyIdx=args.indexOf('--only');
  const only=onlyIdx>=0?args[onlyIdx+1]:null;
  if(onlyIdx>=0&&(!only||only.startsWith('--')||!/^[a-z]+$/.test(only)))throw Error('Informe um nome de categoria apos --only, como literatura.');
  const m=JSON.parse(fs.readFileSync(manifestFile,'utf8'));
  const files=m.categoryManifests.filter(x=>!only||x.category===only);
  if(!files.length)throw Error('Categoria nao encontrada no manifesto: '+only);
  if(!fs.existsSync(official))throw Error('O publicador oficial nao existe: use o projeto ZUP! 2.1.0 ou posterior, com scripts/publish-content-seed.cjs.');
  let found=0;
  for(const meta of files){
    const f=path.resolve(root,meta.file);
    if(!f.startsWith(root+path.sep))throw Error('Caminho invalido no manifesto.');
    const fileData=fs.readFileSync(f);
    const checksum=crypto.createHash('sha256').update(fileData).digest('hex');
    if(checksum!==meta.sha256)throw Error('Seed foi modificado: hash diferente para '+meta.category);
    const payload=JSON.parse(fileData.toString('utf8'));
    if(payload.category!==meta.category||payload.questions.length!==meta.questions||!payload.review?.rightsChecked||!payload.review?.accuracyChecked)throw Error('Manifesto e seed discordam em '+meta.category);
    found+=meta.questions;
  }
  console.log(`ZUP! pacote validado: ${files.length} categorias, ${found} questoes com explicacao e fonte.`);
  if(action==='--publish'){
    if(args[args.indexOf('--confirm')+1]!=='PUBLICAR')throw Error('NADA foi enviado. Para confirmar acrescente --confirm PUBLICAR.');
    if(!process.env.ZUP_CONTENT_ADMIN_TOKEN||process.env.ZUP_CONTENT_ADMIN_TOKEN.length<32)throw Error('ZUP_CONTENT_ADMIN_TOKEN ausente. Configure somente no terminal local, igual ao valor do Render.');
    console.log('Publicacao REAL solicitada. Conferindo cada categoria antes de enviar...');
  }else{
    console.log('Modo seguro: SEM publicacao.');
  }
  for(const meta of files){
    const f=path.resolve(root,meta.file);
    // Official script handles schema validation, merge with existing published
    // questions, revision lock and HTTP request. Stop on any error.
    const outcome=spawnSync(process.execPath,[official,action,f],{stdio:'inherit',env:process.env,timeout:150000});
    if(outcome.error)throw outcome.error;
    if(outcome.status!==0)throw Error(`Parou em ${meta.category}: codigo ${outcome.status}. Corrija antes de continuar.`);
  }
  console.log(action==='--check'?'Validacao local concluida. Nada publicado.':'Publicacao concluida nas categorias indicadas. Confira /v1/content/manifest.');
}
try{cli()}catch(err){console.error('ERRO:',err.message);process.exitCode=1;}
