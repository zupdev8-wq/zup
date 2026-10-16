import type {CategoryId,MicroLesson,Progress,Question,SourceRef,TrackId} from './types';
import {questions} from './questions';
import {getCategory} from './catalog';
import {localDate} from './game';

const source = (title:string,url:string):SourceRef => ({title,url});
const CF=source('Planalto · Constituição Federal','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm');
const IBGE=source('IBGE · Conheça o Brasil','https://educa.ibge.gov.br/jovens/conheca-o-brasil.html');
const BCB=source('Banco Central do Brasil · Cidadania Financeira','https://www.bcb.gov.br/cidadaniafinanceira');
const ONU=source('ONU · United Nations','https://www.un.org/en/about-us');
const NATO=source('NATO · Collective defence','https://www.nato.int/cps/en/natohq/topics_110496.htm');
const WTO=source('OMC · What we do','https://www.wto.org/english/thewto_e/whatis_e/what_we_do_e.htm');
const INEP=source('INEP · ENEM','https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem');
const CAMARA=source('Câmara dos Deputados · Entenda o processo legislativo','https://www.camara.leg.br/entenda-o-processo-legislativo/');

export function questionTracks(q:Question):TrackId[] {
  if(q.tracks?.length)return q.tracks;
  const map:Partial<Record<CategoryId,TrackId[]>>={
    brasil:['brasil','enem','concursos'], historia:['historia','enem','concursos','humanas'], natureza:['ciencia','enem','biologicas'], espaco:['ciencia','geral'],
    ciencia:['ciencia','enem'], cultura:['geral','enem','humanas'], geografia:['enem','geopolitica','humanas'], esportes:['entretenimento','geral'], tecnologia:['ciencia','exatas','geral'],
    gastronomia:['brasil','entretenimento'], artes:['historia','enem','humanas'], mundo:['geopolitica','geral'], geopolitica:['geopolitica','enem','concursos','humanas'],
    constituicao:['brasil','concursos','humanas'], portugues:['enem','concursos','humanas'], economia:['brasil','enem','concursos','humanas'], raciocinio:['enem','concursos','exatas'],
    cinema:['entretenimento','cinema','humanas'], series:['entretenimento','series'], musica:['entretenimento','humanas'], games:['entretenimento','tecnologia'],
    literatura:['livros','humanas','enem'], filosofia:['pensamento','humanas','enem'], sociologia:['humanas','enem','faculdade'], psicologia:['faculdade','humanas','biologicas'],
    religioes:['religioes','humanas','pensamento'], teologia:['religioes','faculdade','humanas'], midia:['pensamento','humanas','enem','concursos'], cidadania:['brasil-vivido','brasil','humanas'],
    matematica:['exatas','enem','concursos','faculdade'], fisica:['exatas','enem','faculdade','ciencia'], quimica:['exatas','enem','faculdade','ciencia'], biologia:['biologicas','enem','faculdade','ciencia'],
    direito:['concursos','faculdade','humanas','brasil'], administracao:['concursos','faculdade','humanas'], contabilidade:['concursos','faculdade','exatas'], informatica:['concursos','faculdade','exatas','tecnologia'],
    medicina:['faculdade','biologicas','ciencia'], enfermagem:['faculdade','biologicas','ciencia'], farmacia:['faculdade','biologicas','ciencia'], biomedicina:['faculdade','biologicas','ciencia'],
    engenharia:['faculdade','exatas','ciencia'], computacao:['faculdade','exatas','tecnologia'],
  };
  return map[q.category]??['geral'];
}

