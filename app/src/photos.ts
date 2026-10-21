/**
 * ZUP! — catálogo de fotografias fornecido + correspondências editoriais.
 * Dados originais em photoCatalog.data.json (3.156 imagens e 229 temas).
 *
 * Use photos.ts e photoCatalog.data.json juntos.
 * Mantém lessonPhoto(lesson, variant), questionPhoto(question, variant)
 * e PHOTO_BANK_SIZE. A única importação é dos tipos reais do app em ./types.
 *
 * As imagens são remotas. Autoria, licença e origem estão em PhotoAsset.
 * Para exibir os créditos, use PhotoCredit/ZupImageBackground do pacote
 * de imagens ou uma apresentação equivalente na interface do aplicativo.
 * Escolha apenas se houver ligação clara ao título. Repetição usa
 * buildLessonPhotoAssignments ou recentPhotoIds fornecidos pelo feed.
 */
import type {CategoryId,MicroLesson,Question} from './types';

/**
 * ZUP — catálogo fotográfico com metadados de origem.
 * Gerado a partir de catalog.seed.json. Não editar URLs ou licenças à mão.
 * Créditos: use ZupImageBackground ou PhotoCredit ao exibir as imagens.
 */
export interface PhotoTopic {
  id: string;
  label: string;
  categories: readonly string[];
  keywords: readonly string[];
  fallback: boolean;
  quizSafe?: boolean;
}

export interface PhotoAsset {
  id: string;
  url: string;
  originalUrl: string;
  sourceUrl: string;
  title: string;
  author: string;
  license: string;
  licenseUrl: string;
  attributionRequired: boolean;
  width: number;
  height: number;
  topics: readonly string[];
  kind: 'photo' | 'artwork' | 'historical';
  checkedAt: string;
  credit?: string;
  attribution?: string;
  restrictions?: string;
}

export const PHOTO_CATALOG_VERSION = "2026-10-20.3";
export const PHOTO_CATALOG_GENERATED_AT = "2026-10-20T13:01:04+00:00";

// Dados exportados do photos.ts recebido, sem alterações de licença/autor/URL.
// O JSON reduz drasticamente o custo de análise de tipos TypeScript do aplicativo.
// Metro e Node carregam este arquivo local; não há busca de imagens em tempo de build.
declare const require:(path:string)=>unknown;
const photoData=require('./photoCatalog.data.json') as {
  readonly topics:readonly PhotoTopic[];
  readonly assets:readonly PhotoAsset[];
};
export const PHOTO_TOPICS:readonly PhotoTopic[]=photoData.topics;
export const PHOTO_ASSETS:readonly PhotoAsset[]=photoData.assets;

/**
 * Complementos editoriais vinculados a conceitos concretos.
 * Fontes e licenças conferidas individualmente nas páginas do Wikimedia Commons.
 * A existência de imagem sobre uma disciplina nunca basta para vincular uma aula.
 */
const ZUP_CURATED_TOPICS: readonly PhotoTopic[] = [
  {id:'zup-handwashing-clinical',label:'Profissional de saúde higienizando as mãos',
    categories:['enfermagem','medicina','revalida'],
    keywords:['higienização das mãos','higienizar as mãos','higienização das mãos na assistência','lavagem das mãos','lavar as mãos','higiene das mãos','antissepsia das mãos','fricção antisséptica das mãos'],
    fallback:false,quizSafe:false},
  {id:'zup-dry-border',label:'Marco real da fronteira seca de Ponta Porã',
    categories:['brasil','geografia','geopolitica','cidadania'],
    keywords:['fronteira seca','fronteiras secas','fronteira terrestre','fronteira entre brasil e paraguai','ponta porã e pedro juan caballero','pedro juan caballero'],
    fallback:false,quizSafe:false},
  {id:'zup-blue-sky',label:'O céu azul e a dispersão da luz solar',
    categories:['ciencia','fisica','natureza','geografia'],
    keywords:['céu é azul','céu azul','azul do céu','dispersão de rayleigh','espalhamento de rayleigh','luz se espalha na atmosfera','a luz se espalha'],
    fallback:false,quizSafe:false},
  {id:'zup-linear-perspective',label:'Trilhos convergindo para um ponto de fuga',
    categories:['artes','matematica','engenharia'],
    keywords:['perspectiva linear','ponto de fuga','pontos de fuga','linhas convergentes','perspectiva de um ponto','perspectiva com um ponto de fuga'],
    fallback:false,quizSafe:false},
  {id:'zup-valid-argument',label:'Diagrama de premissas e conclusão',
    categories:['filosofia','raciocinio','portugues'],
    keywords:['argumento válido','validade do argumento','validade lógica','inferência válida','argumentação dedutiva','premissas e conclusão','consequência lógica'],
    fallback:false,quizSafe:false},
];

