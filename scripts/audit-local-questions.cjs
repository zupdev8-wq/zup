'use strict';

const {execFileSync}=require('node:child_process');
const path=require('node:path');
const fs=require('node:fs');

const root=path.resolve(__dirname,'..');

const tsc=path.join(
  root,
  'app',
  'node_modules',
  'typescript',
  'bin',
  'tsc'
);

if(!fs.existsSync(tsc)){
  console.error(
    'TypeScript nao encontrado em app/node_modules. Rode "cd app", depois "npm install", volte com "cd .." e tente novamente.'
  );
  process.exit(1);
}

/*
 * Executa o compilador TypeScript usando o proprio Node.
 * Isso evita problemas do Windows com spawnSync de arquivos .cmd.
 */
execFileSync(
  process.execPath,
  [
    tsc,
    '-p',
    path.join(root,'app','tsconfig.test.json'),
  ],
  {
    cwd:root,
    stdio:'inherit',
  }
);

const {
  questions,
  generatedQuestions,
}=require(
  path.join(root,'app','.test-build','questions.js')
);

const bad=[];
const seenQ=new Set();

for(const q of questions){

  if(!q.source?.url?.startsWith('https://')){
    bad.push(`${q.id}: sem fonte HTTPS`);
  }

  if(
    typeof q.fact!=='string' ||
    q.fact.trim().length<80
  ){
    bad.push(`${q.id}: explicacao curta`);
  }

  if(
    !Array.isArray(q.choices) ||
    ![4,5].includes(q.choices.length) ||
    new Set(
      q.choices.map(x=>
        String(x).trim().toLowerCase()
      )
    ).size!==q.choices.length
  ){
    bad.push(`${q.id}: alternativas invalidas`);
  }

  if(
    !Number.isInteger(q.answer) ||
    q.answer<0 ||
    q.answer>=q.choices.length
  ){
    bad.push(`${q.id}: gabarito invalido`);
  }

  const prompt=String(q.question||'')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .toLowerCase();

  if(
    /qual alternativa descreve|que conceito esta sendo descrito|leia a pista e identifique|se voce explicasse/.test(prompt)
  ){
    bad.push(`${q.id}: molde artificial`);
  }

  const key=prompt
    .replace(/[^a-z0-9]+/g,' ')
    .trim();

  if(seenQ.has(key)){
    bad.push(`${q.id}: enunciado duplicado`);
  }

  seenQ.add(key);

  if(/^g-|^x-|^h-|^p-|^l-/.test(q.id)){
    bad.push(`${q.id}: familia local retirada`);
  }
}

if(generatedQuestions.length){
  bad.push(
    `generatedQuestions: ${generatedQuestions.length}`
  );
}

if(bad.length){
  console.error('\nAUDITORIA REPROVADA:\n');
  console.error(bad.join('\n'));
  console.error(
    `\nTotal de problemas: ${bad.length}`
  );
  process.exit(1);
}

console.log(
  `AUDITORIA OK: ${questions.length} questoes locais de fallback; nenhuma geracao massiva; fontes HTTPS e explicacoes minimas presentes.`
);