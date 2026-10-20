/**
 * Perguntas do acervo existente Open Trivia DB (licença CC BY-SA 4.0).
 * Os enunciados e alternativas são traduções/adaptações pt-BR das perguntas da
 * API pública. Não foram gerados por templates de questões do ZUP.
 * Títulos originais, conjuntos de origem e termos estão em
 * docs/FONTES-QUESTOES-EXTERNAS.md. As traduções exigem revisão editorial
 * humana antes de serem consideradas prova profissional.
 */
import type {CategoryId,Difficulty,Question} from './types';
import {importedQuestions} from './importedQuestions';
const openTrivia={title:'Open Trivia Database · CC BY-SA 4.0',url:'https://opentdb.com/api_config.php'};
const curiosity=(id:number,cat:CategoryId,question:string,choices:[string,string,string,string],fact:string,difficulty:Difficulty='facil'):Question=>({
  id:`t-${String(id).padStart(4,'0')}`,category:cat,topic:'trivia-externa',concept:`curiosidade-${id}`,
  question,choices,answer:0,fact,source:openTrivia,difficulty,
  tracks:cat==='natureza'||cat==='biologia'?['animais','ciencia','entretenimento']:
    cat==='ciencia'||cat==='espaco'?['ciencia','entretenimento']:
    cat==='literatura'?['livros','entretenimento','humanas']:
    cat==='games'?['games','entretenimento','tecnologia']:
    cat==='esportes'?['esportes','entretenimento']:
    cat==='musica'?['musica','entretenimento']:
    cat==='cinema'||cat==='series'?['entretenimento',cat]:
    ['entretenimento','humanas','geral'],
});
export const licensedTriviaQuestions:Question[]=[
  // OpenTDB api.php?amount=50: perguntas pré-existentes traduzidas.
  curiosity(1,'cultura','Quantas cartas há em um baralho tradicional, sem curingas?',['52','40','32','64'],'O baralho padrão reúne quatro naipes com 13 cartas cada.'),
  curiosity(2,'series','Qual família de desenho mora no número 31 da Spooner Street, em Quahog?',['Família Griffin','Família Simpson','Família Jetson','Família Hill'],'Esse é o endereço usado na série de animação Family Guy.','medio'),
  curiosity(3,'gastronomia','Qual fruta é um ingrediente tradicional do bolo Floresta Negra?',['Cereja','Damasco','Uva-passa','Maçã'],'A receita tradicional combina chocolate, chantili e cerejas.'),
  curiosity(4,'literatura','Que tipo de serpente é Kaa no Livro da Selva, de Rudyard Kipling?',['Píton','Cobra-real','Sucuri','Víbora'],'Kaa é um personagem da obra de Kipling, publicada no século XIX.'),
  curiosity(5,'series','Qual é o nome verdadeiro de Scooby-Doo?',['Scoobert Doo','Scooter Doo','Scrappy Doo','Shooby Doo'],'Scoobert Doo é o nome usado para o personagem da franquia de animação.','medio'),
  curiosity(6,'esportes','Em qual esporte se usa uma peteca chamada shuttlecock?',['Badminton','Tênis de mesa','Críquete','Rúgbi'],'A peteca é rebatida com raquetes por cima de uma rede.'),
  curiosity(7,'esportes','Quem venceu o Mundial de Pilotos de Fórmula 1 em 2017?',['Lewis Hamilton','Sebastian Vettel','Nico Rosberg','Max Verstappen'],'A temporada de 2017 terminou com o quarto título de Hamilton.','medio'),
  // OpenTDB api.php?amount=30.
  curiosity(8,'espaco','Qual é a idade aproximada do Universo segundo as estimativas cosmológicas atuais?',['13,8 bilhões de anos','4,5 bilhões de anos','7,9 bilhões de anos','16,2 bilhões de anos'],'A idade do Universo é estimada usando a expansão cósmica e outras observações astronômicas.','medio'),
  curiosity(9,'espaco','Ganímedes, maior lua do Sistema Solar, orbita qual planeta?',['Júpiter','Urano','Netuno','Marte'],'Segundo a NASA, Ganímedes é maior até que o planeta Mercúrio.','medio'),
  curiosity(10,'historia','Qual destas construções NÃO integrava a lista tradicional das Sete Maravilhas do Mundo Antigo?',['Muralha da China','Grande Pirâmide de Gizé','Colosso de Rodes','Jardins Suspensos da Babilônia'],'As maravilhas antigas pertenciam principalmente ao mundo mediterrâneo e ao Oriente Próximo.','medio'),
  curiosity(11,'quimica','Qual é o número atômico do urânio?',['92','235','17','167'],'O número atômico indica a quantidade de prótons no núcleo.','medio'),
  curiosity(12,'artes','Qual artista é conhecido pelo episódio em que cortou parte da própria orelha?',['Vincent van Gogh','Salvador Dalí','Rembrandt','Michelangelo'],'O episódio ocorreu em Arles, na França, em 1888.'),
  curiosity(13,'cultura','Qual destas línguas NÃO utiliza o alfabeto latino em sua escrita usual?',['Georgiano','Turco','Suaíli','Vietnamita'],'O georgiano tem um sistema de escrita próprio.','medio'),
  curiosity(14,'mundo','A extensão de internet .fm é o domínio territorial de qual país?',['Micronésia','Fiji','Tuvalu','Ilhas Marshall'],'Domínios territoriais nem sempre são usados apenas no país a que pertencem.','dificil'),
  // OpenTDB api.php?amount=20.
  curiosity(15,'games','No jogo Undertale, a música MEGALOVANIA é associada a qual personagem?',['Sans','Flowey','Papyrus','Undyne'],'A faixa tornou-se uma das mais conhecidas da trilha de Undertale.'),
  curiosity(16,'quimica','Qual destes metais NÃO é líquido à temperatura ambiente ou perto dela?',['Berílio','Gálio','Césio','Mercúrio'],'O berílio tem ponto de fusão muito maior que os dos outros metais citados.','medio'),
  curiosity(17,'games','Em Team Fortress 2, como é chamada a metralhadora do Heavy?',['Sasha','Betty','Anna','Diana'],'Sasha é o apelido da arma mais característica da classe Heavy.','medio'),
  curiosity(18,'musica','Em que data nasceu Elvis Presley?',['8 de janeiro de 1935','13 de dezembro de 1931','18 de julho de 1940','17 de abril de 1938'],'Elvis nasceu em Tupelo, no estado do Mississippi.'),
  curiosity(19,'geografia','Qual é a língua oficial do Butão?',['Dzonga','Ladaque','Karen','Groma'],'O dzonga é escrito tradicionalmente com uma forma de escrita tibetana.','dificil'),
  curiosity(20,'musica','Qual integrante do Foo Fighters tocava bateria no Nirvana?',['Dave Grohl','Taylor Hawkins','Nate Mendel','Chris Shiflett'],'Dave Grohl começou o Foo Fighters depois do fim do Nirvana.'),
  curiosity(21,'literatura','Quem escreveu o Manifesto Comunista em parceria com Karl Marx?',['Friedrich Engels','Robert Owen','Alexander Kerensky','Paul Lafargue'],'O manifesto foi publicado em 1848 e influenciou debates políticos e sociais.','medio'),
  // OpenTDB api.php?amount=10.
  curiosity(22,'geografia','Qual é a maior cidade do Canadá em população?',['Toronto','Montreal','Vancouver','Ottawa'],'A maior cidade não é necessariamente a capital do país.'),
  curiosity(24,'geografia','Qual cordilheira forma parte da fronteira entre França e Espanha?',['Pireneus','Alpes','Cárpatos','Urais'],'A cordilheira também abriga o pequeno país de Andorra.'),
  curiosity(25,'matematica','Qual símbolo representa a unidade imaginária em matemática?',['i','e','n','x'],'O símbolo é usado para escrever números complexos.','medio'),
];