const ZUP_CURATED_ASSETS: readonly PhotoAsset[] = [
  {
    id:'zup-curated:clinical-handwashing',
    url:'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/USNS_Mercy_Perioperative_Nurse_200417-N-DA693-1024_%2849798306703%29.jpg/960px-USNS_Mercy_Perioperative_Nurse_200417-N-DA693-1024_%2849798306703%29.jpg',
    originalUrl:'https://upload.wikimedia.org/wikipedia/commons/a/ad/USNS_Mercy_Perioperative_Nurse_200417-N-DA693-1024_%2849798306703%29.jpg',
    sourceUrl:'https://commons.wikimedia.org/wiki/File:USNS_Mercy_Perioperative_Nurse_200417-N-DA693-1024_(49798306703).jpg',
    title:'Profissional de enfermagem lava as mãos antes de entrar no centro cirúrgico (USNS Mercy)',
    author:'Jake Greenberg / U.S. Navy',license:'Domínio público (EUA)',
    licenseUrl:'https://creativecommons.org/publicdomain/mark/1.0/',attributionRequired:false,
    width:2343,height:3280,topics:['zup-handwashing-clinical'],kind:'photo',checkedAt:'2026-10-20T16:00:00Z',
    credit:'Fotografia da Marinha dos Estados Unidos; profissional lava as mãos antes de entrar no centro cirúrgico.',
  },
  {
    id:'zup-curated:blue-sky',
    url:'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/Sky_Blue_on_a_sunny_day_1.jpg/960px-Sky_Blue_on_a_sunny_day_1.jpg',
    originalUrl:'https://upload.wikimedia.org/wikipedia/commons/5/56/Sky_Blue_on_a_sunny_day_1.jpg',
    sourceUrl:'https://commons.wikimedia.org/wiki/File:Sky_Blue_on_a_sunny_day_1.jpg',
    title:'Céu azul durante o dia',author:'Labeiorhuan',license:'CC0 1.0',
    licenseUrl:'https://creativecommons.org/publicdomain/zero/1.0/deed.pt_BR',attributionRequired:false,
    width:1920,height:2560,topics:['zup-blue-sky'],kind:'photo',checkedAt:'2026-10-20T16:00:00Z',
    credit:'Fotografia de céu azul, associada à aula sobre dispersão da luz.',
  },
  {
    id:'zup-curated:railway-perspective',
    url:'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Railroad-Tracks-Perspective.jpg/960px-Railroad-Tracks-Perspective.jpg',
    originalUrl:'https://upload.wikimedia.org/wikipedia/commons/2/2a/Railroad-Tracks-Perspective.jpg',
    sourceUrl:'https://commons.wikimedia.org/wiki/File:Railroad-Tracks-Perspective.jpg',
    title:'Trilhos convergindo visualmente em perspectiva linear até o ponto de fuga',
    author:'MikeMalak',license:'Domínio público',
    licenseUrl:'https://commons.wikimedia.org/wiki/Help:Public_domain',attributionRequired:false,
    width:1536,height:2048,topics:['zup-linear-perspective'],kind:'photo',checkedAt:'2026-10-20T16:00:00Z',
    credit:'Fotografia de trilhos ferroviários em perspectiva linear.',
  },
  {
    id:'zup-curated:premises-and-conclusion',
    url:'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Premises_and_conclusion3.svg/960px-Premises_and_conclusion3.svg.png',
    originalUrl:'https://upload.wikimedia.org/wikipedia/commons/c/c4/Premises_and_conclusion3.svg',
    sourceUrl:'https://commons.wikimedia.org/wiki/File:Premises_and_conclusion3.svg',
    title:'Diagrama com relação lógica entre premissas e conclusão',
    author:'Phlsph7',license:'CC0 1.0',
    licenseUrl:'https://creativecommons.org/publicdomain/zero/1.0/deed.pt_BR',attributionRequired:false,
    width:390,height:340,topics:['zup-valid-argument'],kind:'artwork',checkedAt:'2026-10-20T16:00:00Z',
    credit:'Diagrama didático de premissas e conclusão; exemplo visual, não prova de validade.',
  },
];

