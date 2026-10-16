import {Router} from 'express';

const BRAND='ZUP!';
const SUPPORT_EMAIL='zupdev8@gmail.com';
const UPDATED='16 de outubro de 2026';
const DEFAULT_ORIGIN='https://zup-api.onrender.com';
const origin=()=>String(process.env.PUBLIC_API_URL||DEFAULT_ORIGIN).replace(/\/+$/,'');

const css=`
:root{color-scheme:light;--yellow:#f6c515;--yellow2:#ffd94a;--ink:#101114;--muted:#666b74;--line:#e4e4e7;--soft:#fff9dc;--paper:#fff;--bg:#f7f7f4;--green:#dff5e8}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;background:linear-gradient(180deg,#fffdf3 0%,#f7f7f4 34%,#fff 100%);color:var(--ink);line-height:1.66}
a{color:#705900;text-decoration:none}a:hover{text-decoration:underline}.wrap{width:min(980px,calc(100% - 32px));margin:auto}.top{position:sticky;top:0;z-index:20;background:rgba(255,255,255,.92);backdrop-filter:blur(16px);border-bottom:1px solid rgba(0,0,0,.08)}.topin{min-height:72px;display:flex;align-items:center;justify-content:space-between;gap:22px}.brand{display:inline-flex;align-items:center;gap:10px;font-size:30px;font-weight:950;letter-spacing:-1.5px;color:var(--ink)}.brandmark{width:36px;height:36px;border-radius:12px;background:var(--yellow);display:grid;place-items:center;border:2px solid var(--ink);font-size:18px}.nav{display:flex;gap:16px;flex-wrap:wrap;justify-content:flex-end}.nav a{font-size:13px;font-weight:800;color:#494b51}.hero{padding:72px 0 34px}.eyebrow{display:inline-flex;align-items:center;gap:8px;background:var(--yellow);border:1px solid rgba(0,0,0,.12);padding:7px 11px;border-radius:999px;font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.hero h1{font-size:clamp(38px,6vw,64px);line-height:1.02;letter-spacing:-.05em;margin:18px 0 18px;max-width:850px}.lead{font-size:18px;color:var(--muted);max-width:790px;margin:0}.meta{margin-top:22px;display:flex;gap:10px;flex-wrap:wrap}.pill{background:#fff;border:1px solid var(--line);border-radius:999px;padding:8px 12px;font-size:12px;color:#5f6269}.card{background:rgba(255,255,255,.97);border:1px solid var(--line);border-radius:28px;padding:clamp(24px,4vw,46px);box-shadow:0 22px 70px rgba(0,0,0,.06);margin:18px 0 58px}.section{padding:18px 0;border-bottom:1px solid #ededee}.section:last-child{border-bottom:0}.section h2{font-size:22px;line-height:1.25;letter-spacing:-.02em;margin:0 0 9px}.section p{margin:8px 0;color:#44484f}.section ul{margin:10px 0 8px;padding-left:22px;color:#44484f}.section li{margin:6px 0}.notice{background:var(--soft);border:1px solid #efdc82;border-radius:18px;padding:16px 18px;margin:14px 0;color:#554500}.ok{background:var(--green);border-color:#b8e5c9;color:#28523a}.actions{display:flex;gap:11px;flex-wrap:wrap;margin-top:20px}.btn{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 18px;border-radius:15px;background:var(--ink);color:#fff;font-weight:900}.btn:hover{text-decoration:none;background:#26282d}.btn.secondary{background:var(--yellow);color:var(--ink);border:1px solid rgba(0,0,0,.12)}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:18px 0 58px}.mini{background:#fff;border:1px solid var(--line);border-radius:22px;padding:22px}.mini h2{font-size:18px;margin:8px 0}.mini p{font-size:14px;color:var(--muted);margin:0}.icon{width:42px;height:42px;border-radius:14px;background:var(--yellow);display:grid;place-items:center;font-weight:950}.footer{padding:0 0 42px;text-align:center;color:#7a7d84;font-size:13px}.footer strong{color:#33363c}@media(max-width:760px){.top{position:static}.topin{padding:14px 0;align-items:flex-start}.nav{gap:10px}.nav a{font-size:12px}.hero{padding:44px 0 24px}.lead{font-size:16px}.card{border-radius:22px;margin-bottom:36px}.grid{grid-template-columns:1fr}.brand{font-size:27px}}
`;

