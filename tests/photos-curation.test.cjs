'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const photos=require('../app/.test-build/photos.js');
const {microLessons}=require('../app/.test-build/learning.js');
const catalogue=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../app/src/photoCatalog.data.json'),'utf8'));

function lesson(title){
  const value=microLessons.find(entry=>entry.title===title);
  assert.ok(value,`Lesson in published feed: ${title}`);
  return value;
}

const expectations=[
  ['Higienização das mãos','zup-curated:clinical-handwashing','enfermagem'],
  ['Fronteira seca','commons:126018535','cidadania'],
  ['O céu é azul por causa do jeito que a luz se espalha','zup-curated:blue-sky','ciencia'],
  ['Argumento válido','zup-curated:premises-and-conclusion','filosofia'],
  ['Perspectiva linear','zup-curated:railway-perspective','artes'],
];

test('original 3156 photos and 229 topics are preserved with source attribution',()=>{
  assert.equal(catalogue.assets.length,3156);
  assert.equal(catalogue.topics.length,229);
  const info=photos.getPhotoCatalogInfo();
  assert.equal(info.assetCount,3160);
  assert.equal(info.topicCount,234);
  assert.equal(photos.PHOTO_BANK_SIZE,3160);
  assert.equal(new Set(catalogue.assets.map(p=>p.id)).size,catalogue.assets.length);
});

test('the five photographed mismatches now have subject-specific imagery',()=>{
  for(const [title,id,category] of expectations){
    const l=lesson(title);
    assert.equal(l.category,category,title);
    const asset=photos.lessonPhotoAsset(l);
    assert.ok(asset,`${title} has a matched image`);
    assert.equal(asset.id,id,title);
    assert.equal(photos.lessonPhoto(l),asset.url,title);
    assert.match(asset.url,/^https:\/\//);
    assert.match(asset.sourceUrl,/^https?:\/\//);
    assert.ok(asset.author.trim());
    assert.ok(asset.license.trim());
    assert.match(asset.licenseUrl,/^https?:\/\//);
  }
});

test('fronteira seca uses a photographed marker in Ponta Porã rather than a generic Paraguayan building',()=>{
  const a=photos.lessonPhotoAsset(lesson('Fronteira seca'));
  assert.ok(a);
  assert.match(a.title,/Border milestone in Ponta Pora/i);
});

test('photographs are never chosen just because a card shares a broad category',()=>{
  for (const l of [
    {id:'test-house',category:'filosofia',title:'A forma como uma casa foi construída',summary:'',minutes:2},
    {id:'test-lab',category:'ciencia',title:'Um tema nunca fotografado deste livro',summary:'',minutes:2},
    {id:'test-urban',category:'brasil',title:'Brasil, curiosidades gerais e assuntos variados',summary:'',minutes:2},
  ]) {
    assert.equal(photos.lessonPhoto(l),'');
    assert.equal(photos.lessonPhotoAsset(l),undefined);
  }
});

test('editorial assignments have documented physical or visual connection with their lesson subject',()=>{
  const examples=[
    ['Por que o Pantanal alaga todos os anos?','Boat on the River Pantanal'],
    ['Machado de Assis','Machado de Assis by Marc Ferrez'],
    ['PCR','Thermal cycler for PCR'],
    ['Ritmo','drum kit'],
    ['Serviço ecossistêmico','Bee on flower'],
    ['Fonte primária','medieval manuscript'],
  ];
  for(const [title,expected] of examples){
    const a=photos.lessonPhotoAsset(lesson(title));
    assert.ok(a,title);
    assert.ok(a.title.toLowerCase().includes(expected.toLowerCase()),`${title}: ${a.title}`);
  }
});

test('topic-relevant repetition protection never expands to a different topic',()=>{
  const l=lesson('Higienização das mãos');
  const asset=photos.lessonPhotoAsset(l);
  const other=photos.lessonPhotoAsset(l,{recentPhotoIds:[asset.id],repeatWindow:24});
  assert.equal(other.id,asset.id);
  const assigned=photos.buildLessonPhotoAssignments([l,lesson('Fronteira seca')],{repeatWindow:24});
  assert.equal(assigned[l.id].id,asset.id);
  assert.equal(assigned['lesson-x-0077'].id,'commons:126018535');
});

test('quiz images cannot reveal answers just because a keyword matches the question',()=>{
  const secret={id:'question-dry-border',category:'cidadania',question:'Qual conceito define a fronteira seca?',concept:'fronteira seca',imageUrl:''};
  assert.equal(photos.questionPhoto(secret),'');
  assert.equal(photos.questionPhotoAsset(secret),undefined);
});