type Override=Partial<Omit<MicroLesson,'id'|'category'|'quizQuestionId'>>;
const rich:Record<string,Override>={
  'brasil-02':{title:'A Amazônia é muito maior do que uma floresta',hook:'Ela influencia água, clima, biodiversidade e a vida de milhões de pessoas.',summary:'A Amazônia é o maior bioma brasileiro em extensão e integra um sistema ambiental que conecta floresta, rios e atmosfera.',body:['A floresta amazônica recicla enorme quantidade de água por evapotranspiração. Parte desse vapor é transportada pelos ventos para outras regiões da América do Sul.','O bioma também abriga uma diversidade extraordinária de espécies e populações com diferentes modos de vida. Por isso, desmatamento, fogo e uso do solo têm efeitos que ultrapassam a área diretamente alterada.'],takeaway:'A Amazônia não é um sistema isolado: ela participa do ciclo da água, do clima e da biodiversidade em escala continental.',minutes:2,sources:[IBGE],tracks:['brasil','enem','geopolitica','ciencia']},
  'brasil-03':{title:'1822 não encerrou todas as disputas pela Independência',hook:'O 7 de Setembro é um marco, mas a formação do novo país foi um processo.',summary:'A Independência do Brasil foi proclamada em 1822, porém conflitos políticos e militares continuaram em diferentes províncias.',body:['A ruptura com Portugal ocorreu dentro de uma crise do Império português e envolveu elites locais, tropas, grupos populares e interesses regionais diferentes.','Depois da declaração, ainda foi necessário consolidar a autoridade do novo Estado e obter reconhecimento internacional. A Independência, portanto, funciona melhor como processo histórico do que como um único instante.'],takeaway:'Datas ajudam a organizar a história, mas processos políticos quase nunca começam e terminam em um só dia.',minutes:2,tracks:['brasil','historia','enem']},
  'brasil-05':{title:'Por que o Pantanal alaga todos os anos?',hook:'O pulso das águas é uma das chaves para entender a maior planície alagável tropical do planeta.',summary:'O Pantanal recebe água de uma grande bacia e apresenta relevo muito plano, o que faz as cheias se espalharem lentamente.',body:['O ciclo anual de cheia e seca transforma paisagens, distribui nutrientes e determina onde animais encontram alimento e abrigo.','Por isso, alterações em rios, vegetação e uso do solo nas áreas que alimentam a planície podem produzir efeitos longe do ponto onde começaram.'],takeaway:'No Pantanal, a alternância entre cheia e seca não é um defeito: é parte do funcionamento do ecossistema.',minutes:2,sources:[IBGE],tracks:['brasil','enem','ciencia']},
  'historia-05':{title:'A Lei Áurea acabou com a escravidão legal — não com seus efeitos',hook:'1888 é um marco jurídico, mas não reparou séculos de desigualdade.',summary:'A Lei Áurea aboliu juridicamente a escravidão no Brasil em 13 de maio de 1888.',body:['A abolição foi resultado de pressões e lutas de pessoas escravizadas, movimentos abolicionistas, fugas, quilombos, redes de apoio e mudanças políticas e econômicas.','A lei tinha apenas dois artigos e não criou uma política ampla de terra, renda, educação ou reparação para a população liberta. Esse contexto ajuda a compreender desigualdades posteriores.'],takeaway:'Abolição jurídica e inclusão social são problemas históricos diferentes.',minutes:3,tracks:['brasil','historia','enem','concursos']},
  'historia-08':{title:'Por que a Semana de 1922 virou símbolo do modernismo?',hook:'O evento durou poucos dias, mas ajudou a romper expectativas sobre o que a arte brasileira deveria ser.',summary:'A Semana de Arte Moderna ocorreu em São Paulo e se tornou referência do modernismo brasileiro.',body:['Artistas e escritores experimentavam novas linguagens e criticavam a dependência de modelos acadêmicos tradicionais.','O modernismo não foi um bloco único: teve grupos, fases e disputas. Mesmo assim, a Semana de 1922 ficou como símbolo de uma busca por novas formas de representar o Brasil.'],takeaway:'Movimentos culturais ganham força quando questionam convenções e produzem novas formas de olhar a sociedade.',minutes:2,tracks:['brasil','historia','enem']},
  'geografia-01':{title:'O tamanho do Brasil ajuda a explicar sua diversidade',hook:'Quase metade da América do Sul está dentro do território brasileiro.',summary:'O Brasil é o maior país sul-americano em área e apresenta grande variedade de climas, paisagens e redes urbanas.',body:['A extensão territorial cria longas fronteiras, diferentes fusos e grandes distâncias logísticas. Também ajuda a explicar a variedade de biomas e atividades econômicas.','Em provas, território não deve ser confundido apenas com “tamanho”: ele envolve poder, fronteiras, redes e formas de ocupação.'],takeaway:'Geografia política estuda não só onde as coisas estão, mas como o espaço é organizado e controlado.',minutes:2,sources:[IBGE],tracks:['brasil','enem','geopolitica']},
  'ciencia-01':{title:'O céu é azul por causa do jeito que a luz se espalha',hook:'A atmosfera seleciona comprimentos de onda de forma desigual.',summary:'A luz solar contém várias cores. Moléculas da atmosfera espalham com mais eficiência comprimentos de onda menores, associados ao azul.',body:['Esse fenômeno é chamado de espalhamento de Rayleigh. A luz azul é desviada em muitas direções e chega aos nossos olhos a partir de diferentes partes do céu.','Ao nascer e pôr do sol, a luz percorre um caminho maior pela atmosfera; mais azul é espalhado para fora da linha de visão e tons avermelhados ficam mais evidentes.'],takeaway:'A cor aparente do céu depende da interação entre luz e atmosfera.',minutes:2,tracks:['ciencia','enem']},
  'natureza-10':{title:'O Cerrado parece seco, mas é uma potência de água',hook:'Muitos grandes rios brasileiros dependem de áreas do Cerrado.',summary:'O Cerrado é uma savana tropical com vegetação adaptada ao fogo e à sazonalidade, além de extensa rede de nascentes e aquíferos.',body:['Raízes profundas ajudam plantas a atravessar a estação seca e influenciam a infiltração de água no solo.','A conversão do uso do solo pode alterar erosão, vazão e recarga hídrica. Por isso, o Cerrado tem papel ambiental muito maior do que sua aparência na estação seca sugere.'],takeaway:'Biomas são sistemas de clima, solo, água e biodiversidade — não apenas conjuntos de árvores.',minutes:2,sources:[IBGE],tracks:['brasil','enem','ciencia']},
  'geopolitica-01':{title:'Por que o Conselho de Segurança da ONU é tão poderoso?',hook:'Ele é um dos poucos órgãos internacionais capazes de adotar decisões obrigatórias em matéria de paz e segurança.',summary:'O Conselho de Segurança tem responsabilidade primária pela paz e segurança internacionais dentro do sistema da ONU.',body:['O órgão possui 15 membros. Cinco são permanentes e dispõem de poder de veto em decisões substantivas.','Essa estrutura reflete a ordem internacional criada após a Segunda Guerra Mundial e é alvo recorrente de debates sobre representatividade e reforma.'],takeaway:'Instituições internacionais também refletem relações de poder entre Estados.',minutes:3,sources:[ONU],tracks:['geopolitica','enem','concursos']},
  'geopolitica-02':{title:'O que o Artigo 5 da OTAN realmente diz?',hook:'Defesa coletiva não significa que todos os países sejam obrigados a responder exatamente da mesma maneira.',summary:'O Artigo 5 estabelece que um ataque armado contra um aliado pode ser considerado um ataque contra todos.',body:['Cada aliado se compromete a ajudar com a ação que considerar necessária, inclusive podendo envolver força armada.','A lógica é produzir dissuasão: tornar mais alto o custo esperado de atacar um membro da aliança.'],takeaway:'Alianças militares funcionam tanto pela capacidade de resposta quanto pela tentativa de evitar que um ataque aconteça.',minutes:2,sources:[NATO],tracks:['geopolitica','concursos']},
  'geopolitica-03':{title:'A OMC existe para tornar o comércio previsível',hook:'Comércio internacional não é só comprar e vender: ele depende de regras comuns.',summary:'A Organização Mundial do Comércio administra acordos comerciais e oferece um sistema de negociação e solução de controvérsias.',body:['Países podem contestar medidas comerciais de outros membros dentro de procedimentos institucionais.','A previsibilidade reduz incertezas para governos e empresas, embora disputas comerciais continuem sendo parte normal das relações internacionais.'],takeaway:'Regras multilaterais não eliminam conflitos; elas criam procedimentos para administrá-los.',minutes:2,sources:[WTO],tracks:['geopolitica','enem','concursos']},
  'geopolitica-07':{title:'Um estreito pode mexer com o preço de energia no mundo inteiro',hook:'Ormuz é um gargalo geográfico entre grandes produtores de petróleo e as rotas oceânicas.',summary:'O Estreito de Ormuz é uma passagem marítima estratégica para exportações de energia do Golfo Pérsico.',body:['Quando uma rota concentra grande fluxo comercial, tensões militares, acidentes ou bloqueios potenciais aumentam o risco percebido pelo mercado.','Esse é um exemplo clássico de como geografia física e política se encontram: poucos quilômetros podem ter importância econômica global.'],takeaway:'Geopolítica também é o estudo de rotas, gargalos e dependências materiais.',minutes:2,tracks:['geopolitica','enem']},
  'geopolitica-08':{title:'Suez encurta a distância entre Europa e Ásia',hook:'Sem o canal, muitos navios precisariam contornar toda a África.',summary:'O Canal de Suez liga o Mediterrâneo ao Mar Vermelho e é uma das rotas comerciais mais importantes do mundo.',body:['A passagem reduz tempo e combustível em viagens entre portos europeus e asiáticos.','Quando o canal fica bloqueado ou opera com restrições, atrasos podem se espalhar pelas cadeias de suprimentos, mostrando como infraestrutura física influencia a economia global.'],takeaway:'Cadeias globais podem depender de poucos corredores estratégicos.',minutes:2,tracks:['geopolitica','enem']},
  'geopolitica-13':{title:'O veto no Conselho de Segurança cria um paradoxo',hook:'Uma instituição criada para agir coletivamente pode ser bloqueada por um único membro permanente.',summary:'China, Estados Unidos, França, Reino Unido e Rússia têm poder de veto em decisões substantivas do Conselho de Segurança.',body:['O veto foi parte do arranjo político que viabilizou a criação da ONU após a Segunda Guerra Mundial.','Ao mesmo tempo, ele pode impedir decisões quando interesses centrais das grandes potências entram em choque — uma tensão entre eficácia, soberania e representatividade.'],takeaway:'O desenho de uma instituição define tanto o que ela consegue fazer quanto seus limites.',minutes:3,sources:[ONU],tracks:['geopolitica','concursos']},
  'geopolitica-14':{title:'O mar também tem “fronteiras” econômicas',hook:'Até 200 milhas náuticas podem formar a Zona Econômica Exclusiva de um Estado costeiro.',summary:'A Convenção da ONU sobre o Direito do Mar estabelece direitos e deveres sobre diferentes faixas marítimas.',body:['Na Zona Econômica Exclusiva, o Estado costeiro possui direitos soberanos para explorar e gerir recursos naturais, enquanto outras liberdades internacionais continuam sujeitas às regras da Convenção.','Isso ajuda a explicar disputas por pesca, petróleo, gás e delimitação marítima.'],takeaway:'Território e soberania no mar funcionam de modo diferente do território terrestre.',minutes:3,tracks:['geopolitica','concursos']},
  'constituicao-01':{title:'Por que a Constituição de 1988 é chamada de “Constituição Cidadã”?',hook:'Ela nasceu no processo de redemocratização e ampliou a proteção de direitos e a participação política.',summary:'A Constituição Federal vigente foi promulgada em 5 de outubro de 1988.',body:['O texto constitucional reorganizou instituições democráticas depois do regime militar e estabeleceu um amplo catálogo de direitos fundamentais e sociais.','O apelido “Constituição Cidadã” ficou associado ao discurso de Ulysses Guimarães na promulgação e à centralidade conferida à cidadania.'],takeaway:'A Constituição não é apenas uma lista de regras: ela organiza o Estado e define limites ao poder.',minutes:3,sources:[CF],tracks:['brasil','concursos','historia']},
  'constituicao-02':{title:'Separação dos Poderes não significa isolamento',hook:'Executivo, Legislativo e Judiciário são independentes, mas o sistema foi desenhado para criar controles recíprocos.',summary:'A Constituição define os três Poderes da União como independentes e harmônicos entre si.',body:['Cada Poder possui funções típicas, mas também participa de mecanismos de freios e contrapesos.','Esse arranjo busca impedir concentração excessiva de poder e exige cooperação institucional em vários processos.'],takeaway:'Separação de Poderes é divisão de funções com controles recíprocos, não três governos independentes.',minutes:2,sources:[CF],tracks:['brasil','concursos']},
  'constituicao-06':{title:'Decore menos: entenda o LIMPE',hook:'Cinco princípios expressos organizam a atuação administrativa no art. 37.',summary:'Legalidade, impessoalidade, moralidade, publicidade e eficiência aparecem expressamente no caput do art. 37 da Constituição.',body:['Em concursos, a sigla LIMPE ajuda a memorizar, mas o importante é distinguir o sentido de cada princípio.','Publicidade não significa divulgação irrestrita de qualquer dado; ela convive com hipóteses legítimas de sigilo, proteção de dados e direitos fundamentais.'],takeaway:'Mnemônicos ajudam a lembrar; questões difíceis cobram a aplicação do princípio ao caso concreto.',minutes:2,sources:[CF],tracks:['concursos','brasil']},
  'constituicao-08':{title:'O Brasil é uma federação de quatro tipos de entes',hook:'Município também é ente federativo no desenho constitucional brasileiro.',summary:'União, Estados, Distrito Federal e Municípios integram a organização político-administrativa brasileira.',body:['Cada ente possui competências próprias definidas pela Constituição e autonomia dentro desses limites.','Autonomia não é soberania: a soberania pertence à República Federativa do Brasil no plano internacional.'],takeaway:'Federação distribui competências e autonomia entre diferentes níveis de governo.',minutes:2,sources:[CF],tracks:['concursos','brasil','enem']},
  'constituicao-09':{title:'O Ministério Público não é um “quarto Poder”',hook:'Ele tem autonomia constitucional, mas não integra Executivo, Legislativo ou Judiciário.',summary:'O Ministério Público é instituição permanente essencial à função jurisdicional do Estado.',body:['Sua missão inclui a defesa da ordem jurídica, do regime democrático e de interesses sociais e individuais indisponíveis.','A autonomia ajuda a explicar por que o Ministério Público não fica subordinado a um dos três Poderes.'],takeaway:'Autonomia institucional não transforma automaticamente um órgão em um novo Poder da República.',minutes:2,sources:[CF],tracks:['concursos','brasil']},
  'economia-01':{title:'Inflação não é “um preço ficou caro”',hook:'Para falar em inflação, interessa uma alta ampla e persistente do nível de preços medido por uma cesta.',summary:'O IPCA acompanha a variação de preços de bens e serviços consumidos por famílias dentro de uma metodologia definida pelo IBGE.',body:['Um produto específico pode subir muito sem que isso represente, sozinho, a inflação de toda a economia.','Índices de preços combinam vários itens e pesos para produzir uma medida agregada. Por isso, a inflação oficial pode ser diferente da sensação de cada família.'],takeaway:'Inflação é uma medida agregada; a experiência individual depende da cesta de consumo de cada pessoa.',minutes:2,sources:[IBGE,BCB],tracks:['brasil','enem','concursos']},
  'economia-02':{title:'Por que a Selic mexe com tanta coisa?',hook:'Ela é uma referência para o custo do dinheiro na economia brasileira.',summary:'A Selic é a taxa básica de juros e influencia crédito, investimentos, câmbio e demanda agregada.',body:['Ao alterar a meta da Selic, o Banco Central procura influenciar as condições financeiras e a trajetória da inflação ao longo do tempo.','O efeito não é instantâneo: política monetária opera com defasagens e interage com expectativas, política fiscal e cenário internacional.'],takeaway:'Juros básicos são um instrumento, não um botão capaz de controlar toda a economia imediatamente.',minutes:3,sources:[BCB],tracks:['brasil','enem','concursos']},
  'economia-08':{title:'Toda escolha econômica tem um custo invisível',hook:'O custo de oportunidade é aquilo que você deixa de fazer ao escolher uma alternativa.',summary:'Recursos são limitados, então escolher uma opção implica abrir mão de outra.',body:['Se você usa duas horas para uma atividade, não pode usar as mesmas duas horas simultaneamente em outra.','Economistas chamam de custo de oportunidade o valor da melhor alternativa abandonada — conceito útil para decisões pessoais, empresariais e públicas.'],takeaway:'Custo não é só dinheiro; tempo e alternativas também têm valor.',minutes:2,tracks:['enem','concursos','geral']},
  'portugues-04':{title:'Crase não é “acento de palavra feminina”',hook:'Ela marca a fusão de dois “a”: preposição + artigo ou pronome compatível.',summary:'Em “vou à escola”, o verbo pede preposição “a” e “escola” admite artigo feminino “a”.',body:['Um teste útil é trocar o termo feminino por um masculino: “vou ao colégio”. Se surge “ao”, há forte indicação de que no feminino ocorrerá “à”.','Mas o teste não substitui a análise da regência e do artigo. Não existe crase antes de verbo e há várias situações especiais cobradas em prova.'],takeaway:'Para acertar crase, pergunte: existe preposição “a”? existe artigo ou pronome que começa com “a”?',minutes:2,tracks:['enem','concursos']},
  'portugues-05':{title:'Os quatro “porquês” ficam fáceis quando você olha a função',hook:'Separado costuma aparecer em perguntas; junto costuma introduzir explicação.',summary:'“Por que”, “porque”, “por quê” e “porquê” têm funções diferentes.',body:['“Por que” aparece em perguntas diretas ou indiretas. “Porque” pode introduzir causa ou explicação. “Por quê” aparece no fim de uma pergunta.','“Porquê” é substantivo e normalmente vem acompanhado de determinante: “o porquê”, “um porquê”.'],takeaway:'Em vez de decorar posição, identifique se a expressão pergunta, explica ou funciona como substantivo.',minutes:2,tracks:['enem','concursos']},
  'portugues-20':{title:'A tese é o coração de um texto argumentativo',hook:'Se você não sabe o que o autor está defendendo, os argumentos parecem informações soltas.',summary:'A tese é a ideia central que um texto argumentativo procura sustentar.',body:['Argumentos podem usar dados, exemplos, comparações, causas, consequências e referências para fortalecer a tese.','No ENEM, reconhecer a tese melhora a leitura de artigos, charges e textos de opinião — e também ajuda a organizar a própria redação.'],takeaway:'Pergunte sempre: “qual posição este texto quer que eu aceite ou considere?”',minutes:2,sources:[INEP],tracks:['enem','concursos']},
  'raciocinio-05':{title:'Subir 10% e cair 10% não leva ao mesmo lugar',hook:'Percentuais iguais podem produzir efeitos diferentes quando a base muda.',summary:'Se 100 aumenta 10%, vira 110. Uma queda de 10% sobre 110 leva a 99.',body:['O erro comum é somar +10% e −10% como se fossem mudanças sobre a mesma base.','Esse tipo de raciocínio aparece em descontos sucessivos, inflação, rendimentos, estatística e questões de concurso.'],takeaway:'Antes de calcular porcentagem, identifique qual é a base de cada mudança.',minutes:1,tracks:['enem','concursos']},
  'raciocinio-08':{title:'Negar “todos” não significa dizer “nenhum”',hook:'Em lógica, basta um contraexemplo para derrubar uma afirmação universal.',summary:'A negação de “todos os candidatos chegaram cedo” é “pelo menos um candidato não chegou cedo”.',body:['A afirmação original exige que cada integrante do grupo satisfaça a propriedade. Para torná-la falsa, basta que exista uma exceção.','Essa relação entre quantificadores aparece com frequência em raciocínio lógico de concursos.'],takeaway:'Negação de “todo” → “existe pelo menos um que não”.',minutes:1,tracks:['concursos']},
  'ciencia-03':{title:'Fotossíntese é uma conversão de energia',hook:'Plantas não “comem luz”: elas usam energia luminosa para produzir moléculas orgânicas.',summary:'Na fotossíntese, organismos usam luz para sustentar reações que transformam água e dióxido de carbono em compostos energéticos.',body:['O processo libera oxigênio como consequência de etapas que envolvem água e transferência de elétrons.','Em ecologia, a fotossíntese ajuda a explicar a entrada de energia nos ecossistemas e o papel dos produtores nas cadeias alimentares.'],takeaway:'Energia entra; matéria é reorganizada. Esses dois fluxos não são a mesma coisa.',minutes:2,tracks:['ciencia','enem']},
};

