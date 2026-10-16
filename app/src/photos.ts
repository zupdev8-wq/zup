import type {CategoryId,MicroLesson,Question} from './types';

const U=(id:string)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=84`;
type PhotoGroup='brazil'|'world'|'history'|'books'|'learning'|'science'|'health'|'exact'|'tech'|'law'|'business'|'entertainment'|'arts'|'nature'|'religion'|'sportsFood';

/**
 * Curated real-photo bank. The feed passes a visual variant so consecutive cards
 * do not keep landing on the same image even when they share a category.
 */
const banks:Record<PhotoGroup,string[]>={
  brazil:[
    U('photo-1483729558449-99ef09a8c325'),U('photo-1516306580123-e6e52b1b7b5f'),U('photo-1500530855697-b586d89ba3ee'),
    U('photo-1507525428034-b723cf961d3e'),U('photo-1501785888041-af3ef285b470'),U('photo-1501854140801-50d01698950b'),
    U('photo-1469474968028-56623f02e42e'),U('photo-1441974231531-c6227db76b6e'),U('photo-1516026672322-bc52d61a55d5'),
    U('photo-1526778548025-fa2f459cd5c1'),U('photo-1511497584788-876760111969'),U('photo-1500534314209-a25ddb2bd429'),
  ],
  world:[
    U('photo-1521295121783-8a321d551ad2'),U('photo-1518544866330-4e77f6f80723'),U('photo-1526779259212-939e64788e3c'),
    U('photo-1488646953014-85cb44e25828'),U('photo-1500534314209-a25ddb2bd429'),U('photo-1467269204594-9661b134dd2b'),
    U('photo-1497366811353-6870744d04b2'),U('photo-1470214304380-aadaedcfff1b'),U('photo-1500534623283-312aade485b7'),
    U('photo-1524231757912-21f4fe3a7200'),U('photo-1494522358652-f30e61a60313'),U('photo-1533105079780-92b9be482077'),
  ],
  history:[
    U('photo-1461360370896-922624d12aa1'),U('photo-1524492412937-b28074a5d7da'),U('photo-1473448912268-2022ce9509d8'),
    U('photo-1564399579883-451a5d44ec08'),U('photo-1568322445389-f64ac2515020'),U('photo-1548013146-72479768bada'),
    U('photo-1564507592333-c60657eea523'),U('photo-1577083552431-6e5fd01988a5'),U('photo-1558370781-d6196949e317'),
  ],
  books:[
    U('photo-1491841550275-ad7854e35ca6'),U('photo-1455390582262-044cdead277a'),U('photo-1526243741027-444d633d7365'),
    U('photo-1481627834876-b7833e8f5570'),U('photo-1495446815901-a7297e633e8d'),U('photo-1544716278-ca5e3f4abd8c'),
    U('photo-1512820790803-83ca734da794'),U('photo-1505664194779-8beaceb93744'),U('photo-1516979187457-637abb4f9353'),
    U('photo-1521587760476-6c12a4b040da'),U('photo-1519682337058-a94d519337bc'),
  ],
  learning:[
    U('photo-1522202176988-66273c2fd55f'),U('photo-1434030216411-0b793f4b4173'),U('photo-1503676260728-1c00da094a0b'),
    U('photo-1523050854058-8df90110c9f1'),U('photo-1513258496099-48168024aec0'),U('photo-1498243691581-b145c3f54a5a'),
    U('photo-1509062522246-3755977927d7'),U('photo-1523240795612-9a054b0db644'),U('photo-1524178232363-1fb2b075b655'),
    U('photo-1517048676732-d65bc937f952'),U('photo-1531482615713-2afd69097998'),
  ],
  science:[
    U('photo-1532094349884-543bc11b234d'),U('photo-1576086213369-97a306d36557'),U('photo-1511174511562-5f7f18b874f8'),
    U('photo-1532187863486-abf9dbad1b69'),U('photo-1530210124550-912dc1381cb8'),U('photo-1507413245164-6160d8298b31'),
    U('photo-1579154204601-01588f351e67'),U('photo-1582719478250-c89cae4dc85b'),U('photo-1559757148-5c350d0d3c56'),
    U('photo-1446776811953-b23d57bd21aa'),U('photo-1462331940025-496dfbfc7564'),
  ],
  health:[
    U('photo-1576091160399-112ba8d25d1d'),U('photo-1538108149393-fbbd81895907'),U('photo-1532938911079-1b06ac7ceec7'),
    U('photo-1471864190281-a93a3070b6de'),U('photo-1584308666744-24d5c474f2ae'),U('photo-1559757175-0eb30cd8c063'),
    U('photo-1579684385127-1ef15d508118'),U('photo-1580281658628-9c6b9b45f6c4'),U('photo-1584982751601-97dcc096659c'),
    U('photo-1516841273335-e39b37888115'),
  ],
  exact:[
    U('photo-1509228468518-180dd4864904'),U('photo-1453738773917-9c3eff1db985'),U('photo-1636466497217-26a8cbeaf0aa'),
    U('photo-1603126857599-f6e157fa2fe6'),U('photo-1509228627152-72ae9ae6848d'),U('photo-1596496181848-3091d4878b24'),
    U('photo-1535551951406-a19828b0a76b'),U('photo-1567427017947-545c5f8d16ad'),U('photo-1596495577886-d920f1fb7238'),
  ],
  tech:[
    U('photo-1518770660439-4636190af475'),U('photo-1516321318423-f06f85e504b3'),U('photo-1550751827-4bd374c3f58b'),
    U('photo-1488590528505-98d2b5aba04b'),U('photo-1498050108023-c5249f4df085'),U('photo-1555066931-4365d14bab8c'),
    U('photo-1515879218367-8466d910aaa4'),U('photo-1526379095098-d400fd0bf935'),U('photo-1531297484001-80022131f5a1'),
    U('photo-1555949963-aa79dcee981c'),U('photo-1461749280684-dccba630e2f6'),
  ],
  law:[
    U('photo-1450101499163-c8848c66ca85'),U('photo-1529107386315-e1a2ed48a620'),U('photo-1589578527966-fdac0f44566c'),
    U('photo-1589829545856-d10d557cf95f'),U('photo-1505664194779-8beaceb93744'),U('photo-1453945619913-79ec89a82c51'),
    U('photo-1436450412740-6b988f486c6b'),U('photo-1555374018-13a8994ab246'),
  ],
  business:[
    U('photo-1454165804606-c3d57bc86b40'),U('photo-1521737711867-e3b97375f902'),U('photo-1554224155-8d04cb21cd6c'),
    U('photo-1556761175-b413da4baf72'),U('photo-1497366754035-f200968a6e72'),U('photo-1552664730-d307ca884978'),
    U('photo-1551836022-d5d88e9218df'),U('photo-1556742049-0cfed4f6a45d'),U('photo-1460925895917-afdab827c52f'),
    U('photo-1556761175-5973dc0f32e7'),
  ],
  entertainment:[
    U('photo-1489599849927-2ee91cede3ba'),U('photo-1485846234645-a62644f84728'),U('photo-1524985069026-dd778a71c7b4'),
    U('photo-1511379938547-c1f69419868d'),U('photo-1493225457124-a3eb161ffa5f'),U('photo-1511512578047-dfb367046420'),
    U('photo-1493711662062-fa541adb3fc8'),U('photo-1524368535928-5b5e00ddc76b'),U('photo-1492684223066-81342ee5ff30'),
    U('photo-1514525253161-7a46d19cd819'),U('photo-1487180144351-b8472da7d491'),U('photo-1486572788966-cfd3df1f5b42'),
    U('photo-1524368535928-5b5e00ddc76b'),U('photo-1516280440614-37939bbacd81'),
  ],
  arts:[
    U('photo-1541961017774-22349e4a1262'),U('photo-1547891654-e66ed7ebb968'),U('photo-1577083552431-6e5fd01988a5'),
    U('photo-1513364776144-60967b0f800f'),U('photo-1549490349-8643362247b5'),U('photo-1547891654-e66ed7ebb968'),
    U('photo-1579783902614-a3fb3927b6a5'),U('photo-1549289524-06cf8837ace5'),U('photo-1561214115-f2f134cc4912'),
  ],
  nature:[
    U('photo-1441974231531-c6227db76b6e'),U('photo-1469474968028-56623f02e42e'),U('photo-1501785888041-af3ef285b470'),
    U('photo-1501854140801-50d01698950b'),U('photo-1470770841072-f978cf4d019e'),U('photo-1447752875215-b2761acb3c5d'),
    U('photo-1500534623283-312aade485b7'),U('photo-1439853949127-fa647821eba0'),U('photo-1428908728789-d2de25dbd4e2'),
    U('photo-1511497584788-876760111969'),U('photo-1470252649378-9c29740c9fa8'),
  ],
  religion:[
    U('photo-1461360370896-922624d12aa1'),U('photo-1524492412937-b28074a5d7da'),U('photo-1548013146-72479768bada'),
    U('photo-1564399579883-451a5d44ec08'),U('photo-1564769625905-50e93615e769'),U('photo-1564507592333-c60657eea523'),
    U('photo-1548625361-ec5d1f55e7a4'),U('photo-1565552645632-d725f8bfc19a'),U('photo-1519817650390-64a93db51149'),
  ],
  sportsFood:[
    U('photo-1461896836934-ffe607ba8211'),U('photo-1517649763962-0c623066013b'),U('photo-1540747913346-19e32dc3e97e'),
    U('photo-1461897104016-0b3b00cc81ee'),U('photo-1504674900247-0877df9cc836'),U('photo-1476224203421-9ac39bcb3327'),
    U('photo-1498837167922-ddd27525d352'),U('photo-1543353071-873f17a7a088'),U('photo-1515003197210-e0cd71810b5f'),
  ],
};

const categoryGroup:Record<CategoryId,PhotoGroup>={
  brasil:'brazil',cidadania:'brazil',geopolitica:'world',mundo:'world',geografia:'world',historia:'history',
  literatura:'books',filosofia:'books',portugues:'books',sociologia:'learning',psicologia:'learning',midia:'learning',
  ciencia:'science',biologia:'science',espaco:'science',natureza:'nature',medicina:'health',enfermagem:'health',farmacia:'health',biomedicina:'health',
  matematica:'exact',fisica:'exact',quimica:'science',raciocinio:'exact',tecnologia:'tech',informatica:'tech',computacao:'tech',engenharia:'tech',
  direito:'law',constituicao:'law',administracao:'business',contabilidade:'business',economia:'business',
  cinema:'entertainment',series:'entertainment',musica:'entertainment',games:'entertainment',cultura:'arts',artes:'arts',
  religioes:'religion',teologia:'religion',esportes:'sportsFood',gastronomia:'sportsFood',
};

const special:[RegExp,string[]][]=[
  [/amaz[oô]nia|floresta amaz|rio amazon/i,[U('photo-1441974231531-c6227db76b6e'),U('photo-1516026672322-bc52d61a55d5'),U('photo-1511497584788-876760111969'),U('photo-1501854140801-50d01698950b'),U('photo-1501785888041-af3ef285b470'),U('photo-1473448912268-2022ce9509d8')]],
  [/favela|viela|morro|perifer|comunidade/i,[U('photo-1483729558449-99ef09a8c325'),U('photo-1494522358652-f30e61a60313'),U('photo-1518005020951-eccb494ad742'),U('photo-1524231757912-21f4fe3a7200'),U('photo-1526778548025-fa2f459cd5c1'),U('photo-1500530855697-b586d89ba3ee')]],
  [/fronteira|ponta por[aã]|paraguai|bol[ií]via|cidade g[eê]mea/i,[U('photo-1521295121783-8a321d551ad2'),U('photo-1500534314209-a25ddb2bd429'),U('photo-1488646953014-85cb44e25828'),U('photo-1500534623283-312aade485b7'),U('photo-1470214304380-aadaedcfff1b'),U('photo-1533105079780-92b9be482077')]],
];

function stable(value:string,size:number){let h=2166136261;for(let i=0;i<value.length;i++){h^=value.charCodeAt(i);h=Math.imul(h,16777619)}return (h>>>0)%size;}
function pick(pool:string[],seed:string,variant=0){return pool[(stable(seed,pool.length)+Math.max(0,variant))%pool.length]!;}

export function lessonPhoto(lesson:MicroLesson,variant=0):string{
  const text=`${lesson.title} ${lesson.summary}`;
  for(const [pattern,pool] of special)if(pattern.test(text))return pick(pool,lesson.id,variant);
  const bank=banks[categoryGroup[lesson.category]??'learning'];
  return pick(bank,lesson.id,variant);
}

export function questionPhoto(q:Question,variant=0):string{
  const pseudo={id:`q-${q.id}`,category:q.category,title:q.concept??q.question,summary:q.fact} as Pick<MicroLesson,'id'|'category'|'title'|'summary'>;
  return lessonPhoto(pseudo as MicroLesson,variant);
}

export const PHOTO_BANK_SIZE=new Set(Object.values(banks).flat()).size;