const esc=(value)=>String(value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

function nav(active){
  const items=[['Início','/'],['Privacidade','/privacy'],['Termos','/terms'],['Suporte','/support'],['Contato','/contact']];
  return items.map(([label,href])=>`<a href="${href}"${active===href?' aria-current="page"':''}>${label}</a>`).join('');
}
function layout({title,description,active,content}){
  const site=origin();
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"/><meta name="theme-color" content="#f6c515"/><meta name="description" content="${esc(description)}"/><link rel="canonical" href="${site}${active}"/><title>${esc(title)} | ${BRAND}</title><style>${css}</style></head><body><header class="top"><div class="wrap topin"><a class="brand" href="/" aria-label="ZUP! início"><span class="brandmark">Z</span>${BRAND}</a><nav class="nav" aria-label="Páginas públicas">${nav(active)}</nav></div></header><main class="wrap">${content}</main><footer class="wrap footer"><strong>${BRAND}</strong> · Aprender pode ser o seu próximo scroll.<br/>Contato oficial: <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a></footer></body></html>`;
}
function sendPage(res,html){
  res.setHeader('Cache-Control','public, max-age=1800');
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
  return res.status(200).type('html').send(html);
}

function home(){return layout({title:'Aprenda jogando',description:'ZUP! é um jogo gratuito de conhecimento com microaprendizados, quizzes e simulados.',active:'/',content:`
<section class="hero"><span class="eyebrow">Conhecimento em movimento</span><h1>Troque o scroll automático por curiosidade, repertório e jogo.</h1><p class="lead">O ZUP! reúne microaprendizados, quizzes, revisão, simulados e trilhas de Brasil, concursos, faculdade, ciência, humanas, exatas, biológicas, livros, cinema, religiões, tecnologia e muito mais.</p><div class="meta"><span class="pill">Sem cadastro obrigatório</span><span class="pill">Sem anúncios</span><span class="pill">Gratuito nesta versão</span></div><div class="actions"><a class="btn" href="/privacy">Política de Privacidade</a><a class="btn secondary" href="/support">Suporte</a></div></section>
<section class="grid"><article class="mini"><div class="icon">↟</div><h2>Feed de aprendizado</h2><p>Conteúdos curtos, variados e pensados para estimular curiosidade e pensamento crítico.</p></article><article class="mini"><div class="icon">5</div><h2>Quizzes e simulados</h2><p>Questões relacionadas ao que você acabou de aprender, com revisão separada do conteúdo novo.</p></article><article class="mini"><div class="icon">★</div><h2>Evolução</h2><p>XP, estrelas, sequência, biblioteca e mascotes transformam progresso em uma experiência de jogo.</p></article></section>`});}

function privacy(){return layout({title:'Política de Privacidade',description:'Política de Privacidade do ZUP!.',active:'/privacy',content:`
<section class="hero"><span class="eyebrow">Privacidade ZUP!</span><h1>Aprender sem transformar sua atenção em produto.</h1><p class="lead">Esta Política explica quais informações o ZUP! utiliza para funcionar e quais controles você possui sobre seus dados.</p><div class="meta"><span class="pill">Última atualização: ${UPDATED}</span><span class="pill">Contato: ${SUPPORT_EMAIL}</span></div></section>
<article class="card">
<section class="section"><h2>1. Quem somos e como falar conosco</h2><p>O <strong>ZUP!</strong> é um aplicativo educacional de microaprendizado, quizzes e simulados. Para dúvidas sobre privacidade, suporte ou conteúdo, escreva para <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>.</p></section>
<section class="section"><h2>2. Sem cadastro obrigatório</h2><p>A versão atual do ZUP! não exige nome completo, e-mail, telefone, senha ou criação de conta para utilizar o aplicativo.</p></section>
<section class="section"><h2>3. Dados que ficam no aparelho</h2><p>O progresso do jogo é armazenado principalmente no dispositivo, incluindo apelido escolhido, companheiro, preferências, XP, estrelas, sequência, respostas, conteúdos aprendidos, itens salvos, revisões e sessões em andamento.</p><p>Essas informações permanecem no aparelho até serem apagadas pelo usuário, substituídas pelo aplicativo ou removidas pelo sistema.</p></section>
<section class="section"><h2>4. Versão atual gratuita</h2><p>A versão disponibilizada atualmente nas lojas é gratuita e não oferece assinatura, compra de Premium, checkout externo ou compra dentro do aplicativo.</p></section>
<section class="section"><h2>5. Fotografias, diagramas e fontes externas</h2><p>O ZUP! pode carregar fotografias, ilustrações educacionais e referências por meio de provedores externos. Ao solicitar esses recursos, o provedor pode receber informações técnicas usuais de conexão, como endereço IP e cabeçalhos de rede.</p></section>
<section class="section"><h2>6. Suporte</h2><p>Se você entrar em contato por e-mail, receberemos as informações que decidir enviar, como endereço de e-mail, descrição do problema e anexos. Não envie senhas, dados bancários ou outras informações desnecessárias.</p></section>
<section class="section"><h2>7. Publicidade e rastreamento</h2><p>O ZUP! não exibe anúncios, não vende dados pessoais e não utiliza os dados do aplicativo para publicidade comportamental entre serviços de terceiros.</p></section>
<section class="section"><h2>8. Conteúdo educacional e saúde</h2><p>O ZUP! possui conteúdo de várias áreas, inclusive saúde, medicina, farmacologia e Revalida. Esse material tem finalidade educacional e não substitui avaliação médica, diagnóstico, prescrição, orientação profissional ou fontes oficiais de prova e regulamentação.</p></section>
<section class="section"><h2>9. Crianças e adolescentes</h2><p>O ZUP! não foi projetado para coletar deliberadamente dados pessoais de crianças. O uso por menores deve observar a legislação aplicável e a orientação dos responsáveis quando necessária.</p></section>
<section class="section"><h2>10. Segurança</h2><p>Adotamos medidas razoáveis para reduzir riscos relacionados ao armazenamento local e à infraestrutura pública do produto. Nenhum sistema conectado à internet pode oferecer garantia absoluta de segurança.</p></section>
<section class="section"><h2>11. Direitos e exclusão</h2><p>Você pode apagar os dados locais pelo próprio aplicativo. Para dúvidas ou solicitações relacionadas a informações enviadas ao suporte, escreva para <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>. Consulte também <a href="/delete-data">Excluir meus dados</a>.</p></section>
<section class="section"><h2>12. Alterações desta política</h2><p>Esta Política poderá ser atualizada quando recursos, infraestrutura ou requisitos legais mudarem. A data da versão vigente aparece no início da página.</p></section>
</article>`});}

function terms(){return layout({title:'Termos de Uso',description:'Termos de Uso do ZUP!.',active:'/terms',content:`
<section class="hero"><span class="eyebrow">Termos ZUP!</span><h1>Jogar para aprender, com regras claras.</h1><p class="lead">Estes Termos regulam o uso do feed, quizzes, biblioteca, revisão, simulados e demais recursos educacionais do ZUP!.</p><div class="meta"><span class="pill">Última atualização: ${UPDATED}</span><span class="pill">Contato: ${SUPPORT_EMAIL}</span></div></section>
<article class="card">
<section class="section"><h2>1. O serviço</h2><p>O ZUP! é uma ferramenta educacional de microaprendizado e jogos de conhecimento que organiza perguntas, explicações curtas, revisão e simulados em diferentes áreas.</p></section>
<section class="section"><h2>2. Versão gratuita de lançamento</h2><p>A versão atual distribuída nas lojas é gratuita. Não há assinatura, compra de Premium, cobrança recorrente ou checkout de pagamento dentro desta versão.</p></section>
<section class="section"><h2>3. Uso responsável</h2><p>Você deve utilizar o aplicativo de forma lícita e não pode tentar comprometer a segurança, distribuir código malicioso, explorar falhas deliberadamente ou violar direitos de terceiros.</p></section>
<section class="section"><h2>4. Conteúdo educacional</h2><p>O conteúdo foi desenvolvido para estudo e revisão. Embora busquemos clareza e precisão, podem existir erros, atualizações ou divergências de interpretação. Use fontes oficiais quando uma informação tiver efeito acadêmico, profissional, jurídico, financeiro ou de saúde.</p></section>
<section class="section"><h2>5. Medicina, farmacologia e Revalida</h2><p>Questões e explicações nessas áreas são materiais de estudo. Elas não constituem consulta médica, prescrição, diagnóstico ou recomendação de tratamento. Para o Revalida e outras provas, editais, matrizes e publicações oficiais prevalecem.</p></section>
<section class="section"><h2>6. Simulados</h2><p>Os simulados do ZUP! utilizam questões próprias e organização temática. Quando uma banca, concurso, curso ou exame é mencionado, isso indica estilo ou área de estudo e não significa afiliação, patrocínio ou reprodução oficial de prova.</p></section>
<section class="section"><h2>7. Progresso local</h2><p>O progresso é mantido principalmente no aparelho. Apagar o aplicativo, redefinir dados ou trocar de dispositivo pode remover esse progresso quando não houver mecanismo específico de sincronização.</p></section>
<section class="section"><h2>8. Publicidade</h2><p>O ZUP! não utiliza anúncios nesta versão.</p></section>
<section class="section"><h2>9. Propriedade intelectual</h2><p>A marca ZUP!, interface, código, mascotes, organização do conteúdo e elementos originais são protegidos pela legislação aplicável. Fotografias, diagramas e referências de terceiros permanecem sujeitos aos direitos e licenças de seus respectivos titulares.</p></section>
<section class="section"><h2>10. Disponibilidade</h2><p>O serviço pode sofrer indisponibilidade por manutenção, internet, sistemas operacionais, infraestrutura ou provedores externos. Não é garantida disponibilidade ininterrupta em todas as condições.</p></section>
<section class="section"><h2>11. Resultados acadêmicos</h2><p>O ZUP! não garante aprovação em prova, concurso, vestibular, faculdade, Revalida ou certificação. O aplicativo é uma ferramenta complementar de estudo.</p></section>
<section class="section"><h2>12. Mudanças futuras</h2><p>Novos recursos, inclusive recursos pagos, poderão ser introduzidos em versões futuras somente com atualização adequada do produto, das informações apresentadas ao usuário e das regras aplicáveis da plataforma de distribuição.</p></section>
<section class="section"><h2>13. Lei aplicável</h2><p>Estes Termos são regidos pela legislação brasileira, sem afastar direitos obrigatórios assegurados ao consumidor e outras normas aplicáveis.</p></section>
<section class="section"><h2>14. Contato</h2><p>E-mail oficial: <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a></p><div class="actions"><a class="btn" href="mailto:${SUPPORT_EMAIL}?subject=Suporte%20ZUP">Entrar em contato</a><a class="btn secondary" href="/privacy">Política de Privacidade</a></div></section>
</article>`});}

function support(){return layout({title:'Suporte',description:'Suporte oficial do ZUP!.',active:'/support',content:`
<section class="hero"><span class="eyebrow">Suporte ZUP!</span><h1>Ajuda para continuar aprendendo.</h1><p class="lead">O atendimento oficial do ZUP! é feito pelo e-mail abaixo. A versão atual do aplicativo é gratuita e não possui compras.</p><div class="meta"><span class="pill">${SUPPORT_EMAIL}</span></div><div class="actions"><a class="btn" href="mailto:${SUPPORT_EMAIL}?subject=Suporte%20ZUP">Enviar e-mail</a></div></section>
<article class="card">
<section class="section"><h2>Problema técnico</h2><p>Informe modelo do aparelho, versão do sistema, versão do ZUP! e o que aconteceu imediatamente antes do erro. Evite enviar informações sensíveis.</p></section>
<section class="section"><h2>Corrigir uma questão ou conteúdo</h2><p>Encontrou erro, ambiguidade ou informação desatualizada? Envie o título do conteúdo ou identificador da questão e descreva o problema para <a href="mailto:${SUPPORT_EMAIL}?subject=Corre%C3%A7%C3%A3o%20de%20conte%C3%BAdo%20ZUP">${SUPPORT_EMAIL}</a>.</p></section>
<section class="section"><h2>Troquei de aparelho</h2><p>Nesta versão, o progresso do jogo fica principalmente no aparelho. A troca de dispositivo não garante a transferência automática do histórico local.</p></section>
<section class="section"><h2>Excluir meus dados</h2><p>Consulte as instruções em <a href="/delete-data">Excluir meus dados</a>.</p></section>
<section class="section"><h2>Privacidade e termos</h2><div class="actions"><a class="btn secondary" href="/privacy">Política de Privacidade</a><a class="btn secondary" href="/terms">Termos de Uso</a></div></section>
</article>`});}

function contact(){return layout({title:'Contato',description:'Contato oficial do ZUP!.',active:'/contact',content:`
<section class="hero"><span class="eyebrow">Contato oficial</span><h1>Fale com o ZUP!.</h1><p class="lead">Use este canal para suporte, privacidade, correções de conteúdo, questões comerciais ou assuntos relacionados ao aplicativo.</p><div class="meta"><span class="pill">${SUPPORT_EMAIL}</span></div><div class="actions"><a class="btn" href="mailto:${SUPPORT_EMAIL}?subject=Contato%20ZUP">Enviar e-mail</a><a class="btn secondary" href="/support">Central de suporte</a></div></section>
<article class="card"><section class="section"><h2>E-mail</h2><p><a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a></p></section><section class="section"><h2>Segurança</h2><p>Não envie senhas, tokens, documentos desnecessários ou dados financeiros por e-mail.</p></section><section class="section"><h2>Documentos públicos</h2><div class="actions"><a class="btn secondary" href="/privacy">Privacidade</a><a class="btn secondary" href="/terms">Termos</a></div></section></article>`});}

function deleteData(){return layout({title:'Excluir meus dados',description:'Como excluir dados do ZUP!.',active:'/delete-data',content:`
<section class="hero"><span class="eyebrow">Controle de dados</span><h1>Excluir dados do ZUP!.</h1><p class="lead">O ZUP! não exige conta tradicional. Nesta versão, o progresso fica principalmente no próprio aparelho.</p></section>
<article class="card"><section class="section"><h2>Dados locais</h2><p>No aplicativo, abra o Perfil e use <strong>Apagar meus dados locais</strong>. Isso remove progresso, biblioteca, preferências, XP, estrelas, respostas e outros dados salvos pelo ZUP! no dispositivo.</p></section><section class="section"><h2>Dados enviados ao suporte</h2><p>Se você enviou informações por e-mail e deseja solicitar exclusão quando aplicável, escreva para <a href="mailto:${SUPPORT_EMAIL}?subject=Exclus%C3%A3o%20de%20dados%20ZUP">${SUPPORT_EMAIL}</a>.</p></section><section class="section"><h2>Sem conta ou compra nesta versão</h2><p>A versão atual distribuída nas lojas não exige conta, assinatura ou compra dentro do aplicativo.</p></section><section class="section"><h2>Limitações</h2><p>Prestadores de e-mail, hospedagem ou outros serviços podem manter logs e registros técnicos pelos prazos exigidos por segurança, operação ou legislação aplicável.</p></section></article>`});}

export function legalRouter(){
  const router=Router();
  router.get('/',(_req,res)=>sendPage(res,home()));
  router.get('/privacy',(_req,res)=>sendPage(res,privacy()));
  router.get('/terms',(_req,res)=>sendPage(res,terms()));
  router.get('/support',(_req,res)=>sendPage(res,support()));
  router.get('/contact',(_req,res)=>sendPage(res,contact()));
  router.get('/delete-data',(_req,res)=>sendPage(res,deleteData()));
  router.get('/privacy-policy',(_req,res)=>res.redirect(308,'/privacy'));
  router.get('/terms-of-use',(_req,res)=>res.redirect(308,'/terms'));
  router.get('/help',(_req,res)=>res.redirect(308,'/support'));
  router.get('/robots.txt',(_req,res)=>res.type('text').send(`User-agent: *\nAllow: /\nSitemap: ${origin()}/sitemap.xml\n`));
  router.get('/sitemap.xml',(_req,res)=>{const base=origin();res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/','/privacy','/terms','/support','/contact','/delete-data'].map(p=>`<url><loc>${base}${p}</loc></url>`).join('')}</urlset>`)});
  return router;
}

export const legalLinks={
  home:`${DEFAULT_ORIGIN}/`,
  privacy:`${DEFAULT_ORIGIN}/privacy`,
  terms:`${DEFAULT_ORIGIN}/terms`,
  support:`${DEFAULT_ORIGIN}/support`,
  contact:`${DEFAULT_ORIGIN}/contact`,
  deleteData:`${DEFAULT_ORIGIN}/delete-data`,
};
