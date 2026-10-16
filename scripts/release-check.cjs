'use strict';
// Checks local release configuration only; it does not publish or approve a build.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),app=path.join(root,'app');
const cfg=JSON.parse(fs.readFileSync(path.join(app,'app.json'),'utf8')).expo;
const env={};
const file=path.join(app,'.env');
if(fs.existsSync(file)){
  for(const line of fs.readFileSync(file,'utf8').split(/\r?\n/)){
    const match=line.match(/^\s*(EXPO_PUBLIC_[A-Z_]+)\s*=\s*(.*?)\s*$/);
    if(match)env[match[1]]=match[2].replace(/^(['"])(.*)\1$/,'$2');
  }
}
Object.assign(env,process.env);
const errors=[];

const ui=fs.readFileSync(path.join(app,'App.tsx'),'utf8');
const explore=fs.readFileSync(path.join(app,'src/screens/ExploreScreen.tsx'),'utf8');
if(ui.includes('usePremiumAccess')||ui.includes('PremiumScreen')||ui.includes("setScreen('premium')"))errors.push('Release de loja deve permanecer sem fluxo Premium ativo.');
if(explore.includes('PREMIUM')||explore.includes('Mercado Pago'))errors.push('Explore ainda expõe monetização na release gratuita.');
for(const key of ['EXPO_PUBLIC_PRIVACY_URL','EXPO_PUBLIC_SUPPORT_URL','EXPO_PUBLIC_TERMS_URL']){
  try{
    const u=new URL(env[key]);
    if(u.protocol!=='https:'||u.username||u.password||u.hostname==='localhost'||u.hostname.endsWith('.example')
      ||u.hostname==='example.com')throw new Error();
  }catch{errors.push(key+': configure uma URL HTTPS real.');}
}
if(!cfg.extra?.eas?.projectId)errors.push('Vincule app/app.json ao seu projeto EAS antes da build (extra.eas.projectId ausente).');
for(const key of [cfg.ios?.bundleIdentifier,cfg.android?.package])if(!key)errors.push('Identificador nativo ausente.');
for(const icon of [cfg.icon,cfg.android?.adaptiveIcon?.foregroundImage]){
  if(!icon||!fs.existsSync(path.resolve(app,icon)))errors.push('Asset de icone ausente: '+String(icon));
}
if(errors.length){
  console.error('Configuracao de publicacao incompleta:\n- '+errors.join('\n- '));
  console.error('\nIsso nao impede o teste local no Expo Go. Veja docs/RELEASE-CHECKLIST.md.');
  process.exitCode=1;
}else{
  console.log('Campos locais basicos de publicacao presentes.');
  console.log('Ainda obrigatorio: TypeScript completo, Expo Doctor, export, builds nativas, aparelhos, conteudo e revisao das lojas.');
  console.log('URLs nao foram consultadas; existencia, conteudo e titularidade ainda precisam ser conferidos.');
}