// O marco físico de fronteira já existia no catálogo recebido.
// Reutiliza-se o MESMO registro (e URL), evitando duplicação e licenças divergentes.
const ZUP_CATALOG_TOPICS: readonly PhotoTopic[] = [...PHOTO_TOPICS,...ZUP_CURATED_TOPICS];
const ZUP_CATALOG_ASSETS: readonly PhotoAsset[] = [
  ...PHOTO_ASSETS.map(asset => asset.id === 'commons:126018535'
    ? {...asset,topics:[...asset.topics,'zup-dry-border']}
    : asset),
  ...ZUP_CURATED_ASSETS,
];

export type PhotoSelectionOptions = {
  variant?: number;
  /** IDs de fotos vistas antes deste conteúdo, da mais antiga à mais recente. */
  recentPhotoIds?: readonly string[];
  /** Janela usada somente para evitar repetições entre candidatos pertinentes. */
  repeatWindow?: number;
};

export type PhotoCatalogInfo = {
  version: string;
  assetCount: number;
  topicCount: number;
};

const CATEGORY_IDS = [
  'brasil','cidadania','geopolitica','mundo','geografia','historia',
  'literatura','filosofia','portugues','sociologia','psicologia','midia',
  'ciencia','biologia','espaco','natureza','medicina','revalida','enfermagem',
  'farmacia','biomedicina','matematica','fisica','quimica','raciocinio',
  'tecnologia','informatica','computacao','engenharia','direito','constituicao',
  'administracao','contabilidade','economia','cinema','series','musica',
  'games','cultura','artes','religioes','teologia','esportes','gastronomia',
] as const;

const DEFAULT_REPEAT_WINDOW = 24;
const MAX_REPEAT_WINDOW = 1000;
const GENERIC_KEYWORD_WORDS = new Set([
  'a','o','as','os','um','uma','uns','umas','de','da','do','das','dos','e',
  'em','no','na','nos','nas','para','por','com','sem','sobre',
  'foto','fotos','fotografia','fotografias','imagem','imagens',
  'the','an','of','in','on','at','by','with','photo','photos','photograph',
  'photographs','picture','pictures','image','images',
]);

type IndexedTopic = {
  topic: PhotoTopic;
  keywords: readonly string[];
  assets: readonly PhotoAsset[];
};

type CatalogState = {
  version: string;
  assets: readonly PhotoAsset[];
  topics: readonly PhotoTopic[];
  topicById: Map<string, PhotoTopic>;
  topicsByCategory: Map<string, readonly IndexedTopic[]>;
  byUrl: Map<string, PhotoAsset>;
};

type Content = {
  id: string;
  category: CategoryId;
  primaryText: string;
  secondaryText: string;
};

function normalized(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function finiteInteger(value: number | undefined, fallback: number, maximum: number): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return fallback;
  return Math.min(maximum, Math.max(0, Math.floor(value)));
}

