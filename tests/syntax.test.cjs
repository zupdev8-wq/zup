'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const app=path.resolve(__dirname,'../app');
const ts=require(require.resolve('typescript',{paths:[app]}));
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
test('all nested TS/TSX source files parse and transpile with no syntax errors',()=>{
  const files=[path.join(app,'App.tsx'),...walk(path.join(app,'src')).filter(f=>/\.tsx?$/.test(f))];
  assert.ok(files.length>=25);
  for(const file of files){
    const result=ts.transpileModule(fs.readFileSync(file,'utf8'),{
      fileName:file,reportDiagnostics:true,
      compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext,jsx:ts.JsxEmit.ReactJSX}
    });
    const errors=(result.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error);
    assert.equal(errors.length,0,file+': '+errors.map(e=>ts.flattenDiagnosticMessageText(e.messageText,'\n')).join('\n'));
  }
});
test('all relative mobile imports point to real files',()=>{
  for(const file of [path.join(app,'App.tsx'),...walk(path.join(app,'src')).filter(f=>/\.tsx?$/.test(f))]){
    const text=fs.readFileSync(file,'utf8');
    for(const match of text.matchAll(/(?:from\s*|import\s*)['"](\.[^'"]+)['"]/g)){
      const base=path.resolve(path.dirname(file),match[1]);
      assert.ok(['','.ts','.tsx','.js','/index.ts'].some(ext=>fs.existsSync(base+ext)),file+' -> '+match[1]);
    }
  }
});
test('profile photo paths and deprecated local Premium toggles are removed',()=>{
  const texts=[path.join(app,'App.tsx'),...walk(path.join(app,'src/screens')).filter(f=>/\.tsx?$/.test(f))].map(f=>fs.readFileSync(f,'utf8')).join('\n');
  assert.ok(!/image-picker|camera|avatarUri|photoURL/.test(texts));
  assert.ok(!/Ativar Premium de teste|DESATIVAR PREMIUM|DEV:/.test(texts));
});
