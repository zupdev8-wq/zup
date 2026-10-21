import type {Question} from './types';
import {verifiedNatureQuestions} from './externalQuestions';
import {importedQuestions} from './importedQuestions';

/**
 * Acervo local mínimo e auditado.
 *
 * Regra desde 2026-10-21: o app não embute bancos massivos, paráfrases
 * automáticas nem questões sem fonte rastreável. Novos acervos entram pelo
 * backend via seed revisado. O conjunto abaixo existe apenas como fallback
 * antes da primeira sincronização.
 */
const baseQuestions: Question[] = 
[
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
  }
];

// Mantido como export compatível para ferramentas antigas; geração local foi desativada.
export const generatedQuestions: Question[] = [];

export const questions: Question[] = [
  ...baseQuestions,
  ...verifiedNatureQuestions,
  ...importedQuestions.filter(q=>q.kind!=='discover'),
];
