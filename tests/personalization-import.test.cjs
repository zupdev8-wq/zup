'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {buildForYouFeed,buildFeed}=require('../app/.test-build/learning.js');
const {createCuriosityCardSession,curiosityLesson}=require('../app/.test-build/game.js');
const {initialProgress}=require('../app/.test-build/types.js');
const {normalizeProgress}=require('../app/.test-build/progress.js');
const {check,csv,run,columns}=require('../scripts/import-question-bank.cjs');
const date=new Date('2026-10-21T12:00:00');
const interest=(entry,preferred)=>{
  const tags=entry.kind==='lesson'?entry.lesson.tracks:(entry.question.tracks??[]);
  return tags.some(t=>preferred.includes(t));
};
test('For You favors the four interest slots and reserves the fifth for discovery',()=>{
  const preferredTracks=['games','esportes'];
  const p={...initialProgress,preferredTracks};
  const feed=buildForYouFeed(p,'geral',date);
  assert.ok(feed.length>30);
  assert.equal(feed.slice(0,4).filter(item=>interest(item,preferredTracks)).length,4);
  assert.equal(interest(feed[4],preferredTracks),false);
  assert.ok(feed.slice(0,4).every(item=>item.kind==='curiosity'),'games and sports start with sourced trivia when no written lesson exists');
  assert.deepEqual(buildForYouFeed(p,'geral',date).slice(0,12),feed.slice(0,12),'stable within one day');
  assert.ok(buildFeed({...p,preferredTracks:['humanas']},'geral',date).slice(0,5).filter(l=>l.tracks.includes('humanas')).length===4);
});
test('interests carry across saved progress, even for new game and book topics',()=>{
  const p=normalizeProgress({...initialProgress,preferredTracks:['livros','games','esportes','musica','animais'],onboardingCompleted:true});
  assert.deepEqual(p.preferredTracks,['livros','games','esportes','musica','animais']);
  const books=buildForYouFeed({...p,preferredTracks:['livros']},'geral',date).slice(0,4);
  assert.equal(books.filter(e=>interest(e,['livros'])).length,4);
});
test('a trivia card starts its exact sourced question and never repeats it when answered',()=>{
  const questionId='t-0007',p={...initialProgress,preferredTracks:['esportes']};
  const session=createCuriosityCardSession(p,questionId,()=>0.33,1000);
  assert.equal(session?.mode,'discover');
  assert.equal(session?.items.length,1);
  assert.equal(session?.items[0].questionId,questionId);
  assert.equal(createCuriosityCardSession({...p,completedIds:[questionId]},questionId,()=>0.33,1001),null);
  assert.ok(!buildForYouFeed({...p,completedIds:[questionId]},'geral',date).some(e=>e.kind==='curiosity'&&e.question.id===questionId));
  assert.ok(curiosityLesson({...p,completedIds:[questionId]},()=>0.3,5).every(q=>q.id!==questionId));
});
test('question import requires authorization evidence, verified answer and human approval',()=>{
  const row={category:'literatura',topic:'classicos-mundiais',universe:'classicos-mundiais',work_title:'O Livro da Selva',
    question:'Que tipo de serpente e Kaa no Livro da Selva?',choice_a:'Piton',choice_b:'Cobra-real',choice_c:'Sucuri',choice_d:'Vibora',correct:'A',
    explanation:'No livro de Kipling, a personagem Kaa aparece como uma grande serpente da familia dos pitons.',
    difficulty:'facil',kind:'discover',tracks:'livros|entretenimento',source_title:'Open Trivia Database',
    source_url:'https://opentdb.com/api_config.php',license:'CC BY-SA 4.0',rights_basis:'Fonte licenciada sob CC BY-SA 4.0.',review_status:'aprovado',rights_status:'verificado',reviewer:'Revisor Licenciado',reviewed_at:'2026-10-20'};
  const audited=check(row);assert.deepEqual(audited.errors,[]);assert.match(audited.id,/^u-[a-f0-9]{12}$/);
  assert.ok(check({...row,license:'SEM_DIREITOS'}).errors.some(x=>x.includes('license')));
  assert.ok(check({...row,review_status:'rascunho'}).errors.some(x=>x.includes('review_status')));
  assert.ok(check({...row,rights_basis:''}).errors.some(x=>x.includes('rights_basis')));
  assert.ok(check({...row,choice_d:'Sucuri'}).errors.some(x=>x.includes('duplicadas')));
  assert.ok(check({...row,source_url:'',license:'CC BY 4.0'}).errors.some(x=>x.includes('source_url')));
  assert.ok(check({...row,kind:'study'}).errors.some(x=>x.includes('academica')));
});
test('CSV parser handles quoted newlines, semicolons and a large reviewed-bank schema',()=>{
  const header=columns.join(';');const col=(name,defaultVal='')=>name==='question'?'"De qual universo literario; e esta obra?"':name==='explanation'?'"A obra pertence a um universo de fantasia; esta e uma explicacao de teste."':defaultVal;
  const values=columns.map(c=>col(c));
  const rows=csv([header,values.join(';')].join('\n'));
  assert.equal(rows.length,1);
  assert.ok(rows[0].question.includes(';'));
  assert.equal(rows[0]._row,2);
  assert.equal(columns.length,22);
});
test('an unapproved local bank never gets published or replaces real questions',()=>{
  const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'zup-import-'));
  try{
    const file=path.join(tmp,'questions.json');
    fs.writeFileSync(file,JSON.stringify([{question:'Exemplo de pergunta sem licenca',category:'literatura',review_status:'rascunho'}]));
    const report=run(file,{write:false,quiet:true});
    assert.equal(report.approved,0);assert.equal(report.rejected,1);
  }finally{fs.rmSync(tmp,{recursive:true,force:true});}
});