const fallbackBody:Partial<Record<CategoryId,string>>={
  brasil:'Conecte esse fato ao território, às instituições e às diferentes experiências de quem vive no Brasil. Evite tratar um país continental como se tivesse uma única realidade.',
  historia:'Localize o fato no tempo e procure o que mudou antes e depois dele. História é processo, disputa e consequência — não apenas coleção de datas.',
  natureza:'Pense nas relações entre organismos, ambiente, água, clima e uso do solo. Ecossistemas funcionam por conexões.',
  espaco:'Compare escalas: planeta, estrela, sistema e galáxia. Astronomia exige distinguir tamanho, distância e movimento.',
  ciencia:'Transforme a curiosidade em mecanismo: o que causa o fenômeno e quais evidências sustentam a explicação?',
  cultura:'Observe como símbolos, práticas e obras expressam valores, identidades e disputas de uma sociedade.',
  geografia:'Pergunte onde ocorre, por que ocorre ali e como fluxos de pessoas, mercadorias e poder organizam o espaço.',
  esportes:'Regras e contexto histórico ajudam a entender por que modalidades mudam ao longo do tempo.',
  tecnologia:'Tecnologia combina conhecimento, infraestrutura e escolhas sociais; não é apenas um aparelho novo.',
  gastronomia:'Comida também registra migrações, território, trabalho e trocas culturais.',
  artes:'Uma obra pode ser lida pela técnica, pelo contexto, pelas referências e pelo efeito que busca produzir.',
  mundo:'Compare regiões sem tratar países como blocos homogêneos; história e instituições importam.',
  geopolitica:'Observe interesses, capacidades, instituições, território e dependências. Geopolítica raramente tem uma causa única.',
  constituicao:'Em provas e na vida pública, diferencie regra, exceção, competência e aplicação prática.',
  portugues:'Identifique a função da palavra ou estrutura dentro da frase. A regra fica mais estável quando você entende o uso.',
  economia:'Separe variável nominal, variável real, incentivos e efeitos de curto e longo prazo antes de concluir.',
  raciocinio:'Defina a base do cálculo, escreva as relações e só depois faça as contas. Isso reduz erros por impulso.',
  cidadania:'Experiências urbanas e territoriais variam muito. Entender infraestrutura, mobilidade e desigualdade ajuda a enxergar pessoas além dos estereótipos.',
  religioes:'Religiões possuem diversidade interna. Aprender termos e práticas ajuda a trocar caricaturas por contexto e respeito.',
  teologia:'Diferencie descrição histórica, interpretação teológica e crença pessoal. O objetivo aqui é compreender ideias, não dizer ao usuário em que acreditar.',
  literatura:'Livros ampliam repertório quando conectamos linguagem, contexto, personagem e problema humano.',
  filosofia:'Pergunte quais razões sustentam uma ideia, quais pressupostos ela usa e que objeções podem ser feitas.',
  midia:'Antes de compartilhar, verifique fonte, data, evidência, contexto e o que ficou de fora da narrativa.',
  sociologia:'Ligue experiências individuais a instituições, grupos, desigualdades e transformações sociais.',
  psicologia:'Diferencie intuição sobre comportamento de resultados obtidos com métodos e evidências.',
  cinema:'Observe enquadramento, montagem, som, atuação e contexto: forma também produz significado.',
  series:'Narrativas seriadas constroem expectativa ao distribuir conflitos, informações e mudanças ao longo do tempo.',
  musica:'Música carrega técnica, memória, identidade e história social.',
  games:'Jogos ensinam por regras, feedback, repetição e escolhas — o sistema também comunica ideias.',
  matematica:'Traduza a situação em relações matemáticas antes de operar símbolos.',
  fisica:'Identifique grandezas, unidades e relações causais antes de escolher uma fórmula.',
  quimica:'Observe partículas, proporções, energia e condições da transformação.',
  biologia:'Conecte estrutura, função, evolução e ambiente para evitar decorar nomes isolados.',
  direito:'Leia a regra junto de seus limites e da competência de cada instituição.',
  administracao:'Objetivos, pessoas, processos e indicadores precisam estar conectados para a gestão fazer sentido.',
  contabilidade:'Pense em eventos econômicos e em como eles alteram recursos, obrigações e resultado.',
  informatica:'Entenda o princípio por trás da ferramenta; provas mudam interfaces, mas conceitos permanecem.',
  medicina:'Conteúdo educacional não substitui formação clínica. Foque mecanismo, evidência e raciocínio básico.',
  enfermagem:'Segurança, processo de cuidado e comunicação são tão importantes quanto memorizar procedimentos.',
  farmacia:'Relacione forma farmacêutica, farmacocinética, efeito e segurança.',
  biomedicina:'Laboratório exige método, controle de qualidade e interpretação cuidadosa de resultados.',
  engenharia:'Transforme requisitos em modelos, verifique limites e deixe margens para incerteza.',
  computacao:'Quebre problemas em dados, regras, abstrações e testes verificáveis.',
};
const genericFallback='Aprender fica mais forte quando você conecta o conceito a um exemplo, compara alternativas e explica a ideia com suas próprias palavras.';

