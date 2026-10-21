'use strict';
/**
 * Offline import of reviewed, licensed questions (CSV UTF-8 or JSON).
 * It does NOT generate question text or claim that an entered licence is valid.
 * Usage: node scripts/import-question-bank.cjs my-bank.csv --check
 *        node scripts/import-question-bank.cjs my-bank.csv --write
 */
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
const output=path.join(root,'app/src/importedQuestions.ts');
const categories=new Set([...fs.readFileSync(path.join(root,'app/src/catalog.ts'),'utf8').matchAll(/make\('([a-z-]+)'/g)].map(m=>m[1]));
const tracks=new Set([...fs.readFileSync(path.join(root,'app/src/catalog.ts'),'utf8').matchAll(/\{id:'([a-z-]+)',label:/g)].map(m=>m[1]));
const acceptedLicenses=new Set(['MIT','CC0','CC BY 4.0','CC BY-SA 4.0','DOMINIO_PUBLICO','AUTORIZADO','ORIGINAL_PROPRIO']);
const columns=['id','category','topic','universe','work_title','question','choice_a','choice_b','choice_c','choice_d','correct','explanation','difficulty','kind','tracks','source_title','source_url','license','rights_basis','source_item_id','source_year','review_status'];
const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const unique=arr=>[...new Set(arr)];

// Supports commas, semicolons, double-quoted cells and newlines within quoted cells.
function csv(text){
  const sep=text.split(/\r?\n/,1)[0].includes(';')&&!text.split(/\r?\n/,1)[0].includes(',')?';':',';
  const rows=[];let row=[],cell='',quoted=false;
  for(let i=0;i<text.length;i++){
    const c=text[i],next=text[i+1];
    if(c==='"'){
      if(quoted&&next==='"'){cell+='"';i++;}else quoted=!quoted;
    }else if(c===sep&&!quoted){row.push(cell);cell='';}
    else if((c==='\n'||c==='\r')&&!quoted){
      if(c==='\r'&&next==='\n')i++;
      row.push(cell);if(row.some(v=>v.trim()))rows.push(row);row=[];cell='';
    }else cell+=c;
  }
  if(quoted)throw new Error('CSV com aspas abertas; verifique o arquivo.');
  row.push(cell);if(row.some(v=>v.trim()))rows.push(row);
  if(!rows.length)return [];
  const headers=rows.shift().map(v=>v.replace(/^\uFEFF/,'').trim());
  for(const required of columns.slice(1))if(!headers.includes(required))throw new Error(`Coluna obrigatoria ausente: ${required}`);
  return rows.map((values,i)=>({...Object.fromEntries(headers.map((key,j)=>[key,values[j]??''])),_row:i+2}));
}
function readRows(filename){
  const text=fs.readFileSync(filename,'utf8');
  if(filename.endsWith('.csv'))return csv(text);
  if(filename.endsWith('.json')){
    const result=JSON.parse(text);
    if(!Array.isArray(result))throw new Error('JSON deve conter um array de questoes');
    return result.map((x,i)=>({...x,_row:i+1}));
  }
  throw new Error('Envie CSV UTF-8 ou JSON. Planilhas Excel devem ser exportadas como CSV.');
}
function currentRows(){
  const contents=fs.readFileSync(output,'utf8');
  const match=contents.match(/export const importedQuestions: Question\[\] = (\[[\s\S]*\]);\s*$/);
  return match?JSON.parse(match[1]):[];
}
function check(row){
  const errors=[];const get=key=>String(row[key]??'').trim();
  const category=get('category'), question=get('question');
  const kind=get('kind')||'discover',license=get('license');
  if(!categories.has(category))errors.push('category desconhecido');
  if(!get('topic'))errors.push('topic vazio');
  if(question.length<12||question.length>650)errors.push('question curta, longa ou vazia');
  const answers=['choice_a','choice_b','choice_c','choice_d'].map(get);
  if(answers.some(a=>a.length<1||a.length>250))errors.push('alternativa vazia ou excessiva');
  if(new Set(answers.map(normalize)).size!==4)errors.push('alternativas duplicadas');
  if(!['A','B','C','D'].includes(get('correct').toUpperCase()))errors.push('correct deve ser A, B, C ou D');
  if(get('explanation').length<30)errors.push('explanation deve justificar a resposta com pelo menos 30 caracteres');
  if(!['facil','medio','dificil'].includes(get('difficulty')))errors.push('difficulty invalida');
  if(!['discover','study'].includes(kind))errors.push('kind deve ser discover ou study');
  if(kind==='study'&&!['concursos','enem','faculdade','humanas','exatas','biologicas','revalida'].some(t=>get('tracks').split(/[|;,]/).includes(t)))errors.push('study precisa de uma trilha academica');
  const givenTracks=get('tracks').split(/[|;,]/).map(t=>t.trim()).filter(Boolean);
  if(!givenTracks.length||givenTracks.some(t=>!tracks.has(t)))errors.push('tracks vazio ou desconhecido');
  if(!get('source_title'))errors.push('source_title deve identificar a origem real');
  if(!acceptedLicenses.has(license))errors.push('license ausente ou nao reconhecida');
  if(!get('rights_basis'))errors.push('rights_basis precisa da justificativa documental para reutilizar');
  if(get('source_url')&&!/^https:\/\/[^\s]+$/i.test(get('source_url')))errors.push('source_url deve usar HTTPS');
  if(license.startsWith('CC ')&&!get('source_url'))errors.push('licenca Creative Commons requer source_url para atribuicao');
  if(license==='MIT'&&!/^https:\/\/[^\s]+$/i.test(get('license_url')))errors.push('licenca MIT requer license_url');
  if(license==='AUTORIZADO'&&!/autoriz|contrato|licenc/i.test(get('rights_basis')))errors.push('AUTORIZADO deve referenciar autorizacao, contrato ou licenca');
  if(get('review_status')!=='aprovado')errors.push('review_status deve ser aprovado apos revisao humana');
  // A fonte pode declarar uma licenca, mas isso nao equivale a revisao dos direitos.
  if(get('rights_status')!=='verificado')errors.push('rights_status deve ser verificado');
  if(get('reviewer').length<3||!/^\d{4}-\d{2}-\d{2}$/.test(get('reviewed_at')))errors.push('reviewer e reviewed_at obrigatorios');
  if(/pendente|bloquear|incorret|imprecis|ambigui|suspeito|duplicat|copyright|erro/i.test(get('quality_flags')))errors.push('quality_flags requerem revisao antes da importacao');
  if(get('source_year')&&!/^\d{4}$/.test(get('source_year')))errors.push('source_year deve ser ano com 4 digitos');
  const id=get('id')||`u-${crypto.createHash('sha256').update(`${category}:${normalize(question)}`).digest('hex').slice(0,12)}`;
  if(!/^u-[a-f0-9]{12}$/.test(id))errors.push('id deve estar vazio ou usar o padrao u- seguido de 12 digitos hexadecimais');
  return {errors,id,category,question,kind,license,givenTracks,answers};
}
function convert(row,audit){
  const str=k=>String(row[k]??'').trim();
  const sourceUrl=str('source_url');
  const q={id:audit.id,category:audit.category,topic:str('topic'),concept:`imported:${audit.id}`,question:audit.question,choices:audit.answers,
    answer:'ABCD'.indexOf(str('correct').toUpperCase()),fact:str('explanation'),difficulty:str('difficulty'),kind:audit.kind,
    tracks:audit.givenTracks,sourceLabel:str('source_title'),sourceLicense:audit.license,rightsBasis:str('rights_basis')};
  if(sourceUrl)q.source={title:str('source_title'),url:sourceUrl};
  if(str('universe'))q.universe=str('universe');
  if(str('work_title'))q.workTitle=str('work_title');
  if(str('source_year'))q.sourceYear=str('source_year');
  if(str('source_item_id'))q.sourceItemId=str('source_item_id');
  if(str('attribution'))q.attribution=str('attribution');
  if(str('license_url'))q.licenseUrl=str('license_url');
  q.rightsStatus='verificado';
  return q;
}
function run(file,{write=false,quiet=false}={}){
  const rows=readRows(file),previous=currentRows();
  const result=[...previous];const ids=new Map(result.map(q=>[q.id,q]));
  const texts=new Map(result.map(q=>[normalize(q.question),q]));
  const stats={received:rows.length,approved:0,duplicates:0,rejected:0,errors:[],byCategory:{}};
  for(const row of rows){
    if(!Object.values(row).some(v=>String(v||'').trim()&&v!==row._row))continue;
    // Template examples are never imported as approved questions.
    const {errors,...audit}=check(row);
    if(errors.length){stats.rejected++;stats.errors.push(`Linha ${row._row}: ${errors.join('; ')}`);continue;}
    const q=convert(row,audit),beforeId=ids.get(q.id),beforeQuestion=texts.get(normalize(q.question));
    if(beforeId||beforeQuestion){
      if(beforeId?.question===q.question||beforeQuestion?.question===q.question){stats.duplicates++;continue;}
      stats.rejected++;stats.errors.push(`Linha ${row._row}: colisao de ID ou pergunta`);continue;
    }
    result.push(q);ids.set(q.id,q);texts.set(normalize(q.question),q);
    stats.approved++;stats.byCategory[q.category]=(stats.byCategory[q.category]??0)+1;
  }
  if(write&&stats.errors.length)throw new Error(`Importacao bloqueada: ${stats.rejected} linhas invalidas. Corrija e rode --check primeiro.\n${stats.errors.slice(0,10).join('\n')}`);
  if(write){
    // Deterministic order: stable identifiers protect completed quiz history.
    const body=JSON.stringify(result,null,2).replace(/\u2028|\u2029/g,' ');
    fs.writeFileSync(output,`import type {Question} from './types';\n// Generated from reviewed sources; do not edit by hand.\nexport const importedQuestions: Question[] = ${body};\n`,'utf8');
    require('./sync-question-catalog.cjs');
  }
  if(!quiet){
    console.log(JSON.stringify({mode:write?'write':'check',...stats,existing:previous.length,total:result.length,remainingByCategory:Object.fromEntries([...categories].map(cat=>[cat,Math.max(0,700-result.filter(q=>q.category===cat).length)]))},null,2));
  }
  return stats;
}
if(require.main===module){
  const argv=process.argv.slice(2),file=argv.find(x=>!x.startsWith('--'));
  if(!file||!argv.some(x=>x==='--check'||x==='--write')){
    console.error('Uso: node scripts/import-question-bank.cjs /caminho/perguntas.csv --check|--write');process.exit(2);
  }
  try{const stats=run(path.resolve(file),{write:argv.includes('--write')});if(stats.rejected)process.exitCode=1;}
  catch(error){console.error(error.message);process.exitCode=1;}
}
module.exports={csv,check,run,columns,readRows,convert};