function hash(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Consulta e fragmento não alteram a identidade da fotografia. */
function imageKey(url: string): string {
  const base = url.trim().split(/[?#]/, 1)[0] ?? '';
  // Reconhece também outra resolução de um mesmo thumbnail do Wikimedia.
  return base.replace(
    /^https:\/\/(?:upload|thumb)\.wikimedia\.org\/wikipedia\/commons\/thumb\/([^/]+\/[^/]+\/[^/]+)\/[^/]+$/,
    'https://upload.wikimedia.org/wikipedia/commons/$1',
  );
}

function canIllustrateQuiz(topic: PhotoTopic): boolean {
  return topic.quizSafe === true || (topic.fallback && topic.quizSafe !== false);
}

function record(value: unknown, name: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`Catálogo de fotos: ${name} deve ser um objeto.`);
  }
  return value as Record<string, unknown>;
}

function stringField(value: unknown, name: string, allowEmpty = false): string {
  if (typeof value !== 'string' || (!allowEmpty && !value.trim()) || value.length > 30000) {
    throw new Error(`Catálogo de fotos: ${name} inválido.`);
  }
  return value;
}

function stringList(value: unknown, name: string, allowEmpty = false): readonly string[] {
  if (!Array.isArray(value) || value.length > 2000 || (!allowEmpty && value.length === 0)) {
    throw new Error(`Catálogo de fotos: ${name} deve ser uma lista válida.`);
  }
  const result = value.map((entry, i) => stringField(entry, `${name}[${i}]`));
  return Object.freeze(Array.from(new Set(result)));
}

function webUrl(value: unknown, name: string, allowEmpty = false, httpsOnly = false): string {
  const url = stringField(value, name, allowEmpty);
  if (allowEmpty && url === '') return url;
  const pattern = httpsOnly ? /^https:\/\/[^\s/?#]+(?:[^\s]*)$/i : /^https?:\/\/[^\s/?#]+(?:[^\s]*)$/i;
  if (!pattern.test(url) || url.length > 8192 || /[<>"\\]/.test(url)) {
    throw new Error(`Catálogo de fotos: ${name} deve ser uma URL ${httpsOnly ? 'HTTPS' : 'HTTP(S)'} válida.`);
  }
  return url;
}

function positiveDimension(value: unknown, name: string): number {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 1 || value > 100000) {
    throw new Error(`Catálogo de fotos: ${name} deve ser uma dimensão positiva.`);
  }
  return value;
}

function parseTopic(value: unknown, index: number): PhotoTopic {
  const path = `topics[${index}]`;
  const t = record(value, path);
  if (typeof t.fallback !== 'boolean' || (t.quizSafe !== undefined && typeof t.quizSafe !== 'boolean')) {
    throw new Error(`Catálogo de fotos: ${path}.fallback/quizSafe inválido.`);
  }
  const topic: PhotoTopic = {
    id: stringField(t.id, `${path}.id`),
    label: stringField(t.label, `${path}.label`),
    categories: stringList(t.categories, `${path}.categories`),
    keywords: stringList(t.keywords, `${path}.keywords`, true),
    fallback: t.fallback,
    ...(t.quizSafe === undefined ? {} : {quizSafe: t.quizSafe}),
  };
  return Object.freeze(topic);
}

function parseAsset(value: unknown, index: number): PhotoAsset {
  const path = `assets[${index}]`;
  const a = record(value, path);
  if (a.kind !== 'photo' && a.kind !== 'artwork' && a.kind !== 'historical') {
    throw new Error(`Catálogo de fotos: ${path}.kind inválido.`);
  }
  if (typeof a.attributionRequired !== 'boolean') {
    throw new Error(`Catálogo de fotos: ${path}.attributionRequired inválido.`);
  }
  const checkedAt = stringField(a.checkedAt, `${path}.checkedAt`);
  if (!Number.isFinite(Date.parse(checkedAt))) {
    throw new Error(`Catálogo de fotos: ${path}.checkedAt deve ser uma data válida.`);
  }
  const asset: PhotoAsset = {
    id: stringField(a.id, `${path}.id`),
    url: webUrl(a.url, `${path}.url`, false, true).replace('https://thumb.wikimedia.org/', 'https://upload.wikimedia.org/'),
    originalUrl: webUrl(a.originalUrl, `${path}.originalUrl`, false, true),
    sourceUrl: webUrl(a.sourceUrl, `${path}.sourceUrl`),
    title: stringField(a.title, `${path}.title`),
    author: stringField(a.author, `${path}.author`, true),
    license: stringField(a.license, `${path}.license`),
    licenseUrl: webUrl(a.licenseUrl, `${path}.licenseUrl`, true),
    attributionRequired: a.attributionRequired,
    width: positiveDimension(a.width, `${path}.width`),
    height: positiveDimension(a.height, `${path}.height`),
    topics: stringList(a.topics, `${path}.topics`),
    kind: a.kind,
    checkedAt,
    ...(a.credit === undefined ? {} : {credit: stringField(a.credit, `${path}.credit`, true)}),
    ...(a.attribution === undefined ? {} : {attribution: stringField(a.attribution, `${path}.attribution`, true)}),
    ...(a.restrictions === undefined ? {} : {restrictions: stringField(a.restrictions, `${path}.restrictions`, true)}),
  };
  return Object.freeze(asset);
}

function makeState(catalog: unknown): CatalogState {
  const c = record(catalog, 'raiz');
  if (c.schemaVersion !== 1) throw new Error('Catálogo de fotos: schemaVersion deve ser 1.');
  const version = stringField(c.version, 'version');
  if (!Array.isArray(c.topics) || c.topics.length === 0 || c.topics.length > 2000) {
    throw new Error('Catálogo de fotos: topics deve conter entre 1 e 2000 temas.');
  }
  if (!Array.isArray(c.assets) || c.assets.length === 0 || c.assets.length > 50000) {
    throw new Error('Catálogo de fotos: assets deve conter entre 1 e 50000 imagens.');
  }
  const topics = Object.freeze(c.topics.map(parseTopic));
  const assets = Object.freeze(c.assets.map(parseAsset));
  const topicById = new Map<string, PhotoTopic>();
  const topicAssets = new Map<string, PhotoAsset[]>();
  const byUrl = new Map<string, PhotoAsset>();
  const ids = new Set<string>();
  for (const topic of topics) {
    if (topicById.has(topic.id)) throw new Error(`Catálogo de fotos: tema duplicado ${topic.id}.`);
    topicById.set(topic.id, topic);
    topicAssets.set(topic.id, []);
  }
  for (const asset of assets) {
    if (ids.has(asset.id)) throw new Error(`Catálogo de fotos: imagem duplicada ${asset.id}.`);
    ids.add(asset.id);
    for (const topicId of asset.topics) {
      const list = topicAssets.get(topicId);
      if (!list) throw new Error(`Catálogo de fotos: ${asset.id} referencia tema ausente ${topicId}.`);
      list.push(asset);
    }
    for (const url of [asset.url, asset.originalUrl]) {
      const key = imageKey(url);
      const previous = byUrl.get(key);
      if (previous && previous.id !== asset.id) {
        throw new Error(`Catálogo de fotos: URL compartilhada por ${previous.id} e ${asset.id}; una seus temas.`);
      }
      byUrl.set(key, asset);
    }
  }
  const topicsByCategory = new Map<string, IndexedTopic[]>();
  for (const topic of topics) {
    const entries = topicAssets.get(topic.id)!;
    if (entries.length === 0) continue;
    const indexed: IndexedTopic = {
      topic,
      keywords: Object.freeze(Array.from(new Set(topic.keywords.map(normalized).filter(
        keyword => keyword.length >= 2 && keyword.split(' ').some(word => !GENERIC_KEYWORD_WORDS.has(word)),
      )))),
      assets: Object.freeze(entries),
    };
    for (const category of topic.categories) {
      const list = topicsByCategory.get(category) ?? [];
      list.push(indexed);
      topicsByCategory.set(category, list);
    }
  }
  for (const category of CATEGORY_IDS) {
    const available = topicsByCategory.get(category) ?? [];
    if (!available.some(entry => entry.topic.fallback && canIllustrateQuiz(entry.topic))) {
      throw new Error(`Catálogo de fotos: falta fallback seguro com imagens para ${category}.`);
    }
  }
  return {version, assets, topics, topicById, topicsByCategory, byUrl};
}

let state = makeState({schemaVersion: 1, version: PHOTO_CATALOG_VERSION, assets: ZUP_CATALOG_ASSETS, topics: ZUP_CATALOG_TOPICS});

/** Quantidade real de registros únicos; é atualizada por installPhotoCatalog. */
export let PHOTO_BANK_SIZE = state.assets.length;

/**
 * Troca o catálogo inteiro, em memória, somente depois de validar a estrutura.
 * Não faz download, não persiste e não verifica a autenticidade da origem.
 * Uma instalação inválida lança erro e preserva integralmente o catálogo anterior.
 * Chame fora de render; remonte/recalcule o mapa do feed após uma troca válida.
 */
export function installPhotoCatalog(catalog: unknown): PhotoCatalogInfo {
  const next = makeState(catalog);
  state = next;
  PHOTO_BANK_SIZE = next.assets.length;
  return getPhotoCatalogInfo();
}

export function getPhotoCatalogInfo(): PhotoCatalogInfo {
  return {version: state.version, assetCount: state.assets.length, topicCount: state.topics.length};
}

function keywordScore(keyword: string, primary: string, secondary: string): number {
  const phrase = ` ${keyword} `;
  const specificity = Math.min(keyword.length, 40) + keyword.split(' ').length * 12;
  if (primary.includes(phrase)) return 120 + specificity;
  if (secondary.includes(phrase)) return 40 + specificity;
  return 0;
}

// Aproximação lexical CONSERVADORA: só aceita termos concretos, inteiros, no título.
// O resumo pode conter exemplos, comparações ou contrapontos que NÃO devem
// transformar uma aula em uma fotografia de outro assunto.
const GENERIC_TITLE_WORDS = new Set([
  ...CATEGORY_IDS,'curiosidade','explicacao','conceito','aprender','estudo','exemplo',
  'conheca','descubra','conceitos','pensamento','elemento','processo','contexto',
  'importancia','aula','tudo','coisa','coisas','certo','errado','pode','porque',
  'quando','quais','qual','como','onde','existe','fazer','entenda','duas',
]);
function usefulKeyword(keyword: string): boolean {
  const meaningful=keyword.split(' ').filter(word => word.length>=4 &&
    !GENERIC_KEYWORD_WORDS.has(word) && !GENERIC_TITLE_WORDS.has(word));
  // Preferir expressões compostas; palavras isoladas só quando específicas.
  return meaningful.length>=2 || (keyword.split(' ').length>=3 && meaningful.length>=1) ||
    (meaningful.length===1 && meaningful[0]!.length>=7 &&
      !GENERIC_TITLE_WORDS.has(meaningful[0]!));
}
function topicScore(topic: IndexedTopic, primary: string): number {
  let strongest=0;
  for(const keyword of topic.keywords){
    if (!usefulKeyword(keyword)) continue;
    const score=keywordScore(keyword,primary,'');
    if(score>strongest)strongest=score;
  }
  return strongest;
}

/**
 * Se vários registros descrevem um mesmo tema, preferir fotos cujo nome
 * confirme a entidade pedida. Se não houver distinção, a escolha é estável.
 */
function preferMatchingTitles(
  pool: readonly PhotoAsset[],
  topics: readonly IndexedTopic[],
  primary: string,
  _secondary: string,
): readonly PhotoAsset[] {
  const byTopic = new Map<string,{keyword:string;score:number}[]>();
  for (const entry of topics) {
    byTopic.set(entry.topic.id,entry.keywords
      .filter(usefulKeyword)
      .map(keyword=>({keyword,score:keywordScore(keyword,primary,'')}))
      .filter(match=>match.score>0));
  }
  let strongest=0;
  const scored=pool.map(asset=>{
    const title=` ${normalized(asset.title)} `;
    let score=0;
    for(const topic of asset.topics){
      for(const match of byTopic.get(topic)??[]){
        if(title.includes(` ${match.keyword} `))score=Math.max(score,match.score);
      }
    }
    strongest=Math.max(strongest,score);
    return {asset,score};
  });
  return strongest>0?scored.filter(entry=>entry.score===strongest).map(entry=>entry.asset):pool;
}

function candidatePool(content: Content, forQuiz:boolean):readonly PhotoAsset[] {
  const inCategory=state.topicsByCategory.get(content.category)??[];
  const primary=` ${normalized(content.primaryText)} `;
  let bestScore=0;
  let best: IndexedTopic[]=[];
  for (const entry of inCategory){
    if(entry.topic.fallback)continue; // Sem foto aleatória de disciplina.
    if(forQuiz && !canIllustrateQuiz(entry.topic))continue; // Não revelar gabarito.
    const score=topicScore(entry,primary);
    if(score===0)continue;
    const prioritized=score+(entry.topic.id.startsWith('zup-')?60:0);
    if(prioritized>bestScore){bestScore=prioritized;best=[entry];}
    else if(prioritized===bestScore)best.push(entry);
  }
  if(best.length===0)return [];
  const unique=new Map<string,PhotoAsset>();
  for(const entry of best)for(const asset of entry.assets)unique.set(asset.id,asset);
  return preferMatchingTitles([...unique.values()],best,primary,'');
}

function ranked(pool:readonly PhotoAsset[],seed:string):PhotoAsset[]{
  return pool.map(asset=>({asset,score:hash(`${seed}\u0000${asset.id}`)}))
    .sort((a,b)=>b.score-a.score||(a.asset.id<b.asset.id?-1:a.asset.id>b.asset.id?1:0))
    .map(entry=>entry.asset);
}

function choose(content:Content,options:PhotoSelectionOptions,forQuiz:boolean):PhotoAsset|undefined{
  const pool=candidatePool(content,forQuiz);
  if(pool.length===0)return undefined; // Neutro e honesto em vez de foto errada.
  const window=finiteInteger(options.repeatWindow,DEFAULT_REPEAT_WINDOW,MAX_REPEAT_WINDOW);
  const recent=new Set(window>0?(options.recentPhotoIds??[]).slice(-window):[]);
  const unseen=pool.filter(asset=>!recent.has(asset.id));
  // Mesmo se a janela estiver cheia, NUNCA procurar outra categoria/tema.
  const ordered=ranked(unseen.length?unseen:pool,content.id);
  const variant=finiteInteger(options.variant,0,Number.MAX_SAFE_INTEGER);
  return ordered[variant%ordered.length];
}

function lessonContent(lesson: MicroLesson): Content {
  return {
    id: `lesson:${String(lesson.id)}`,
    category: lesson.category,
    primaryText: lesson.title ?? '',
    secondaryText: lesson.summary ?? '',
  };
}

function questionContent(question: Question): Content {
  return {
    id: `question:${String(question.id)}`,
    category: question.category,
    primaryText: question.question ?? '',
    secondaryText: question.concept ?? '',
    // fact e alternativas ficam de fora: podem revelar o gabarito pela imagem.
  };
}

/**
 * Vínculos editoriais de fotos do catálogo já recebido. A associação por ID de aula
 * é deliberada: um simples termo como 'banco', 'função' ou 'luz' não permite
 * escolher uma fotografia com segurança. IDs abaixo foram revisados por tema.
 * Se um catálogo externo não tiver a foto revisada, não tenta improvisar.
 */
const EDITORIAL_LESSON_PHOTOS: Readonly<Record<string,string>> = Object.freeze({
  'lesson-brasil-05':'commons:153659896', // Paisagem alagada/rios do Pantanal (cheias anuais).
  'lesson-geopolitica-01':'commons:137911744', // Sede das Nações Unidas.
  'lesson-geopolitica-13':'commons:137911758', // Sede da ONU, símbolo do órgão que concede vetos.
  'lesson-constituicao-01':'commons:24743610', // Congresso Nacional, sede da promulgação de 1988.
  'lesson-x-0149':'commons:48793673', // Manuscrito bíblico: documento analisado em exegese.
  'lesson-x-0161':'commons:150630212', // Retrato fotográfico de Machado de Assis (não escultura).
  'lesson-x-0419':'commons:81668233', // Termociclador PCR.
  'lesson-h-0101':'commons:167730742', // Pão assando e ganhando cor por Maillard.
  'lesson-g-06375':'commons:87553742', // Manuscrito histórico original: fonte primária.
  'lesson-g-08669':'commons:176179296', // Instrumento de percussão para ritmo musical.
  'lesson-g-09504':'commons:10135910', // Abelha polinizando flor, serviço ecossistêmico.
});

function selectEditorialAsset(lesson:MicroLesson):PhotoAsset|undefined{
  const id=EDITORIAL_LESSON_PHOTOS[String(lesson.id)];
  if(!id)return undefined;
  // Uma instalação externa de catálogo também pode preservar o mesmo ID.
  return state.assets.find(asset=>asset.id===id);
}

/** Foto ampla da própria disciplina, usada somente na capa do feed quando não
 * existe correspondência exata. As rotinas de questões permanecem conservadoras. */
export function feedFallbackPhotoAsset(category:CategoryId, seed:string):PhotoAsset|undefined {
  const possible=(state.topicsByCategory.get(category)??[])
    .filter(item=>item.topic.fallback && item.assets.length>0);
  if(!possible.length)return undefined;
  const chosen=possible[hash(seed)%possible.length]!;
  return ranked(chosen.assets,seed)[0];
}

export function lessonPhotoAsset(lesson: MicroLesson, options: PhotoSelectionOptions = {}): PhotoAsset | undefined {
  const editorialId=EDITORIAL_LESSON_PHOTOS[String(lesson.id)];
  if(editorialId)return selectEditorialAsset(lesson);
  return choose(lessonContent(lesson), options, false);
}

/**
 * Uma URL explícita sem registro no catálogo não tem metadados verificáveis aqui.
 * Nesse caso retorna undefined; questionPhoto continua preservando a URL.
 */
export function questionPhotoAsset(question: Question, options: PhotoSelectionOptions = {}): PhotoAsset | undefined {
  const explicit = question.imageUrl?.trim();
  if (explicit) return findPhotoAssetByUrl(explicit);
  return choose(questionContent(question), options, true);
}

/** Compatível com a assinatura usada pelo feed original. Função sem efeito colateral. */
export function lessonPhoto(lesson: MicroLesson, variant = 0): string {
  return lessonPhotoAsset(lesson, {variant})?.url ?? '';
}

/** Compatível com a assinatura usada pelo quiz original. */
export function questionPhoto(question: Question, variant = 0): string {
  const explicit = question.imageUrl?.trim();
  if (explicit) return explicit;
  return choose(questionContent(question), {variant}, true)?.url ?? '';
}

/**
 * Calcule ao montar/atualizar a lista e reutilize o mapa nos renders do feed.
 * A mesma lista e as mesmas opções produzem o mesmo resultado. IDs repetidos
 * preservam a primeira atribuição. Nunca altera uma imagem só por renderizar.
 */
export function buildLessonPhotoAssignments(
  lessons: readonly MicroLesson[],
  options: PhotoSelectionOptions = {},
): Record<string, PhotoAsset | undefined> {
  const assignments = Object.create(null) as Record<string, PhotoAsset | undefined>;
  const window = finiteInteger(options.repeatWindow, DEFAULT_REPEAT_WINDOW, MAX_REPEAT_WINDOW);
  const recent = window > 0 ? [...(options.recentPhotoIds ?? []).slice(-window)] : [];
  for (const lesson of lessons) {
    const key = String(lesson.id);
    if (Object.prototype.hasOwnProperty.call(assignments, key)) continue;
    const asset = lessonPhotoAsset(lesson, {...options, repeatWindow: window, recentPhotoIds: recent});
    assignments[key] = asset;
    if (window > 0 && asset) {
      recent.push(asset.id);
      if (recent.length > window) recent.splice(0, recent.length - window);
    }
  }
  return assignments;
}

export function findPhotoAssetByUrl(url: string): PhotoAsset | undefined {
  return state.byUrl.get(imageKey(url));
}

/**
 * Alternativas compartilham pelo menos um tema real com o registro informado.
 * Temas específicos e maior interseção têm prioridade. Não verifica a rede.
 */
export function getPhotoAlternatives(asset: PhotoAsset, limit = 3): PhotoAsset[] {
  const count = finiteInteger(limit, 3, 20);
  if (count === 0) return [];
  const topics = new Set(asset.topics);
  const candidates = state.assets.filter(candidate => candidate.id !== asset.id).map(candidate => {
    let score = 0;
    for (const topicId of candidate.topics) {
      if (topics.has(topicId)) score += state.topicById.get(topicId)?.fallback ? 1 : 4;
    }
    return {asset: candidate, score, tie: hash(`${asset.id}\u0000${candidate.id}`)};
  }).filter(candidate => candidate.score > 0);
  candidates.sort((a, b) => b.score - a.score || b.tie - a.tie || (a.asset.id < b.asset.id ? -1 : 1));
  return candidates.slice(0, count).map(candidate => candidate.asset);
}