function titleFrom(q:Question):string {
  const clean=q.question.replace(/[?!.]+$/,'').trim();
  return clean.length<=64?clean:`${clean.slice(0,61).trimEnd()}…`;
}
function defaultLesson(q:Question):MicroLesson {
  const t=questionTracks(q), title=q.concept??titleFrom(q);
  const summary=q.fact.length>28?q.fact:`${q.fact} Veja como essa ideia aparece em situações reais, estudos e provas.`;
  return {
    id:`lesson-${q.id}`,category:q.category,tracks:t,title,hook:q.concept?`Entenda ${q.concept} sem enrolação e teste se você realmente pegou a ideia.`:q.question,summary,
    body:[q.fact,fallbackBody[q.category]??genericFallback],takeaway:q.fact,quizQuestionId:q.id,minutes:q.concept?2:1,updatedAt:'2026-10-16',evergreen:true,
    sources:q.source?[q.source]:[],
  };
}

function mergeLesson(q:Question):MicroLesson {
  const base=defaultLesson(q),o=rich[q.id];
  return o?{...base,...o,id:base.id,category:q.category,quizQuestionId:q.id}:base;
}

const lessonKey=(q:Question)=>q.concept?`${q.category}:${q.topic??''}:${q.concept}`:q.id;
const lessonQuestions=new Map<string,Question>();
for(const q of questions){const key=lessonKey(q);if(!lessonQuestions.has(key))lessonQuestions.set(key,q);}
export const microLessons:MicroLesson[]=[...lessonQuestions.values()].map(mergeLesson);
export const lessonMap=new Map(microLessons.map(l=>[l.id,l]));
const lessonByKey=new Map(microLessons.map(l=>{const q=questions.find(x=>x.id===l.quizQuestionId)!;return [lessonKey(q),l] as const;}));
export const lessonByQuestion=new Map<string,MicroLesson>();
for(const q of questions){const lesson=lessonByKey.get(lessonKey(q));if(lesson)lessonByQuestion.set(q.id,lesson);}