// Duas curiosidades sugeridas pela própria usuária, verificadas em fontes
// oficiais de conservação e de recordes. NÃO são atribuídas à OpenTDB.
const userCuriosity=(id:number,question:string,choices:[string,string,string,string],fact:string,source:Question['source']):Question=>({
  id:`t-${String(id).padStart(4,'0')}`,category:'natureza',topic:'curiosidades-natureza',concept:`curiosidade-${id}`,
  question,choices,answer:0,fact,source,tracks:['entretenimento','ciencia','animais','biologicas','geral'],difficulty:'facil',
});
export const verifiedNatureQuestions:Question[]=[
  userCuriosity(26,'O que os ursos-polares comem principalmente?',['Focas','Pinguins','Bambu','Coalas'],'As focas-aneladas e focas-barbudas são presas importantes para esses mamíferos do Ártico.',{title:'WWF · Polar Bear',url:'https://www.worldwildlife.org/species/polar-bear/'}),
  userCuriosity(27,'Qual ave pode alcançar as maiores velocidades durante um mergulho de caça?',['Falcão-peregrino','Avestruz','Albatroz','Águia-pescadora'],'O falcão-peregrino ultrapassa 300 km/h em mergulhos; isso é diferente de velocidade em voo horizontal.',{title:'Guinness World Records · Fastest bird (diving)',url:'https://www.guinnessworldrecords.com/world-records/70929-fastest-bird-diving'}),
];
export const sourcedCuriosityQuestions=[...licensedTriviaQuestions,...verifiedNatureQuestions,...importedQuestions.filter(q=>q.kind==='discover')];
