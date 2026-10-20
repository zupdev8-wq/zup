import type {Question} from './types';
import {scenarioQuestions} from './scenarioQuestions';
import {expandedQuestions} from './expandedQuestions';
import {authoredQuestions} from './authoredQuestions';
import {lessonQuestions} from './lessonQuestions';
import {buildMassiveQuestions} from './massiveQuestions';
import {sourcedCuriosityQuestions} from './externalQuestions';
import {importedQuestions} from './importedQuestions';

// IDs are permanent: saved progress and sessions reference them.
const baseQuestions: Question[] = [
  {
    "id": "brasil-01",
    "category": "brasil",
    "question": "Qual é a capital do Brasil?",
    "choices": [
      "Rio de Janeiro",
      "Brasília",
      "São Paulo",
      "Salvador"
    ],
    "answer": 1,
    "fact": "Brasília foi inaugurada como capital federal em 1960.",
    "brazil": true
  },
  {
    "id": "brasil-02",
    "category": "brasil",
    "question": "Qual é o maior bioma brasileiro em extensão?",
    "choices": [
      "Pantanal",
      "Caatinga",
      "Amazônia",
      "Pampa"
    ],
    "answer": 2,
    "fact": "A Amazônia ocupa grande parte da região Norte.",
    "brazil": true,
    "source": {
      "title": "IBGE · Biomas",
      "url": "https://www.ibge.gov.br/geociencias/informacoes-ambientais/vegetacao/15842-biomas.html"
    }
  },
  {
    "id": "brasil-03",
    "category": "brasil",
    "question": "Em que ano o Brasil declarou independência?",
    "choices": [
      "1822",
      "1889",
      "1500",
      "1930"
    ],
    "answer": 0,
    "fact": "A Independência foi proclamada em 7 de setembro de 1822.",
    "brazil": true
  },
  {
    "id": "brasil-04",
    "category": "brasil",
    "question": "Qual estado brasileiro abriga o Jalapão?",
    "choices": [
      "Bahia",
      "Tocantins",
      "Goiás",
      "Pará"
    ],
    "answer": 1,
    "fact": "O Jalapão é famoso pelas dunas douradas e fervedouros.",
    "brazil": true
  },
  {
    "id": "brasil-05",
    "category": "brasil",
    "question": "O Pantanal se estende principalmente por quais estados?",
    "choices": [
      "Pará e Amazonas",
      "MS e MT",
      "RJ e SP",
      "AC e RO"
    ],
    "answer": 1,
    "fact": "O Pantanal brasileiro ocupa partes de Mato Grosso e Mato Grosso do Sul.",
    "brazil": true,
    "source": {
      "title": "IBGE · Biomas",
      "url": "https://www.ibge.gov.br/geociencias/informacoes-ambientais/vegetacao/15842-biomas.html"
    }
  },
  {
    "id": "brasil-06",
    "category": "brasil",
    "question": "Qual é o rio associado ao fenômeno do encontro das águas em Manaus?",
    "choices": [
      "Paraná",
      "Tapajós",
      "Rio Negro",
      "São Francisco"
    ],
    "answer": 2,
    "fact": "O rio Negro encontra o Solimões perto de Manaus.",
    "brazil": true
  },
  {
    "id": "brasil-07",
    "category": "brasil",
    "question": "Onde fica a Ilha de Marajó?",
    "choices": [
      "Pará",
      "Acre",
      "Espírito Santo",
      "Sergipe"
    ],
    "answer": 0,
    "fact": "Marajó está na foz do Amazonas, no Pará.",
    "brazil": true
  },
  {
    "id": "brasil-08",
    "category": "brasil",
    "question": "Qual cidade é conhecida como Cidade Maravilhosa?",
    "choices": [
      "Recife",
      "Rio de Janeiro",
      "Belém",
      "Curitiba"
    ],
    "answer": 1,
    "fact": "A expressão é um apelido tradicional do Rio de Janeiro.",
    "brazil": true
  },
  {
    "id": "brasil-09",
    "category": "brasil",
    "question": "Qual árvore deu origem ao nome Brasil?",
    "choices": [
      "Ipê",
      "Pau-brasil",
      "Aroeira",
      "Castanheira"
    ],
    "answer": 1,
    "fact": "O pau-brasil foi uma madeira muito explorada na época colonial.",
    "brazil": true
  },
  {
    "id": "brasil-10",
    "category": "brasil",
    "question": "Qual destes é um estado da região Centro-Oeste?",
    "choices": [
      "Pernambuco",
      "Mato Grosso do Sul",
      "Paraná",
      "Amapá"
    ],
    "answer": 1,
    "fact": "Mato Grosso do Sul integra a região Centro-Oeste do Brasil.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "brasil-11",
    "category": "brasil",
    "question": "Qual destas festas é muito associada a Parintins?",
    "choices": [
      "Círio de Nazaré",
      "Festival do Boi-Bumbá",
      "Oktoberfest",
      "Lavagem do Bonfim"
    ],
    "answer": 1,
    "fact": "Parintins recebe a disputa folclórica de Garantido e Caprichoso.",
    "brazil": true
  },
  {
    "id": "brasil-12",
    "category": "brasil",
    "question": "Qual município abriga as Cataratas do Iguaçu no lado brasileiro?",
    "choices": [
      "Foz do Iguaçu",
      "Bonito",
      "Campo Grande",
      "Florianópolis"
    ],
    "answer": 0,
    "fact": "As cataratas são protegidas pelo Parque Nacional do Iguaçu.",
    "brazil": true
  },
  {
    "id": "brasil-13",
    "category": "brasil",
    "question": "Quantas grandes regiões formam a divisão regional do Brasil?",
    "choices": [
      "Seis",
      "Sete",
      "Cinco",
      "Quatro"
    ],
    "answer": 2,
    "fact": "Norte, Nordeste, Centro-Oeste, Sudeste e Sul formam as cinco grandes regiões usadas pelo IBGE.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "brasil-14",
    "category": "brasil",
    "question": "Qual é o único estado brasileiro atravessado pela Linha do Equador entre estas opções?",
    "choices": [
      "Goiás",
      "Amapá",
      "Bahia",
      "Paraná"
    ],
    "answer": 1,
    "fact": "A Linha do Equador passa pelo Amapá. Em Macapá, o monumento Marco Zero destaca essa posição geográfica.",
    "brazil": true
  },
  {
    "id": "brasil-15",
    "category": "brasil",
    "question": "O arquipélago de Fernando de Noronha pertence a qual estado?",
    "choices": [
      "Pernambuco",
      "Rio Grande do Norte",
      "Bahia",
      "Ceará"
    ],
    "answer": 0,
    "fact": "Fernando de Noronha é um distrito estadual de Pernambuco, separado do continente pelo oceano Atlântico.",
    "brazil": true
  },
  {
    "id": "brasil-16",
    "category": "brasil",
    "question": "Em qual estado ficam os Lençóis Maranhenses?",
    "choices": [
      "Piauí",
      "Tocantins",
      "Sergipe",
      "Maranhão"
    ],
    "answer": 3,
    "fact": "Dunas claras e lagoas formadas pelas chuvas compõem a paisagem do Parque Nacional dos Lençóis Maranhenses.",
    "brazil": true
  },
  {
    "id": "brasil-17",
    "category": "brasil",
    "question": "Qual é o menor estado brasileiro em área?",
    "choices": [
      "Espírito Santo",
      "Rio de Janeiro",
      "Sergipe",
      "Alagoas"
    ],
    "answer": 2,
    "fact": "Sergipe é o menor dos 26 estados em área. O Distrito Federal não é um estado.",
    "brazil": true
  },
  {
    "id": "brasil-18",
    "category": "brasil",
    "question": "Em qual estado fica a Chapada dos Veadeiros?",
    "choices": [
      "Tocantins",
      "Goiás",
      "Mato Grosso",
      "Bahia"
    ],
    "answer": 1,
    "fact": "A Chapada dos Veadeiros fica em Goiás e protege paisagens do Cerrado, com campos, rios e cachoeiras.",
    "brazil": true
  },
  {
    "id": "brasil-19",
    "category": "brasil",
    "question": "Qual país tem uma fronteira seca com Ponta Porã, em Mato Grosso do Sul?",
    "choices": [
      "Paraguai",
      "Uruguai",
      "Peru",
      "Chile"
    ],
    "answer": 0,
    "fact": "Ponta Porã e Pedro Juan Caballero são cidades vizinhas na fronteira entre Brasil e Paraguai.",
    "brazil": true
  },
  {
    "id": "brasil-20",
    "category": "brasil",
    "question": "O nome do estado Rio Grande do Norte indica que ele pertence a qual região?",
    "choices": [
      "Norte",
      "Centro-Oeste",
      "Sudeste",
      "Nordeste"
    ],
    "answer": 3,
    "fact": "Apesar de ter Norte no nome, o Rio Grande do Norte faz parte da região Nordeste.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "brasil-21",
    "category": "brasil",
    "question": "A capital Brasília fica em qual unidade da Federação?",
    "choices": [
      "Minas Gerais",
      "Tocantins",
      "Distrito Federal",
      "Goiás"
    ],
    "answer": 2,
    "fact": "Brasília fica no Distrito Federal, que integra o Centro-Oeste e não é um estado.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "brasil-22",
    "category": "brasil",
    "question": "Qual país sul-americano NÃO faz fronteira com o Brasil?",
    "choices": [
      "Suriname",
      "Chile",
      "Bolívia",
      "Colômbia"
    ],
    "answer": 1,
    "fact": "Chile e Equador são os dois países da América do Sul que não fazem fronteira com o Brasil.",
    "brazil": true
  },
  {
    "id": "brasil-23",
    "category": "brasil",
    "question": "Qual cidade foi a primeira capital do Brasil colonial?",
    "choices": [
      "Salvador",
      "Recife",
      "Rio de Janeiro",
      "Brasília"
    ],
    "answer": 0,
    "fact": "Salvador foi fundada em 1549 como sede do governo-geral. A capital foi transferida ao Rio de Janeiro em 1763.",
    "brazil": true
  },
  {
    "id": "brasil-24",
    "category": "brasil",
    "question": "Qual destas paisagens é característica do Pantanal?",
    "choices": [
      "Geleiras permanentes",
      "Deserto de dunas sem rios",
      "Cordilheira nevada",
      "Planície com cheias periódicas"
    ],
    "answer": 3,
    "fact": "O ciclo de cheias e secas organiza a vida pantaneira e conecta rios, campos e áreas alagadas.",
    "brazil": true,
    "source": {
      "title": "IBGE · Biomas",
      "url": "https://www.ibge.gov.br/geociencias/informacoes-ambientais/vegetacao/15842-biomas.html"
    }
  },
  {
    "id": "brasil-25",
    "category": "brasil",
    "question": "Quantos estados o Brasil possui, sem contar o Distrito Federal?",
    "choices": [
      "25",
      "28",
      "26",
      "27"
    ],
    "answer": 2,
    "fact": "A federação reúne 26 estados e o Distrito Federal: são 27 unidades da Federação, mas apenas 26 estados.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "historia-01",
    "category": "historia",
    "question": "Em que ano foi proclamada a República no Brasil?",
    "choices": [
      "1822",
      "1889",
      "1500",
      "1964"
    ],
    "answer": 1,
    "fact": "A Proclamação da República ocorreu em 15 de novembro de 1889.",
    "brazil": true
  },
  {
    "id": "historia-02",
    "category": "historia",
    "question": "Quem foi o primeiro presidente do Brasil?",
    "choices": [
      "Getúlio Vargas",
      "Deodoro da Fonseca",
      "Juscelino Kubitschek",
      "Dom Pedro II"
    ],
    "answer": 1,
    "fact": "Deodoro da Fonseca foi o primeiro presidente da República.",
    "brazil": true
  },
  {
    "id": "historia-03",
    "category": "historia",
    "question": "Como ficou conhecido o ciclo de mineração em Minas Gerais no século XVIII?",
    "choices": [
      "Ciclo do Ouro",
      "Ciclo da Borracha",
      "Ciclo do Café",
      "Ciclo do Algodão"
    ],
    "answer": 0,
    "fact": "A extração de ouro marcou a economia colonial no século XVIII.",
    "brazil": true
  },
  {
    "id": "historia-04",
    "category": "historia",
    "question": "Em qual século os portugueses chegaram ao território brasileiro?",
    "choices": [
      "XIV",
      "XV",
      "XVI",
      "XVII"
    ],
    "answer": 1,
    "fact": "A expedição de Cabral chegou em 1500, último ano do século XV. O século XVI começou em 1501.",
    "brazil": true
  },
  {
    "id": "historia-05",
    "category": "historia",
    "question": "Qual lei aboliu oficialmente a escravidão no Brasil?",
    "choices": [
      "Lei do Ventre Livre",
      "Lei Áurea",
      "Lei de Terras",
      "Lei dos Sexagenários"
    ],
    "answer": 1,
    "fact": "A Lei Áurea foi assinada em 13 de maio de 1888.",
    "brazil": true
  },
  {
    "id": "historia-06",
    "category": "historia",
    "question": "Quem é conhecido como Tiradentes?",
    "choices": [
      "Joaquim José da Silva Xavier",
      "José Bonifácio",
      "Tomé de Sousa",
      "Machado de Assis"
    ],
    "answer": 0,
    "fact": "Tiradentes participou da Inconfidência Mineira.",
    "brazil": true
  },
  {
    "id": "historia-07",
    "category": "historia",
    "question": "Qual civilização construiu Machu Picchu?",
    "choices": [
      "Maia",
      "Inca",
      "Asteca",
      "Romana"
    ],
    "answer": 1,
    "fact": "Machu Picchu fica nos Andes peruanos e foi construída pelos incas.",
    "brazil": false
  },
  {
    "id": "historia-08",
    "category": "historia",
    "question": "O que foi a Semana de Arte Moderna de 1922?",
    "choices": [
      "Um torneio",
      "Um movimento cultural",
      "Uma eleição",
      "Um tratado"
    ],
    "answer": 1,
    "fact": "O evento em São Paulo foi marco do modernismo brasileiro.",
    "brazil": true
  },
  {
    "id": "historia-09",
    "category": "historia",
    "question": "Em qual cidade ocorreu a Revolta da Vacina?",
    "choices": [
      "Rio de Janeiro",
      "Porto Alegre",
      "Belém",
      "Natal"
    ],
    "answer": 0,
    "fact": "A Revolta da Vacina ocorreu no Rio de Janeiro em 1904.",
    "brazil": true
  },
  {
    "id": "historia-10",
    "category": "historia",
    "question": "Quem foi a primeira esposa de Dom Pedro I?",
    "choices": [
      "Maria Leopoldina",
      "Princesa Isabel",
      "Carlota Joaquina",
      "Anita Garibaldi"
    ],
    "answer": 0,
    "fact": "Maria Leopoldina foi a primeira esposa de Dom Pedro I e participou da política no período da Independência.",
    "brazil": true
  },
  {
    "id": "historia-11",
    "category": "historia",
    "question": "Em que ano a corte portuguesa chegou ao Brasil?",
    "choices": [
      "1750",
      "1808",
      "1822",
      "1889"
    ],
    "answer": 1,
    "fact": "A corte atravessou o Atlântico durante as guerras napoleônicas. Sua presença transformou a administração e a vida no Rio de Janeiro.",
    "brazil": true,
    "source": {
      "title": "Senado Federal · Primeiro Reinado",
      "url": "https://www.senado.leg.br/senado/hotsites/HistSF/Primeiro-Reinado.asp"
    }
  },
  {
    "id": "historia-12",
    "category": "historia",
    "question": "Qual imperador governou o Brasil durante o Segundo Reinado?",
    "choices": [
      "Dom Pedro II",
      "Dom João VI",
      "Dom Pedro I",
      "Deodoro da Fonseca"
    ],
    "answer": 0,
    "fact": "O Segundo Reinado começou em 1840 e terminou com a Proclamação da República, em 1889.",
    "brazil": true
  },
  {
    "id": "historia-13",
    "category": "historia",
    "question": "A Constituição brasileira promulgada em 1988 é conhecida como quê?",
    "choices": [
      "Carta Colonial",
      "Pacto Imperial",
      "Constituição do Café",
      "Constituição Cidadã"
    ],
    "answer": 3,
    "fact": "O apelido destaca a ampliação de direitos e a participação social na elaboração da Constituição de 1988.",
    "brazil": true,
    "source": {
      "title": "Senado Federal · Constituição de 1988",
      "url": "https://www.senado.leg.br/noticias/especiais/constituicao25anos/um-dia-historico.htm"
    }
  },
  {
    "id": "historia-14",
    "category": "historia",
    "question": "Qual cidade se tornou capital do Brasil em 1763?",
    "choices": [
      "São Paulo",
      "Ouro Preto",
      "Rio de Janeiro",
      "Salvador"
    ],
    "answer": 2,
    "fact": "O governo colonial foi transferido de Salvador para o Rio de Janeiro. Brasília só assumiu como capital em 1960.",
    "brazil": true
  },
  {
    "id": "historia-15",
    "category": "historia",
    "question": "O Quilombo dos Palmares é associado principalmente a qual local?",
    "choices": [
      "Monte Roraima",
      "Serra da Barriga",
      "Pão de Açúcar",
      "Serra do Mar"
    ],
    "answer": 1,
    "fact": "A Serra da Barriga fica no atual estado de Alagoas e é um importante lugar de memória da resistência negra.",
    "brazil": true
  },
  {
    "id": "historia-16",
    "category": "historia",
    "question": "Quem liderou a resistência em Canudos no final do século XIX?",
    "choices": [
      "Antônio Conselheiro",
      "Tiradentes",
      "José Bonifácio",
      "Duque de Caxias"
    ],
    "answer": 0,
    "fact": "A comunidade de Canudos, no sertão da Bahia, foi destruída em 1897 após uma guerra contra forças republicanas.",
    "brazil": true
  },
  {
    "id": "historia-17",
    "category": "historia",
    "question": "Qual foi a primeira Constituição do Brasil independente?",
    "choices": [
      "A de 1500",
      "A de 1889",
      "A de 1930",
      "A de 1824"
    ],
    "answer": 3,
    "fact": "A Constituição de 1824 organizou o Império e incluiu o Poder Moderador, exercido pelo imperador.",
    "brazil": true,
    "source": {
      "title": "Senado Federal · Primeiro Reinado",
      "url": "https://www.senado.leg.br/senado/hotsites/HistSF/Primeiro-Reinado.asp"
    }
  },
  {
    "id": "historia-18",
    "category": "historia",
    "question": "A Lei do Ventre Livre foi aprovada em qual ano?",
    "choices": [
      "1888",
      "1934",
      "1871",
      "1822"
    ],
    "answer": 2,
    "fact": "A lei de 1871 declarou livres os filhos de mulheres escravizadas nascidos após sua promulgação, mas manteve importantes restrições.",
    "brazil": true
  },
  {
    "id": "historia-19",
    "category": "historia",
    "question": "Qual produto marcou a economia de Manaus e Belém no final do século XIX?",
    "choices": [
      "Carvão mineral",
      "Borracha",
      "Trigo",
      "Uva"
    ],
    "answer": 1,
    "fact": "A exploração do látex amazônico impulsionou transformações urbanas durante o chamado ciclo da borracha.",
    "brazil": true
  },
  {
    "id": "historia-20",
    "category": "historia",
    "question": "Qual presidente esteve à frente da construção de Brasília?",
    "choices": [
      "Juscelino Kubitschek",
      "Deodoro da Fonseca",
      "Prudente de Morais",
      "Nilo Peçanha"
    ],
    "answer": 0,
    "fact": "Brasília foi inaugurada em 21 de abril de 1960, durante o governo de Juscelino Kubitschek.",
    "brazil": true
  },
  {
    "id": "historia-21",
    "category": "historia",
    "question": "Qual movimento ocorreu em Pernambuco em 1817?",
    "choices": [
      "Revolta da Vacina",
      "Guerra de Canudos",
      "Revolução Farroupilha",
      "Revolução Pernambucana"
    ],
    "answer": 3,
    "fact": "A Revolução Pernambucana de 1817 defendia uma república e contestava a administração portuguesa.",
    "brazil": true
  },
  {
    "id": "historia-22",
    "category": "historia",
    "question": "Qual revolta de 1910 questionou castigos físicos na Marinha?",
    "choices": [
      "Cabanagem",
      "Balaiada",
      "Revolta da Chibata",
      "Revolta da Vacina"
    ],
    "answer": 2,
    "fact": "Marinheiros, entre eles João Cândido, protestaram contra os castigos corporais praticados na Marinha.",
    "brazil": true
  },
  {
    "id": "historia-23",
    "category": "historia",
    "question": "Quem escreveu a carta sobre a chegada da expedição de Cabral em 1500?",
    "choices": [
      "Manuel da Nóbrega",
      "Pero Vaz de Caminha",
      "Luís de Camões",
      "José de Anchieta"
    ],
    "answer": 1,
    "fact": "A carta de Caminha é um documento da expedição portuguesa. O território já era habitado por numerosos povos indígenas.",
    "brazil": true
  },
  {
    "id": "historia-24",
    "category": "historia",
    "question": "Qual é o nome da revolta ocorrida no Pará entre 1835 e 1840?",
    "choices": [
      "Cabanagem",
      "Sabinada",
      "Revolta da Chibata",
      "Guerra de Canudos"
    ],
    "answer": 0,
    "fact": "A Cabanagem ocorreu no período regencial e envolveu ampla participação popular no Grão-Pará.",
    "brazil": true
  },
  {
    "id": "historia-25",
    "category": "historia",
    "question": "Em que ano o voto feminino foi reconhecido no Código Eleitoral brasileiro?",
    "choices": [
      "1889",
      "1824",
      "1960",
      "1932"
    ],
    "answer": 3,
    "fact": "O Código Eleitoral de 1932 reconheceu o voto feminino. O acesso à participação política foi resultado de uma longa mobilização.",
    "brazil": true
  },
  {
    "id": "natureza-01",
    "category": "natureza",
    "question": "Qual é a maior floresta tropical do planeta?",
    "choices": [
      "Congo",
      "Amazônia",
      "Taiga",
      "Mata Atlântica"
    ],
    "answer": 1,
    "fact": "A Amazônia é a maior floresta tropical contínua do mundo.",
    "brazil": true
  },
  {
    "id": "natureza-02",
    "category": "natureza",
    "question": "Qual animal é símbolo do Pantanal?",
    "choices": [
      "Arara-azul",
      "Pinguim",
      "Urso-polar",
      "Canguru"
    ],
    "answer": 0,
    "fact": "A arara-azul-grande é um símbolo da conservação no Pantanal.",
    "brazil": true
  },
  {
    "id": "natureza-03",
    "category": "natureza",
    "question": "Qual bioma brasileiro tem vegetação adaptada à seca?",
    "choices": [
      "Caatinga",
      "Pampa",
      "Mata Atlântica",
      "Manguezal"
    ],
    "answer": 0,
    "fact": "Cactos e árvores caducifólias são comuns na Caatinga.",
    "brazil": true,
    "source": {
      "title": "IBGE · Biomas",
      "url": "https://www.ibge.gov.br/geociencias/informacoes-ambientais/vegetacao/15842-biomas.html"
    }
  },
  {
    "id": "natureza-04",
    "category": "natureza",
    "question": "A onça-pintada pertence a qual grupo?",
    "choices": [
      "Répteis",
      "Felinos",
      "Roedores",
      "Aves"
    ],
    "answer": 1,
    "fact": "A onça-pintada é o maior felino das Américas.",
    "brazil": true
  },
  {
    "id": "natureza-05",
    "category": "natureza",
    "question": "Como se chama a transformação da lagarta em borboleta?",
    "choices": [
      "Fotossíntese",
      "Metamorfose",
      "Germinação",
      "Erosão"
    ],
    "answer": 1,
    "fact": "Na metamorfose completa, o inseto passa pela fase de pupa.",
    "brazil": false
  },
  {
    "id": "natureza-06",
    "category": "natureza",
    "question": "Qual planta é famosa por armazenar água em ambientes secos?",
    "choices": [
      "Cacto",
      "Vitória-régia",
      "Samambaia",
      "Musgo"
    ],
    "answer": 0,
    "fact": "Muitos cactos armazenam água em tecidos especializados.",
    "brazil": false
  },
  {
    "id": "natureza-07",
    "category": "natureza",
    "question": "Qual ecossistema é importante como berçário de peixes no litoral?",
    "choices": [
      "Manguezal",
      "Deserto",
      "Tundra",
      "Cerrado"
    ],
    "answer": 0,
    "fact": "Manguezais abrigam juvenis de numerosas espécies aquáticas.",
    "brazil": false
  },
  {
    "id": "natureza-08",
    "category": "natureza",
    "question": "Qual é a principal função das abelhas em muitas flores?",
    "choices": [
      "Polinizar",
      "Congelar",
      "Erodir",
      "Escavar"
    ],
    "answer": 0,
    "fact": "A polinização permite a reprodução de muitas plantas.",
    "brazil": false,
    "source": {
      "title": "IBGE · Biomas",
      "url": "https://www.ibge.gov.br/geociencias/informacoes-ambientais/vegetacao/15842-biomas.html"
    }
  },
  {
    "id": "natureza-09",
    "category": "natureza",
    "question": "Qual destas aves é uma grande ave de rapina das florestas brasileiras?",
    "choices": [
      "Beija-flor",
      "Harpia",
      "Seriema",
      "Sabiá"
    ],
    "answer": 1,
    "fact": "A harpia, também chamada de gavião-real, é uma grande ave de rapina que vive em florestas tropicais.",
    "brazil": true
  },
  {
    "id": "natureza-10",
    "category": "natureza",
    "question": "Em qual bioma predomina a vegetação de savana brasileira?",
    "choices": [
      "Cerrado",
      "Pampa",
      "Mata Atlântica",
      "Amazônia"
    ],
    "answer": 0,
    "fact": "O Cerrado combina gramíneas, arbustos e árvores retorcidas.",
    "brazil": true,
    "source": {
      "title": "IBGE · Biomas",
      "url": "https://www.ibge.gov.br/geociencias/informacoes-ambientais/vegetacao/15842-biomas.html"
    }
  },
  {
    "id": "natureza-11",
    "category": "natureza",
    "question": "Qual é o maior roedor vivo do mundo?",
    "choices": [
      "Cutia",
      "Esquilo",
      "Capivara",
      "Paca"
    ],
    "answer": 2,
    "fact": "A capivara é um roedor sul-americano adaptado à vida perto da água. É comum vê-la em grupos.",
    "brazil": true
  },
  {
    "id": "natureza-12",
    "category": "natureza",
    "question": "O lobo-guará é especialmente associado a qual bioma brasileiro?",
    "choices": [
      "Deserto polar",
      "Cerrado",
      "Tundra",
      "Taiga"
    ],
    "answer": 1,
    "fact": "O lobo-guará tem pernas longas e frequenta ambientes abertos. Sua alimentação inclui frutos e pequenos animais.",
    "brazil": true
  },
  {
    "id": "natureza-13",
    "category": "natureza",
    "question": "A vitória-régia é conhecida por qual característica?",
    "choices": [
      "Folhas grandes que flutuam",
      "Viver sem água",
      "Produzir pinhas",
      "Crescer apenas na neve"
    ],
    "answer": 0,
    "fact": "Essa planta aquática amazônica tem grandes folhas flutuantes com bordas erguidas.",
    "brazil": true
  },
  {
    "id": "natureza-14",
    "category": "natureza",
    "question": "O mico-leão-dourado é nativo de qual bioma?",
    "choices": [
      "Pampa",
      "Caatinga",
      "Tundra",
      "Mata Atlântica"
    ],
    "answer": 3,
    "fact": "Esse pequeno primata ocorre naturalmente na Mata Atlântica do estado do Rio de Janeiro.",
    "brazil": true
  },
  {
    "id": "natureza-15",
    "category": "natureza",
    "question": "A espécie arara-azul-de-lear vive naturalmente sobretudo em qual estado?",
    "choices": [
      "Acre",
      "Rio Grande do Sul",
      "Bahia",
      "Paraná"
    ],
    "answer": 2,
    "fact": "A arara-azul-de-lear vive na Caatinga baiana e se alimenta principalmente de cocos de licuri.",
    "brazil": true
  },
  {
    "id": "natureza-16",
    "category": "natureza",
    "question": "O boto-cor-de-rosa é encontrado principalmente em que ambiente?",
    "choices": [
      "Recifes oceânicos",
      "Rios amazônicos",
      "Geleiras",
      "Desertos"
    ],
    "answer": 1,
    "fact": "O boto-cor-de-rosa é um golfinho de água doce. Seus ambientes incluem rios e áreas inundadas da Amazônia.",
    "brazil": true
  },
  {
    "id": "natureza-17",
    "category": "natureza",
    "question": "As manchas da onça-pintada são frequentemente chamadas de quê?",
    "choices": [
      "Rosetas",
      "Escamas",
      "Listras solares",
      "Anéis de crescimento"
    ],
    "answer": 0,
    "fact": "As rosetas da onça-pintada costumam ter pontos escuros no interior. O padrão ajuda na camuflagem.",
    "brazil": true
  },
  {
    "id": "natureza-18",
    "category": "natureza",
    "question": "O Pampa brasileiro ocorre em qual estado?",
    "choices": [
      "Paraná",
      "São Paulo",
      "Amazonas",
      "Rio Grande do Sul"
    ],
    "answer": 3,
    "fact": "No Brasil, o Pampa se restringe ao Rio Grande do Sul. Sua paisagem inclui campos com grande diversidade de plantas.",
    "brazil": true,
    "source": {
      "title": "IBGE · Biomas",
      "url": "https://www.ibge.gov.br/geociencias/informacoes-ambientais/vegetacao/15842-biomas.html"
    }
  },
  {
    "id": "natureza-19",
    "category": "natureza",
    "question": "Qual destes biomas existe exclusivamente no Brasil?",
    "choices": [
      "Pampa",
      "Pantanal",
      "Caatinga",
      "Amazônia"
    ],
    "answer": 2,
    "fact": "A Caatinga é um bioma exclusivamente brasileiro, com espécies adaptadas à irregularidade das chuvas.",
    "brazil": true,
    "source": {
      "title": "IBGE · Biomas",
      "url": "https://www.ibge.gov.br/geociencias/informacoes-ambientais/vegetacao/15842-biomas.html"
    }
  },
  {
    "id": "natureza-20",
    "category": "natureza",
    "question": "Qual destas árvores é característica de florestas do Sul do Brasil?",
    "choices": [
      "Tâmara",
      "Araucária",
      "Baobá",
      "Oliveira"
    ],
    "answer": 1,
    "fact": "A araucária é marcante em formações da Mata Atlântica do Sul e de áreas de altitude do Sudeste.",
    "brazil": true
  },
  {
    "id": "natureza-21",
    "category": "natureza",
    "question": "O pinhão é qual parte da araucária?",
    "choices": [
      "Semente",
      "Flor",
      "Raiz",
      "Folha"
    ],
    "answer": 0,
    "fact": "O pinhão é a semente da araucária. Ele também faz parte da alimentação de animais que ajudam na dispersão.",
    "brazil": true
  },
  {
    "id": "natureza-22",
    "category": "natureza",
    "question": "Qual mamífero brasileiro usa um focinho comprido e uma língua longa para capturar formigas e cupins?",
    "choices": [
      "Capivara",
      "Anta",
      "Ariranha",
      "Tamanduá-bandeira"
    ],
    "answer": 3,
    "fact": "O tamanduá-bandeira captura insetos com a língua longa e pegajosa. Sua cauda volumosa pode cobrir o corpo enquanto ele descansa.",
    "brazil": true
  },
  {
    "id": "natureza-23",
    "category": "natureza",
    "question": "Qual ave é conhecida pelo grande bico colorido no Brasil?",
    "choices": [
      "Seriema",
      "Coruja-buraqueira",
      "Tucano",
      "Ema"
    ],
    "answer": 2,
    "fact": "O bico do tucano é leve para seu tamanho e também participa da troca de calor com o ambiente.",
    "brazil": true
  },
  {
    "id": "natureza-24",
    "category": "natureza",
    "question": "Qual destas espécies é uma lontra social dos rios sul-americanos?",
    "choices": [
      "Jaguatirica",
      "Ariranha",
      "Anta",
      "Quati"
    ],
    "answer": 1,
    "fact": "A ariranha vive em grupos familiares e usa vocalizações para se comunicar nos ambientes aquáticos.",
    "brazil": true
  },
  {
    "id": "natureza-25",
    "category": "natureza",
    "question": "Uma espécie endêmica é aquela que...",
    "choices": [
      "Ocorre naturalmente em uma área restrita",
      "Vive em todos os continentes",
      "Nunca se reproduz",
      "É sempre doméstica"
    ],
    "answer": 0,
    "fact": "O endemismo descreve uma distribuição natural limitada. Há muitas espécies endêmicas nos biomas brasileiros.",
    "brazil": true
  },
  {
    "id": "espaco-01",
    "category": "espaco",
    "question": "Qual planeta é conhecido como planeta vermelho?",
    "choices": [
      "Vênus",
      "Marte",
      "Júpiter",
      "Netuno"
    ],
    "answer": 1,
    "fact": "O óxido de ferro ajuda a dar a Marte sua cor avermelhada.",
    "brazil": false,
    "source": {
      "title": "NASA · Sistema Solar",
      "url": "https://science.nasa.gov/solar-system/"
    }
  },
  {
    "id": "espaco-02",
    "category": "espaco",
    "question": "Qual é a estrela mais próxima da Terra?",
    "choices": [
      "Sirius",
      "Sol",
      "Vega",
      "Betelgeuse"
    ],
    "answer": 1,
    "fact": "O Sol é a estrela do nosso Sistema Solar.",
    "brazil": false,
    "source": {
      "title": "NASA · Sistema Solar",
      "url": "https://science.nasa.gov/solar-system/"
    }
  },
  {
    "id": "espaco-03",
    "category": "espaco",
    "question": "Qual é o maior planeta do Sistema Solar?",
    "choices": [
      "Terra",
      "Saturno",
      "Júpiter",
      "Urano"
    ],
    "answer": 2,
    "fact": "Júpiter é um gigante gasoso com enorme massa.",
    "brazil": false,
    "source": {
      "title": "NASA · Sistema Solar",
      "url": "https://science.nasa.gov/solar-system/"
    }
  },
  {
    "id": "espaco-04",
    "category": "espaco",
    "question": "O que é a Lua?",
    "choices": [
      "Um planeta",
      "Um cometa",
      "Satélite natural",
      "Uma estrela"
    ],
    "answer": 2,
    "fact": "A Lua é o satélite natural da Terra.",
    "brazil": false,
    "source": {
      "title": "NASA · Sistema Solar",
      "url": "https://science.nasa.gov/solar-system/"
    }
  },
  {
    "id": "espaco-05",
    "category": "espaco",
    "question": "Qual planeta tem anéis muito visíveis?",
    "choices": [
      "Mercúrio",
      "Saturno",
      "Marte",
      "Vênus"
    ],
    "answer": 1,
    "fact": "Saturno possui um sistema de anéis composto sobretudo por gelo.",
    "brazil": false,
    "source": {
      "title": "NASA · Sistema Solar",
      "url": "https://science.nasa.gov/solar-system/"
    }
  },
  {
    "id": "espaco-06",
    "category": "espaco",
    "question": "Em qual galáxia está a Terra?",
    "choices": [
      "Andrômeda",
      "Via Láctea",
      "Triângulo",
      "Sombrero"
    ],
    "answer": 1,
    "fact": "O Sistema Solar está na galáxia Via Láctea.",
    "brazil": false,
    "source": {
      "title": "NASA · Sistema Solar",
      "url": "https://science.nasa.gov/solar-system/"
    }
  },
  {
    "id": "espaco-07",
    "category": "espaco",
    "question": "Qual objeto celeste tem cauda quando se aproxima do Sol?",
    "choices": [
      "Cometa",
      "Lua",
      "Asterismo",
      "Satélite"
    ],
    "answer": 0,
    "fact": "O calor pode criar coma e caudas nos cometas.",
    "brazil": false,
    "source": {
      "title": "NASA · Sistema Solar",
      "url": "https://science.nasa.gov/solar-system/"
    }
  },
  {
    "id": "espaco-08",
    "category": "espaco",
    "question": "Quem foi a primeira pessoa a pisar na Lua?",
    "choices": [
      "Yuri Gagarin",
      "Neil Armstrong",
      "Sally Ride",
      "Buzz Aldrin"
    ],
    "answer": 1,
    "fact": "Neil Armstrong pisou na Lua em 1969 na missão Apollo 11.",
    "brazil": false,
    "source": {
      "title": "NASA · Sistema Solar",
      "url": "https://science.nasa.gov/solar-system/"
    }
  },
  {
    "id": "espaco-09",
    "category": "espaco",
    "question": "A luz do Sol leva aproximadamente quanto tempo até a Terra?",
    "choices": [
      "8 minutos",
      "8 horas",
      "1 segundo",
      "2 dias"
    ],
    "answer": 0,
    "fact": "A luz percorre cerca de 150 milhões de quilômetros até a Terra.",
    "brazil": false,
    "source": {
      "title": "NASA · Sistema Solar",
      "url": "https://science.nasa.gov/solar-system/"
    }
  },
  {
    "id": "espaco-10",
    "category": "espaco",
    "question": "Qual planeta é o mais próximo do Sol?",
    "choices": [
      "Terra",
      "Mercúrio",
      "Marte",
      "Vênus"
    ],
    "answer": 1,
    "fact": "Mercúrio é o primeiro planeta na ordem a partir do Sol.",
    "brazil": false,
    "source": {
      "title": "NASA · Sistema Solar",
      "url": "https://science.nasa.gov/solar-system/"
    }
  },
  {
    "id": "espaco-11",
    "category": "espaco",
    "question": "Em qual estado fica o Centro de Lançamento de Alcântara?",
    "choices": [
      "Pará",
      "Ceará",
      "Bahia",
      "Maranhão"
    ],
    "answer": 3,
    "fact": "O centro fica em Alcântara, no Maranhão, próximo à Linha do Equador.",
    "brazil": true,
    "source": {
      "title": "Agência Espacial Brasileira · Centros de lançamento",
      "url": "https://www.gov.br/aeb/pt-br/acoes-e-programas/aplicacoes-espaciais/infraestrutura-de-solo/centros-de-lancamento"
    }
  },
  {
    "id": "espaco-12",
    "category": "espaco",
    "question": "O Centro de Lançamento da Barreira do Inferno fica em qual estado?",
    "choices": [
      "Pernambuco",
      "Sergipe",
      "Rio Grande do Norte",
      "Rio Grande do Sul"
    ],
    "answer": 2,
    "fact": "O centro fica em Parnamirim, no Rio Grande do Norte, e atua com lançamentos e rastreio aeroespacial.",
    "brazil": true,
    "source": {
      "title": "Agência Espacial Brasileira · Centros de lançamento",
      "url": "https://www.gov.br/aeb/pt-br/acoes-e-programas/aplicacoes-espaciais/infraestrutura-de-solo/centros-de-lancamento"
    }
  },
  {
    "id": "espaco-13",
    "category": "espaco",
    "question": "Qual instituição brasileira desenvolveu o satélite Amazonia 1?",
    "choices": [
      "IBAMA",
      "INPE",
      "IBGE",
      "IPHAN"
    ],
    "answer": 1,
    "fact": "O Instituto Nacional de Pesquisas Espaciais desenvolveu o Amazonia 1 para observar a Terra.",
    "brazil": true,
    "source": {
      "title": "INPE · Missão Amazonia",
      "url": "https://www.gov.br/inpe/pt-br/programas/amazonia1/missao-amazonia"
    }
  },
  {
    "id": "espaco-14",
    "category": "espaco",
    "question": "Uma finalidade do satélite Amazonia 1 é...",
    "choices": [
      "Monitorar o ambiente terrestre",
      "Transportar passageiros",
      "Pousar em Marte",
      "Substituir a Lua"
    ],
    "answer": 0,
    "fact": "As imagens do Amazonia 1 apoiam o monitoramento ambiental, incluindo desmatamento e agricultura.",
    "brazil": true,
    "source": {
      "title": "INPE · Missão Amazonia",
      "url": "https://www.gov.br/inpe/pt-br/programas/amazonia1/missao-amazonia"
    }
  },
  {
    "id": "espaco-15",
    "category": "espaco",
    "question": "Qual planeta é o mais quente na superfície, em média?",
    "choices": [
      "Mercúrio",
      "Marte",
      "Netuno",
      "Vênus"
    ],
    "answer": 3,
    "fact": "A atmosfera densa de Vênus provoca um intenso efeito estufa. Estar mais perto do Sol não é o único fator da temperatura.",
    "brazil": false,
    "source": {
      "title": "NASA · Sistema Solar",
      "url": "https://science.nasa.gov/solar-system/"
    }
  },
  {
    "id": "espaco-16",
    "category": "espaco",
    "question": "Qual planeta é classificado como um gigante de gelo?",
    "choices": [
      "Mercúrio",
      "Vênus",
      "Netuno",
      "Marte"
    ],
    "answer": 2,
    "fact": "Urano e Netuno são chamados de gigantes de gelo, uma classe diferente dos gigantes gasosos Júpiter e Saturno.",
    "brazil": false,
    "source": {
      "title": "NASA · Sistema Solar",
      "url": "https://science.nasa.gov/solar-system/"
    }
  },
  {
    "id": "espaco-17",
    "category": "espaco",
    "question": "Qual planeta gira com seu eixo muito inclinado, quase deitado?",
    "choices": [
      "Mercúrio",
      "Urano",
      "Terra",
      "Marte"
    ],
    "answer": 1,
    "fact": "A grande inclinação do eixo de Urano faz suas estações serem bem diferentes das terrestres.",
    "brazil": false,
    "source": {
      "title": "NASA · Sistema Solar",
      "url": "https://science.nasa.gov/solar-system/"
    }
  },
  {
    "id": "espaco-18",
    "category": "espaco",
    "question": "O cinturão principal de asteroides fica entre quais planetas?",
    "choices": [
      "Marte e Júpiter",
      "Terra e Vênus",
      "Mercúrio e Vênus",
      "Urano e Netuno"
    ],
    "answer": 0,
    "fact": "Essa região abriga numerosos corpos rochosos e o planeta anão Ceres.",
    "brazil": false,
    "source": {
      "title": "NASA · Sistema Solar",
      "url": "https://science.nasa.gov/solar-system/"
    }
  },
  {
    "id": "espaco-19",
    "category": "espaco",
    "question": "Plutão é classificado como quê?",
    "choices": [
      "Estrela",
      "Galáxia",
      "Lua da Terra",
      "Planeta anão"
    ],
    "answer": 3,
    "fact": "A União Astronômica Internacional classificou Plutão como planeta anão em 2006.",
    "brazil": false,
    "source": {
      "title": "NASA · Sistema Solar",
      "url": "https://science.nasa.gov/solar-system/"
    }
  },
  {
    "id": "espaco-20",
    "category": "espaco",
    "question": "Qual movimento da Terra produz a alternância entre dia e noite?",
    "choices": [
      "Precessão apenas",
      "Expansão",
      "Rotação",
      "Translação apenas"
    ],
    "answer": 2,
    "fact": "A rotação faz diferentes partes da Terra se voltarem para o Sol ao longo do dia.",
    "brazil": false,
    "source": {
      "title": "NASA · Sistema Solar",
      "url": "https://science.nasa.gov/solar-system/"
    }
  },
  {
    "id": "espaco-21",
    "category": "espaco",
    "question": "As fases da Lua dependem principalmente de quê?",
    "choices": [
      "De mudanças no tamanho real da Lua",
      "Da parte iluminada que vemos",
      "Da sombra da Terra todos os dias",
      "Da Lua acender e apagar"
    ],
    "answer": 1,
    "fact": "A Lua recebe luz do Sol. Ao orbitar a Terra, muda a fração iluminada visível para nós.",
    "brazil": false,
    "source": {
      "title": "NASA · Sistema Solar",
      "url": "https://science.nasa.gov/solar-system/"
    }
  },
  {
    "id": "espaco-22",
    "category": "espaco",
    "question": "Em um eclipse solar, qual corpo fica entre a Terra e o Sol?",
    "choices": [
      "Lua",
      "Marte",
      "Júpiter",
      "Vênus"
    ],
    "answer": 0,
    "fact": "A Lua pode bloquear a luz solar em uma faixa da Terra. Nunca observe o Sol diretamente sem proteção apropriada.",
    "brazil": false,
    "source": {
      "title": "NASA · Sistema Solar",
      "url": "https://science.nasa.gov/solar-system/"
    }
  },
  {
    "id": "espaco-23",
    "category": "espaco",
    "question": "Qual destes objetos produz energia por fusão nuclear?",
    "choices": [
      "Lua",
      "Marte",
      "Cometa Halley",
      "Sol"
    ],
    "answer": 3,
    "fact": "No interior do Sol, a fusão transforma hidrogênio em hélio e libera energia.",
    "brazil": false,
    "source": {
      "title": "NASA · Sistema Solar",
      "url": "https://science.nasa.gov/solar-system/"
    }
  },
  {
    "id": "espaco-24",
    "category": "espaco",
    "question": "Um ano-luz é uma medida de quê?",
    "choices": [
      "Massa",
      "Tempo de vida",
      "Distância",
      "Temperatura"
    ],
    "answer": 2,
    "fact": "Um ano-luz é a distância percorrida pela luz no vácuo durante um ano, e não uma duração.",
    "brazil": false,
    "source": {
      "title": "NASA · Sistema Solar",
      "url": "https://science.nasa.gov/solar-system/"
    }
  },
  {
    "id": "espaco-25",
    "category": "espaco",
    "question": "Qual planeta não tem satélites naturais conhecidos, assim como Mercúrio?",
    "choices": [
      "Saturno",
      "Vênus",
      "Terra",
      "Marte"
    ],
    "answer": 1,
    "fact": "Mercúrio e Vênus não têm luas naturais conhecidas. A Terra tem a Lua; Marte tem Fobos e Deimos.",
    "brazil": false,
    "source": {
      "title": "NASA · Sistema Solar",
      "url": "https://science.nasa.gov/solar-system/"
    }
  },
  {
    "id": "ciencia-01",
    "category": "ciencia",
    "question": "Por que o céu costuma parecer azul?",
    "choices": [
      "Pela cor do mar",
      "Dispersão da luz",
      "Pela Lua",
      "Por nuvens invisíveis"
    ],
    "answer": 1,
    "fact": "A atmosfera espalha a luz azul com mais eficiência do que a vermelha.",
    "brazil": false
  },
  {
    "id": "ciencia-02",
    "category": "ciencia",
    "question": "Qual é a fórmula química da água?",
    "choices": [
      "CO₂",
      "H₂O",
      "O₂",
      "NaCl"
    ],
    "answer": 1,
    "fact": "A água possui dois átomos de hidrogênio e um de oxigênio.",
    "brazil": false
  },
  {
    "id": "ciencia-03",
    "category": "ciencia",
    "question": "O que a fotossíntese usa como fonte de energia?",
    "choices": [
      "Luz",
      "Som",
      "Plástico",
      "Areia"
    ],
    "answer": 0,
    "fact": "Plantas usam luz para produzir açúcares a partir de água e CO₂.",
    "brazil": false
  },
  {
    "id": "ciencia-04",
    "category": "ciencia",
    "question": "Qual órgão humano bombeia o sangue?",
    "choices": [
      "Pulmão",
      "Rim",
      "Coração",
      "Fígado"
    ],
    "answer": 2,
    "fact": "O coração impulsiona o sangue pelo sistema circulatório.",
    "brazil": false
  },
  {
    "id": "ciencia-05",
    "category": "ciencia",
    "question": "O que mede um termômetro?",
    "choices": [
      "Pressão",
      "Temperatura",
      "Massa",
      "Velocidade"
    ],
    "answer": 1,
    "fact": "Termômetros medem a temperatura de materiais e ambientes.",
    "brazil": false
  },
  {
    "id": "ciencia-06",
    "category": "ciencia",
    "question": "Qual é o gás mais abundante na atmosfera terrestre?",
    "choices": [
      "Oxigênio",
      "Nitrogênio",
      "Hélio",
      "Metano"
    ],
    "answer": 1,
    "fact": "O nitrogênio representa cerca de 78% do ar seco.",
    "brazil": false
  },
  {
    "id": "ciencia-07",
    "category": "ciencia",
    "question": "Como se chama a passagem da água líquida para vapor?",
    "choices": [
      "Fusão",
      "Evaporação",
      "Condensação",
      "Solidificação"
    ],
    "answer": 1,
    "fact": "Na evaporação, moléculas deixam a superfície líquida.",
    "brazil": false
  },
  {
    "id": "ciencia-08",
    "category": "ciencia",
    "question": "Qual é a unidade básica da vida?",
    "choices": [
      "Átomo",
      "Célula",
      "Planeta",
      "Órgão"
    ],
    "answer": 1,
    "fact": "Células são unidades estruturais e funcionais dos seres vivos.",
    "brazil": false
  },
  {
    "id": "ciencia-09",
    "category": "ciencia",
    "question": "O que um microscópio ajuda a observar?",
    "choices": [
      "Objetos muito pequenos",
      "Estrelas distantes",
      "Sons",
      "Ventos"
    ],
    "answer": 0,
    "fact": "Microscópios ampliam estruturas invisíveis a olho nu.",
    "brazil": false
  },
  {
    "id": "ciencia-10",
    "category": "ciencia",
    "question": "Qual força nos mantém no chão?",
    "choices": [
      "Magnetismo",
      "Gravidade",
      "Atrito apenas",
      "Eletricidade"
    ],
    "answer": 1,
    "fact": "A gravidade atrai corpos com massa.",
    "brazil": false
  },
  {
    "id": "ciencia-11",
    "category": "ciencia",
    "question": "Qual pigmento dá a cor verde a muitas folhas?",
    "choices": [
      "Clorofila",
      "Melanina",
      "Hemoglobina",
      "Queratina"
    ],
    "answer": 0,
    "fact": "A clorofila absorve parte da luz utilizada na fotossíntese. Nem toda luz é absorvida da mesma maneira.",
    "brazil": false
  },
  {
    "id": "ciencia-12",
    "category": "ciencia",
    "question": "Quando o vapor de água forma gotinhas em um copo gelado, ocorre...",
    "choices": [
      "Fusão",
      "Sublimação",
      "Combustão",
      "Condensação"
    ],
    "answer": 3,
    "fact": "O vapor de água do ar esfria e passa ao estado líquido na superfície do copo.",
    "brazil": false
  },
  {
    "id": "ciencia-13",
    "category": "ciencia",
    "question": "Por que o gelo flutua na água líquida?",
    "choices": [
      "Porque repele gravidade",
      "Porque vira gás",
      "Porque é menos denso",
      "Porque não tem massa"
    ],
    "answer": 2,
    "fact": "Ao congelar, a água forma uma estrutura que ocupa mais espaço. Assim, o gelo tem densidade menor que a água líquida.",
    "brazil": false
  },
  {
    "id": "ciencia-14",
    "category": "ciencia",
    "question": "Qual estrutura das plantas absorve água do solo?",
    "choices": [
      "Semente seca",
      "Raiz",
      "Pétala",
      "Fruto"
    ],
    "answer": 1,
    "fact": "As raízes absorvem água e sais minerais. Também ajudam a fixar a planta.",
    "brazil": false
  },
  {
    "id": "ciencia-15",
    "category": "ciencia",
    "question": "Qual gás é liberado na fotossíntese das plantas?",
    "choices": [
      "Oxigênio",
      "Hélio",
      "Metano",
      "Nitrogênio puro"
    ],
    "answer": 0,
    "fact": "Na fotossíntese, a quebra de moléculas de água está ligada à liberação de oxigênio.",
    "brazil": false
  },
  {
    "id": "ciencia-16",
    "category": "ciencia",
    "question": "Qual destas fontes de energia é renovável?",
    "choices": [
      "Carvão mineral",
      "Petróleo",
      "Gás natural",
      "Vento"
    ],
    "answer": 3,
    "fact": "O vento movimenta as pás das turbinas eólicas. Ele é uma fonte renovável de energia.",
    "brazil": false
  },
  {
    "id": "ciencia-17",
    "category": "ciencia",
    "question": "As turbinas de uma hidrelétrica são movimentadas por quê?",
    "choices": [
      "Luz direta",
      "Combustível de avião",
      "Água em movimento",
      "Areia quente"
    ],
    "answer": 2,
    "fact": "O movimento da água aciona turbinas conectadas a geradores, que transformam energia mecânica em elétrica.",
    "brazil": false
  },
  {
    "id": "ciencia-18",
    "category": "ciencia",
    "question": "Qual instrumento registra os tremores do solo?",
    "choices": [
      "Higrômetro",
      "Sismógrafo",
      "Termômetro",
      "Barômetro"
    ],
    "answer": 1,
    "fact": "Sismógrafos registram ondas sísmicas e ajudam a estudar terremotos e o interior da Terra.",
    "brazil": false
  },
  {
    "id": "ciencia-19",
    "category": "ciencia",
    "question": "A ferrugem se forma principalmente em materiais que contêm...",
    "choices": [
      "Ferro",
      "Ouro",
      "Vidro",
      "Plástico"
    ],
    "answer": 0,
    "fact": "A ferrugem envolve reações do ferro com oxigênio na presença de água ou umidade.",
    "brazil": false
  },
  {
    "id": "ciencia-20",
    "category": "ciencia",
    "question": "Qual tipo de material costuma conduzir bem eletricidade?",
    "choices": [
      "Borracha seca",
      "Vidro",
      "Madeira seca",
      "Metal"
    ],
    "answer": 3,
    "fact": "Muitos metais têm elétrons que se movem com facilidade, permitindo condução elétrica.",
    "brazil": false
  },
  {
    "id": "ciencia-21",
    "category": "ciencia",
    "question": "Por que ouvimos o trovão depois de ver o relâmpago?",
    "choices": [
      "A luz é empurrada pelo vento",
      "A chuva bloqueia todo som",
      "A luz viaja mais rápido que o som",
      "O som surge dias depois"
    ],
    "answer": 2,
    "fact": "A luz chega muito antes das ondas sonoras. Por isso, a diferença aumenta quando o raio está mais distante.",
    "brazil": false
  },
  {
    "id": "ciencia-22",
    "category": "ciencia",
    "question": "O que se mede em decibéis, entre estas opções?",
    "choices": [
      "Temperatura",
      "Nível sonoro",
      "Comprimento",
      "Massa"
    ],
    "answer": 1,
    "fact": "O decibel expressa uma relação em escala logarítmica e é usado, entre outras aplicações, para níveis sonoros.",
    "brazil": false
  },
  {
    "id": "ciencia-23",
    "category": "ciencia",
    "question": "A energia solar fotovoltaica transforma luz diretamente em quê?",
    "choices": [
      "Eletricidade",
      "Petróleo",
      "Carvão",
      "Gás natural"
    ],
    "answer": 0,
    "fact": "Células fotovoltaicas convertem parte da energia da luz em energia elétrica.",
    "brazil": false
  },
  {
    "id": "ciencia-24",
    "category": "ciencia",
    "question": "A pupila é uma abertura encontrada em qual órgão?",
    "choices": [
      "Ouvido",
      "Pulmão",
      "Rim",
      "Olho"
    ],
    "answer": 3,
    "fact": "A pupila permite a entrada de luz no olho. Seu tamanho é controlado pela íris.",
    "brazil": false
  },
  {
    "id": "ciencia-25",
    "category": "ciencia",
    "question": "Em uma cadeia alimentar, plantas são geralmente...",
    "choices": [
      "Consumidoras secundárias",
      "Decompositoras",
      "Produtoras",
      "Predadoras de topo"
    ],
    "answer": 2,
    "fact": "As plantas produzem matéria orgânica por fotossíntese e sustentam muitas cadeias alimentares.",
    "brazil": false
  },
  {
    "id": "cultura-01",
    "category": "cultura",
    "question": "Qual ritmo musical nasceu com forte desenvolvimento no Rio de Janeiro?",
    "choices": [
      "Samba",
      "Flamenco",
      "Tango",
      "Reggae"
    ],
    "answer": 0,
    "fact": "O samba urbano carioca se consolidou no início do século XX.",
    "brazil": true
  },
  {
    "id": "cultura-02",
    "category": "cultura",
    "question": "O frevo é tradicional de qual estado?",
    "choices": [
      "Pará",
      "Pernambuco",
      "Acre",
      "Goiás"
    ],
    "answer": 1,
    "fact": "O frevo é uma expressão cultural emblemática de Pernambuco.",
    "brazil": true
  },
  {
    "id": "cultura-03",
    "category": "cultura",
    "question": "Qual é o instrumento característico da capoeira?",
    "choices": [
      "Berimbau",
      "Violino",
      "Acordeão",
      "Flauta transversal"
    ],
    "answer": 0,
    "fact": "O berimbau marca o ritmo da roda de capoeira.",
    "brazil": true
  },
  {
    "id": "cultura-04",
    "category": "cultura",
    "question": "Qual festa popular destaca quadrilhas e fogueiras?",
    "choices": [
      "Festa Junina",
      "Carnaval",
      "Réveillon",
      "Páscoa"
    ],
    "answer": 0,
    "fact": "As festas juninas são celebradas em todo o Brasil.",
    "brazil": true
  },
  {
    "id": "cultura-05",
    "category": "cultura",
    "question": "O carimbó tem forte ligação com qual estado?",
    "choices": [
      "Pará",
      "Santa Catarina",
      "Rio de Janeiro",
      "Mato Grosso"
    ],
    "answer": 0,
    "fact": "O carimbó é uma dança e gênero musical tradicional do Pará.",
    "brazil": true
  },
  {
    "id": "cultura-06",
    "category": "cultura",
    "question": "Qual autor escreveu Dom Casmurro?",
    "choices": [
      "Machado de Assis",
      "Jorge Amado",
      "José de Alencar",
      "Clarice Lispector"
    ],
    "answer": 0,
    "fact": "Dom Casmurro foi publicado em 1899.",
    "brazil": true
  },
  {
    "id": "cultura-07",
    "category": "cultura",
    "question": "O maracatu é especialmente associado a qual região?",
    "choices": [
      "Nordeste",
      "Sul",
      "Centro-Oeste",
      "Norte"
    ],
    "answer": 0,
    "fact": "O maracatu é uma importante tradição afro-brasileira do Nordeste.",
    "brazil": true
  },
  {
    "id": "cultura-08",
    "category": "cultura",
    "question": "Qual dança brasileira é marcada por passos de gafieira?",
    "choices": [
      "Samba",
      "Balé clássico",
      "Valsa vienense",
      "Sapateado irlandês"
    ],
    "answer": 0,
    "fact": "O samba de gafieira é dança de salão brasileira.",
    "brazil": true
  },
  {
    "id": "cultura-09",
    "category": "cultura",
    "question": "Quem escreveu O Auto da Compadecida?",
    "choices": [
      "Ariano Suassuna",
      "Carlos Drummond",
      "Lima Barreto",
      "Cecília Meireles"
    ],
    "answer": 0,
    "fact": "A peça teatral foi escrita por Ariano Suassuna em 1955.",
    "brazil": true
  },
  {
    "id": "cultura-10",
    "category": "cultura",
    "question": "Qual gênero musical é associado à sanfona e ao baião?",
    "choices": [
      "Forró",
      "Heavy metal",
      "Jazz",
      "Ópera"
    ],
    "answer": 0,
    "fact": "O forró envolve ritmos como baião, xote e xaxado.",
    "brazil": true
  },
  {
    "id": "cultura-11",
    "category": "cultura",
    "question": "O Círio de Nazaré é uma grande celebração de qual cidade?",
    "choices": [
      "Curitiba",
      "Belém",
      "Manaus",
      "Recife"
    ],
    "answer": 1,
    "fact": "A celebração acontece em Belém, no Pará, e reúne práticas religiosas, encontros familiares e expressões culturais.",
    "brazil": true,
    "source": {
      "title": "UNESCO · Patrimônio cultural brasileiro",
      "url": "https://ich.unesco.org/en/state/brazil-BR"
    }
  },
  {
    "id": "cultura-12",
    "category": "cultura",
    "question": "O samba de roda do Recôncavo é associado a qual estado?",
    "choices": [
      "Bahia",
      "Paraná",
      "Goiás",
      "Roraima"
    ],
    "answer": 0,
    "fact": "O samba de roda envolve música, dança e poesia e tem fortes raízes afro-brasileiras no Recôncavo Baiano.",
    "brazil": true,
    "source": {
      "title": "UNESCO · Patrimônio cultural brasileiro",
      "url": "https://ich.unesco.org/en/state/brazil-BR"
    }
  },
  {
    "id": "cultura-13",
    "category": "cultura",
    "question": "O bumba-meu-boi reconhecido pela UNESCO como complexo cultural é de qual estado?",
    "choices": [
      "Santa Catarina",
      "Acre",
      "Espírito Santo",
      "Maranhão"
    ],
    "answer": 3,
    "fact": "No Maranhão, o bumba-meu-boi reúne música, dança, artesanato e diferentes sotaques, como são chamados seus estilos.",
    "brazil": true,
    "source": {
      "title": "UNESCO · Patrimônio cultural brasileiro",
      "url": "https://ich.unesco.org/en/state/brazil-BR"
    }
  },
  {
    "id": "cultura-14",
    "category": "cultura",
    "question": "Qual expressão popular combina versos, rimas e pequenos folhetos?",
    "choices": [
      "Pintura a óleo",
      "Cerâmica utilitária",
      "Literatura de cordel",
      "Partitura sinfônica"
    ],
    "answer": 2,
    "fact": "O cordel circula por escrito e oralmente. Seus temas vão de histórias imaginadas a acontecimentos do cotidiano.",
    "brazil": true,
    "source": {
      "title": "Fundação Casa de Rui Barbosa · Cordel",
      "url": "https://cordel.casaruibarbosa.gov.br/apresentacao.html"
    }
  },
  {
    "id": "cultura-15",
    "category": "cultura",
    "question": "Qual objeto colorido acompanha muitos passistas de frevo?",
    "choices": [
      "Raquete",
      "Sombrinha",
      "Remo",
      "Espada de metal"
    ],
    "answer": 1,
    "fact": "A pequena sombrinha é um símbolo visual do frevo, manifestação que une música e dança.",
    "brazil": true,
    "source": {
      "title": "Iphan · Patrimônio imaterial de Pernambuco",
      "url": "https://www.gov.br/iphan/pt-br/superintendencias/pernambuco/patrimonio-imaterial"
    }
  },
  {
    "id": "cultura-16",
    "category": "cultura",
    "question": "O jongo tem fortes raízes em qual matriz cultural?",
    "choices": [
      "Africana",
      "Nórdica",
      "Inuíte",
      "Mongol"
    ],
    "answer": 0,
    "fact": "O jongo é uma expressão afro-brasileira que combina canto, dança e tambores, especialmente no Sudeste.",
    "brazil": true
  },
  {
    "id": "cultura-17",
    "category": "cultura",
    "question": "O maracatu de baque solto é conhecido por qual personagem de destaque?",
    "choices": [
      "Arlequim veneziano",
      "Samurai",
      "Gaiteiro escocês",
      "Caboclo de lança"
    ],
    "answer": 3,
    "fact": "O caboclo de lança usa uma indumentária elaborada e é marcante no maracatu rural de Pernambuco.",
    "brazil": true,
    "source": {
      "title": "Iphan · Patrimônio imaterial de Pernambuco",
      "url": "https://www.gov.br/iphan/pt-br/superintendencias/pernambuco/patrimonio-imaterial"
    }
  },
  {
    "id": "cultura-18",
    "category": "cultura",
    "question": "O teatro de bonecos popular em Pernambuco também é conhecido como...",
    "choices": [
      "Ikebana",
      "Haicai",
      "Mamulengo",
      "Origami"
    ],
    "answer": 2,
    "fact": "O mamulengo utiliza bonecos, humor, música e histórias do cotidiano em apresentações populares.",
    "brazil": true,
    "source": {
      "title": "Iphan · Patrimônio imaterial de Pernambuco",
      "url": "https://www.gov.br/iphan/pt-br/superintendencias/pernambuco/patrimonio-imaterial"
    }
  },
  {
    "id": "cultura-19",
    "category": "cultura",
    "question": "O ofício das paneleiras de Goiabeiras é tradicional de qual cidade?",
    "choices": [
      "Manaus",
      "Vitória",
      "Fortaleza",
      "Goiânia"
    ],
    "answer": 1,
    "fact": "As paneleiras de Goiabeiras, em Vitória, transmitem saberes de produção artesanal de panelas de barro.",
    "brazil": true,
    "source": {
      "title": "Iphan · Saberes e patrimônio",
      "url": "https://portal.iphan.gov.br/noticias/detalhes/3179/mulheres-mantem-vivo-o-patrimonio-cultural-do-brasil"
    }
  },
  {
    "id": "cultura-20",
    "category": "cultura",
    "question": "A Feira de Caruaru fica em qual estado?",
    "choices": [
      "Pernambuco",
      "Piauí",
      "Paraná",
      "Pará"
    ],
    "answer": 0,
    "fact": "A Feira de Caruaru reúne comércio, comida, artesanato e expressões da cultura popular pernambucana.",
    "brazil": true,
    "source": {
      "title": "Iphan · Patrimônio imaterial de Pernambuco",
      "url": "https://www.gov.br/iphan/pt-br/superintendencias/pernambuco/patrimonio-imaterial"
    }
  },
  {
    "id": "cultura-21",
    "category": "cultura",
    "question": "A viola de cocho é uma tradição especialmente ligada a quais estados?",
    "choices": [
      "Acre e Amapá",
      "Paraná e Santa Catarina",
      "Ceará e Piauí",
      "Mato Grosso e Mato Grosso do Sul"
    ],
    "answer": 3,
    "fact": "A viola de cocho é esculpida em uma peça de madeira e participa de manifestações como cururu e siriri.",
    "brazil": true
  },
  {
    "id": "cultura-22",
    "category": "cultura",
    "question": "Qual destas é uma língua indígena, e não apenas o nome de uma dança?",
    "choices": [
      "Baião",
      "Xote",
      "Guarani",
      "Frevo"
    ],
    "answer": 2,
    "fact": "Línguas guarani são faladas por povos em países como Brasil e Paraguai. O Brasil tem grande diversidade linguística indígena.",
    "brazil": true
  },
  {
    "id": "cultura-23",
    "category": "cultura",
    "question": "O tambor de crioula é uma manifestação cultural especialmente associada a qual estado?",
    "choices": [
      "Goiás",
      "Maranhão",
      "Tocantins",
      "São Paulo"
    ],
    "answer": 1,
    "fact": "O tambor de crioula reúne canto, percussão e dança de roda em uma tradição afro-brasileira do Maranhão.",
    "brazil": true
  },
  {
    "id": "cultura-24",
    "category": "cultura",
    "question": "Quem é conhecido como o Rei do Baião?",
    "choices": [
      "Luiz Gonzaga",
      "Tom Jobim",
      "Cartola",
      "Pixinguinha"
    ],
    "answer": 0,
    "fact": "Luiz Gonzaga ajudou a popularizar o baião e outros ritmos nordestinos, com a sanfona em destaque.",
    "brazil": true
  },
  {
    "id": "cultura-25",
    "category": "cultura",
    "question": "A arte Kusiwa, de grafismos e pintura corporal, é ligada a qual povo?",
    "choices": [
      "Inca",
      "Maori",
      "Sami",
      "Wajãpi"
    ],
    "answer": 3,
    "fact": "A arte Kusiwa pertence aos Wajãpi, no Amapá, e se relaciona a conhecimentos e formas de compreender o mundo.",
    "brazil": true,
    "source": {
      "title": "UNESCO · Patrimônio cultural brasileiro",
      "url": "https://ich.unesco.org/en/state/brazil-BR"
    }
  },
  {
    "id": "geografia-01",
    "category": "geografia",
    "question": "Qual é o maior país da América do Sul em área?",
    "choices": [
      "Argentina",
      "Brasil",
      "Chile",
      "Peru"
    ],
    "answer": 1,
    "fact": "O Brasil ocupa quase metade do território sul-americano.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "geografia-02",
    "category": "geografia",
    "question": "Qual oceano banha a costa brasileira?",
    "choices": [
      "Índico",
      "Pacífico",
      "Atlântico",
      "Ártico"
    ],
    "answer": 2,
    "fact": "Toda a costa marítima brasileira está voltada para o Atlântico.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "geografia-03",
    "category": "geografia",
    "question": "Onde fica o Monte Roraima?",
    "choices": [
      "Fronteira entre Brasil, Venezuela e Guiana",
      "Litoral da Bahia",
      "Rio Grande do Sul",
      "Ilha de Fernando de Noronha"
    ],
    "answer": 0,
    "fact": "O Monte Roraima é um tepui situado na tríplice fronteira.",
    "brazil": true
  },
  {
    "id": "geografia-04",
    "category": "geografia",
    "question": "Qual é a capital de Mato Grosso do Sul?",
    "choices": [
      "Cuiabá",
      "Campo Grande",
      "Dourados",
      "Bonito"
    ],
    "answer": 1,
    "fact": "Campo Grande é a capital de Mato Grosso do Sul.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "geografia-05",
    "category": "geografia",
    "question": "Qual é a capital de Pernambuco?",
    "choices": [
      "Recife",
      "Maceió",
      "Natal",
      "Aracaju"
    ],
    "answer": 0,
    "fact": "Recife é conhecida pelos rios e pontes.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "geografia-06",
    "category": "geografia",
    "question": "Qual região brasileira inclui o estado do Amazonas?",
    "choices": [
      "Sul",
      "Sudeste",
      "Norte",
      "Nordeste"
    ],
    "answer": 2,
    "fact": "O Amazonas é um dos estados da região Norte.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "geografia-07",
    "category": "geografia",
    "question": "Qual país faz fronteira com o Brasil?",
    "choices": [
      "México",
      "Uruguai",
      "Equador",
      "Chile"
    ],
    "answer": 1,
    "fact": "O Brasil faz fronteira com o Uruguai ao sul.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "geografia-08",
    "category": "geografia",
    "question": "Qual é a capital da Bahia?",
    "choices": [
      "Salvador",
      "Fortaleza",
      "Vitória",
      "São Luís"
    ],
    "answer": 0,
    "fact": "Salvador foi a primeira capital do Brasil colonial.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "geografia-09",
    "category": "geografia",
    "question": "Em que continente fica o deserto do Saara?",
    "choices": [
      "Ásia",
      "África",
      "Europa",
      "Oceania"
    ],
    "answer": 1,
    "fact": "O Saara se estende pelo norte da África.",
    "brazil": false
  },
  {
    "id": "geografia-10",
    "category": "geografia",
    "question": "Qual é a capital do estado do Pará?",
    "choices": [
      "Manaus",
      "Macapá",
      "Belém",
      "Palmas"
    ],
    "answer": 2,
    "fact": "Belém fica próxima à foz do rio Amazonas.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "geografia-11",
    "category": "geografia",
    "question": "Qual é a capital do Acre?",
    "choices": [
      "Macapá",
      "Boa Vista",
      "Rio Branco",
      "Porto Velho"
    ],
    "answer": 2,
    "fact": "Rio Branco é a capital do Acre, estado da região Norte que faz fronteira com Peru e Bolívia.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "geografia-12",
    "category": "geografia",
    "question": "Qual é a capital do Amapá?",
    "choices": [
      "Belém",
      "Macapá",
      "Palmas",
      "Manaus"
    ],
    "answer": 1,
    "fact": "Macapá fica às margens do rio Amazonas e é atravessada pela Linha do Equador.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "geografia-13",
    "category": "geografia",
    "question": "Qual é a capital de Rondônia?",
    "choices": [
      "Porto Velho",
      "Rio Branco",
      "Boa Vista",
      "Cuiabá"
    ],
    "answer": 0,
    "fact": "Porto Velho fica às margens do rio Madeira e é a capital de Rondônia.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "geografia-14",
    "category": "geografia",
    "question": "Qual é a capital de Roraima?",
    "choices": [
      "Manaus",
      "Macapá",
      "Palmas",
      "Boa Vista"
    ],
    "answer": 3,
    "fact": "Boa Vista fica ao norte da Linha do Equador e é a capital de Roraima.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "geografia-15",
    "category": "geografia",
    "question": "Qual é a capital do Tocantins?",
    "choices": [
      "Cuiabá",
      "Teresina",
      "Palmas",
      "Goiânia"
    ],
    "answer": 2,
    "fact": "Palmas foi planejada para ser a capital de Tocantins, estado criado pela Constituição de 1988.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "geografia-16",
    "category": "geografia",
    "question": "Qual é a capital de Goiás?",
    "choices": [
      "Campo Grande",
      "Goiânia",
      "Palmas",
      "Brasília"
    ],
    "answer": 1,
    "fact": "Goiânia é a capital de Goiás. Brasília pertence ao Distrito Federal.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "geografia-17",
    "category": "geografia",
    "question": "Qual é a capital de Mato Grosso?",
    "choices": [
      "Cuiabá",
      "Campo Grande",
      "Goiânia",
      "Dourados"
    ],
    "answer": 0,
    "fact": "Cuiabá é a capital de Mato Grosso. Campo Grande é a capital de Mato Grosso do Sul.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "geografia-18",
    "category": "geografia",
    "question": "Qual é a capital de Alagoas?",
    "choices": [
      "Aracaju",
      "Recife",
      "Natal",
      "Maceió"
    ],
    "answer": 3,
    "fact": "Maceió é a capital de Alagoas e fica no litoral do Nordeste.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "geografia-19",
    "category": "geografia",
    "question": "Qual é a capital de Sergipe?",
    "choices": [
      "Salvador",
      "Teresina",
      "Aracaju",
      "Maceió"
    ],
    "answer": 2,
    "fact": "Aracaju é a capital de Sergipe, o menor estado brasileiro em área.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "geografia-20",
    "category": "geografia",
    "question": "Qual é a capital do Piauí?",
    "choices": [
      "João Pessoa",
      "Teresina",
      "São Luís",
      "Fortaleza"
    ],
    "answer": 1,
    "fact": "Teresina fica no interior, junto ao rio Parnaíba, ao contrário das demais capitais nordestinas, que ficam no litoral.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "geografia-21",
    "category": "geografia",
    "question": "Qual é a capital do Espírito Santo?",
    "choices": [
      "Vitória",
      "Vila Velha",
      "Belo Horizonte",
      "Rio de Janeiro"
    ],
    "answer": 0,
    "fact": "Vitória é a capital capixaba e tem parte de seu território em uma ilha.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "geografia-22",
    "category": "geografia",
    "question": "Qual é a capital de Santa Catarina?",
    "choices": [
      "Curitiba",
      "Porto Alegre",
      "Joinville",
      "Florianópolis"
    ],
    "answer": 3,
    "fact": "Florianópolis inclui a Ilha de Santa Catarina e uma porção continental.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "geografia-23",
    "category": "geografia",
    "question": "Qual destes estados pertence à região Sul?",
    "choices": [
      "Goiás",
      "Mato Grosso do Sul",
      "Paraná",
      "São Paulo"
    ],
    "answer": 2,
    "fact": "Paraná, Santa Catarina e Rio Grande do Sul formam a região Sul do Brasil.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "geografia-24",
    "category": "geografia",
    "question": "Qual destes estados pertence à região Sudeste?",
    "choices": [
      "Goiás",
      "Minas Gerais",
      "Bahia",
      "Paraná"
    ],
    "answer": 1,
    "fact": "O Sudeste reúne Minas Gerais, Espírito Santo, Rio de Janeiro e São Paulo.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "geografia-25",
    "category": "geografia",
    "question": "Qual é a capital do Ceará?",
    "choices": [
      "Fortaleza",
      "Natal",
      "São Luís",
      "João Pessoa"
    ],
    "answer": 0,
    "fact": "Fortaleza é a capital do Ceará e fica no litoral nordestino.",
    "brazil": true,
    "source": {
      "title": "IBGE Educa · Divisão Territorial",
      "url": "https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html"
    }
  },
  {
    "id": "esportes-01",
    "category": "esportes",
    "question": "Em qual esporte Marta se destacou mundialmente?",
    "choices": [
      "Vôlei",
      "Futebol",
      "Tênis",
      "Natação"
    ],
    "answer": 1,
    "fact": "Marta é uma das maiores referências do futebol feminino.",
    "brazil": true
  },
  {
    "id": "esportes-02",
    "category": "esportes",
    "question": "Qual esporte usa uma cesta e uma bola laranja?",
    "choices": [
      "Basquete",
      "Rúgbi",
      "Futsal",
      "Tênis"
    ],
    "answer": 0,
    "fact": "No basquete, equipes tentam marcar pontos na cesta adversária.",
    "brazil": false
  },
  {
    "id": "esportes-03",
    "category": "esportes",
    "question": "Em qual esporte Ayrton Senna foi tricampeão mundial?",
    "choices": [
      "MotoGP",
      "Fórmula 1",
      "Rali Dakar",
      "Ciclismo"
    ],
    "answer": 1,
    "fact": "Senna conquistou três títulos mundiais de Fórmula 1.",
    "brazil": true
  },
  {
    "id": "esportes-04",
    "category": "esportes",
    "question": "Quantos jogadores cada time tem em campo no futebol tradicional?",
    "choices": [
      "7",
      "9",
      "11",
      "12"
    ],
    "answer": 2,
    "fact": "No futebol, cada time inicia com 11 jogadores.",
    "brazil": false
  },
  {
    "id": "esportes-05",
    "category": "esportes",
    "question": "Qual esporte é associado à atleta Rebeca Andrade?",
    "choices": [
      "Ginástica artística",
      "Natação",
      "Judô",
      "Vela"
    ],
    "answer": 0,
    "fact": "Rebeca Andrade conquistou medalhas olímpicas na ginástica artística.",
    "brazil": true
  },
  {
    "id": "esportes-06",
    "category": "esportes",
    "question": "Qual esporte costuma ter sets e saques sobre uma rede?",
    "choices": [
      "Vôlei",
      "Corrida",
      "Boxe",
      "Golfe"
    ],
    "answer": 0,
    "fact": "No vôlei, os times disputam pontos separados por uma rede.",
    "brazil": false
  },
  {
    "id": "esportes-07",
    "category": "esportes",
    "question": "Qual modalidade usa uma prancha para deslizar nas ondas?",
    "choices": [
      "Surfe",
      "Esgrima",
      "Handebol",
      "Remo"
    ],
    "answer": 0,
    "fact": "O Brasil tem uma tradição forte no surfe profissional.",
    "brazil": true
  },
  {
    "id": "esportes-08",
    "category": "esportes",
    "question": "Em qual país ocorreu a Copa do Mundo masculina de 2014?",
    "choices": [
      "Brasil",
      "Alemanha",
      "França",
      "Rússia"
    ],
    "answer": 0,
    "fact": "O Brasil recebeu a Copa do Mundo masculina de 2014.",
    "brazil": true
  },
  {
    "id": "esportes-09",
    "category": "esportes",
    "question": "Qual esporte é praticado sobre tatames e usa ippon?",
    "choices": [
      "Judô",
      "Tênis",
      "Natação",
      "Beisebol"
    ],
    "answer": 0,
    "fact": "No judô, um ippon encerra o combate.",
    "brazil": false
  },
  {
    "id": "esportes-10",
    "category": "esportes",
    "question": "O que significa um hat-trick no futebol?",
    "choices": [
      "Três gols do mesmo jogador",
      "Três escanteios",
      "Dois cartões",
      "Um pênalti"
    ],
    "answer": 0,
    "fact": "Hat-trick é quando um atleta marca três gols na partida.",
    "brazil": false
  },
  {
    "id": "esportes-11",
    "category": "esportes",
    "question": "Qual atleta brasileiro é conhecido como Guga?",
    "choices": [
      "Gustavo Borges",
      "César Cielo",
      "Robert Scheidt",
      "Gustavo Kuerten"
    ],
    "answer": 3,
    "fact": "Gustavo Kuerten conquistou três títulos de Roland Garros, um dos principais torneios do tênis.",
    "brazil": true
  },
  {
    "id": "esportes-12",
    "category": "esportes",
    "question": "Em qual modalidade olímpica se destacou Robert Scheidt?",
    "choices": [
      "Hipismo",
      "Boxe",
      "Vela",
      "Judô"
    ],
    "answer": 2,
    "fact": "Robert Scheidt conquistou medalhas olímpicas na vela, em provas como Laser e Star.",
    "brazil": true
  },
  {
    "id": "esportes-13",
    "category": "esportes",
    "question": "Qual modalidade é associada à brasileira Daiane dos Santos?",
    "choices": [
      "Tênis",
      "Ginástica artística",
      "Vôlei de praia",
      "Vela"
    ],
    "answer": 1,
    "fact": "Daiane dos Santos foi campeã mundial no solo em 2003 e tem movimentos que levam seu nome.",
    "brazil": true
  },
  {
    "id": "esportes-14",
    "category": "esportes",
    "question": "Em qual esporte se destacou o brasileiro Oscar Schmidt?",
    "choices": [
      "Basquete",
      "Handebol",
      "Futebol",
      "Esgrima"
    ],
    "answer": 0,
    "fact": "Oscar Schmidt ficou conhecido pela grande capacidade de pontuar no basquete.",
    "brazil": true
  },
  {
    "id": "esportes-15",
    "category": "esportes",
    "question": "Qual modalidade deu destaque olímpico ao brasileiro Arthur Zanetti?",
    "choices": [
      "Salto com vara",
      "Lançamento de disco",
      "Nado costas",
      "Argolas"
    ],
    "answer": 3,
    "fact": "Arthur Zanetti conquistou o ouro nas argolas nos Jogos Olímpicos de Londres, em 2012.",
    "brazil": true
  },
  {
    "id": "esportes-16",
    "category": "esportes",
    "question": "O brasileiro Thiago Braz ganhou o ouro olímpico no Rio 2016 em qual prova?",
    "choices": [
      "100 metros",
      "Arremesso de peso",
      "Salto com vara",
      "Salto em distância"
    ],
    "answer": 2,
    "fact": "Thiago Braz venceu o salto com vara no Rio de Janeiro em 2016.",
    "brazil": true
  },
  {
    "id": "esportes-17",
    "category": "esportes",
    "question": "Qual atleta brasileira foi campeã olímpica de judô no Rio 2016?",
    "choices": [
      "Fabi Alvim",
      "Rafaela Silva",
      "Marta",
      "Hortência"
    ],
    "answer": 1,
    "fact": "Rafaela Silva conquistou o ouro na categoria até 57 kg nos Jogos do Rio.",
    "brazil": true
  },
  {
    "id": "esportes-18",
    "category": "esportes",
    "question": "Em qual prova de natação César Cielo ganhou ouro em Pequim 2008?",
    "choices": [
      "50 metros livre",
      "200 metros costas",
      "400 metros medley",
      "1500 metros livre"
    ],
    "answer": 0,
    "fact": "César Cielo conquistou o primeiro ouro olímpico da natação brasileira nos 50 metros livre.",
    "brazil": true
  },
  {
    "id": "esportes-19",
    "category": "esportes",
    "question": "A medalha de ouro de Ítalo Ferreira em Tóquio foi em qual esporte?",
    "choices": [
      "Skate",
      "Vela",
      "Canoagem",
      "Surfe"
    ],
    "answer": 3,
    "fact": "Ítalo Ferreira venceu a primeira competição olímpica masculina de surfe, nos Jogos de Tóquio realizados em 2021.",
    "brazil": true
  },
  {
    "id": "esportes-20",
    "category": "esportes",
    "question": "Qual brasileira ficou conhecida como Rainha do Basquete?",
    "choices": [
      "Fofão",
      "Maurren Maggi",
      "Hortência",
      "Marta"
    ],
    "answer": 2,
    "fact": "Hortência é uma referência do basquete brasileiro e integrou a seleção campeã mundial de 1994.",
    "brazil": true
  },
  {
    "id": "esportes-21",
    "category": "esportes",
    "question": "Qual modalidade é associada a Isaquias Queiroz?",
    "choices": [
      "Vela",
      "Canoagem velocidade",
      "Remo oceânico",
      "Triatlo"
    ],
    "answer": 1,
    "fact": "Isaquias Queiroz compete na canoagem velocidade e conquistou ouro olímpico no C1 1000 m em Tóquio.",
    "brazil": true
  },
  {
    "id": "esportes-22",
    "category": "esportes",
    "question": "Em que cidade ocorreu a primeira Olimpíada realizada na América do Sul?",
    "choices": [
      "Rio de Janeiro",
      "Buenos Aires",
      "Santiago",
      "Lima"
    ],
    "answer": 0,
    "fact": "O Rio de Janeiro sediou os Jogos Olímpicos de 2016, os primeiros na América do Sul.",
    "brazil": true
  },
  {
    "id": "esportes-23",
    "category": "esportes",
    "question": "Qual destas modalidades usa uma peteca e uma rede?",
    "choices": [
      "Tênis de mesa",
      "Squash",
      "Beisebol",
      "Badminton"
    ],
    "answer": 3,
    "fact": "No badminton, jogadores usam raquetes para enviar uma peteca por cima da rede.",
    "brazil": false
  },
  {
    "id": "esportes-24",
    "category": "esportes",
    "question": "Quantos atletas formam uma dupla de vôlei de praia em quadra?",
    "choices": [
      "Quatro",
      "Seis",
      "Dois",
      "Três"
    ],
    "answer": 2,
    "fact": "No vôlei de praia, cada equipe é formada por dois atletas em quadra.",
    "brazil": false
  },
  {
    "id": "esportes-25",
    "category": "esportes",
    "question": "O futsal é jogado por quantos atletas de cada equipe em quadra, incluindo o goleiro?",
    "choices": [
      "Onze",
      "Cinco",
      "Seis",
      "Sete"
    ],
    "answer": 1,
    "fact": "Uma equipe de futsal inicia com cinco atletas em quadra, sendo um deles o goleiro.",
    "brazil": false
  },
  {
    "id": "tecnologia-01",
    "category": "tecnologia",
    "question": "O nome Wi-Fi identifica principalmente que tipo de tecnologia?",
    "choices": [
      "Redes locais sem fio",
      "Um tipo de bateria",
      "Um antivírus",
      "Um navegador"
    ],
    "answer": 0,
    "fact": "Wi-Fi identifica tecnologias de redes locais sem fio. O nome não é uma sigla técnica de Wireless Fidelity.",
    "brazil": false
  },
  {
    "id": "tecnologia-02",
    "category": "tecnologia",
    "question": "Qual destes é um sistema operacional?",
    "choices": [
      "Android",
      "Bluetooth",
      "HDMI",
      "USB"
    ],
    "answer": 0,
    "fact": "Android é um sistema operacional usado em dispositivos móveis.",
    "brazil": false
  },
  {
    "id": "tecnologia-03",
    "category": "tecnologia",
    "question": "O que representa a sigla GPS?",
    "choices": [
      "Sistema de Posicionamento Global",
      "Rede social",
      "Tipo de satélite único",
      "Jogo eletrônico"
    ],
    "answer": 0,
    "fact": "O GPS usa sinais de satélites para determinar localização.",
    "brazil": false
  },
  {
    "id": "tecnologia-04",
    "category": "tecnologia",
    "question": "Qual tecnologia permite ler códigos QR com a câmera?",
    "choices": [
      "Visão computacional",
      "Impressão 3D",
      "Radio AM",
      "Fax"
    ],
    "answer": 0,
    "fact": "O leitor detecta padrões visuais e interpreta os dados do QR.",
    "brazil": false
  },
  {
    "id": "tecnologia-05",
    "category": "tecnologia",
    "question": "Qual destes é um exemplo de linguagem de programação?",
    "choices": [
      "JavaScript",
      "JPEG",
      "Wi-Fi",
      "MP3"
    ],
    "answer": 0,
    "fact": "JavaScript é amplamente usado na web e em aplicações.",
    "brazil": false
  },
  {
    "id": "tecnologia-06",
    "category": "tecnologia",
    "question": "Qual dispositivo converte energia solar em elétrica?",
    "choices": [
      "Painel fotovoltaico",
      "Ventilador",
      "Modem",
      "Microfone"
    ],
    "answer": 0,
    "fact": "Células fotovoltaicas convertem luz em eletricidade.",
    "brazil": false
  },
  {
    "id": "tecnologia-07",
    "category": "tecnologia",
    "question": "O que é uma senha forte?",
    "choices": [
      "Uma sequência difícil de adivinhar",
      "123456",
      "Nome do usuário",
      "Data de nascimento"
    ],
    "answer": 0,
    "fact": "Senhas longas e exclusivas reduzem riscos de invasão.",
    "brazil": false
  },
  {
    "id": "tecnologia-08",
    "category": "tecnologia",
    "question": "O que é autenticação em dois fatores?",
    "choices": [
      "Uma proteção adicional ao login",
      "Duas senhas iguais",
      "Dois celulares obrigatórios",
      "Apenas biometria"
    ],
    "answer": 0,
    "fact": "Um segundo fator aumenta a segurança da conta.",
    "brazil": false
  },
  {
    "id": "tecnologia-09",
    "category": "tecnologia",
    "question": "Qual tecnologia é usada para conectar fones sem fio de curto alcance?",
    "choices": [
      "Bluetooth",
      "Satélite geoestacionário",
      "Ethernet com fio",
      "NFC apenas"
    ],
    "answer": 0,
    "fact": "Bluetooth é usado em acessórios próximos ao celular.",
    "brazil": false
  },
  {
    "id": "tecnologia-10",
    "category": "tecnologia",
    "question": "O que significa código aberto?",
    "choices": [
      "Código que pode ser inspecionado conforme a licença",
      "Código sem bugs",
      "Código sem autor",
      "Código sem internet"
    ],
    "answer": 0,
    "fact": "Licenças open source permitem acesso e usos definidos do código.",
    "brazil": false
  },
  {
    "id": "tecnologia-11",
    "category": "tecnologia",
    "question": "O INPE usa imagens de satélite para apoiar qual tarefa?",
    "choices": [
      "Monitoramento ambiental",
      "Produção de ondas do mar",
      "Alteração da gravidade",
      "Criação de petróleo"
    ],
    "answer": 0,
    "fact": "Imagens obtidas a distância permitem acompanhar florestas, agricultura, reservatórios e outras mudanças na superfície.",
    "brazil": true,
    "source": {
      "title": "INPE · Missão Amazonia",
      "url": "https://www.gov.br/inpe/pt-br/programas/amazonia1/missao-amazonia"
    }
  },
  {
    "id": "tecnologia-12",
    "category": "tecnologia",
    "question": "O Amazonia 1 observa a Terra usando principalmente...",
    "choices": [
      "Uma rede de túneis",
      "Um termômetro doméstico",
      "Cabos presos ao solo",
      "Uma câmera a bordo"
    ],
    "answer": 3,
    "fact": "O satélite carrega uma câmera de campo largo. As imagens são transmitidas a estações em terra.",
    "brazil": true,
    "source": {
      "title": "INPE · Missão Amazonia",
      "url": "https://www.gov.br/inpe/pt-br/programas/amazonia1/missao-amazonia"
    }
  },
  {
    "id": "tecnologia-13",
    "category": "tecnologia",
    "question": "A sigla INPE significa...",
    "choices": [
      "Instituto de Navegação e Portos Europeus",
      "Instituto Nacional de Pintura Experimental",
      "Instituto Nacional de Pesquisas Espaciais",
      "Instituto Nacional de Parques Estaduais"
    ],
    "answer": 2,
    "fact": "O INPE é uma instituição brasileira de pesquisa e desenvolvimento em áreas espaciais e ambientais.",
    "brazil": true,
    "source": {
      "title": "INPE · Missão Amazonia",
      "url": "https://www.gov.br/inpe/pt-br/programas/amazonia1/missao-amazonia"
    }
  },
  {
    "id": "tecnologia-14",
    "category": "tecnologia",
    "question": "O Pix foi criado por qual instituição brasileira?",
    "choices": [
      "INPE",
      "Banco Central do Brasil",
      "IBGE",
      "Correios"
    ],
    "answer": 1,
    "fact": "O Banco Central criou o Pix, sistema brasileiro de pagamentos instantâneos lançado em 2020.",
    "brazil": true
  },
  {
    "id": "tecnologia-15",
    "category": "tecnologia",
    "question": "O que um código QR pode armazenar?",
    "choices": [
      "Dados como texto e endereços",
      "Somente fotografias",
      "Apenas senhas bancárias",
      "Energia elétrica"
    ],
    "answer": 0,
    "fact": "Um QR Code representa dados por padrões visuais. É importante conferir o destino antes de abrir um endereço.",
    "brazil": false
  },
  {
    "id": "tecnologia-16",
    "category": "tecnologia",
    "question": "Um backup serve principalmente para quê?",
    "choices": [
      "Aumentar o peso do aparelho",
      "Eliminar a necessidade de senha",
      "Garantir que nunca haverá falha",
      "Recuperar dados após perda"
    ],
    "answer": 3,
    "fact": "Um backup é uma cópia de segurança. Ele só é útil quando pode ser recuperado e está protegido.",
    "brazil": false
  },
  {
    "id": "tecnologia-17",
    "category": "tecnologia",
    "question": "O que é phishing?",
    "choices": [
      "Uma linguagem de programação",
      "Um cabo de rede",
      "Tentativa de enganar para obter dados",
      "Um tipo de tela"
    ],
    "answer": 2,
    "fact": "Mensagens falsas podem imitar serviços conhecidos para roubar informações. Desconfie de urgência e confira o endereço.",
    "brazil": false
  },
  {
    "id": "tecnologia-18",
    "category": "tecnologia",
    "question": "Para que serve a criptografia?",
    "choices": [
      "Impedir qualquer erro humano",
      "Tornar dados ilegíveis sem a chave adequada",
      "Apagar automaticamente todos os arquivos",
      "Aumentar a bateria"
    ],
    "answer": 1,
    "fact": "A criptografia transforma dados usando algoritmos e chaves. Ela não substitui cuidados com golpes ou com o aparelho.",
    "brazil": false
  },
  {
    "id": "tecnologia-19",
    "category": "tecnologia",
    "question": "O armazenamento em nuvem usa principalmente...",
    "choices": [
      "Servidores acessados pela rede",
      "Gotículas no céu",
      "Memória fora de qualquer equipamento",
      "Uma bateria especial"
    ],
    "answer": 0,
    "fact": "Os arquivos ficam em equipamentos de centros de dados. Nuvem é uma forma de oferecer esses recursos pela rede.",
    "brazil": false
  },
  {
    "id": "tecnologia-20",
    "category": "tecnologia",
    "question": "O que é um algoritmo?",
    "choices": [
      "Um tipo de monitor",
      "Uma senha necessariamente secreta",
      "Uma marca de telefone",
      "Uma sequência de passos para resolver uma tarefa"
    ],
    "answer": 3,
    "fact": "Uma receita culinária pode ilustrar a ideia de algoritmo: etapas organizadas para chegar a um resultado.",
    "brazil": false
  },
  {
    "id": "tecnologia-21",
    "category": "tecnologia",
    "question": "Qual componente executa instruções gerais de um computador?",
    "choices": [
      "Teclado",
      "Gabinete",
      "Processador",
      "Alto-falante"
    ],
    "answer": 2,
    "fact": "A CPU executa instruções e coordena operações. Outros componentes realizam tarefas complementares.",
    "brazil": false
  },
  {
    "id": "tecnologia-22",
    "category": "tecnologia",
    "question": "Para que serve a memória RAM?",
    "choices": [
      "Conectar antenas de rádio",
      "Guardar temporariamente dados em uso",
      "Guardar energia elétrica por anos",
      "Substituir todo armazenamento permanente"
    ],
    "answer": 1,
    "fact": "A RAM oferece acesso rápido aos dados em uso. Em geral, seu conteúdo se perde quando falta energia.",
    "brazil": false
  },
  {
    "id": "tecnologia-23",
    "category": "tecnologia",
    "question": "Uma impressora 3D costuma criar objetos como?",
    "choices": [
      "Depositando ou solidificando material em etapas",
      "Apenas desenhando em papel",
      "Produzindo gravidade",
      "Transformando som em metal sem material"
    ],
    "answer": 0,
    "fact": "Na fabricação aditiva, o objeto é construído progressivamente a partir de um modelo digital.",
    "brazil": false
  },
  {
    "id": "tecnologia-24",
    "category": "tecnologia",
    "question": "Qual atitude ajuda a proteger uma conta digital?",
    "choices": [
      "Repetir a mesma senha em tudo",
      "Compartilhar códigos por mensagem",
      "Ignorar todas as atualizações",
      "Usar senhas exclusivas e um segundo fator"
    ],
    "answer": 3,
    "fact": "Senhas exclusivas limitam o impacto de vazamentos. Um segundo fator adiciona proteção ao acesso.",
    "brazil": false
  },
  {
    "id": "tecnologia-25",
    "category": "tecnologia",
    "question": "Dados abertos permitem principalmente...",
    "choices": [
      "Alterar documentos sem registro",
      "Dispensar a verificação das fontes",
      "Reutilização conforme termos e formatos disponíveis",
      "Acesso a qualquer dado privado"
    ],
    "answer": 2,
    "fact": "Dados abertos podem apoiar pesquisa e transparência. Abertura não significa que dados pessoais possam ser divulgados sem regras.",
    "brazil": false
  },
  {
    "id": "gastronomia-01",
    "category": "gastronomia",
    "question": "Qual ingrediente é central no pão de queijo mineiro?",
    "choices": [
      "Polvilho",
      "Fubá apenas",
      "Farinha de centeio",
      "Arroz cru"
    ],
    "answer": 0,
    "fact": "O pão de queijo é feito com polvilho e queijo.",
    "brazil": true
  },
  {
    "id": "gastronomia-02",
    "category": "gastronomia",
    "question": "A moqueca capixaba é tradicional de qual estado?",
    "choices": [
      "Espírito Santo",
      "Paraná",
      "Goiás",
      "Acre"
    ],
    "answer": 0,
    "fact": "A moqueca capixaba costuma ser preparada em panela de barro.",
    "brazil": true,
    "source": {
      "title": "Iphan · Saberes e patrimônio",
      "url": "https://portal.iphan.gov.br/noticias/detalhes/3179/mulheres-mantem-vivo-o-patrimonio-cultural-do-brasil"
    }
  },
  {
    "id": "gastronomia-03",
    "category": "gastronomia",
    "question": "Qual prato é muito associado ao Pará e leva tucupi?",
    "choices": [
      "Pato no tucupi",
      "Acarajé",
      "Churrasco",
      "Barreado"
    ],
    "answer": 0,
    "fact": "O tucupi é um caldo derivado da mandioca.",
    "brazil": true
  },
  {
    "id": "gastronomia-04",
    "category": "gastronomia",
    "question": "O acarajé é tradicional de qual estado?",
    "choices": [
      "Bahia",
      "Santa Catarina",
      "Mato Grosso",
      "Amapá"
    ],
    "answer": 0,
    "fact": "O acarajé é feito com massa de feijão-fradinho e frito no dendê.",
    "brazil": true,
    "source": {
      "title": "Iphan · Saberes e patrimônio",
      "url": "https://portal.iphan.gov.br/noticias/detalhes/3179/mulheres-mantem-vivo-o-patrimonio-cultural-do-brasil"
    }
  },
  {
    "id": "gastronomia-05",
    "category": "gastronomia",
    "question": "Qual doce brasileiro é feito com leite condensado e chocolate?",
    "choices": [
      "Brigadeiro",
      "Quindim",
      "Pamonha",
      "Rapadura"
    ],
    "answer": 0,
    "fact": "O brigadeiro ganhou popularidade no século XX.",
    "brazil": true
  },
  {
    "id": "gastronomia-06",
    "category": "gastronomia",
    "question": "O chimarrão é tradicional principalmente em qual região?",
    "choices": [
      "Sul",
      "Norte",
      "Nordeste",
      "Sudeste"
    ],
    "answer": 0,
    "fact": "O chimarrão faz parte de tradições gaúchas com erva-mate.",
    "brazil": true
  },
  {
    "id": "gastronomia-07",
    "category": "gastronomia",
    "question": "A tapioca é preparada a partir de qual planta?",
    "choices": [
      "Mandioca",
      "Trigo",
      "Milho",
      "Centeio"
    ],
    "answer": 0,
    "fact": "A goma usada na tapioca é derivada da mandioca.",
    "brazil": true
  },
  {
    "id": "gastronomia-08",
    "category": "gastronomia",
    "question": "Qual fruta é muito usada para fazer açaí na tigela?",
    "choices": [
      "Açaí",
      "Caju",
      "Jabuticaba",
      "Pitanga"
    ],
    "answer": 0,
    "fact": "O fruto do açaizeiro é consumido de várias formas no Norte.",
    "brazil": true
  },
  {
    "id": "gastronomia-09",
    "category": "gastronomia",
    "question": "Qual prato paranaense é cozido lentamente em panela vedada?",
    "choices": [
      "Barreado",
      "Vatapá",
      "Baião de dois",
      "Tacacá"
    ],
    "answer": 0,
    "fact": "O barreado é prato tradicional do litoral do Paraná.",
    "brazil": true
  },
  {
    "id": "gastronomia-10",
    "category": "gastronomia",
    "question": "Qual desses ingredientes entra no guaraná natural?",
    "choices": [
      "Sementes de guaraná",
      "Sementes de girassol",
      "Cacau apenas",
      "Café apenas"
    ],
    "answer": 0,
    "fact": "O guaraná é planta originária da Amazônia.",
    "brazil": true
  },
  {
    "id": "gastronomia-11",
    "category": "gastronomia",
    "question": "Qual fruta é usada na produção da cajuína?",
    "choices": [
      "Manga",
      "Caju",
      "Jabuticaba",
      "Cupuaçu"
    ],
    "answer": 1,
    "fact": "A cajuína é uma bebida de caju ligada à cultura do Piauí, com saberes de produção transmitidos entre gerações.",
    "brazil": true
  },
  {
    "id": "gastronomia-12",
    "category": "gastronomia",
    "question": "O pequi é especialmente associado a qual bioma?",
    "choices": [
      "Cerrado",
      "Pampa",
      "Tundra",
      "Taiga"
    ],
    "answer": 0,
    "fact": "O pequi participa da culinária do Cerrado, especialmente em pratos de Goiás e do norte de Minas Gerais.",
    "brazil": true
  },
  {
    "id": "gastronomia-13",
    "category": "gastronomia",
    "question": "Qual prato combina tradicionalmente arroz e feijão-de-corda no Nordeste?",
    "choices": [
      "Barreado",
      "Tacacá",
      "Acarajé",
      "Baião de dois"
    ],
    "answer": 3,
    "fact": "O baião de dois reúne arroz e feijão e tem variações com queijo e outros ingredientes.",
    "brazil": true
  },
  {
    "id": "gastronomia-14",
    "category": "gastronomia",
    "question": "A pamonha é feita principalmente com quê?",
    "choices": [
      "Arroz",
      "Trigo",
      "Milho",
      "Mandioca"
    ],
    "answer": 2,
    "fact": "O milho verde ralado forma a base da pamonha, frequentemente cozida dentro da própria palha.",
    "brazil": true
  },
  {
    "id": "gastronomia-15",
    "category": "gastronomia",
    "question": "Qual ingrediente dá origem à rapadura?",
    "choices": [
      "Farinha de trigo",
      "Caldo de cana",
      "Suco de uva",
      "Leite de coco"
    ],
    "answer": 1,
    "fact": "A rapadura resulta da concentração do caldo de cana e é tradicional em diversas regiões brasileiras.",
    "brazil": true
  },
  {
    "id": "gastronomia-16",
    "category": "gastronomia",
    "question": "A tradicional combinação chamada Romeu e Julieta reúne...",
    "choices": [
      "Queijo e goiabada",
      "Arroz e lentilha",
      "Peixe e banana",
      "Café e chocolate"
    ],
    "answer": 0,
    "fact": "Queijo e goiabada formam uma combinação conhecida como Romeu e Julieta, muito popular no Brasil.",
    "brazil": true
  },
  {
    "id": "gastronomia-17",
    "category": "gastronomia",
    "question": "Qual é a principal base do cuscuz nordestino mais comum?",
    "choices": [
      "Centeio",
      "Aveia",
      "Batata",
      "Milho"
    ],
    "answer": 3,
    "fact": "O cuscuz de milho é preparado no vapor e pode receber acompanhamentos doces ou salgados.",
    "brazil": true
  },
  {
    "id": "gastronomia-18",
    "category": "gastronomia",
    "question": "Qual fruto amazônico é parente do cacau e usado em cremes e doces?",
    "choices": [
      "Figo",
      "Ameixa",
      "Cupuaçu",
      "Pêssego"
    ],
    "answer": 2,
    "fact": "O cupuaçu e o cacau pertencem ao gênero Theobroma. Sua polpa tem sabor e aroma marcantes.",
    "brazil": true
  },
  {
    "id": "gastronomia-19",
    "category": "gastronomia",
    "question": "Qual destes é um nome regional para mandioca de mesa?",
    "choices": [
      "Maxixe",
      "Aipim",
      "Jiló",
      "Quiabo"
    ],
    "answer": 1,
    "fact": "Aipim e macaxeira são nomes usados em regiões do Brasil para a mandioca de mesa.",
    "brazil": true
  },
  {
    "id": "gastronomia-20",
    "category": "gastronomia",
    "question": "Qual parte do cajueiro corresponde ao verdadeiro fruto do caju?",
    "choices": [
      "A castanha",
      "O pedúnculo carnoso",
      "A flor inteira",
      "A folha"
    ],
    "answer": 0,
    "fact": "A parte carnosa e suculenta é um pedúnculo desenvolvido, chamado pseudofruto. A castanha corresponde ao fruto verdadeiro.",
    "brazil": true
  },
  {
    "id": "gastronomia-21",
    "category": "gastronomia",
    "question": "O jambu, usado no tacacá, é conhecido por provocar qual sensação?",
    "choices": [
      "Sabor de gelo sem frio",
      "Aroma de café torrado",
      "Textura de vidro",
      "Leve dormência na boca"
    ],
    "answer": 3,
    "fact": "O jambu é uma planta importante na culinária amazônica e pode produzir uma sensação de formigamento ou dormência.",
    "brazil": true
  },
  {
    "id": "gastronomia-22",
    "category": "gastronomia",
    "question": "O modo tradicional de fazer queijo artesanal mineiro é principalmente um saber de qual estado?",
    "choices": [
      "Paraná",
      "Ceará",
      "Minas Gerais",
      "Amapá"
    ],
    "answer": 2,
    "fact": "A produção artesanal de queijo em Minas Gerais envolve conhecimentos locais e práticas transmitidas entre gerações.",
    "brazil": true,
    "source": {
      "title": "UNESCO · Patrimônio cultural brasileiro",
      "url": "https://ich.unesco.org/en/state/brazil-BR"
    }
  },
  {
    "id": "gastronomia-23",
    "category": "gastronomia",
    "question": "As panelas de barro de Goiabeiras são muito associadas a qual prato?",
    "choices": [
      "Risoto milanês",
      "Moqueca capixaba",
      "Sushi",
      "Fondue"
    ],
    "answer": 1,
    "fact": "As panelas produzidas em Goiabeiras, no Espírito Santo, são tradicionais no preparo da moqueca capixaba.",
    "brazil": true,
    "source": {
      "title": "Iphan · Saberes e patrimônio",
      "url": "https://portal.iphan.gov.br/noticias/detalhes/3179/mulheres-mantem-vivo-o-patrimonio-cultural-do-brasil"
    }
  },
  {
    "id": "gastronomia-24",
    "category": "gastronomia",
    "question": "Qual é o ingrediente principal de uma paçoca doce tradicional?",
    "choices": [
      "Amendoim",
      "Grão-de-bico",
      "Lentilha",
      "Cevada"
    ],
    "answer": 0,
    "fact": "A paçoca doce costuma combinar amendoim, açúcar e sal. Há também paçocas salgadas em culinárias regionais.",
    "brazil": true
  },
  {
    "id": "gastronomia-25",
    "category": "gastronomia",
    "question": "Qual fruta brasileira cresce diretamente no tronco e em galhos grossos?",
    "choices": [
      "Banana",
      "Abacaxi",
      "Melancia",
      "Jabuticaba"
    ],
    "answer": 3,
    "fact": "Na jabuticabeira, flores e frutos podem se desenvolver no tronco. Essa característica é chamada caulifloria.",
    "brazil": true
  },
  {
    "id": "artes-01",
    "category": "artes",
    "question": "Quem pintou Abaporu?",
    "choices": [
      "Tarsila do Amaral",
      "Anita Malfatti",
      "Portinari",
      "Di Cavalcanti"
    ],
    "answer": 0,
    "fact": "Abaporu é uma obra de Tarsila do Amaral, de 1928.",
    "brazil": true
  },
  {
    "id": "artes-02",
    "category": "artes",
    "question": "Quem pintou os painéis Guerra e Paz?",
    "choices": [
      "Candido Portinari",
      "Aleijadinho",
      "Oscar Niemeyer",
      "Lasar Segall"
    ],
    "answer": 0,
    "fact": "Portinari criou os painéis Guerra e Paz para a ONU.",
    "brazil": true
  },
  {
    "id": "artes-03",
    "category": "artes",
    "question": "Qual arquiteto participou do projeto de Brasília?",
    "choices": [
      "Oscar Niemeyer",
      "Gaudí",
      "Frank Lloyd Wright",
      "Le Corbusier apenas"
    ],
    "answer": 0,
    "fact": "Oscar Niemeyer desenhou edifícios emblemáticos de Brasília.",
    "brazil": true
  },
  {
    "id": "artes-04",
    "category": "artes",
    "question": "Qual material é usado em esculturas de barro?",
    "choices": [
      "Argila",
      "Vidro líquido",
      "Gelo seco",
      "Borracha"
    ],
    "answer": 0,
    "fact": "A argila é moldável e endurece após secagem e queima.",
    "brazil": false
  },
  {
    "id": "artes-05",
    "category": "artes",
    "question": "Quem escreveu A Hora da Estrela?",
    "choices": [
      "Clarice Lispector",
      "Rachel de Queiroz",
      "Cora Coralina",
      "Lygia Fagundes Telles"
    ],
    "answer": 0,
    "fact": "A Hora da Estrela foi publicada em 1977.",
    "brazil": true
  },
  {
    "id": "artes-06",
    "category": "artes",
    "question": "Qual destas é uma manifestação artística do teatro?",
    "choices": [
      "Encenação",
      "Fotossíntese",
      "Evaporação",
      "Eletrólise"
    ],
    "answer": 0,
    "fact": "O teatro utiliza atuação e encenação diante de uma plateia.",
    "brazil": false
  },
  {
    "id": "artes-07",
    "category": "artes",
    "question": "O que caracteriza um mosaico?",
    "choices": [
      "Pequenas peças formando imagem",
      "Apenas óleo sobre tela",
      "Somente fotografia",
      "Só escrita"
    ],
    "answer": 0,
    "fact": "Mosaicos combinam pequenas peças de materiais diversos.",
    "brazil": false
  },
  {
    "id": "artes-08",
    "category": "artes",
    "question": "Qual artista é associado aos profetas de Congonhas?",
    "choices": [
      "Aleijadinho",
      "Tarsila",
      "Hélio Oiticica",
      "Portinari"
    ],
    "answer": 0,
    "fact": "Aleijadinho realizou esculturas em pedra-sabão em Congonhas.",
    "brazil": true
  },
  {
    "id": "artes-09",
    "category": "artes",
    "question": "Qual destes é um instrumento de cordas?",
    "choices": [
      "Violão",
      "Tambor",
      "Flauta",
      "Triângulo"
    ],
    "answer": 0,
    "fact": "O violão produz som pela vibração das cordas.",
    "brazil": false
  },
  {
    "id": "artes-10",
    "category": "artes",
    "question": "Em qual cidade fica o MASP?",
    "choices": [
      "São Paulo",
      "Curitiba",
      "Recife",
      "Manaus"
    ],
    "answer": 0,
    "fact": "O MASP é conhecido pelo edifício na Avenida Paulista.",
    "brazil": true
  },
  {
    "id": "artes-11",
    "category": "artes",
    "question": "Quem projetou o edifício do MASP na Avenida Paulista?",
    "choices": [
      "Cora Coralina",
      "Anita Malfatti",
      "Lina Bo Bardi",
      "Tarsila do Amaral"
    ],
    "answer": 2,
    "fact": "Lina Bo Bardi também criou os cavaletes de cristal usados para expor obras do acervo do museu.",
    "brazil": true,
    "source": {
      "title": "MASP · Acervo em transformação",
      "url": "https://masp.org.br/exposicoes/acervo-em-transformacao-2020"
    }
  },
  {
    "id": "artes-12",
    "category": "artes",
    "question": "Os cavaletes de cristal do MASP utilizam placas de quê?",
    "choices": [
      "Tecido",
      "Vidro",
      "Madeira opaca",
      "Mármore"
    ],
    "answer": 1,
    "fact": "As placas de vidro apoiadas em bases de concreto permitem circular entre obras sem uma sequência única obrigatória.",
    "brazil": true,
    "source": {
      "title": "MASP · Acervo em transformação",
      "url": "https://masp.org.br/exposicoes/acervo-em-transformacao-2020"
    }
  },
  {
    "id": "artes-13",
    "category": "artes",
    "question": "O Museu Casa de Portinari fica em qual cidade paulista?",
    "choices": [
      "Brodowski",
      "Santos",
      "Campinas",
      "Sorocaba"
    ],
    "answer": 0,
    "fact": "O museu ocupa a antiga residência de Candido Portinari, onde ele também realizou experiências com pinturas murais.",
    "brazil": true,
    "source": {
      "title": "Museu Casa de Portinari",
      "url": "https://www.museucasadeportinari.org.br/"
    }
  },
  {
    "id": "artes-14",
    "category": "artes",
    "question": "A xilogravura usa tradicionalmente uma matriz de quê?",
    "choices": [
      "Gelo",
      "Tecido solto",
      "Areia molhada",
      "Madeira"
    ],
    "answer": 3,
    "fact": "A imagem é entalhada na madeira. A superfície recebe tinta e transfere a impressão para o papel.",
    "brazil": true
  },
  {
    "id": "artes-15",
    "category": "artes",
    "question": "Capas de folhetos de cordel frequentemente usam qual técnica artística?",
    "choices": [
      "Mosaico de vidro",
      "Escultura em gelo",
      "Xilogravura",
      "Holografia"
    ],
    "answer": 2,
    "fact": "A xilogravura é marcante em muitas capas de cordel, mas desenhos e outras técnicas também são usados.",
    "brazil": true,
    "source": {
      "title": "Fundação Casa de Rui Barbosa · Cordel",
      "url": "https://cordel.casaruibarbosa.gov.br/apresentacao.html"
    }
  },
  {
    "id": "artes-16",
    "category": "artes",
    "question": "Qual técnica organiza uma imagem com diferenças entre claro e escuro?",
    "choices": [
      "Erosão",
      "Contraste de valores",
      "Afinação musical",
      "Fermentação"
    ],
    "answer": 1,
    "fact": "O contraste entre áreas claras e escuras ajuda a criar volume, destaque e profundidade numa imagem.",
    "brazil": false
  },
  {
    "id": "artes-17",
    "category": "artes",
    "question": "Um autorretrato representa quem?",
    "choices": [
      "O próprio artista",
      "Sempre um rei",
      "Apenas um animal",
      "Um lugar sem pessoas"
    ],
    "answer": 0,
    "fact": "O autorretrato é uma representação do próprio artista e pode existir em diferentes linguagens visuais.",
    "brazil": false
  },
  {
    "id": "artes-18",
    "category": "artes",
    "question": "Qual instrumento brasileiro de percussão tem platinelas e uma pele esticada?",
    "choices": [
      "Violão",
      "Flauta",
      "Cavaquinho",
      "Pandeiro"
    ],
    "answer": 3,
    "fact": "O pandeiro aparece no samba, no choro, na capoeira e em diversas outras expressões musicais.",
    "brazil": true
  },
  {
    "id": "artes-19",
    "category": "artes",
    "question": "O cavaquinho pertence a qual família de instrumentos?",
    "choices": [
      "Percussão sem altura",
      "Teclas eletrônicas",
      "Cordas",
      "Metais de sopro"
    ],
    "answer": 2,
    "fact": "O cavaquinho costuma ter quatro cordas e participa de rodas de samba e conjuntos de choro.",
    "brazil": true
  },
  {
    "id": "artes-20",
    "category": "artes",
    "question": "No teatro, o cenário serve principalmente para quê?",
    "choices": [
      "Substituir obrigatoriamente atores",
      "Compor o espaço da ação",
      "Afinar instrumentos",
      "Projetar apenas números"
    ],
    "answer": 1,
    "fact": "O cenário colabora para construir os lugares e atmosferas de uma encenação, podendo ser simples ou elaborado.",
    "brazil": false
  },
  {
    "id": "artes-21",
    "category": "artes",
    "question": "Qual destas técnicas usa pigmentos diluídos em água e é comum sobre papel?",
    "choices": [
      "Aquarela",
      "Fundição",
      "Marcenaria",
      "Cerâmica"
    ],
    "answer": 0,
    "fact": "A aquarela permite trabalhar transparências e camadas de cor, aproveitando também o branco do papel.",
    "brazil": false
  },
  {
    "id": "artes-22",
    "category": "artes",
    "question": "Em uma animação, a sensação de movimento surge de quê?",
    "choices": [
      "Uma única imagem sempre parada",
      "Som sem imagem",
      "Escultura sem alteração",
      "Uma sequência de imagens"
    ],
    "answer": 3,
    "fact": "Imagens exibidas em sequência podem criar a percepção de movimento. Elas podem ser desenhadas, fotografadas ou geradas digitalmente.",
    "brazil": false
  },
  {
    "id": "artes-23",
    "category": "artes",
    "question": "A fotografia registra imagens com a participação essencial de quê?",
    "choices": [
      "Vento",
      "Magnetismo terrestre apenas",
      "Luz",
      "Som"
    ],
    "answer": 2,
    "fact": "A luz é registrada por um material sensível ou sensor, formando a imagem fotográfica.",
    "brazil": false
  },
  {
    "id": "artes-24",
    "category": "artes",
    "question": "Qual é o nome da pessoa que cria a sequência de movimentos de uma dança?",
    "choices": [
      "Restaurador",
      "Coreógrafo",
      "Cenógrafo",
      "Luthier"
    ],
    "answer": 1,
    "fact": "A coreografia organiza movimentos e suas relações com espaço, tempo, música e intenção artística.",
    "brazil": false
  },
  {
    "id": "artes-25",
    "category": "artes",
    "question": "Um luthier trabalha principalmente com quê?",
    "choices": [
      "Construção e reparo de instrumentos",
      "Previsão do tempo",
      "Cozimento de cerâmica",
      "Montagem de telescópios"
    ],
    "answer": 0,
    "fact": "Luthiers constroem e ajustam instrumentos, especialmente de cordas, cuidando de estrutura, resposta e som.",
    "brazil": false
  },
  {
    "id": "mundo-01",
    "category": "mundo",
    "question": "Qual é a capital do Japão?",
    "choices": [
      "Seul",
      "Tóquio",
      "Pequim",
      "Bangcoc"
    ],
    "answer": 1,
    "fact": "Tóquio é a capital do Japão.",
    "brazil": false
  },
  {
    "id": "mundo-02",
    "category": "mundo",
    "question": "Qual oceano é o maior da Terra?",
    "choices": [
      "Atlântico",
      "Índico",
      "Pacífico",
      "Ártico"
    ],
    "answer": 2,
    "fact": "O Pacífico é o maior e mais profundo oceano.",
    "brazil": false
  },
  {
    "id": "mundo-03",
    "category": "mundo",
    "question": "Qual país abriga as pirâmides de Gizé?",
    "choices": [
      "Egito",
      "Grécia",
      "México",
      "Índia"
    ],
    "answer": 0,
    "fact": "As pirâmides de Gizé foram construídas no Egito antigo.",
    "brazil": false
  },
  {
    "id": "mundo-04",
    "category": "mundo",
    "question": "Qual é a montanha mais alta acima do nível do mar?",
    "choices": [
      "Everest",
      "Aconcágua",
      "Kilimanjaro",
      "Denali"
    ],
    "answer": 0,
    "fact": "O Everest fica na cordilheira do Himalaia.",
    "brazil": false
  },
  {
    "id": "mundo-05",
    "category": "mundo",
    "question": "Qual país é associado à invenção do papel na Antiguidade?",
    "choices": [
      "China",
      "França",
      "Canadá",
      "Austrália"
    ],
    "answer": 0,
    "fact": "O desenvolvimento inicial do papel é associado à China.",
    "brazil": false
  },
  {
    "id": "mundo-06",
    "category": "mundo",
    "question": "Qual idioma é oficial em Portugal?",
    "choices": [
      "Espanhol",
      "Português",
      "Italiano",
      "Francês"
    ],
    "answer": 1,
    "fact": "O português é língua oficial de vários países.",
    "brazil": false
  },
  {
    "id": "mundo-07",
    "category": "mundo",
    "question": "Em qual continente fica a Austrália?",
    "choices": [
      "Europa",
      "Oceania",
      "África",
      "América"
    ],
    "answer": 1,
    "fact": "A Austrália é o maior país da região da Oceania.",
    "brazil": false
  },
  {
    "id": "mundo-08",
    "category": "mundo",
    "question": "Qual cidade abriga o Coliseu?",
    "choices": [
      "Roma",
      "Paris",
      "Berlim",
      "Londres"
    ],
    "answer": 0,
    "fact": "O Coliseu é um anfiteatro da Roma antiga.",
    "brazil": false
  },
  {
    "id": "mundo-09",
    "category": "mundo",
    "question": "Qual é o símbolo químico do ouro?",
    "choices": [
      "Ag",
      "Au",
      "Fe",
      "Cu"
    ],
    "answer": 1,
    "fact": "Au vem do latim aurum.",
    "brazil": false
  },
  {
    "id": "mundo-10",
    "category": "mundo",
    "question": "Qual é a maior espécie animal conhecida?",
    "choices": [
      "Elefante-africano",
      "Baleia-azul",
      "Girafa",
      "Tubarão-branco"
    ],
    "answer": 1,
    "fact": "A baleia-azul é o maior animal conhecido.",
    "brazil": false
  },
  {
    "id": "mundo-11",
    "category": "mundo",
    "question": "Machu Picchu fica em qual país?",
    "choices": [
      "México",
      "Bolívia",
      "Equador",
      "Peru"
    ],
    "answer": 3,
    "fact": "A cidade inca de Machu Picchu está nos Andes peruanos, em uma área montanhosa.",
    "brazil": false
  },
  {
    "id": "mundo-12",
    "category": "mundo",
    "question": "Qual país abriga o Taj Mahal?",
    "choices": [
      "China",
      "Tailândia",
      "Índia",
      "Nepal"
    ],
    "answer": 2,
    "fact": "O Taj Mahal fica em Agra, na Índia, e é um mausoléu construído no século XVII.",
    "brazil": false
  },
  {
    "id": "mundo-13",
    "category": "mundo",
    "question": "Qual destes países tem o português como língua oficial?",
    "choices": [
      "Marrocos",
      "Angola",
      "Argentina",
      "Japão"
    ],
    "answer": 1,
    "fact": "Angola integra o conjunto de países que têm o português como língua oficial, assim como Brasil e Portugal.",
    "brazil": false
  },
  {
    "id": "mundo-14",
    "category": "mundo",
    "question": "Qual é o maior continente em área?",
    "choices": [
      "Ásia",
      "África",
      "Europa",
      "Oceania"
    ],
    "answer": 0,
    "fact": "A Ásia é o maior continente em área e abriga paisagens que vão de desertos a florestas e altas montanhas.",
    "brazil": false
  },
  {
    "id": "mundo-15",
    "category": "mundo",
    "question": "Em qual continente fica o Polo Sul geográfico?",
    "choices": [
      "Ásia",
      "Europa",
      "América do Sul",
      "Antártida"
    ],
    "answer": 3,
    "fact": "O Polo Sul está na Antártida. O Polo Norte geográfico fica no oceano Ártico.",
    "brazil": false
  },
  {
    "id": "mundo-16",
    "category": "mundo",
    "question": "Qual país tem uma folha de bordo em sua bandeira?",
    "choices": [
      "Austrália",
      "Egito",
      "Canadá",
      "Suíça"
    ],
    "answer": 2,
    "fact": "A folha de bordo, ou maple leaf, é um símbolo conhecido do Canadá.",
    "brazil": false
  },
  {
    "id": "mundo-17",
    "category": "mundo",
    "question": "Qual país tem a cidade de Barcelona?",
    "choices": [
      "França",
      "Espanha",
      "Itália",
      "Portugal"
    ],
    "answer": 1,
    "fact": "Barcelona fica na Espanha e é a capital da Catalunha.",
    "brazil": false
  },
  {
    "id": "mundo-18",
    "category": "mundo",
    "question": "Qual cordilheira acompanha a borda oeste da América do Sul?",
    "choices": [
      "Andes",
      "Alpes",
      "Himalaia",
      "Atlas"
    ],
    "answer": 0,
    "fact": "A cordilheira dos Andes se estende por vários países sul-americanos, ao longo da porção ocidental do continente.",
    "brazil": false
  },
  {
    "id": "mundo-19",
    "category": "mundo",
    "question": "O deserto do Atacama fica principalmente em qual país?",
    "choices": [
      "Uruguai",
      "Venezuela",
      "Suriname",
      "Chile"
    ],
    "answer": 3,
    "fact": "O Atacama fica no norte do Chile e é conhecido pela aridez e por condições favoráveis à observação astronômica.",
    "brazil": false
  },
  {
    "id": "mundo-20",
    "category": "mundo",
    "question": "Qual destes países é um arquipélago?",
    "choices": [
      "Bolívia",
      "Suíça",
      "Japão",
      "Paraguai"
    ],
    "answer": 2,
    "fact": "O Japão é formado por ilhas. Honshu, Hokkaido, Kyushu e Shikoku estão entre suas principais ilhas.",
    "brazil": false
  },
  {
    "id": "mundo-21",
    "category": "mundo",
    "question": "Qual rio atravessa Paris?",
    "choices": [
      "Tejo",
      "Sena",
      "Tâmisa",
      "Danúbio"
    ],
    "answer": 1,
    "fact": "O Sena atravessa Paris e faz parte da paisagem histórica da capital francesa.",
    "brazil": false
  },
  {
    "id": "mundo-22",
    "category": "mundo",
    "question": "Qual país abriga a cidade de Petra?",
    "choices": [
      "Jordânia",
      "Grécia",
      "Índia",
      "Tunísia"
    ],
    "answer": 0,
    "fact": "Petra é conhecida por construções escavadas na rocha e por sua ligação com a civilização nabateia.",
    "brazil": false
  },
  {
    "id": "mundo-23",
    "category": "mundo",
    "question": "Qual é a capital da Argentina?",
    "choices": [
      "Montevidéu",
      "Assunção",
      "Santiago",
      "Buenos Aires"
    ],
    "answer": 3,
    "fact": "Buenos Aires é a capital da Argentina, país que faz fronteira com o Brasil.",
    "brazil": false
  },
  {
    "id": "mundo-24",
    "category": "mundo",
    "question": "Qual é a capital do Paraguai?",
    "choices": [
      "Lima",
      "Quito",
      "Assunção",
      "La Paz"
    ],
    "answer": 2,
    "fact": "Assunção é a capital do Paraguai. O país faz fronteira com Brasil, Argentina e Bolívia.",
    "brazil": false
  },
  {
    "id": "mundo-25",
    "category": "mundo",
    "question": "Qual destas cidades fica no Uruguai?",
    "choices": [
      "Mendoza",
      "Montevidéu",
      "Rosário",
      "Córdoba"
    ],
    "answer": 1,
    "fact": "Montevidéu é a capital do Uruguai, país vizinho do Brasil ao sul.",
    "brazil": false
  },
  {
    "id": "geopolitica-01",
    "category": "geopolitica",
    "question": "Qual órgão da ONU pode adotar resoluções obrigatórias sobre paz e segurança internacionais?",
    "choices": [
      "Conselho de Segurança",
      "UNESCO",
      "Corte Penal Internacional",
      "Conselho da Europa"
    ],
    "answer": 0,
    "fact": "O Conselho de Segurança é o órgão da ONU com responsabilidade primária pela paz e segurança internacionais.",
    "brazil": false,
    "tracks": [
      "geopolitica",
      "enem",
      "concursos"
    ],
    "difficulty": "medio",
    "source": {
      "title": "ONU · Carta e órgãos principais",
      "url": "https://www.un.org/en/about-us/un-charter"
    }
  },
  {
    "id": "geopolitica-02",
    "category": "geopolitica",
    "question": "O Artigo 5 do Tratado do Atlântico Norte está associado a qual princípio?",
    "choices": [
      "Livre circulação de mercadorias",
      "Defesa coletiva",
      "Moeda comum",
      "Neutralidade permanente"
    ],
    "answer": 1,
    "fact": "O Artigo 5 estabelece que um ataque armado contra um aliado pode ser considerado ataque contra todos.",
    "brazil": false,
    "tracks": [
      "geopolitica",
      "enem",
      "concursos"
    ],
    "difficulty": "medio",
    "source": {
      "title": "NATO · Collective defence and Article 5",
      "url": "https://www.nato.int/cps/en/natohq/topics_110496.htm"
    }
  },
  {
    "id": "geopolitica-03",
    "category": "geopolitica",
    "question": "Qual organização administra acordos multilaterais de comércio e oferece um sistema de solução de controvérsias comerciais?",
    "choices": [
      "OMS",
      "OIT",
      "WTO/OMC",
      "UNESCO"
    ],
    "answer": 2,
    "fact": "A Organização Mundial do Comércio trata de regras do comércio entre países e possui mecanismo de solução de controvérsias.",
    "brazil": false,
    "tracks": [
      "geopolitica",
      "enem",
      "concursos"
    ],
    "difficulty": "medio",
    "source": {
      "title": "WTO · What we do",
      "url": "https://www.wto.org/english/thewto_e/whatis_e/what_we_do_e.htm"
    }
  },
  {
    "id": "geopolitica-04",
    "category": "geopolitica",
    "question": "Uma função central do FMI é apoiar países com problemas de quê?",
    "choices": [
      "Patrimônio cultural",
      "Balanço de pagamentos e estabilidade macroeconômica",
      "Fronteiras municipais",
      "Registro de patentes nacionais"
    ],
    "answer": 1,
    "fact": "O FMI atua na cooperação monetária e pode oferecer financiamento a países com dificuldades externas e macroeconômicas.",
    "brazil": false,
    "tracks": [
      "geopolitica",
      "enem",
      "concursos"
    ],
    "difficulty": "medio",
    "source": {
      "title": "IMF · About the IMF",
      "url": "https://www.imf.org/en/About"
    }
  },
  {
    "id": "geopolitica-05",
    "category": "geopolitica",
    "question": "O Grupo Banco Mundial está associado principalmente a quê?",
    "choices": [
      "Cooperação para desenvolvimento e redução da pobreza",
      "Defesa militar coletiva",
      "Controle de rotas marítimas",
      "Organização de eleições nacionais"
    ],
    "answer": 0,
    "fact": "O Banco Mundial financia projetos e políticas voltados ao desenvolvimento e à redução da pobreza.",
    "brazil": false,
    "tracks": [
      "geopolitica",
      "enem",
      "concursos"
    ],
    "difficulty": "medio",
    "source": {
      "title": "World Bank · Who we are",
      "url": "https://www.worldbank.org/en/who-we-are"
    }
  },
  {
    "id": "geopolitica-06",
    "category": "geopolitica",
    "question": "O MERCOSUL foi criado com foco principal em quê?",
    "choices": [
      "Integração econômica regional",
      "Aliança militar atlântica",
      "União monetária mundial",
      "Controle da ONU"
    ],
    "answer": 0,
    "fact": "O MERCOSUL busca integração regional, com livre circulação de bens, serviços e fatores em seu projeto de mercado comum.",
    "brazil": false,
    "tracks": [
      "geopolitica",
      "enem",
      "concursos"
    ],
    "difficulty": "medio",
    "source": {
      "title": "MERCOSUL · O que é o MERCOSUL",
      "url": "https://www.mercosur.int/pt-br/quem-somos/em-poucas-palavras/"
    }
  },
  {
    "id": "geopolitica-07",
    "category": "geopolitica",
    "question": "Por que o Estreito de Ormuz é geopoliticamente importante?",
    "choices": [
      "Liga o Atlântico ao Pacífico",
      "É rota relevante para exportações de petróleo do Golfo Pérsico",
      "Separa Brasil e Argentina",
      "É a única entrada do Mar Báltico"
    ],
    "answer": 1,
    "fact": "O Estreito de Ormuz é uma passagem estratégica para fluxos de petróleo e gás do Golfo Pérsico.",
    "brazil": false,
    "tracks": [
      "geopolitica",
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "geopolitica-08",
    "category": "geopolitica",
    "question": "O Canal de Suez conecta diretamente quais mares?",
    "choices": [
      "Mediterrâneo e Vermelho",
      "Negro e Báltico",
      "Caribe e Pacífico",
      "Arábico e Cáspio"
    ],
    "answer": 0,
    "fact": "O Canal de Suez, no Egito, encurta a rota marítima entre Europa e Ásia ao ligar o Mediterrâneo ao Mar Vermelho.",
    "brazil": false,
    "tracks": [
      "geopolitica",
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "geopolitica-09",
    "category": "geopolitica",
    "question": "O Canal do Panamá conecta oceanos de quais lados do continente americano?",
    "choices": [
      "Ártico e Índico",
      "Atlântico e Pacífico",
      "Índico e Pacífico",
      "Atlântico e Ártico"
    ],
    "answer": 1,
    "fact": "O Canal do Panamá permite a travessia entre Atlântico e Pacífico sem contornar a América do Sul.",
    "brazil": false,
    "tracks": [
      "geopolitica",
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "geopolitica-10",
    "category": "geopolitica",
    "question": "A ASEAN reúne países de qual região?",
    "choices": [
      "Sudeste Asiático",
      "Europa Central",
      "África Austral",
      "América do Norte"
    ],
    "answer": 0,
    "fact": "A ASEAN é uma associação regional formada por países do Sudeste Asiático.",
    "brazil": false,
    "tracks": [
      "geopolitica",
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "geopolitica-11",
    "category": "geopolitica",
    "question": "A União Africana é uma organização de integração e cooperação de qual continente?",
    "choices": [
      "Europa",
      "África",
      "Ásia",
      "Oceania"
    ],
    "answer": 1,
    "fact": "A União Africana promove cooperação política e econômica entre Estados africanos.",
    "brazil": false,
    "tracks": [
      "geopolitica",
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "geopolitica-12",
    "category": "geopolitica",
    "question": "O G20 é principalmente um fórum de cooperação em qual área?",
    "choices": [
      "Econômica e financeira internacional",
      "Defesa nuclear coletiva",
      "Administração da Antártida",
      "Padronização de idiomas"
    ],
    "answer": 0,
    "fact": "O G20 reúne grandes economias para discutir coordenação econômica, financeira e temas globais relacionados.",
    "brazil": false,
    "tracks": [
      "geopolitica",
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "geopolitica-13",
    "category": "geopolitica",
    "question": "No Conselho de Segurança da ONU, o poder de veto pertence a quê?",
    "choices": [
      "A todos os membros da Assembleia Geral",
      "Aos cinco membros permanentes",
      "Somente ao secretário-geral",
      "A países do G20"
    ],
    "answer": 1,
    "fact": "Os cinco membros permanentes do Conselho de Segurança possuem poder de veto em decisões substantivas.",
    "brazil": false,
    "tracks": [
      "geopolitica",
      "enem",
      "concursos"
    ],
    "difficulty": "medio",
    "source": {
      "title": "ONU · Carta e órgãos principais",
      "url": "https://www.un.org/en/about-us/un-charter"
    }
  },
  {
    "id": "geopolitica-14",
    "category": "geopolitica",
    "question": "Pela Convenção da ONU sobre o Direito do Mar, a zona econômica exclusiva pode se estender, em regra, até quantas milhas náuticas?",
    "choices": [
      "12",
      "50",
      "200",
      "500"
    ],
    "answer": 2,
    "fact": "A ZEE pode se estender até 200 milhas náuticas a partir das linhas de base, sujeita às regras da Convenção.",
    "brazil": false,
    "tracks": [
      "geopolitica",
      "enem",
      "concursos"
    ],
    "difficulty": "medio",
    "source": {
      "title": "ONU · Convention on the Law of the Sea",
      "url": "https://www.un.org/depts/los/convention_agreements/texts/unclos/unclos_e.pdf"
    }
  },
  {
    "id": "geopolitica-15",
    "category": "geopolitica",
    "question": "O Estreito de Taiwan separa Taiwan de qual área continental?",
    "choices": [
      "Península Coreana",
      "China continental",
      "Japão",
      "Filipinas"
    ],
    "answer": 1,
    "fact": "O Estreito de Taiwan fica entre a ilha de Taiwan e a costa sudeste da China continental.",
    "brazil": false,
    "tracks": [
      "geopolitica",
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "geopolitica-16",
    "category": "geopolitica",
    "question": "O estreito de Bósforo fica em qual país?",
    "choices": [
      "Turquia",
      "Egito",
      "Espanha",
      "Índia"
    ],
    "answer": 0,
    "fact": "O Bósforo atravessa Istambul e conecta o Mar Negro ao Mar de Mármara.",
    "brazil": false,
    "tracks": [
      "geopolitica",
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "geopolitica-17",
    "category": "geopolitica",
    "question": "A OTAN foi fundada em qual contexto histórico?",
    "choices": [
      "Após a Segunda Guerra Mundial, em 1949",
      "Durante a Revolução Francesa",
      "Após a Guerra Fria, em 2001",
      "Durante a Primeira Guerra Mundial, em 1914"
    ],
    "answer": 0,
    "fact": "A OTAN foi criada em 1949, no início da Guerra Fria, como aliança de defesa coletiva.",
    "brazil": false,
    "tracks": [
      "geopolitica",
      "enem",
      "concursos"
    ],
    "difficulty": "medio",
    "source": {
      "title": "NATO · Collective defence and Article 5",
      "url": "https://www.nato.int/cps/en/natohq/topics_110496.htm"
    }
  },
  {
    "id": "geopolitica-18",
    "category": "geopolitica",
    "question": "A Organização das Nações Unidas começou oficialmente suas atividades em que ano?",
    "choices": [
      "1919",
      "1945",
      "1961",
      "1989"
    ],
    "answer": 1,
    "fact": "A ONU entrou em existência em 24 de outubro de 1945, após a ratificação de sua Carta.",
    "brazil": false,
    "tracks": [
      "geopolitica",
      "enem",
      "concursos"
    ],
    "difficulty": "medio",
    "source": {
      "title": "ONU · Carta e órgãos principais",
      "url": "https://www.un.org/en/about-us/un-charter"
    }
  },
  {
    "id": "geopolitica-19",
    "category": "geopolitica",
    "question": "Em relações internacionais, “sanção econômica” é melhor descrita como quê?",
    "choices": [
      "Medida econômica usada para pressionar ou restringir um ator",
      "Tratado automático de paz",
      "Eleição supervisionada pela ONU",
      "Moeda comum regional"
    ],
    "answer": 0,
    "fact": "Sanções podem restringir comércio, finanças ou ativos como instrumento de política externa.",
    "brazil": false,
    "tracks": [
      "geopolitica",
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "geopolitica-20",
    "category": "geopolitica",
    "question": "O processo de descolonização do século XX refere-se principalmente a quê?",
    "choices": [
      "Expansão das colônias europeias",
      "Independência política de territórios colonizados",
      "Criação da internet",
      "Formação do euro"
    ],
    "answer": 1,
    "fact": "A descolonização marcou a independência de numerosos territórios antes submetidos a potências coloniais.",
    "brazil": false,
    "tracks": [
      "geopolitica",
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "constituicao-01",
    "category": "constituicao",
    "question": "Em que ano foi promulgada a atual Constituição Federal brasileira?",
    "choices": [
      "1967",
      "1988",
      "1994",
      "2002"
    ],
    "answer": 1,
    "fact": "A promulgação ocorreu no contexto da redemocratização e da ampliação de direitos e garantias fundamentais.",
    "brazil": true,
    "tracks": [
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "Planalto · Constituição Federal de 1988",
      "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
    }
  },
  {
    "id": "constituicao-02",
    "category": "constituicao",
    "question": "Segundo a Constituição, quais são os Poderes da União?",
    "choices": [
      "Executivo, Legislativo e Judiciário",
      "Federal, Estadual e Municipal",
      "Civil, Militar e Eleitoral",
      "Presidência, Congresso e Ministério Público"
    ],
    "answer": 0,
    "fact": "O art. 2º estabelece Legislativo, Executivo e Judiciário como Poderes da União, independentes e harmônicos entre si.",
    "brazil": true,
    "tracks": [
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "Planalto · Constituição Federal de 1988",
      "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
    }
  },
  {
    "id": "constituicao-03",
    "category": "constituicao",
    "question": "Qual destes é um fundamento da República Federativa do Brasil?",
    "choices": [
      "Cidadania",
      "Censura prévia",
      "Partido único",
      "Voto censitário"
    ],
    "answer": 0,
    "fact": "A cidadania aparece entre os fundamentos da República no art. 1º da Constituição.",
    "brazil": true,
    "tracks": [
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "Planalto · Constituição Federal de 1988",
      "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
    }
  },
  {
    "id": "constituicao-04",
    "category": "constituicao",
    "question": "Qual remédio constitucional protege a liberdade de locomoção contra ilegalidade ou abuso de poder?",
    "choices": [
      "Habeas corpus",
      "Mandado de injunção",
      "Ação popular",
      "Habeas data"
    ],
    "answer": 0,
    "fact": "O habeas corpus protege a liberdade de locomoção quando ameaçada ou restringida ilegalmente.",
    "brazil": true,
    "tracks": [
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "Planalto · Constituição Federal de 1988",
      "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
    }
  },
  {
    "id": "constituicao-05",
    "category": "constituicao",
    "question": "Qual instrumento constitucional permite conhecer ou retificar dados pessoais em registros governamentais ou de caráter público?",
    "choices": [
      "Habeas data",
      "Habeas corpus",
      "Ação civil pública",
      "Mandado de prisão"
    ],
    "answer": 0,
    "fact": "O habeas data é destinado ao conhecimento e à retificação de informações relativas à pessoa do impetrante.",
    "brazil": true,
    "tracks": [
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "Planalto · Constituição Federal de 1988",
      "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
    }
  },
  {
    "id": "constituicao-06",
    "category": "constituicao",
    "question": "Qual princípio da Administração Pública está explicitamente no art. 37 da Constituição?",
    "choices": [
      "Publicidade",
      "Sigilo como regra",
      "Herança de cargo",
      "Partidarização"
    ],
    "answer": 0,
    "fact": "Legalidade, impessoalidade, moralidade, publicidade e eficiência estão expressamente no caput do art. 37.",
    "brazil": true,
    "tracks": [
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "Planalto · Constituição Federal de 1988",
      "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
    }
  },
  {
    "id": "constituicao-07",
    "category": "constituicao",
    "question": "Em regra, a investidura em cargo ou emprego público depende de quê?",
    "choices": [
      "Concurso público",
      "Indicação familiar",
      "Sorteio nacional",
      "Filiação partidária"
    ],
    "answer": 0,
    "fact": "A Constituição prevê concurso público como regra para investidura em cargo ou emprego público, ressalvadas exceções constitucionais.",
    "brazil": true,
    "tracks": [
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "Planalto · Constituição Federal de 1988",
      "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
    }
  },
  {
    "id": "constituicao-08",
    "category": "constituicao",
    "question": "Qual ente integra a organização político-administrativa brasileira?",
    "choices": [
      "Município",
      "Distrito empresarial",
      "Comarca",
      "Zona eleitoral"
    ],
    "answer": 0,
    "fact": "União, Estados, Distrito Federal e Municípios compõem a organização político-administrativa da República.",
    "brazil": true,
    "tracks": [
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "Planalto · Constituição Federal de 1988",
      "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
    }
  },
  {
    "id": "constituicao-09",
    "category": "constituicao",
    "question": "O Ministério Público integra formalmente qual dos três Poderes?",
    "choices": [
      "Nenhum deles",
      "Executivo",
      "Legislativo",
      "Judiciário"
    ],
    "answer": 0,
    "fact": "O Ministério Público é instituição permanente e autônoma, não integrante de nenhum dos três Poderes.",
    "brazil": true,
    "tracks": [
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "Planalto · Constituição Federal de 1988",
      "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
    }
  },
  {
    "id": "constituicao-10",
    "category": "constituicao",
    "question": "O Tribunal de Contas da União auxilia principalmente qual Poder no controle externo?",
    "choices": [
      "Legislativo",
      "Executivo",
      "Judiciário",
      "Moderador"
    ],
    "answer": 0,
    "fact": "O controle externo é exercido pelo Congresso Nacional com o auxílio do TCU.",
    "brazil": true,
    "tracks": [
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "Planalto · Constituição Federal de 1988",
      "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
    }
  },
  {
    "id": "constituicao-11",
    "category": "constituicao",
    "question": "O voto é facultativo no Brasil para qual grupo, entre outros previstos na Constituição?",
    "choices": [
      "Maiores de 70 anos",
      "Pessoas de 30 a 40 anos",
      "Servidores públicos",
      "Graduados universitários"
    ],
    "answer": 0,
    "fact": "A Constituição torna facultativo o voto para analfabetos, maiores de 70 anos e jovens de 16 e 17 anos.",
    "brazil": true,
    "tracks": [
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "Planalto · Constituição Federal de 1988",
      "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
    }
  },
  {
    "id": "constituicao-12",
    "category": "constituicao",
    "question": "A idade mínima constitucional para ser Presidente da República é de quantos anos?",
    "choices": [
      "21",
      "25",
      "30",
      "35"
    ],
    "answer": 3,
    "fact": "A Constituição exige 35 anos para Presidente e Vice-Presidente da República.",
    "brazil": true,
    "tracks": [
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "Planalto · Constituição Federal de 1988",
      "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
    }
  },
  {
    "id": "constituicao-13",
    "category": "constituicao",
    "question": "Qual órgão exerce a função de guarda da Constituição no topo do Judiciário brasileiro?",
    "choices": [
      "STF",
      "TCU",
      "TSE",
      "CNJ"
    ],
    "answer": 0,
    "fact": "Compete precipuamente ao Supremo Tribunal Federal a guarda da Constituição.",
    "brazil": true,
    "tracks": [
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "Planalto · Constituição Federal de 1988",
      "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
    }
  },
  {
    "id": "constituicao-14",
    "category": "constituicao",
    "question": "A liberdade de expressão na Constituição brasileira convive com qual regra?",
    "choices": [
      "É vedado o anonimato",
      "É obrigatória licença prévia do governo",
      "Só existe para servidores",
      "Depende de autorização judicial prévia"
    ],
    "answer": 0,
    "fact": "A manifestação do pensamento é livre, mas a Constituição veda o anonimato.",
    "brazil": true,
    "tracks": [
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "Planalto · Constituição Federal de 1988",
      "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
    }
  },
  {
    "id": "constituicao-15",
    "category": "constituicao",
    "question": "A casa é considerada asilo inviolável do indivíduo, mas uma das exceções constitucionais de entrada sem consentimento é qual?",
    "choices": [
      "Flagrante delito",
      "Cobrança tributária comum",
      "Pesquisa estatística",
      "Visita administrativa rotineira"
    ],
    "answer": 0,
    "fact": "A Constituição admite ingresso sem consentimento em flagrante delito, desastre, para prestar socorro e, durante o dia, por determinação judicial.",
    "brazil": true,
    "tracks": [
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "Planalto · Constituição Federal de 1988",
      "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
    }
  },
  {
    "id": "constituicao-16",
    "category": "constituicao",
    "question": "Qual direito social está expressamente previsto na Constituição?",
    "choices": [
      "Educação",
      "Censura",
      "Título de nobreza",
      "Voto censitário"
    ],
    "answer": 0,
    "fact": "A educação integra o rol constitucional de direitos sociais.",
    "brazil": true,
    "tracks": [
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "Planalto · Constituição Federal de 1988",
      "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
    }
  },
  {
    "id": "constituicao-17",
    "category": "constituicao",
    "question": "A República Federativa do Brasil é formada pela união indissolúvel de quê?",
    "choices": [
      "Estados, Municípios e Distrito Federal",
      "Somente Estados",
      "União e comarcas",
      "Municípios e regiões metropolitanas"
    ],
    "answer": 0,
    "fact": "O art. 1º define a República como união indissolúvel dos Estados e Municípios e do Distrito Federal.",
    "brazil": true,
    "tracks": [
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "Planalto · Constituição Federal de 1988",
      "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
    }
  },
  {
    "id": "constituicao-18",
    "category": "constituicao",
    "question": "Qual é a duração do mandato do Presidente da República segundo a Constituição vigente?",
    "choices": [
      "2 anos",
      "4 anos",
      "5 anos",
      "6 anos"
    ],
    "answer": 1,
    "fact": "O mandato presidencial é de quatro anos, observadas as regras constitucionais de eleição e reeleição.",
    "brazil": true,
    "tracks": [
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "Planalto · Constituição Federal de 1988",
      "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
    }
  },
  {
    "id": "constituicao-19",
    "category": "constituicao",
    "question": "Quem elabora leis federais no exercício da função legislativa típica?",
    "choices": [
      "Congresso Nacional",
      "Banco Central",
      "STF sozinho",
      "Tribunal de Contas da União"
    ],
    "answer": 0,
    "fact": "O Poder Legislativo federal é exercido pelo Congresso Nacional, composto pela Câmara dos Deputados e pelo Senado Federal.",
    "brazil": true,
    "tracks": [
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "Planalto · Constituição Federal de 1988",
      "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
    }
  },
  {
    "id": "constituicao-20",
    "category": "constituicao",
    "question": "A ação popular pode ser proposta por quem, nos termos constitucionais?",
    "choices": [
      "Cidadão",
      "Somente Presidente da República",
      "Somente partido político",
      "Somente Ministério Público"
    ],
    "answer": 0,
    "fact": "A Constituição assegura a qualquer cidadão a ação popular para anular atos lesivos nas hipóteses previstas.",
    "brazil": true,
    "tracks": [
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "Planalto · Constituição Federal de 1988",
      "url": "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
    }
  },
  {
    "id": "portugues-01",
    "category": "portugues",
    "question": "Em “Faz dois anos que estudo para a prova”, o verbo “fazer” está empregado corretamente por quê?",
    "choices": [
      "É impessoal ao indicar tempo decorrido",
      "Concorda com “anos”",
      "Está no infinitivo",
      "É verbo de ligação"
    ],
    "answer": 0,
    "fact": "Quando “fazer” indica tempo decorrido, é impessoal e permanece na terceira pessoa do singular.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "portugues-02",
    "category": "portugues",
    "question": "Qual frase usa corretamente “há” para indicar tempo passado?",
    "choices": [
      "Há três meses comecei o curso.",
      "A três meses comecei o curso.",
      "Daqui há três meses viajarei.",
      "Há três meses atrás comecei o curso."
    ],
    "answer": 0,
    "fact": "Para tempo decorrido, usa-se “há”. A expressão “há ... atrás” é redundante.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "portugues-03",
    "category": "portugues",
    "question": "Qual alternativa emprega corretamente “aonde”?",
    "choices": [
      "Aonde você vai?",
      "Aonde você mora?",
      "Aonde fica a escola?",
      "Aonde está o livro?"
    ],
    "answer": 0,
    "fact": "“Aonde” é usado com verbos que indicam movimento e regem a preposição “a”, como “ir”.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "portugues-04",
    "category": "portugues",
    "question": "Qual frase apresenta crase obrigatória?",
    "choices": [
      "Vou à escola pela manhã.",
      "Entreguei o livro a Pedro.",
      "Começou a chover.",
      "Viajei a Brasília."
    ],
    "answer": 0,
    "fact": "Em “à escola”, ocorre a fusão da preposição “a” com o artigo feminino “a”.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "portugues-05",
    "category": "portugues",
    "question": "Em qual opção “porque” funciona como conjunção explicativa ou causal?",
    "choices": [
      "Não fui porque estava doente.",
      "Por que você faltou?",
      "Você faltou por quê?",
      "Ninguém explicou o porquê."
    ],
    "answer": 0,
    "fact": "“Porque” junto e sem acento pode introduzir explicação ou causa.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "portugues-06",
    "category": "portugues",
    "question": "Qual frase está de acordo com a concordância padrão?",
    "choices": [
      "Faltam duas páginas.",
      "Falta duas páginas.",
      "Houveram problemas.",
      "Fazem cinco dias."
    ],
    "answer": 0,
    "fact": "O verbo “faltar” concorda com o sujeito “duas páginas”.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "portugues-07",
    "category": "portugues",
    "question": "Em “Os candidatos, nervosos, aguardavam o resultado”, as vírgulas isolam quê?",
    "choices": [
      "Um termo explicativo",
      "O sujeito obrigatório",
      "O verbo principal",
      "Uma pergunta direta"
    ],
    "answer": 0,
    "fact": "“Nervosos” funciona como termo de valor explicativo/predicativo intercalado e é isolado por vírgulas.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "portugues-08",
    "category": "portugues",
    "question": "Qual frase evita a separação indevida entre sujeito e verbo por vírgula?",
    "choices": [
      "Os alunos da turma chegaram cedo.",
      "Os alunos da turma, chegaram cedo.",
      "Os alunos, da turma chegaram cedo.",
      "Os, alunos da turma chegaram cedo."
    ],
    "answer": 0,
    "fact": "Em regra, não se separa por vírgula o sujeito de seu verbo.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "portugues-09",
    "category": "portugues",
    "question": "Qual palavra é sinônimo mais adequado de “mitigar”?",
    "choices": [
      "Atenuar",
      "Aumentar",
      "Esconder",
      "Dividir"
    ],
    "answer": 0,
    "fact": "“Mitigar” significa tornar menos intenso, aliviar ou atenuar.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "portugues-10",
    "category": "portugues",
    "question": "Na frase “O vento sussurrava entre as árvores”, ocorre qual figura de linguagem?",
    "choices": [
      "Personificação",
      "Eufemismo",
      "Hipérbole",
      "Antítese"
    ],
    "answer": 0,
    "fact": "Atribuir ao vento a ação humana de sussurrar caracteriza personificação.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "portugues-11",
    "category": "portugues",
    "question": "Qual alternativa usa “mas” corretamente?",
    "choices": [
      "Estudou, mas não revisou.",
      "Queria mais desistiu.",
      "Mas alunos chegaram.",
      "Ele é mas rápido."
    ],
    "answer": 0,
    "fact": "“Mas” é conjunção adversativa; “mais” indica quantidade ou intensidade.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "portugues-12",
    "category": "portugues",
    "question": "Qual forma completa corretamente: “Não sei ___ ele saiu cedo.”?",
    "choices": [
      "por que",
      "porque",
      "porquê",
      "por quê"
    ],
    "answer": 0,
    "fact": "Em pergunta indireta, usa-se “por que” separado.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "portugues-13",
    "category": "portugues",
    "question": "Qual palavra está grafada corretamente?",
    "choices": [
      "Exceção",
      "Excessão",
      "Excesssão",
      "Eseção"
    ],
    "answer": 0,
    "fact": "“Exceção” é a grafia padrão.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "portugues-14",
    "category": "portugues",
    "question": "Em “Precisa-se de servidores”, o “se” indica quê?",
    "choices": [
      "Índice de indeterminação do sujeito",
      "Pronome reflexivo",
      "Conjunção causal",
      "Artigo definido"
    ],
    "answer": 0,
    "fact": "Com verbo transitivo indireto, “se” pode indeterminar o sujeito, como em “precisa-se de servidores”.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "portugues-15",
    "category": "portugues",
    "question": "Qual frase usa corretamente o pronome relativo “cujo”?",
    "choices": [
      "O autor cujo livro venceu o prêmio chegou.",
      "O autor cujo o livro venceu chegou.",
      "O autor que cujo livro venceu chegou.",
      "O autor cujo venceu o livro chegou."
    ],
    "answer": 0,
    "fact": "“Cujo” estabelece relação de posse e não admite artigo imediatamente depois.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "portugues-16",
    "category": "portugues",
    "question": "Qual alternativa apresenta linguagem denotativa?",
    "choices": [
      "A água ferve a 100 °C ao nível do mar, aproximadamente.",
      "Meu coração é um deserto.",
      "A cidade acordou triste.",
      "Ele explodiu de alegria."
    ],
    "answer": 0,
    "fact": "A linguagem denotativa busca sentido literal e objetivo.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "portugues-17",
    "category": "portugues",
    "question": "Em “Embora estivesse cansada, continuou estudando”, “embora” exprime quê?",
    "choices": [
      "Concessão",
      "Causa",
      "Conclusão",
      "Finalidade"
    ],
    "answer": 0,
    "fact": "“Embora” introduz ideia concessiva: algo ocorre apesar de uma circunstância contrária.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "portugues-18",
    "category": "portugues",
    "question": "Qual alternativa usa corretamente “sessão”?",
    "choices": [
      "A sessão do cinema começa às oito.",
      "A seção de direitos foi cedida.",
      "A cessão eleitoral terminou.",
      "A sessão do documento é a terceira."
    ],
    "answer": 0,
    "fact": "“Sessão” é período de reunião, espetáculo ou atividade; “seção” é divisão; “cessão” é ato de ceder.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "portugues-19",
    "category": "portugues",
    "question": "Qual frase apresenta concordância nominal adequada?",
    "choices": [
      "Seguem anexos os documentos.",
      "Segue anexo as documentos.",
      "Seguem anexo o documentos.",
      "Segue anexas os documento."
    ],
    "answer": 0,
    "fact": "“Anexos” concorda com “documentos” no plural masculino.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "portugues-20",
    "category": "portugues",
    "question": "Em um texto argumentativo, a tese é o quê?",
    "choices": [
      "A ideia central defendida pelo autor",
      "A lista de referências",
      "A assinatura do leitor",
      "Um dado obrigatoriamente numérico"
    ],
    "answer": 0,
    "fact": "A tese é a posição central que o texto procura sustentar com argumentos.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "economia-01",
    "category": "economia",
    "question": "O que mede o IPCA no Brasil?",
    "choices": [
      "A variação de preços ao consumidor em uma cesta de bens e serviços",
      "Apenas o preço do dólar",
      "Somente salários do setor público",
      "O volume de exportações"
    ],
    "answer": 0,
    "fact": "O IPCA é o índice oficial de inflação ao consumidor usado no sistema de metas de inflação.",
    "brazil": true,
    "tracks": [
      "enem",
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "IBGE · Indicadores",
      "url": "https://www.ibge.gov.br/indicadores.html"
    }
  },
  {
    "id": "economia-02",
    "category": "economia",
    "question": "A taxa Selic é melhor descrita como quê?",
    "choices": [
      "Taxa básica de juros da economia brasileira",
      "Imposto sobre exportações",
      "Índice de desemprego",
      "Cotação oficial do euro"
    ],
    "answer": 0,
    "fact": "A Selic é a taxa básica de juros e influencia diversas taxas de crédito e investimento no país.",
    "brazil": true,
    "tracks": [
      "enem",
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "Banco Central do Brasil · Cidadania Financeira",
      "url": "https://www.bcb.gov.br/cidadaniafinanceira"
    }
  },
  {
    "id": "economia-03",
    "category": "economia",
    "question": "O PIB procura medir principalmente o quê?",
    "choices": [
      "O valor dos bens e serviços finais produzidos em um território em certo período",
      "A riqueza financeira de cada família",
      "A quantidade de moeda em circulação apenas",
      "O saldo de cada conta bancária"
    ],
    "answer": 0,
    "fact": "O Produto Interno Bruto mede o valor da produção final de bens e serviços de uma economia em determinado período.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "IBGE · Indicadores",
      "url": "https://www.ibge.gov.br/indicadores.html"
    }
  },
  {
    "id": "economia-04",
    "category": "economia",
    "question": "Quando há inflação, o que tende a acontecer com o poder de compra de uma mesma quantia de dinheiro, se a renda não acompanhar os preços?",
    "choices": [
      "Diminui",
      "Aumenta automaticamente",
      "Fica sempre idêntico",
      "Dobra"
    ],
    "answer": 0,
    "fact": "Se os preços sobem mais que a renda, a mesma quantia compra menos bens e serviços.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "Banco Central do Brasil · Cidadania Financeira",
      "url": "https://www.bcb.gov.br/cidadaniafinanceira"
    }
  },
  {
    "id": "economia-05",
    "category": "economia",
    "question": "Qual instituição define a meta da taxa Selic por meio do Copom?",
    "choices": [
      "Banco Central do Brasil",
      "IBGE",
      "Tesouro Nacional sozinho",
      "BNDES"
    ],
    "answer": 0,
    "fact": "O Comitê de Política Monetária do Banco Central define a meta para a Selic.",
    "brazil": true,
    "tracks": [
      "enem",
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "Banco Central do Brasil · Cidadania Financeira",
      "url": "https://www.bcb.gov.br/cidadaniafinanceira"
    }
  },
  {
    "id": "economia-06",
    "category": "economia",
    "question": "O que é taxa de câmbio?",
    "choices": [
      "Preço de uma moeda em relação a outra",
      "Taxa de natalidade",
      "Imposto sobre renda",
      "Quantidade de empregos formais"
    ],
    "answer": 0,
    "fact": "A taxa de câmbio expressa a relação de valor entre moedas.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "Banco Central do Brasil · Cidadania Financeira",
      "url": "https://www.bcb.gov.br/cidadaniafinanceira"
    }
  },
  {
    "id": "economia-07",
    "category": "economia",
    "question": "Uma balança comercial é superavitária quando quê?",
    "choices": [
      "Exportações superam importações em valor",
      "Importações superam exportações em valor",
      "Não há comércio exterior",
      "O governo não cobra impostos"
    ],
    "answer": 0,
    "fact": "Há superávit comercial quando o valor exportado supera o importado.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos",
      "brasil"
    ],
    "difficulty": "medio"
  },
  {
    "id": "economia-08",
    "category": "economia",
    "question": "Em economia, custo de oportunidade é quê?",
    "choices": [
      "O valor da melhor alternativa abandonada ao fazer uma escolha",
      "Um imposto municipal",
      "A soma de todas as dívidas",
      "A inflação acumulada"
    ],
    "answer": 0,
    "fact": "Escolher uma opção implica renunciar a alternativas; o custo de oportunidade destaca a melhor alternativa sacrificada.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos",
      "brasil"
    ],
    "difficulty": "medio"
  },
  {
    "id": "economia-09",
    "category": "economia",
    "question": "Se a demanda por um produto aumenta e a oferta permanece igual, o que tende a ocorrer com o preço, mantendo os demais fatores constantes?",
    "choices": [
      "Tende a subir",
      "Tende a zerar",
      "Obrigatoriamente cai",
      "Não pode variar"
    ],
    "answer": 0,
    "fact": "Com maior demanda e oferta constante, há pressão de alta sobre o preço no modelo básico de oferta e demanda.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos",
      "brasil"
    ],
    "difficulty": "medio"
  },
  {
    "id": "economia-10",
    "category": "economia",
    "question": "Juros compostos significam que quê?",
    "choices": [
      "Os juros de cada período incidem também sobre juros acumulados",
      "Os juros nunca mudam o saldo",
      "Só existe cobrança no primeiro mês",
      "O principal é ignorado"
    ],
    "answer": 0,
    "fact": "Nos juros compostos, o saldo acumulado vira base para o cálculo do período seguinte.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos",
      "brasil"
    ],
    "difficulty": "medio"
  },
  {
    "id": "economia-11",
    "category": "economia",
    "question": "Produtividade do trabalho relaciona, em termos gerais, quê?",
    "choices": [
      "Produção obtida e quantidade de trabalho utilizada",
      "Número de feriados e inflação",
      "Câmbio e temperatura",
      "População e área territorial apenas"
    ],
    "answer": 0,
    "fact": "Produtividade mede quanto produto é gerado por unidade de insumo, como hora de trabalho.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos",
      "brasil"
    ],
    "difficulty": "medio"
  },
  {
    "id": "economia-12",
    "category": "economia",
    "question": "O desemprego medido em pesquisas de trabalho considera pessoas sem ocupação que, em geral, quê?",
    "choices": [
      "Procuraram trabalho e estavam disponíveis para trabalhar",
      "Nunca quiseram trabalhar",
      "Estão sempre aposentadas",
      "São obrigatoriamente estudantes"
    ],
    "answer": 0,
    "fact": "A condição de desemprego exige critérios de procura e disponibilidade, conforme metodologia estatística.",
    "brazil": true,
    "tracks": [
      "enem",
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "IBGE · Indicadores",
      "url": "https://www.ibge.gov.br/indicadores.html"
    }
  },
  {
    "id": "economia-13",
    "category": "economia",
    "question": "Um imposto progressivo é aquele em que, em termos gerais, quê?",
    "choices": [
      "A alíquota ou carga relativa aumenta com a base tributável segundo faixas",
      "A alíquota cai sempre para rendas maiores",
      "Não existe base de cálculo",
      "Todos pagam valor fixo idêntico"
    ],
    "answer": 0,
    "fact": "Progressividade faz a carga crescer conforme aumenta a base, segundo as regras do tributo.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos",
      "brasil"
    ],
    "difficulty": "medio"
  },
  {
    "id": "economia-14",
    "category": "economia",
    "question": "O que é dívida pública?",
    "choices": [
      "Obrigações financeiras assumidas pelo setor público",
      "Somente dívidas de famílias",
      "A soma dos preços dos alimentos",
      "O patrimônio das empresas estatais"
    ],
    "answer": 0,
    "fact": "Dívida pública é o conjunto de obrigações financeiras do governo decorrentes de financiamento e gestão fiscal.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos",
      "brasil"
    ],
    "difficulty": "medio"
  },
  {
    "id": "economia-15",
    "category": "economia",
    "question": "Qual efeito uma alta de juros tende a produzir sobre empréstimos, tudo o mais constante?",
    "choices": [
      "Tende a encarecer o crédito",
      "Torna todo crédito gratuito",
      "Elimina a inflação instantaneamente",
      "Impede qualquer poupança"
    ],
    "answer": 0,
    "fact": "Juros mais altos tendem a elevar o custo de financiamento, embora o efeito concreto dependa do mercado e do risco.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "Banco Central do Brasil · Cidadania Financeira",
      "url": "https://www.bcb.gov.br/cidadaniafinanceira"
    }
  },
  {
    "id": "economia-16",
    "category": "economia",
    "question": "O que significa renda real?",
    "choices": [
      "Renda ajustada pelo efeito dos preços",
      "Renda sem considerar inflação",
      "Apenas salário em dinheiro físico",
      "Somente rendimento de ações"
    ],
    "answer": 0,
    "fact": "Renda real procura expressar poder de compra, descontando o efeito da variação de preços.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos",
      "brasil"
    ],
    "difficulty": "medio"
  },
  {
    "id": "economia-17",
    "category": "economia",
    "question": "O que é deflação?",
    "choices": [
      "Queda generalizada do nível de preços por determinado período",
      "Alta generalizada de preços",
      "Aumento do PIB",
      "Desvalorização cambial obrigatória"
    ],
    "answer": 0,
    "fact": "Deflação é uma variação negativa generalizada de preços, distinta da simples queda de preço de um produto.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos",
      "brasil"
    ],
    "difficulty": "medio"
  },
  {
    "id": "economia-18",
    "category": "economia",
    "question": "Qual é uma função típica de um banco central?",
    "choices": [
      "Conduzir política monetária e zelar pelo funcionamento do sistema financeiro",
      "Construir rodovias municipais",
      "Administrar escolas estaduais",
      "Julgar ações penais"
    ],
    "answer": 0,
    "fact": "Bancos centrais exercem funções monetárias e de estabilidade do sistema financeiro.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "Banco Central do Brasil · Cidadania Financeira",
      "url": "https://www.bcb.gov.br/cidadaniafinanceira"
    }
  },
  {
    "id": "economia-19",
    "category": "economia",
    "question": "Quando uma moeda se desvaloriza frente ao dólar, um produto importado cotado em dólares tende a quê, tudo o mais constante?",
    "choices": [
      "Ficar mais caro em moeda local",
      "Ficar necessariamente grátis",
      "Custar menos dólares e menos reais ao mesmo tempo",
      "Não sofrer qualquer efeito"
    ],
    "answer": 0,
    "fact": "Se são necessários mais reais para comprar um dólar, o custo em reais de um item dolarizado tende a aumentar.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos",
      "brasil"
    ],
    "difficulty": "medio"
  },
  {
    "id": "economia-20",
    "category": "economia",
    "question": "O que é diversificação de investimentos?",
    "choices": [
      "Distribuir recursos entre diferentes ativos e riscos",
      "Colocar todo o dinheiro em um único ativo",
      "Evitar qualquer planejamento",
      "Gastar todo rendimento imediatamente"
    ],
    "answer": 0,
    "fact": "Diversificar reduz a dependência de um único ativo ou fonte de risco, embora não elimine perdas.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos",
      "brasil"
    ],
    "difficulty": "medio",
    "source": {
      "title": "Banco Central do Brasil · Cidadania Financeira",
      "url": "https://www.bcb.gov.br/cidadaniafinanceira"
    }
  },
  {
    "id": "raciocinio-01",
    "category": "raciocinio",
    "question": "Um produto de R$ 200 recebe desconto de 15%. Qual é o novo preço?",
    "choices": [
      "R$ 170",
      "R$ 175",
      "R$ 180",
      "R$ 185"
    ],
    "answer": 0,
    "fact": "15% de 200 é 30; 200 − 30 = 170.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "raciocinio-02",
    "category": "raciocinio",
    "question": "Se 3 cadernos custam R$ 45 no total e têm o mesmo preço, quanto custam 5 cadernos?",
    "choices": [
      "R$ 60",
      "R$ 70",
      "R$ 75",
      "R$ 90"
    ],
    "answer": 2,
    "fact": "Cada caderno custa 45 ÷ 3 = 15; cinco custam 5 × 15 = 75.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "raciocinio-03",
    "category": "raciocinio",
    "question": "Qual é a média aritmética de 6, 8, 10 e 12?",
    "choices": [
      "8",
      "9",
      "10",
      "11"
    ],
    "answer": 1,
    "fact": "A soma é 36 e 36 ÷ 4 = 9.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "raciocinio-04",
    "category": "raciocinio",
    "question": "Uma urna tem 3 bolas azuis e 2 vermelhas. Qual a probabilidade de retirar uma azul em um único sorteio?",
    "choices": [
      "2/5",
      "3/5",
      "1/2",
      "3/2"
    ],
    "answer": 1,
    "fact": "Há 3 resultados favoráveis em 5 bolas possíveis, logo a probabilidade é 3/5.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "raciocinio-05",
    "category": "raciocinio",
    "question": "Se uma população cresce 10% e depois cai 10%, ela volta exatamente ao valor inicial?",
    "choices": [
      "Não",
      "Sim",
      "Somente se for par",
      "Somente com inflação zero"
    ],
    "answer": 0,
    "fact": "Os percentuais incidem sobre bases diferentes: 100 vira 110 e depois 99.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "raciocinio-06",
    "category": "raciocinio",
    "question": "Qual número completa a sequência 2, 4, 8, 16, ...?",
    "choices": [
      "18",
      "24",
      "30",
      "32"
    ],
    "answer": 3,
    "fact": "Cada termo é o dobro do anterior, então 16 × 2 = 32.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "raciocinio-07",
    "category": "raciocinio",
    "question": "Se todos os A são B e nenhum B é C, o que necessariamente é verdadeiro?",
    "choices": [
      "Nenhum A é C",
      "Todo C é A",
      "Algum A é C",
      "Todo B é A"
    ],
    "answer": 0,
    "fact": "Como A está contido em B e B não possui elementos de C, A também não pode conter elementos de C.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "raciocinio-08",
    "category": "raciocinio",
    "question": "A negação de “Todos os candidatos chegaram cedo” é qual?",
    "choices": [
      "Pelo menos um candidato não chegou cedo",
      "Nenhum candidato chegou cedo",
      "Todos chegaram tarde",
      "Alguns chegaram cedo"
    ],
    "answer": 0,
    "fact": "Negar uma afirmação universal exige ao menos um contraexemplo.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "raciocinio-09",
    "category": "raciocinio",
    "question": "Quanto é 25% de 480?",
    "choices": [
      "96",
      "100",
      "120",
      "125"
    ],
    "answer": 2,
    "fact": "25% equivale a 1/4; 480 ÷ 4 = 120.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "raciocinio-10",
    "category": "raciocinio",
    "question": "Uma razão 2:5 equivale a qual fração?",
    "choices": [
      "2/5",
      "5/2",
      "3/5",
      "2/7"
    ],
    "answer": 0,
    "fact": "A razão 2 para 5 pode ser escrita como 2/5.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "raciocinio-11",
    "category": "raciocinio",
    "question": "Se x + 7 = 19, qual é o valor de x?",
    "choices": [
      "10",
      "11",
      "12",
      "13"
    ],
    "answer": 2,
    "fact": "Subtraindo 7 dos dois lados, x = 12.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "raciocinio-12",
    "category": "raciocinio",
    "question": "Um carro percorre 180 km em 3 horas com velocidade média constante. Qual a velocidade média?",
    "choices": [
      "50 km/h",
      "60 km/h",
      "70 km/h",
      "90 km/h"
    ],
    "answer": 1,
    "fact": "180 ÷ 3 = 60 km/h.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "raciocinio-13",
    "category": "raciocinio",
    "question": "Em uma turma de 40 pessoas, 30% faltaram. Quantas compareceram?",
    "choices": [
      "12",
      "18",
      "28",
      "30"
    ],
    "answer": 2,
    "fact": "30% de 40 é 12 faltas; 40 − 12 = 28 presentes.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "raciocinio-14",
    "category": "raciocinio",
    "question": "Qual é o próximo número da sequência 1, 1, 2, 3, 5, 8, ...?",
    "choices": [
      "10",
      "11",
      "12",
      "13"
    ],
    "answer": 3,
    "fact": "Cada termo é a soma dos dois anteriores: 5 + 8 = 13.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "raciocinio-15",
    "category": "raciocinio",
    "question": "Se P é verdadeira e Q é falsa, qual o valor lógico de “P e Q”?",
    "choices": [
      "Verdadeiro",
      "Falso",
      "Indeterminado",
      "Depende de R"
    ],
    "answer": 1,
    "fact": "Uma conjunção só é verdadeira quando ambas as proposições são verdadeiras.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "raciocinio-16",
    "category": "raciocinio",
    "question": "Qual é o mínimo múltiplo comum de 6 e 8?",
    "choices": [
      "12",
      "18",
      "24",
      "48"
    ],
    "answer": 2,
    "fact": "24 é o menor número positivo divisível por 6 e por 8.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "raciocinio-17",
    "category": "raciocinio",
    "question": "Uma prova tem 50 questões. Acertar 80% corresponde a quantos acertos?",
    "choices": [
      "35",
      "40",
      "45",
      "48"
    ],
    "answer": 1,
    "fact": "80% de 50 = 0,8 × 50 = 40.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "raciocinio-18",
    "category": "raciocinio",
    "question": "Se 4 trabalhadores fazem uma tarefa em 6 dias, mantendo produtividade igual, quantos dias 8 trabalhadores levariam?",
    "choices": [
      "2",
      "3",
      "6",
      "12"
    ],
    "answer": 1,
    "fact": "Dobrar o número de trabalhadores reduz pela metade o tempo: 6 ÷ 2 = 3 dias.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "raciocinio-19",
    "category": "raciocinio",
    "question": "Qual é o valor de 2³ × 2²?",
    "choices": [
      "16",
      "24",
      "32",
      "64"
    ],
    "answer": 2,
    "fact": "Potências de mesma base multiplicadas somam expoentes: 2^(3+2) = 2⁵ = 32.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  },
  {
    "id": "raciocinio-20",
    "category": "raciocinio",
    "question": "Um preço sobe de R$ 80 para R$ 100. Qual foi o aumento percentual?",
    "choices": [
      "20%",
      "25%",
      "30%",
      "40%"
    ],
    "answer": 1,
    "fact": "O aumento foi 20 sobre a base 80; 20/80 = 0,25 = 25%.",
    "brazil": false,
    "tracks": [
      "enem",
      "concursos"
    ],
    "difficulty": "medio"
  }
];

const legacyQuestions: Question[] = [...baseQuestions,...expandedQuestions];
export const generatedQuestions: Question[] = buildMassiveQuestions(legacyQuestions);
export const questions: Question[] = [...legacyQuestions,...authoredQuestions,...scenarioQuestions,...lessonQuestions,...sourcedCuriosityQuestions,...importedQuestions.filter(q=>q.kind!=='discover'),...generatedQuestions];
