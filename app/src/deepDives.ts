import type {MicroLesson} from './types';

/** Aprofundamentos escritos para complementar, não repetir, a explicação breve. */
export const deepDivesByConcept:Record<string,NonNullable<MicroLesson['readMore']>>={
  'direito|Pessoa jurídica':{heading:'Além da definição: quando a separação importa',sections:[
    {title:'Como surge a personalidade',text:'No regime geral do Código Civil, a existência legal das pessoas jurídicas de direito privado começa com o registro do ato constitutivo no registro competente, observadas as exigências legais específicas. Isso é diferente do simples desejo de reunir pessoas para uma atividade.'},
    {title:'E quando se pode alcançar o patrimônio de um sócio?',text:'A desconsideração da personalidade jurídica é excepcional e depende dos requisitos legais aplicáveis, como abuso caracterizado por desvio de finalidade ou confusão patrimonial no regime do Código Civil. Ser sócio, por si só, não é o mesmo que responder por toda dívida da sociedade.'},
    {title:'Treine o raciocínio',text:'Em um enunciado, identifique separadamente: quem contratou, qual tipo de pessoa jurídica existe, qual patrimônio está sendo cobrado e se há fundamento legal para alcançar terceiros.'},
  ]},
  'direito|Princípio da legalidade administrativa':{heading:'Como a legalidade aparece na prática',sections:[
    {title:'Competência não é vontade pessoal',text:'Um agente não pode criar poderes para si apenas porque acredita ter boas intenções. Antes de praticar o ato, precisa identificar atribuição, finalidade pública e regras de procedimento.'},
    {title:'Legalidade e discricionariedade',text:'Quando a lei permite escolhas administrativas, elas continuam delimitadas por competência, finalidade e demais parâmetros jurídicos. Discricionariedade não equivale a liberdade para contrariar a norma.'},
  ]},
  'direito|Contraditório':{heading:'Participar não é só receber uma carta',sections:[
    {title:'Ciência e possibilidade de influência',text:'A parte precisa ter acesso, nas condições legalmente aplicáveis, aos elementos relevantes e uma oportunidade adequada de manifestar-se. Avisar depois de uma decisão irreversível pode não satisfazer a garantia.'},
    {title:'Como identificar em casos',text:'Observe se o procedimento admitiu contradizer documentos, fatos e argumentos decisivos. Em provas, compare contraditório com ampla defesa, sem presumir que sejam exatamente o mesmo conceito.'},
  ]},
  'direito|Ampla defesa':{heading:'Defesa efetiva tem regras',sections:[
    {title:'Meios de defesa',text:'Dependendo do procedimento, a garantia envolve alegações, documentos, provas admitidas e recursos nas hipóteses previstas no ordenamento. A amplitude da defesa não elimina exigências processuais.'},
    {title:'A defesa acontece no tempo certo',text:'Prazos e acesso aos autos importam. Uma oportunidade apenas formal, sem condições reais de exercício, pode comprometer a garantia.'},
  ]},
  'direito|Habeas corpus':{heading:'Como escolher a garantia certa',sections:[
    {title:'Objeto da proteção',text:'Pergunte qual liberdade está ameaçada. O habeas corpus se relaciona à locomoção; outras garantias constitucionais possuem finalidades diferentes.'},
    {title:'Preventivo e repressivo',text:'A modalidade preventiva busca evitar coação ilegal iminente; a liberatória procura cessar constrangimento já verificado. Os requisitos concretos dependem do caso.'},
  ]},
  'direito|Jurisprudência':{heading:'Decisão isolada não é regra automática',sections:[
    {title:'O que comparar entre julgados',text:'Considere quais fatos eram relevantes, qual questão jurídica foi decidida e quais fundamentos sustentaram o resultado. Isso ajuda a evitar generalizar um precedente fora do contexto.'},
    {title:'Vinculação e orientação',text:'O direito brasileiro prevê hipóteses específicas de observância obrigatória de certos pronunciamentos. Uma decisão individual não adquire esse efeito apenas por ter sido proferida por um tribunal.'},
  ]},
  'contabilidade|Ativo':{heading:'Como classificar sem confundir propriedade e controle',sections:[
    {title:'Um recurso precisa gerar benefício econômico',text:'Estoque pode gerar entrada de recursos pela venda; uma máquina pode contribuir para produção. Nem todo objeto utilizado por uma empresa atende automaticamente aos critérios para reconhecimento contábil.'},
    {title:'Compare balanços',text:'Ao ler um balanço, separe ativos circulantes, que normalmente se realizam no ciclo operacional ou no curto prazo, de ativos não circulantes, conforme os critérios aplicáveis.'},
  ]},
  'contabilidade|Passivo':{heading:'Uma obrigação existe antes de ser paga',sections:[
    {title:'Quando se reconhece',text:'O ponto de partida é uma obrigação presente resultante de evento passado, de acordo com o referencial contábil. A mera possibilidade de uma despesa futura não configura necessariamente um passivo reconhecível.'},
    {title:'O que a equação mostra',text:'Se a empresa toma um empréstimo e recebe o dinheiro, o ativo caixa pode aumentar ao mesmo tempo em que aumenta o passivo empréstimos a pagar. Não se deve confundir dinheiro recebido com lucro.'},
  ]},
  'contabilidade|Patrimônio líquido':{heading:'Entenda a fotografia patrimonial',sections:[
    {title:'Patrimônio líquido positivo não é saldo de caixa',text:'Uma empresa pode ter patrimônio líquido positivo, mas pouco dinheiro disponível porque seus recursos estão em estoque, instalações ou contas a receber.'},
    {title:'Mudanças no resultado',text:'Lucros, prejuízos e transações com proprietários podem alterar o patrimônio líquido; a classificação precisa respeitar as normas contábeis vigentes.'},
  ]},
  'contabilidade|Regime de competência':{heading:'Não confunda resultado e fluxo financeiro',sections:[
    {title:'Dois relatórios, perguntas diferentes',text:'A demonstração do resultado procura associar receitas e despesas ao período econômico; o fluxo de caixa acompanha pagamentos e recebimentos. É possível apresentar lucro e enfrentar falta momentânea de caixa.'},
    {title:'Teste com aluguel',text:'Se uma despesa de aluguel se refere a dezembro, mas será paga em janeiro, a competência considera o período ao qual ela pertence; a saída de caixa ocorre no pagamento.'},
  ]},
  'matematica|Média aritmética':{heading:'Por que média não explica tudo',sections:[
    {title:'A média é sensível a valores extremos',text:'Se quatro pessoas ganham R$ 2 mil e uma ganha R$ 12 mil, a renda média é R$ 4 mil, embora quatro das cinco recebam apenas metade disso.'},
    {title:'Medidas se complementam',text:'Mediana, moda e dispersão ajudam a interpretar a distribuição. Quando a prova pede valor típico, descubra se os dados são simétricos ou se há valores muito afastados.'},
  ]},
  'matematica|Mediana':{heading:'O que acontece quando os dados crescem',sections:[
    {title:'Posição antes de conta',text:'Em uma lista de oito números ordenados, a mediana usa as posições quatro e cinco. Não é necessário somar todos os oito valores.'},
    {title:'Comparação com a média',text:'Ao substituir o maior valor de uma lista por um número ainda maior, a média muda. A mediana pode permanecer igual, pois depende da posição central.'},
  ]},
  'matematica|Função':{heading:'Olhe para entradas, saídas e regras',sections:[
    {title:'Uma entrada, uma saída',text:'Saídas iguais para entradas diferentes são permitidas. Já a mesma entrada não pode produzir duas imagens diferentes na mesma função: esse é um teste útil em tabelas, gráficos e relações entre conjuntos.'},
    {title:'Domínio importa',text:'Na expressão 1/x, por exemplo, x=0 não pode estar no domínio usual real. Antes de manipular fórmulas, verifique quais valores são permitidos.'},
  ]},
  'biologia|DNA':{heading:'Da molécula à informação utilizada pela célula',sections:[
    {title:'Sequência de nucleotídeos',text:'A ordem das bases do DNA carrega informação genética. Genes são segmentos de DNA, mas a atividade celular também depende de regulação, contexto e interação entre moléculas.'},
    {title:'Expressão gênica',text:'Em muitos casos, a informação é transcrita em RNA e utilizada na síntese de proteínas. Nem toda sequência de DNA codifica proteínas, e diferentes células podem expressar conjuntos distintos de genes.'},
  ]},
  'biologia|Mitose':{heading:'O que muda ao longo do ciclo celular',sections:[
    {title:'Duplicação vem antes',text:'A replicação do DNA ocorre na fase S da intérfase. Na mitose, o material cromossômico previamente duplicado é separado para núcleos-filhos.'},
    {title:'Por que isso importa',text:'Falhas de controle do ciclo celular podem causar divisão desregulada. O estudo da mitose conecta biologia celular a desenvolvimento, renovação tecidual e oncologia.'},
  ]},
  'quimica|pH':{heading:'pH é uma escala logarítmica',sections:[
    {title:'Diferença de duas unidades',text:'Em condições ideais, uma solução de pH 3 possui concentração de H+ cerca de cem vezes a de uma solução de pH 5. Não são apenas “duas unidades” de concentração.'},
    {title:'Limitações das simplificações',text:'Em estudos avançados, pH se relaciona à atividade dos íons e depende do meio. Exercícios escolares normalmente usam aproximações de concentração para desenvolver o raciocínio.'},
  ]},
  'quimica|Mol':{heading:'Por que usamos uma unidade de contagem química',sections:[
    {title:'Da quantidade à massa',text:'Quantidade de matéria é medida em mol. A massa molar permite passar de mol para gramas: m=n×M; o resultado deve respeitar as unidades.'},
    {title:'Do mol às partículas',text:'Um mol corresponde exatamente a 6,02214076×10²³ entidades elementares. É essencial especificar se as entidades são átomos, moléculas, íons ou outras partículas.'},
  ]},
  'medicina|Anamnese':{heading:'Uma história bem colhida organiza hipóteses',sections:[
    {title:'Cronologia e contexto',text:'Início dos sintomas, evolução temporal, fatores associados, antecedentes e medicamentos em uso ajudam a formular hipóteses clínicas; nenhum item isolado substitui a avaliação.'},
    {title:'Sinais de alerta',text:'Mudança súbita, alteração de consciência, sintomas intensos ou comprometimento respiratório podem modificar a prioridade de atendimento. Essa análise pertence à avaliação profissional, não a um autodiagnóstico.'},
  ]},
  'medicina|Antibiótico':{heading:'Uso responsável e resistência',sections:[
    {title:'Espectro de ação',text:'Diferentes antibióticos atuam sobre alvos bacterianos distintos. A escolha clínica envolve provável agente, sítio da infecção, gravidade, histórico e padrões de resistência.'},
    {title:'Por que não serve para qualquer febre',text:'A febre pode ter causas infecciosas e não infecciosas; mesmo uma infecção viral pode provocar febre intensa. Usar antibiótico sem indicação não corrige automaticamente o problema.'},
  ]},
  'medicina|Débito cardíaco':{heading:'A mesma frequência pode esconder volumes diferentes',sections:[
    {title:'Fórmula e unidades',text:'Se a frequência é dada em batimentos por minuto e o volume sistólico em mililitros por batimento, o produto é mL/min. Para converter em L/min, divida por mil.'},
    {title:'Interpretação',text:'O débito resulta da interação entre frequência e volume sistólico; variações fisiológicas e patológicas podem alterar ambos. Uma medida isolada não define diagnóstico.'},
  ]},
  'revalida|Sepse':{heading:'Reconheça os elementos centrais do caso',sections:[
    {title:'Sinais que exigem atenção',text:'Em uma avaliação de suspeita de infecção, observe alterações de consciência, respiração, perfusão e outros indícios de comprometimento de órgãos. Ter ou não febre, isoladamente, não define a gravidade.'},
    {title:'O que uma prova pode trazer',text:'Os enunciados podem descrever alteração de consciência, perfusão, pressão arterial ou função de órgãos junto à suspeita de infecção. A abordagem real deve ocorrer rapidamente por equipe assistencial.'},
  ]},
  'enfermagem|Higienização das mãos':{heading:'Segurança depende do momento correto',sections:[
    {title:'Por que as luvas não bastam',text:'O profissional pode contaminar as mãos ao calçar ou retirar luvas e tocar superfícies. Higienizá-las nos momentos indicados interrompe parte das vias de transmissão.'},
    {title:'Escolha da técnica',text:'Preparação alcoólica é adequada em diversas situações; água e sabonete são necessários em outras, como quando as mãos estão visivelmente sujas. Siga protocolos institucionais.'},
  ]},
  'farmacia|Biodisponibilidade':{heading:'Dose administrada não é dose disponível',sections:[
    {title:'Vias fazem diferença',text:'Na administração intravenosa, a fração que chega à circulação sistêmica é considerada 100% por definição. Pela via oral, fatores de dissolução, absorção e metabolismo pré-sistêmico podem reduzi-la.'},
    {title:'Medidas farmacocinéticas',text:'Área sob a curva de concentração-tempo e concentração máxima são parâmetros analisados em estudos de exposição, juntamente com tempos de pico e outros fatores.'},
  ]},
  'farmacia|Farmacovigilância':{heading:'Da suspeita à avaliação de risco',sections:[
    {title:'Relato não prova causa',text:'Uma reação que ocorre após um medicamento pode ter outras explicações. A investigação considera temporalidade, dados clínicos, plausibilidade e demais evidências disponíveis.'},
    {title:'Por que os relatos são úteis',text:'Eventos raros podem não aparecer antes da ampla utilização de um produto. Sistemas de vigilância ajudam a identificar padrões que exigem investigação adicional.'},
  ]},
  'biomedicina|PCR':{heading:'Por que controle negativo e positivo importam',sections:[
    {title:'Como a amplificação funciona',text:'Ciclos de aquecimento e resfriamento permitem separar fitas, ligar iniciadores e estender novas cadeias, aumentando a quantidade do alvo de DNA.'},
    {title:'Interpretação responsável',text:'Controle negativo com amplificação inesperada indica possível contaminação. O resultado de PCR depende do alvo, dos controles e da qualidade da amostra, não apenas da presença de uma curva.'},
  ]},
  'computacao|Algoritmo':{heading:'Uma solução pode ser correta e ineficiente',sections:[
    {title:'Compare dois caminhos',text:'Para encontrar um elemento numa lista desordenada, pode ser necessário percorrê-la. Em uma lista ordenada, uma busca binária pode reduzir muito o número de comparações.'},
    {title:'Além da resposta correta',text:'Avalie uso de memória, tempo, comportamento para entradas extremas e capacidade de lidar com dados inválidos. Algoritmos são escolhas com compromissos.'},
  ]},
  'computacao|API':{heading:'Contrato, segurança e interoperabilidade',sections:[
    {title:'O contrato da interface',text:'Uma API especifica operações e formatos esperados, permitindo evoluir implementações internas sem alterar todos os consumidores quando o contrato é mantido.'},
    {title:'Permissão não é presumida',text:'Saber o endereço de uma API não significa poder executar qualquer operação. Autenticação, autorização, validação e limites de acesso continuam necessários.'},
  ]},
  'informatica|Phishing':{heading:'Sinais e decisões que reduzem risco',sections:[
    {title:'Verificação independente',text:'Em vez de tocar no link recebido, abra diretamente o aplicativo oficial ou digite o endereço conhecido no navegador. Mensagens e páginas podem imitar identidade visual de empresas.'},
    {title:'Outros formatos',text:'Phishing não ocorre só por e-mail: mensagens, ligações e códigos QR também podem tentar capturar credenciais ou induzir ações perigosas.'},
  ]},
  'administracao|Eficiência':{heading:'Eficiência e eficácia respondem perguntas diferentes',sections:[
    {title:'A meta foi atingida?',text:'Essa é uma questão de eficácia: o resultado planejado foi alcançado? Cumprir a meta não prova, por si, que os recursos foram bem utilizados.'},
    {title:'Quanto custou atingir?',text:'Essa é uma questão de eficiência: qual a relação entre entregas e insumos como tempo, pessoas e orçamento? Bons indicadores precisam considerar também qualidade e efeitos sobre os usuários.'},
  ]},
  'economia|Custo de oportunidade':{heading:'Toda escolha utiliza recursos escassos',sections:[
    {title:'O recurso pode ser tempo',text:'Uma hora usada em uma atividade não pode, ao mesmo tempo, ser dedicada a outra incompatível. O custo de oportunidade se refere ao benefício da melhor alternativa abandonada.'},
    {title:'Não é a soma de tudo',text:'Se há três alternativas, não se somam automaticamente os benefícios das duas não escolhidas. O parâmetro é a melhor oportunidade viável sacrificada.'},
  ]},
  'filosofia|Argumento válido':{heading:'Validade não garante que a premissa seja verdadeira',sections:[
    {title:'Um exemplo que revela a estrutura',text:'Considere: “Todas as árvores desse jardim são azuis; este ipê é uma árvore desse jardim; logo, ele é azul”. Mesmo que a primeira premissa seja falsa no mundo real, a conclusão decorre do que foi assumido. Separe a forma da veracidade das afirmações.'},
    {title:'Solidez',text:'Um argumento sólido é válido e tem premissas verdadeiras. Por isso, distinguir validade de verdade factual evita erros em questões de lógica e filosofia.'},
  ]},
  'filosofia|Estoicismo':{heading:'Controle, virtude e julgamento',sections:[
    {title:'O que depende de nós',text:'A tradição estoica enfatiza a diferença entre escolhas e julgamentos próprios e acontecimentos externos. A distinção orienta respostas mais conscientes a situações adversas.'},
    {title:'Não é ausência de emoção',text:'Reduzir estoicismo a “não sentir nada” simplifica a tradição. O foco está em examinar juízos e orientar a ação pela razão e pela virtude.'},
  ]},
  'psicologia|Memória de trabalho':{heading:'Por que dividir a atenção pode custar caro',sections:[
    {title:'Capacidade limitada',text:'A memória de trabalho sustenta informação relevante durante tarefas como calcular mentalmente ou acompanhar uma instrução. Demandas simultâneas podem aumentar a sobrecarga.'},
    {title:'Estratégias úteis',text:'Agrupar informações, anotar etapas intermediárias e reduzir distrações podem aliviar a carga. Isso não equivale a aumentar ilimitadamente a capacidade cognitiva.'},
  ]},
  'sociologia|Mobilidade social':{heading:'Mobilidade não é o mesmo que igualdade',sections:[
    {title:'Absoluta e relativa',text:'Mobilidade absoluta pode crescer quando profissões e escolaridade mudam na sociedade; mobilidade relativa examina em que medida a origem social influencia as chances de alcançar diferentes posições.'},
    {title:'O que pesquisar',text:'Compare indicadores de diferentes gerações e condições estruturais como educação, renda e oportunidades, sem atribuir trajetórias individuais a uma causa única.'},
  ]},
  'midia|Correlação não implica causalidade':{heading:'Três perguntas antes de concluir',sections:[
    {title:'Há outra variável?',text:'Temperatura pode aumentar tanto a venda de sorvetes quanto a frequência de banhos de mar, produzindo uma associação sem que um fator cause diretamente o outro.'},
    {title:'Há ordem temporal e mecanismo?',text:'Para investigar causalidade, é preciso avaliar como os fenômenos se relacionam, se a causa antecede o efeito e que outras explicações são plausíveis.'},
  ]},
  'cinema|Montagem':{heading:'Sentido nasce da relação entre imagens',sections:[
    {title:'O plano muda de significado',text:'Um rosto neutro pode parecer triste ou faminto dependendo da imagem apresentada logo depois. O espectador relaciona informações entre planos.'},
    {title:'Ritmo e continuidade',text:'A duração dos planos e a organização dos cortes interferem em ritmo, expectativa e percepção do espaço e do tempo narrativo.'},
  ]},
  'cidadania|Saneamento desigual':{heading:'A rede é só parte do sistema',sections:[
    {title:'Coleta não basta',text:'Canalizar esgoto sem tratamento adequado pode apenas transferir a contaminação para outro lugar. É necessário considerar coleta, transporte, tratamento e destino ambientalmente apropriado.'},
    {title:'Soluções dependem do território',text:'Em áreas densas ou íngremes, obras podem exigir soluções locais adaptadas, manutenção e participação comunitária. O indicador de cobertura precisa olhar a qualidade do serviço entregue.'},
  ]},
  'geografia|Conurbação':{heading:'Onde uma cidade termina e outra começa?',sections:[
    {title:'Tecido urbano contínuo',text:'Municípios vizinhos podem manter governos diferentes enquanto seus bairros se conectam fisicamente. A continuidade construída é distinta das fronteiras político-administrativas.'},
    {title:'Problemas compartilhados',text:'Transporte, saneamento, habitação e drenagem exigem coordenação além das divisões municipais quando a vida cotidiana atravessa limites administrativos.'},
  ]},
  'historia|Fonte primária':{heading:'Documentos têm autores e interesses',sections:[
    {title:'Perguntas ao documento',text:'Quem produziu a fonte? Para quem? Em qual circunstância? O que tinha a ganhar ou perder? Essas questões ajudam a interpretá-la com rigor.'},
    {title:'Cruzar evidências',text:'Uma carta, uma fotografia e uma notícia podem registrar aspectos distintos do mesmo acontecimento. A comparação ajuda a identificar lacunas e contradições.'},
  ]},
  'brasil|Acre':{heading:'Como o território passou ao Brasil',sections:[
    {title:'Economia da borracha',text:'O crescimento da extração de látex intensificou fluxos migratórios e disputas de controle da região amazônica no fim do século XIX e início do XX.'},
    {title:'Tratado de Petrópolis',text:'O acordo de 1903 com a Bolívia estabeleceu a incorporação do território do Acre ao Brasil, com compensações e compromissos diplomáticos.'},
  ]},
  'natureza|Serviço ecossistêmico':{heading:'Benefícios da natureza nem sempre aparecem no preço',sections:[
    {title:'Regulação natural',text:'Manguezais e áreas úmidas podem amortecer eventos de inundação, abrigar espécies e participar de ciclos de nutrientes. Perder essas funções pode gerar custos para comunidades.'},
    {title:'Uso e conservação',text:'Proteger ecossistemas e reduzir impactos exige considerar comunidades, mudanças no uso do solo e capacidade de recuperação dos ambientes.'},
  ]},
  'ciencia|Reprodutibilidade':{heading:'Como resultados ganham confiança',sections:[
    {title:'Detalhes importam',text:'Descrever materiais, instrumentos, critérios e análise permite que outros grupos tentem repetir o estudo. Resultados isolados não estabelecem automaticamente uma regra universal.'},
    {title:'Diferenças entre replicações',text:'Uma replicação pode revelar limitações da hipótese, problemas de medição ou condições de contexto que precisam ser compreendidas, sem invalidar automaticamente toda a área de pesquisa.'},
  ]},
  'espaco|Exoplaneta':{heading:'Detectar um planeta sem vê-lo diretamente',sections:[
    {title:'Método de trânsito',text:'Quando o planeta passa diante da estrela, uma pequena fração de luz é bloqueada. Quedas periódicas de brilho podem sugerir sua presença.'},
    {title:'Velocidade radial',text:'O movimento da estrela causado pela gravidade do planeta pode alterar sutilmente seu espectro. Diferentes métodos fornecem pistas complementares sobre o sistema.'},
  ]},
  'tecnologia|Aprendizado de máquina':{heading:'Treinar é diferente de compreender o mundo',sections:[
    {title:'Dados de treino e avaliação',text:'Separar amostras de treinamento e teste ajuda a observar se o modelo generaliza. Uma pontuação alta em dados já vistos pode esconder sobreajuste.'},
    {title:'Viés e limites',text:'Resultados podem refletir escolhas de coleta, representação e rotulagem. Sistemas úteis precisam de testes em condições relevantes e monitoramento responsável.'},
  ]},
  'engenharia|Fator de segurança':{heading:'Dimensionamento não é apenas uma divisão',sections:[
    {title:'Capacidade versus solicitação',text:'Em um exercício simples, a razão capacidade/solicitação resume uma margem. Em projetos reais, limites de resistência, cargas, materiais e normas específicas definem verificações mais complexas.'},
    {title:'Por que há incerteza',text:'Variabilidade de materiais, ambiente, desgaste e precisão dos modelos justificam margens de segurança adequadas ao risco envolvido.'},
  ]},
  'gastronomia|Reação de Maillard':{heading:'A química por trás do dourado',sections:[
    {title:'Uma escolha de preparo',text:'Na superfície de um pão, tempo, calor e umidade influenciam o desenvolvimento da crosta. Alterar esses parâmetros pode modificar intensidade de cor e aroma; calor excessivo também produz sabores indesejados.'},
    {title:'O papel da água e do calor',text:'Superfícies secas e temperaturas adequadas favorecem o escurecimento; excesso de umidade costuma dificultar a formação rápida da crosta dourada.'},
  ]},
};