const stableHash=(value:string)=>{let h=2166136261;for(let i=0;i<value.length;i++){h^=value.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0;};
export function buildFeed(p:Progress,track:TrackId='geral',today=new Date()):MicroLesson[] {
  const learned=new Set(p.learnedLessonIds),preferred=new Set(p.preferredTracks);
  const key=localDate(today);
  const unseen=microLessons.filter(l=>!learned.has(l.id));
  const source=unseen.length?unseen:microLessons;
  const score=(l:MicroLesson)=>{
    let s=0;
    if(track==='geral')s+=25; else if(l.tracks.includes(track))s+=220; else s-=350;
    if(l.tracks.some(t=>preferred.has(t)))s+=26;
    if(l.tracks.includes('brasil')||l.tracks.includes('brasil-vivido'))s+=12;
    if(rich[l.quizQuestionId])s+=16;
    return s+(stableHash(`${key}:${l.id}`)%1000)/1000;
  };
  const sorted=[...source].sort((a,b)=>score(b)-score(a));
  const diversified:MicroLesson[]=[];
  const pending=[...sorted];
  let lastCategory:CategoryId|undefined;
  while(pending.length&&diversified.length<240){
    let idx=pending.findIndex((l,i)=>i<12&&l.category!==lastCategory);
    if(idx<0)idx=0;
    const [picked]=pending.splice(idx,1);if(!picked)break;
    diversified.push(picked);lastCategory=picked.category;
  }
  return diversified;
}

export function lessonOfDay(p:Progress,now=new Date()):MicroLesson {
  const feed=buildFeed(p,'geral',now);return feed[stableHash(localDate(now))%Math.max(1,Math.min(feed.length,25))]??microLessons[0]!;
}

const unique=(xs:string[])=>[...new Set(xs)];
export function openLesson(p:Progress,id:string):Progress {
  if(!lessonMap.has(id)||p.openedLessonIds.includes(id))return p;
  return {...p,openedLessonIds:unique([...p.openedLessonIds,id])};
}
export function toggleSavedLesson(p:Progress,id:string):Progress {
  if(!lessonMap.has(id))return p;
  const has=p.savedLessonIds.includes(id);
  return {...p,savedLessonIds:has?p.savedLessonIds.filter(x=>x!==id):unique([...p.savedLessonIds,id])};
}
function parseDate(value:string){return /^\d{4}-\d{2}-\d{2}$/.test(value)?new Date(`${value}T12:00:00`):null;}
function dayGap(from:string,to:string){const a=parseDate(from),b=parseDate(to);return a&&b?Math.round((b.getTime()-a.getTime())/86_400_000):999;}
function activityTouch(p:Progress,now:Date):Pick<Progress,'streak'|'streakFreezes'|'lastPlayed'|'dailyDate'|'dailyDone'|'activity'> {
  const today=localDate(now),same=p.lastPlayed===today,gap=dayGap(p.lastPlayed,today);
  let streak=p.streak,freezes=p.streakFreezes;
  if(!same){
    if(gap===1)streak=Math.max(1,p.streak+1);
    else if(gap===2&&freezes>0){streak=Math.max(1,p.streak+1);freezes-=1;}
    else streak=1;
  }
  const dailyDone=p.dailyDate===today?p.dailyDone+1:1;
  const activity={...p.activity,[today]:(p.activity[today]??0)+1};
  const entries=Object.entries(activity).sort(([a],[b])=>a.localeCompare(b)).slice(-90);
  return {streak,streakFreezes:freezes,lastPlayed:today,dailyDate:today,dailyDone,activity:Object.fromEntries(entries)};
}
export function completeLesson(p:Progress,id:string,now=new Date()):Progress {
  if(!lessonMap.has(id))return p;
  const already=p.learnedLessonIds.includes(id);
  const opened=unique([...p.openedLessonIds,id]);
  if(already)return p.openedLessonIds===opened?p:{...p,openedLessonIds:opened};
  const activity=activityTouch(p,now);
  const learnedLessonIds=unique([...p.learnedLessonIds,id]);
  const badges=unique([...p.badges,...(learnedLessonIds.length>=10?['curioso10']:[]),...(learnedLessonIds.length>=50?['curioso50']:[])]);
  return {...p,...activity,openedLessonIds:opened,learnedLessonIds,xp:p.xp+8,stars:p.stars+2,badges};
}
export function buyStreakFreeze(p:Progress,cost=60):Progress {
  if(p.stars<cost||p.streakFreezes>=3)return p;
  return {...p,stars:p.stars-cost,streakFreezes:p.streakFreezes+1};
}
export function masteryForTrack(p:Progress,track:TrackId):{done:number;total:number;fraction:number} {
  const eligible=questions.filter(q=>track==='geral'||questionTracks(q).includes(track));
  const done=eligible.filter(q=>p.masteredIds.includes(q.id)).length,total=eligible.length;
  return {done,total,fraction:total?done/total:0};
}
