import type {CategoryId,Difficulty,Question,SourceRef,TrackId} from './types';

type Seed={
  category:CategoryId;topic:string;concept:string;fact:string;tracks?:TrackId[];difficulty?:Difficulty;
  imageUrl?:string;imageAlt?:string;imageSource?:SourceRef;
};

const WIKI=(file:string)=>`https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}`;
const COMMONS=(title:string,file:string):SourceRef=>({title,url:`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file).replace(/%20/g,'_')}`});
const IMG={
  body:WIKI('Human Anatomy.png'), heart:WIKI('Human heart.png'), brain:WIKI('Brainlobes.png'), skeleton:WIKI('Human skeleton front numbered.png'),
  digestive:WIKI('Digestive System.png'), respiratory:WIKI('Human respiratory system-NIH.PNG'), nephron:WIKI('Kidney nephron.png'), liver:WIKI('Liver.png'),
};
const IMG_SRC={
  body:COMMONS('Wikimedia Commons · Anatomia humana','Human Anatomy.png'), heart:COMMONS('Wikimedia Commons · Coração humano','Human heart.png'),
  brain:COMMONS('Wikimedia Commons · Lobos cerebrais','Brainlobes.png'), skeleton:COMMONS('Wikimedia Commons · Esqueleto humano','Human skeleton front numbered.png'),
  digestive:COMMONS('Wikimedia Commons · Sistema digestório','Digestive System.png'), respiratory:COMMONS('Wikimedia Commons · Sistema respiratório','Human respiratory system-NIH.PNG'),
  nephron:COMMONS('Wikimedia Commons · Néfron','Kidney nephron.png'), liver:COMMONS('Wikimedia Commons · Fígado','Liver.png'),
};

const S=(category:CategoryId,topic:string,concept:string,fact:string,opts:Partial<Seed>={}):Seed=>({category,topic,concept,fact,...opts});

const healthSeeds:Seed[]=[
  S('medicina','anatomia-cardiovascular','Átrio direito','Recebe sangue venoso sistêmico principalmente pelas veias cavas e o encaminha ao ventrículo direito.',{imageUrl:IMG.heart,imageAlt:'Ilustração anatômica do coração humano',imageSource:IMG_SRC.heart,tracks:['faculdade','biologicas','revalida']}),
  S('medicina','anatomia-cardiovascular','Ventrículo esquerdo','Bombeia sangue oxigenado para a circulação sistêmica por meio da aorta.',{imageUrl:IMG.heart,imageAlt:'Ilustração anatômica do coração humano',imageSource:IMG_SRC.heart,tracks:['faculdade','biologicas','revalida']}),
  S('medicina','anatomia-cardiovascular','Valva mitral','Localiza-se entre o átrio esquerdo e o ventrículo esquerdo e possui dois folhetos.',{imageUrl:IMG.heart,imageAlt:'Ilustração anatômica do coração humano',imageSource:IMG_SRC.heart}),
  S('medicina','anatomia-cardiovascular','Valva tricúspide','Separa o átrio direito do ventrículo direito.',{imageUrl:IMG.heart,imageAlt:'Ilustração anatômica do coração humano',imageSource:IMG_SRC.heart}),
  S('medicina','fisiologia-cardiovascular','Débito cardíaco','É o volume de sangue bombeado pelo coração por minuto e pode ser expresso como frequência cardíaca multiplicada pelo volume sistólico.'),
  S('medicina','fisiologia-cardiovascular','Nó sinoatrial','É o marcapasso fisiológico do coração e normalmente inicia o impulso elétrico que despolariza os átrios.'),
  S('medicina','fisiologia-cardiovascular','Pré-carga','Relaciona-se ao grau de estiramento das fibras ventriculares ao final do enchimento diastólico.'),
  S('medicina','fisiologia-cardiovascular','Pós-carga','Representa a resistência contra a qual o ventrículo precisa ejetar sangue.'),
  S('medicina','anatomia-respiratoria','Alvéolo pulmonar','É a unidade onde ocorre grande parte da troca gasosa entre o ar e o sangue capilar.',{imageUrl:IMG.respiratory,imageAlt:'Diagrama do sistema respiratório humano',imageSource:IMG_SRC.respiratory}),
  S('medicina','anatomia-respiratoria','Diafragma','É o principal músculo da inspiração tranquila; sua contração aumenta o volume torácico.',{imageUrl:IMG.respiratory,imageAlt:'Diagrama do sistema respiratório humano',imageSource:IMG_SRC.respiratory}),
  S('medicina','fisiologia-respiratoria','Ventilação alveolar','Refere-se ao volume de ar fresco que alcança os alvéolos por unidade de tempo e participa das trocas gasosas.'),
  S('medicina','fisiologia-respiratoria','Surfactante pulmonar','Reduz a tensão superficial alveolar e ajuda a evitar o colapso dos alvéolos ao fim da expiração.'),
  S('medicina','anatomia-renal','Néfron','É a unidade funcional do rim responsável por filtração, reabsorção, secreção e formação da urina.',{imageUrl:IMG.nephron,imageAlt:'Diagrama anatômico de um néfron',imageSource:IMG_SRC.nephron}),
  S('medicina','fisiologia-renal','Glomérulo','É um tufo capilar onde ocorre a etapa inicial de filtração do plasma no néfron.',{imageUrl:IMG.nephron,imageAlt:'Diagrama anatômico de um néfron',imageSource:IMG_SRC.nephron}),
  S('medicina','fisiologia-renal','Alça de Henle','Participa da criação do gradiente osmótico medular que permite concentrar a urina.',{imageUrl:IMG.nephron,imageAlt:'Diagrama anatômico de um néfron',imageSource:IMG_SRC.nephron}),
  S('medicina','fisiologia-renal','ADH','Aumenta a permeabilidade à água nos ductos coletores e favorece a conservação de água pelo organismo.'),
  S('medicina','fisiologia-endocrina','Insulina','Hormônio produzido pelas células beta pancreáticas que favorece a captação e o armazenamento de nutrientes e reduz a glicemia.'),
  S('medicina','fisiologia-endocrina','Glucagon','Hormônio pancreático que tende a elevar a glicemia ao estimular produção hepática de glicose.'),
  S('medicina','fisiologia-endocrina','Aldosterona','Hormônio mineralocorticoide que aumenta a reabsorção renal de sódio e favorece a excreção de potássio.'),
  S('medicina','fisiologia-endocrina','Tireoide','Glândula cervical que produz hormônios relacionados ao metabolismo e também calcitonina.'),
  S('medicina','anatomia-digestiva','Estômago','Órgão muscular que armazena e mistura alimento, participando da digestão química e mecânica.',{imageUrl:IMG.digestive,imageAlt:'Diagrama do sistema digestório humano',imageSource:IMG_SRC.digestive}),
  S('medicina','anatomia-digestiva','Duodeno','Primeira porção do intestino delgado, recebe quimo gástrico, bile e secreção pancreática.',{imageUrl:IMG.digestive,imageAlt:'Diagrama do sistema digestório humano',imageSource:IMG_SRC.digestive}),
  S('medicina','anatomia-digestiva','Jejuno','Porção do intestino delgado importante para absorção de nutrientes.',{imageUrl:IMG.digestive,imageAlt:'Diagrama do sistema digestório humano',imageSource:IMG_SRC.digestive}),
  S('medicina','anatomia-digestiva','Íleo','Porção distal do intestino delgado que participa da absorção, incluindo sais biliares e vitamina B12 ligada ao fator intrínseco.',{imageUrl:IMG.digestive,imageAlt:'Diagrama do sistema digestório humano',imageSource:IMG_SRC.digestive}),
  S('medicina','anatomia-digestiva','Fígado','Órgão com funções metabólicas, síntese proteica, processamento de nutrientes e produção de bile.',{imageUrl:IMG.liver,imageAlt:'Ilustração anatômica do fígado',imageSource:IMG_SRC.liver}),
  S('medicina','neuroanatomia','Lobo frontal','Relaciona-se a funções executivas, planejamento, controle motor voluntário e aspectos do comportamento.',{imageUrl:IMG.brain,imageAlt:'Diagrama dos lobos do cérebro',imageSource:IMG_SRC.brain}),
  S('medicina','neuroanatomia','Lobo parietal','Integra informações somatossensoriais e participa da percepção espacial.',{imageUrl:IMG.brain,imageAlt:'Diagrama dos lobos do cérebro',imageSource:IMG_SRC.brain}),
  S('medicina','neuroanatomia','Lobo temporal','Participa de funções auditivas, memória e compreensão da linguagem em redes especializadas.',{imageUrl:IMG.brain,imageAlt:'Diagrama dos lobos do cérebro',imageSource:IMG_SRC.brain}),
  S('medicina','neuroanatomia','Lobo occipital','Contém áreas corticais essenciais ao processamento visual.',{imageUrl:IMG.brain,imageAlt:'Diagrama dos lobos do cérebro',imageSource:IMG_SRC.brain}),
  S('medicina','neuroanatomia','Cerebelo','Coordena precisão do movimento, equilíbrio e aprendizagem motora.',{imageUrl:IMG.brain,imageAlt:'Diagrama dos lobos do cérebro',imageSource:IMG_SRC.brain}),
  S('medicina','anatomia-musculoesqueletica','Fêmur','É o osso da coxa e o maior osso longo do corpo humano.',{imageUrl:IMG.skeleton,imageAlt:'Diagrama numerado do esqueleto humano',imageSource:IMG_SRC.skeleton}),
  S('medicina','anatomia-musculoesqueletica','Úmero','É o osso longo do braço entre o ombro e o cotovelo.',{imageUrl:IMG.skeleton,imageAlt:'Diagrama numerado do esqueleto humano',imageSource:IMG_SRC.skeleton}),
  S('medicina','anatomia-musculoesqueletica','Tíbia','Osso medial e principal suporte de carga da perna.',{imageUrl:IMG.skeleton,imageAlt:'Diagrama numerado do esqueleto humano',imageSource:IMG_SRC.skeleton}),
  S('medicina','hematologia','Hemoglobina','Proteína das hemácias que transporta oxigênio por meio do grupo heme.'),
  S('medicina','hematologia','Plaqueta','Fragmento celular derivado de megacariócitos que participa da hemostasia primária.'),
  S('medicina','imunologia','Neutrófilo','Leucócito importante na resposta inata e na fagocitose, especialmente em muitas infecções bacterianas.'),
  S('medicina','imunologia','Linfócito B','Célula da imunidade adaptativa que pode diferenciar-se em plasmócito produtor de anticorpos.'),
  S('medicina','imunologia','Linfócito T','Grupo de células da imunidade adaptativa envolvidas em coordenação e resposta celular.'),
  S('medicina','patologia','Edema','Acúmulo anormal de líquido no espaço intersticial ou em cavidades, decorrente de alterações nas forças e mecanismos de equilíbrio de fluidos.'),
  S('medicina','patologia','Trombose','Formação de um trombo dentro do sistema cardiovascular em vida.'),
  S('medicina','patologia','Isquemia','Redução do fluxo sanguíneo a um tecido, com oferta insuficiente de oxigênio e nutrientes.'),
  S('medicina','patologia','Necrose','Morte celular associada a lesão irreversível, frequentemente acompanhada por inflamação.'),
  S('medicina','clinica','Anemia','Condição caracterizada por redução da concentração de hemoglobina abaixo do esperado para o contexto clínico.'),
  S('medicina','clinica','Hipoglicemia','Estado de glicose sanguínea baixa que pode causar sintomas autonômicos e neuroglicopênicos.'),
  S('medicina','clinica','Hipertensão arterial','Elevação persistente da pressão arterial, importante fator de risco cardiovascular e renal.'),
  S('medicina','clinica','Asma','Doença inflamatória crônica das vias aéreas caracterizada por sintomas variáveis e limitação variável do fluxo expiratório.'),
  S('medicina','clinica','DPOC','Doença respiratória crônica com sintomas persistentes e limitação ao fluxo aéreo, frequentemente associada à exposição a partículas ou gases nocivos.'),
  S('medicina','clinica','Insuficiência cardíaca','Síndrome em que alterações estruturais ou funcionais do coração levam a sintomas e sinais relacionados a débito inadequado e/ou congestão.'),
  S('medicina','clinica','Sepse','Disfunção orgânica potencialmente fatal causada por resposta desregulada do hospedeiro a uma infecção.'),
  S('medicina','epidemiologia','Sensibilidade','Proporção de pessoas com a condição que apresentam resultado positivo em um teste.'),
  S('medicina','epidemiologia','Especificidade','Proporção de pessoas sem a condição que apresentam resultado negativo em um teste.'),
  S('medicina','epidemiologia','Incidência','Mede a ocorrência de casos novos de uma condição em uma população ao longo de um período.'),
  S('medicina','epidemiologia','Prevalência','Mede a proporção de pessoas que apresentam uma condição em determinado momento ou período.'),
  S('medicina','bioetica','Autonomia','Princípio bioético relacionado ao respeito à capacidade da pessoa de participar de decisões sobre seu próprio cuidado.'),
  S('medicina','bioetica','Beneficência','Princípio bioético que orienta a buscar benefícios e promover o bem do paciente.'),
  S('medicina','bioetica','Não maleficência','Princípio bioético associado à obrigação de evitar danos desnecessários.'),
  S('medicina','bioetica','Justiça','Princípio bioético ligado à distribuição justa de benefícios, riscos e recursos.'),

  S('farmacia','farmacodinamica','Agonista','Ligante que ativa um receptor e desencadeia resposta biológica.'),
  S('farmacia','farmacodinamica','Antagonista','Ligante que reduz ou impede a ativação de um receptor por um agonista sem necessariamente ativá-lo.'),
  S('farmacia','farmacocinetica','Absorção','Processo pelo qual um fármaco passa do local de administração para a circulação sistêmica.'),
  S('farmacia','farmacocinetica','Distribuição','Processo de passagem reversível do fármaco entre sangue e tecidos.'),
  S('farmacia','farmacocinetica','Metabolismo','Transformação química de fármacos, frequentemente no fígado, que pode facilitar eliminação ou formar metabólitos ativos.'),
  S('farmacia','farmacocinetica','Excreção','Remoção de fármacos e metabólitos do organismo, com destaque para a via renal.'),
  S('farmacia','farmacocinetica','Clearance','Volume de plasma teoricamente depurado de uma substância por unidade de tempo.'),
  S('farmacia','farmacocinetica','Volume de distribuição','Parâmetro aparente que relaciona a quantidade de fármaco no organismo à concentração plasmática.'),
  S('farmacia','farmacocinetica','Efeito de primeira passagem','Metabolização pré-sistêmica, sobretudo intestinal e hepática, que pode reduzir a fração de fármaco que alcança a circulação após administração oral.'),
  S('farmacia','seguranca','Índice terapêutico','Relação usada para expressar margem entre doses associadas a efeito desejado e toxicidade em determinados contextos.'),
  S('farmacia','seguranca','Reação adversa a medicamento','Resposta nociva e não intencional associada ao uso de um medicamento nas condições relevantes.'),
  S('farmacia','seguranca','Farmacovigilância','Atividades de detecção, avaliação, compreensão e prevenção de efeitos adversos ou outros problemas relacionados a medicamentos.'),
  S('farmacia','farmacologia','Anti-inflamatório não esteroidal','Classe que reduz síntese de prostaglandinas por inibição de ciclooxigenases e possui efeitos analgésicos e anti-inflamatórios.'),
  S('farmacia','farmacologia','Betabloqueador','Classe que antagoniza receptores beta-adrenérgicos e pode reduzir frequência cardíaca e outros efeitos simpáticos.'),
  S('farmacia','farmacologia','Inibidor da ECA','Classe que reduz formação de angiotensina II e aumenta bradicinina, afetando pressão e hemodinâmica.'),
  S('farmacia','farmacologia','Diurético de alça','Classe que atua principalmente na alça ascendente espessa, reduzindo reabsorção de sódio, potássio e cloro.'),
  S('farmacia','farmacologia','Antagonista H1','Classe que bloqueia receptores histamínicos H1 e pode reduzir sintomas alérgicos.'),
  S('farmacia','antimicrobianos','Beta-lactâmico','Grupo de antimicrobianos que interfere na síntese da parede celular bacteriana.'),
  S('farmacia','antimicrobianos','Macrolídeo','Classe de antimicrobianos que se liga à subunidade 50S do ribossomo bacteriano e inibe síntese proteica.'),
  S('farmacia','antimicrobianos','Aminoglicosídeo','Classe antimicrobiana que se liga à subunidade 30S bacteriana e pode causar leitura incorreta do RNA mensageiro.'),

  S('enfermagem','seguranca','Identificação do paciente','Conferir identificadores antes de procedimentos e medicamentos reduz risco de troca de pacientes.'),
  S('enfermagem','seguranca','Comunicação segura','Passagem estruturada de informações ajuda a reduzir omissões e falhas na continuidade do cuidado.'),
  S('enfermagem','seguranca','Prevenção de quedas','Avaliação de risco, ambiente seguro e orientação fazem parte da prevenção de quedas.'),
  S('enfermagem','seguranca','Precaução padrão','Conjunto de medidas aplicadas ao cuidado de todos os pacientes para reduzir transmissão de agentes infecciosos.'),
  S('enfermagem','processo','Coleta de dados de enfermagem','Etapa do processo de enfermagem dedicada a reunir informações clínicas e contextuais relevantes.'),
  S('enfermagem','processo','Diagnóstico de enfermagem','Julgamento clínico sobre respostas humanas que orienta planejamento do cuidado de enfermagem.'),
  S('enfermagem','processo','Planejamento de enfermagem','Define resultados esperados e intervenções coerentes com as necessidades identificadas.'),
  S('enfermagem','processo','Avaliação de enfermagem','Verifica respostas do paciente e se os resultados planejados estão sendo alcançados.'),
  S('enfermagem','feridas','Tecido de granulação','Tecido vascularizado que pode aparecer durante a cicatrização e indica formação de matriz e novos vasos.'),
  S('enfermagem','feridas','Lesão por pressão','Dano localizado na pele e/ou tecido subjacente associado a pressão ou pressão combinada com cisalhamento.'),
  S('enfermagem','saude-coletiva','Vacinação','Estratégia de prevenção que induz resposta imune e pode reduzir risco individual e circulação de agentes infecciosos.'),
  S('enfermagem','saude-coletiva','Educação em saúde','Processo de construção de conhecimento que busca ampliar autonomia e capacidade de cuidado em saúde.'),

  S('biomedicina','laboratorio','Fase pré-analítica','Inclui preparo, identificação, coleta, transporte e armazenamento da amostra antes da análise.'),
  S('biomedicina','laboratorio','Fase analítica','Etapa em que a amostra é efetivamente medida ou examinada por método laboratorial.'),
  S('biomedicina','laboratorio','Fase pós-analítica','Inclui validação, interpretação, liberação e comunicação do resultado após a análise.'),
  S('biomedicina','molecular','Eletroforese','Técnica que separa moléculas carregadas com base em sua migração em um campo elétrico.'),
  S('biomedicina','molecular','Sequenciamento de DNA','Conjunto de técnicas que determina a ordem de nucleotídeos em uma molécula de DNA.'),
  S('biomedicina','imunologia','Antígeno','Estrutura molecular reconhecida por componentes do sistema imune adaptativo.'),
  S('biomedicina','imunologia','Anticorpo','Imunoglobulina produzida por plasmócitos capaz de reconhecer alvos moleculares específicos.'),
  S('biomedicina','hematologia','Hematócrito','Proporção do volume sanguíneo ocupada por hemácias.'),
  S('biomedicina','microbiologia','Cultura microbiológica','Método que favorece crescimento de microrganismos em condições controladas para identificação e estudo.'),
  S('biomedicina','microbiologia','Antibiograma','Teste que avalia susceptibilidade de uma bactéria a diferentes antimicrobianos em condições laboratoriais.'),
];

const revalidaSeeds:Seed[]=[
  S('revalida','urgencia','Síndrome coronariana aguda','Dor torácica opressiva prolongada com alterações isquêmicas no eletrocardiograma exige reconhecimento rápido de uma síndrome coronariana aguda e encaminhamento para protocolo de emergência.',{tracks:['revalida','faculdade','biologicas'],difficulty:'dificil'}),
  S('revalida','urgencia','Acidente vascular cerebral','Déficit neurológico focal de início súbito deve levantar suspeita de evento cerebrovascular e exige avaliação urgente do tempo de início e neuroimagem.',{tracks:['revalida','faculdade'],difficulty:'dificil'}),
  S('revalida','urgencia','Anafilaxia','Reação sistêmica aguda com comprometimento respiratório e/ou circulatório após exposição a possível alérgeno caracteriza emergência compatível com anafilaxia.',{tracks:['revalida','faculdade'],difficulty:'dificil'}),
  S('revalida','urgencia','Sepse','Infecção suspeita ou confirmada acompanhada de disfunção orgânica exige reconhecimento e manejo rápido da sepse.',{tracks:['revalida','faculdade'],difficulty:'dificil'}),
  S('revalida','urgencia','Crise asmática','Piora aguda de dispneia, sibilância e limitação do fluxo expiratório em pessoa com asma deve ser classificada pela gravidade e tratada como exacerbação asmática.',{tracks:['revalida','faculdade']}),
  S('revalida','urgencia','Hipoglicemia sintomática','Alteração do estado mental com glicemia baixa deve ser reconhecida como hipoglicemia e corrigida prontamente conforme via segura disponível.',{tracks:['revalida','faculdade']}),
  S('revalida','pediatria','Desidratação na criança','Diarreia aguda com sede, redução da diurese, olhos encovados e alterações do estado geral exige avaliação do grau de desidratação e reposição hídrica adequada.',{tracks:['revalida','faculdade']}),
  S('revalida','pediatria','Bronquiolite','Lactente com quadro viral seguido de tosse, taquipneia, sibilos e crepitações pode apresentar bronquiolite, cuja avaliação se concentra em gravidade e suporte.',{tracks:['revalida','faculdade']}),
  S('revalida','pediatria','Pneumonia comunitária','Febre, tosse, taquipneia e achados focais à ausculta em criança podem sugerir pneumonia adquirida na comunidade.',{tracks:['revalida','faculdade']}),
  S('revalida','pediatria','Icterícia neonatal','Icterícia nas primeiras 24 horas de vida é sinal de alerta e merece investigação, pois não é considerada padrão fisiológico habitual.',{tracks:['revalida','faculdade']}),
  S('revalida','pediatria','Aleitamento materno exclusivo','Em geral, recomenda-se aleitamento materno exclusivo nos primeiros seis meses, salvo situações específicas que exijam outra conduta.',{tracks:['revalida','faculdade']}),
  S('revalida','ginecologia-obstetricia','Pré-eclâmpsia','Hipertensão após 20 semanas de gestação associada a proteinúria ou sinais de disfunção orgânica materna pode caracterizar pré-eclâmpsia.',{tracks:['revalida','faculdade'],difficulty:'dificil'}),
  S('revalida','ginecologia-obstetricia','Gravidez ectópica','Dor pélvica e sangramento em pessoa com teste de gravidez positivo exigem considerar gravidez ectópica, especialmente se não houver gestação intrauterina identificada quando esperada.',{tracks:['revalida','faculdade'],difficulty:'dificil'}),
  S('revalida','ginecologia-obstetricia','Hemorragia pós-parto','Sangramento excessivo após o parto é emergência obstétrica e requer identificação rápida da causa e medidas de estabilização.',{tracks:['revalida','faculdade'],difficulty:'dificil'}),
  S('revalida','ginecologia-obstetricia','Trabalho de parto','Contrações uterinas regulares associadas a modificação progressiva do colo uterino caracterizam trabalho de parto.',{tracks:['revalida','faculdade']}),
  S('revalida','ginecologia-obstetricia','Rastreamento do câncer do colo do útero','O rastreamento organizado do câncer do colo do útero utiliza testes recomendados para a faixa etária e contexto, seguindo diretrizes nacionais atualizadas.',{tracks:['revalida','faculdade']}),
  S('revalida','clinica-medica','Diabetes mellitus','Hiperglicemia persistente deve ser confirmada e classificada com critérios diagnósticos apropriados, considerando sintomas e exames laboratoriais.',{tracks:['revalida','faculdade']}),
  S('revalida','clinica-medica','Hipertensão arterial','Múltiplas medidas adequadas de pressão arterial, contexto clínico e avaliação de risco são fundamentais para diagnosticar e conduzir hipertensão.',{tracks:['revalida','faculdade']}),
  S('revalida','clinica-medica','Insuficiência cardíaca','Dispneia, edema e sinais de congestão em pessoa com doença cardíaca podem indicar insuficiência cardíaca e exigem avaliação de gravidade e causa.',{tracks:['revalida','faculdade']}),
  S('revalida','clinica-medica','DPOC','Dispneia crônica, tosse e exposição a fatores de risco com obstrução persistente ao fluxo aéreo sugerem DPOC.',{tracks:['revalida','faculdade']}),
  S('revalida','clinica-medica','Tuberculose pulmonar','Tosse persistente, sintomas constitucionais e contexto epidemiológico devem levar à investigação de tuberculose com exames apropriados.',{tracks:['revalida','faculdade']}),
  S('revalida','clinica-medica','Anemia ferropriva','Anemia microcítica com estoques reduzidos de ferro sugere deficiência de ferro e exige investigação de causa.'),
  S('revalida','clinica-medica','Hipotireoidismo','Cansaço, intolerância ao frio e alterações laboratoriais de TSH e hormônios tireoidianos podem apontar para hipotireoidismo.'),
  S('revalida','clinica-medica','Doença renal crônica','Alteração estrutural ou funcional renal persistente por pelo menos três meses pode caracterizar doença renal crônica.'),
  S('revalida','infectologia','Dengue com sinais de alarme','Dor abdominal intensa, vômitos persistentes, sangramento de mucosa, letargia ou sinais de extravasamento plasmático em dengue exigem atenção para sinais de alarme.'),
  S('revalida','infectologia','Meningite','Febre, cefaleia intensa, rigidez de nuca e alteração do estado mental podem sugerir meningite e exigem avaliação urgente.'),
  S('revalida','infectologia','HIV','O diagnóstico de HIV segue algoritmos com testes de triagem e confirmação definidos por protocolos, preservando aconselhamento e confidencialidade.'),
  S('revalida','infectologia','Sífilis','A interpretação de testes treponêmicos e não treponêmicos deve considerar história, tratamento prévio e estágio clínico.'),
  S('revalida','cirurgia','Apendicite aguda','Dor que migra para fossa ilíaca direita, anorexia e sinais de irritação peritoneal podem sugerir apendicite aguda.'),
  S('revalida','cirurgia','Colecistite aguda','Dor persistente em hipocôndrio direito associada a sinais inflamatórios pode sugerir colecistite aguda.'),
  S('revalida','cirurgia','Obstrução intestinal','Dor abdominal em cólica, distensão, vômitos e parada de eliminação de gases e fezes podem indicar obstrução intestinal.'),
  S('revalida','cirurgia','Trauma com choque','Pessoa traumatizada com sinais de hipoperfusão deve ser abordada prioritariamente por avaliação sistemática, controle de hemorragia e estabilização.'),
  S('revalida','saude-mental','Risco de suicídio','Ideação suicida exige avaliação direta de intenção, plano, meios, fatores protetores e segurança, com encaminhamento proporcional ao risco.'),
  S('revalida','saude-mental','Delirium','Alteração aguda e flutuante de atenção e consciência, frequentemente associada a condição clínica, sugere delirium.'),
  S('revalida','saude-mental','Depressão','Humor deprimido ou perda de interesse persistentes acompanhados de outros sintomas e prejuízo funcional podem compor episódio depressivo.'),
  S('revalida','saude-coletiva','Atenção Primária à Saúde','A APS coordena cuidado, trabalha com território, longitudinalidade, acesso e integralidade, articulando outros pontos da rede.'),
  S('revalida','saude-coletiva','Vigilância epidemiológica','Conjunto de ações que produz conhecimento e orienta medidas de prevenção e controle de doenças e agravos.'),
  S('revalida','saude-coletiva','Notificação compulsória','Determinados agravos devem ser comunicados aos sistemas de vigilância conforme listas e prazos definidos pela autoridade sanitária.'),
  S('revalida','saude-coletiva','Prevenção primária','Atua antes do surgimento da doença, reduzindo fatores de risco ou aumentando proteção, como em vacinação e promoção da saúde.'),
  S('revalida','saude-coletiva','Prevenção secundária','Busca detectar doença em fase inicial para permitir intervenção precoce, como em programas de rastreamento baseados em evidência.'),
  S('revalida','saude-coletiva','Prevenção terciária','Busca reduzir complicações, incapacidade e impacto de doença já estabelecida, incluindo reabilitação.'),
  S('revalida','etica','Sigilo profissional','Informações obtidas no cuidado devem ser protegidas, com quebra de sigilo restrita a hipóteses éticas e legais justificadas.'),
  S('revalida','etica','Consentimento informado','Decisão válida exige informação adequada, compreensão, voluntariedade e capacidade, respeitadas exceções previstas em situações específicas.'),
  S('revalida','etica','Capacidade de decisão','Avaliar capacidade envolve verificar se a pessoa consegue compreender, apreciar consequências, raciocinar e comunicar uma escolha.'),
  S('revalida','etica','Más notícias','Comunicação de notícias difíceis deve ser clara, empática, gradual e permitir espaço para dúvidas e emoções.'),
  S('revalida','dermatologia','Celulite bacteriana','Área eritematosa, quente, dolorosa e de bordas pouco definidas pode sugerir infecção bacteriana de pele e subcutâneo.'),
  S('revalida','oftalmologia','Glaucoma agudo de ângulo fechado','Dor ocular intensa, olho vermelho, redução visual e sintomas sistêmicos podem indicar emergência oftalmológica compatível com fechamento angular agudo.'),
  S('revalida','otorrino','Otite média aguda','Dor de ouvido associada a achados inflamatórios da membrana timpânica pode indicar otite média aguda.'),
  S('revalida','geriatria','Polifarmácia','Uso simultâneo de vários medicamentos aumenta risco de interações e eventos adversos e deve ser revisto periodicamente.'),
  S('revalida','geriatria','Queda no idoso','Quedas em idosos são multifatoriais e pedem revisão de marcha, ambiente, visão, medicamentos e condições clínicas.'),
  S('revalida','prevencao','Rastreamento','Rastreamento é oferecido a pessoas assintomáticas de uma população-alvo e só faz sentido quando benefícios superam danos.'),
  S('revalida','prevencao','Vacinação do adulto','O calendário vacinal deve ser revisto ao longo da vida considerando idade, condições clínicas, exposições e recomendações oficiais.'),
  S('revalida','nutricao','Aleitamento e alimentação complementar','A alimentação complementar deve ser introduzida de forma adequada a partir do período recomendado, mantendo aleitamento quando possível.'),
  S('revalida','urgencia','Convulsão prolongada','Crise convulsiva prolongada ou crises repetidas sem recuperação plena da consciência configuram emergência neurológica.'),
  S('revalida','urgencia','Choque','Hipotensão, alteração do estado mental, extremidades frias ou outros sinais de hipoperfusão indicam síndrome de choque e exigem avaliação rápida da causa.'),
  S('revalida','endocrino','Cetoacidose diabética','Hiperglicemia associada a cetose e acidose metabólica caracteriza cetoacidose diabética, uma emergência metabólica.'),
  S('revalida','pediatria','Sinais de perigo na criança','Incapacidade de beber, convulsões, letargia importante ou dificuldade respiratória grave são exemplos de sinais que exigem avaliação urgente.'),
  S('revalida','obstetricia','Sangramento na gestação','Sangramento vaginal durante a gestação deve ser avaliado conforme idade gestacional, estabilidade hemodinâmica, dor e condições materno-fetais.'),
  S('revalida','saude-coletiva','Equidade no SUS','Equidade significa reconhecer necessidades diferentes e alocar atenção e recursos de forma proporcional para reduzir desigualdades injustas.'),
];

const broadExtraSeeds:Seed[]=[
  S('computacao','seguranca','Hash criptográfico','Transforma dados em resumo de tamanho fixo; funções adequadas são projetadas para dificultar a recuperação da entrada original.'),
  S('computacao','seguranca','Autenticação multifator','Combina fatores independentes de autenticação para reduzir risco de comprometimento por perda de uma única credencial.'),
  S('informatica','redes','DNS','Sistema distribuído que associa nomes de domínio a informações como endereços IP.'),
  S('informatica','redes','HTTPS','Uso de HTTP sobre TLS para proteger confidencialidade e integridade da comunicação em trânsito.'),
  S('direito','constitucional','Controle de constitucionalidade','Conjunto de mecanismos destinados a verificar compatibilidade de normas e atos com a Constituição.'),
  S('direito','administrativo','Ato administrativo','Manifestação da Administração Pública submetida ao regime jurídico administrativo e sujeita a requisitos de validade.'),
  S('administracao','gestao','Indicador de desempenho','Medida usada para acompanhar se processos ou resultados se aproximam de objetivos definidos.'),
  S('contabilidade','fundamentos','Equação patrimonial','Expressa a relação básica em que ativos correspondem à soma de passivos e patrimônio líquido.'),
  S('economia','macro','PIB real','Mede produção final descontando o efeito de mudanças de preços por meio de preços constantes ou índice apropriado.'),
  S('geopolitica','comercio','Sanção econômica','Medida restritiva aplicada a pessoas, organizações ou Estados para influenciar comportamentos, com efeitos que dependem de desenho e contexto.'),
  S('historia','historiografia','Fonte primária','Registro produzido no contexto histórico estudado, cuja interpretação exige autoria, finalidade e circunstâncias de produção.'),
  S('geografia','urbanizacao','Conurbação','Processo em que áreas urbanizadas de municípios vizinhos crescem e se conectam fisicamente.'),
  S('filosofia','logica','Argumento válido','Argumento em que, se as premissas forem verdadeiras, a conclusão não pode ser falsa.'),
  S('midia','pensamento-critico','Correlação não implica causalidade','Duas variáveis variarem juntas não demonstra, por si só, que uma causa a outra.'),
  S('literatura','narrativa','Narrador não confiável','Narrador cuja versão dos acontecimentos precisa ser lida criticamente porque pode ser limitada, parcial ou enganosa.'),
  S('religioes','diversidade','Pluralismo religioso','Convivência social de diferentes tradições, crenças e não crenças sob direitos e liberdades comuns.'),
  S('teologia','interpretacao','Exegese','Análise cuidadosa de um texto para compreender seu sentido em contexto histórico, linguístico e literário.'),
  S('cinema','linguagem','Montagem','Organização de planos no tempo que cria ritmo, continuidade, contraste e relações de sentido.'),
  S('series','narrativa','Arco de personagem','Transformação ou trajetória de um personagem ao longo de episódios ou temporadas.'),
  S('musica','teoria','Ritmo','Organização temporal de durações, pulsos e acentos em uma peça musical.'),
  S('games','design','Loop de gameplay','Ciclo de ações, feedback e objetivos que se repete e estrutura a experiência central de um jogo.'),
  S('artes','visual','Perspectiva linear','Sistema de representação que usa pontos de fuga e linhas convergentes para sugerir profundidade em uma superfície plana.'),
  S('sociologia','desigualdade','Mobilidade social','Mudança de posição de indivíduos ou grupos dentro de uma estrutura social ao longo do tempo ou entre gerações.'),
  S('psicologia','cognicao','Memória de trabalho','Sistema de capacidade limitada que mantém e manipula informação por curto período durante tarefas cognitivas.'),
  S('tecnologia','ia','Aprendizado de máquina','Conjunto de métodos em que modelos aprendem padrões a partir de dados para realizar previsões, classificações ou outras tarefas.'),
  S('ciencia','metodo','Reprodutibilidade','Capacidade de obter resultados consistentes quando métodos e análises são repetidos ou reavaliados de forma apropriada.'),
  S('natureza','ecologia','Serviço ecossistêmico','Benefício que sociedades obtêm de ecossistemas, como polinização, regulação climática, água e recursos culturais.'),
  S('espaco','astronomia','Exoplaneta','Planeta que orbita uma estrela diferente do Sol.'),
  S('esportes','treinamento','Sobrecarga progressiva','Princípio de aumentar gradualmente a demanda do treinamento para promover adaptação, respeitando recuperação.'),
  S('gastronomia','ciencia-dos-alimentos','Reação de Maillard','Conjunto de reações entre aminoácidos e açúcares redutores que contribui para aroma e escurecimento de alimentos aquecidos.'),
];

export const GENERATED_QUESTION_QUOTAS:Record<CategoryId,number>={
  medicina:850,revalida:600,farmacia:400,enfermagem:300,biomedicina:300,biologia:300,quimica:300,fisica:300,matematica:400,raciocinio:350,
  portugues:300,constituicao:200,direito:250,administracao:200,contabilidade:200,economia:200,informatica:250,computacao:250,engenharia:200,psicologia:200,
  historia:200,geografia:200,brasil:250,cidadania:200,geopolitica:200,literatura:180,filosofia:180,sociologia:180,religioes:150,teologia:150,midia:150,
  cinema:150,series:120,musica:120,games:120,artes:120,cultura:120,tecnologia:150,ciencia:190,natureza:120,espaco:100,esportes:100,gastronomia:100,mundo:100,
};

const LABEL:Record<CategoryId,string>={
  brasil:'Brasil',historia:'História',natureza:'Natureza',espaco:'Espaço',ciencia:'Ciência',cultura:'Cultura',geografia:'Geografia',esportes:'Esportes',tecnologia:'Tecnologia',gastronomia:'Gastronomia',artes:'Artes',mundo:'Mundo',geopolitica:'Geopolítica',constituicao:'Constituição',portugues:'Português',economia:'Economia',raciocinio:'Raciocínio',cinema:'Cinema',series:'Séries',musica:'Música',games:'Games',literatura:'Literatura',filosofia:'Filosofia',sociologia:'Sociologia',psicologia:'Psicologia',religioes:'Religiões',teologia:'Teologia',midia:'Mídia e pensamento',cidadania:'Brasil vivido',matematica:'Matemática',fisica:'Física',quimica:'Química',biologia:'Biologia',direito:'Direito',administracao:'Administração',contabilidade:'Contabilidade',informatica:'Informática',medicina:'Medicina',enfermagem:'Enfermagem',farmacia:'Farmácia',biomedicina:'Biomedicina',engenharia:'Engenharia',computacao:'Computação',revalida:'Revalida',
};

const TEMPLATES=[
  (s:Seed)=>`Qual conceito corresponde à descrição: ${s.fact}`,
  (s:Seed)=>`Em uma revisão de ${LABEL[s.category]}, qual termo é explicado por esta frase: ${s.fact}`,
  (s:Seed)=>`Leia a pista e identifique o conceito correto: ${s.fact}`,
  (s:Seed)=>`Uma questão sobre ${s.topic.replace(/-/g,' ')} traz a seguinte informação: ${s.fact} A que conceito ela se refere?`,
  (s:Seed)=>`Qual alternativa nomeia corretamente esta ideia de ${LABEL[s.category]}: ${s.fact}`,
  (s:Seed)=>`Se você precisasse resumir esta explicação em um termo, qual seria? ${s.fact}`,
  (s:Seed)=>`Associe a descrição ao conceito adequado: ${s.fact}`,
  (s:Seed)=>`No contexto de ${LABEL[s.category]}, a afirmação a seguir descreve o quê? ${s.fact}`,
  (s:Seed)=>`Para fixar ${s.topic.replace(/-/g,' ')}, identifique o conceito: ${s.fact}`,
  (s:Seed)=>`Qual opção é a melhor associação para esta pista? ${s.fact}`,
  (s:Seed)=>`Em um quiz de ${LABEL[s.category]}, aparece esta definição: ${s.fact} Qual é a resposta?`,
  (s:Seed)=>`A explicação “${s.fact}” está ligada diretamente a qual conceito?`,
  (s:Seed)=>`Qual conceito você deveria lembrar ao encontrar esta descrição em uma prova? ${s.fact}`,
  (s:Seed)=>`Identifique a alternativa que corresponde à seguinte explicação: ${s.fact}`,
  (s:Seed)=>`Que termo de ${LABEL[s.category]} completa melhor esta revisão: ${s.fact}`,
  (s:Seed)=>`A pista abaixo aponta para qual conteúdo? ${s.fact}`,
  (s:Seed)=>`Qual conceito está sendo testado quando a questão afirma: ${s.fact}`,
  (s:Seed)=>`Em uma sessão rápida de estudo, qual resposta combina com: ${s.fact}`,
  (s:Seed)=>`Qual alternativa representa com precisão a ideia descrita? ${s.fact}`,
  (s:Seed)=>`Reconheça o conceito a partir da explicação: ${s.fact}`,
  (s:Seed)=>`Se esta fosse a única pista disponível, qual conceito seria o mais adequado? ${s.fact}`,
  (s:Seed)=>`Qual termo deve ser conectado mentalmente à afirmação: ${s.fact}`,
  (s:Seed)=>`Em ${LABEL[s.category]}, qual conceito explica o enunciado: ${s.fact}`,
  (s:Seed)=>`Qual é o nome da ideia apresentada nesta frase? ${s.fact}`,
];

const REVERSE_TEMPLATES=[
  (s:Seed)=>`Qual descrição explica melhor “${s.concept}” no contexto de ${LABEL[s.category]}?`,
  (s:Seed)=>`Qual alternativa resume corretamente o conceito “${s.concept}” em ${LABEL[s.category]}?`,
  (s:Seed)=>`O que melhor caracteriza “${s.concept}” em ${LABEL[s.category]}?`,
  (s:Seed)=>`Qual enunciado está corretamente associado a “${s.concept}” em ${LABEL[s.category]}?`,
  (s:Seed)=>`Ao revisar “${s.concept}” em ${LABEL[s.category]}, qual explicação você deveria lembrar?`,
  (s:Seed)=>`Qual destas descrições corresponde com mais precisão a “${s.concept}” em ${LABEL[s.category]}?`,
  (s:Seed)=>`Se “${s.concept}” cair em uma prova de ${LABEL[s.category]}, qual definição está correta?`,
  (s:Seed)=>`Entre as alternativas, qual apresenta uma explicação correta de “${s.concept}” em ${LABEL[s.category]}?`,
  (s:Seed)=>`Que afirmação descreve adequadamente “${s.concept}” em ${LABEL[s.category]}?`,
  (s:Seed)=>`Em ${LABEL[s.category]}, qual explicação diferencia corretamente “${s.concept}” de conceitos próximos?`,
  (s:Seed)=>`Para fixar “${s.concept}” em ${LABEL[s.category]}, escolha a descrição mais adequada.`,
  (s:Seed)=>`Em ${LABEL[s.category]}, qual frase conecta corretamente o nome “${s.concept}” ao seu significado?`,
];

const unique=<T,>(xs:T[])=>[...new Set(xs)];

const PREFIXES=[
  'Em uma revisão conceitual,','Em um simulado rápido,','Para diferenciar termos próximos,','Pensando na aplicação prática,','Em uma checagem de fundamentos,','Durante uma sessão de memorização ativa,','Ao revisar o mecanismo central,','Em uma questão de associação,','Para conectar definição e uso,','Em uma rodada de raciocínio,','Ao comparar conceitos da mesma área,','Em uma revisão interdisciplinar,',
];
const NUM_A=['rápida','objetiva','progressiva','aplicada','de fundamentos','de prova','de raciocínio','de treinamento','de consolidação','de prática'];
const NUM_B=['com foco em unidades','com foco em cálculo','com foco em interpretação','com foco em relações','com foco em estimativa','com foco em proporções','com foco em modelagem','com foco em conceitos','com foco em leitura cuidadosa','com foco em resolução'];
const NUM_C=['partindo dos fundamentos','pensando como em uma prova','conferindo o raciocínio passo a passo','ligando fórmula e significado'];
const numericPrefix=(i:number)=>`Em uma revisão ${NUM_A[i%NUM_A.length]} ${NUM_B[Math.floor(i/NUM_A.length)%NUM_B.length]}, ${NUM_C[Math.floor(i/(NUM_A.length*NUM_B.length))%NUM_C.length]}, `;
function four(values:string[],correct:string,seed:number):[string,string,string,string]{
  const out=unique(values);
  let bump=1;
  while(out.length<4){const candidate=`${correct} · alternativa ${bump++}`;if(!out.includes(candidate))out.push(candidate);}
  return rotate(out.slice(0,4),seed%4) as [string,string,string,string];
}

const seedKey=(s:Seed)=>`${s.category}|${s.concept}|${s.fact}`;
function fromQuestion(q:Question):Seed{
  return {category:q.category,topic:q.topic??'fundamentos',concept:q.concept??q.choices[q.answer]!,fact:q.fact,tracks:q.tracks,difficulty:q.difficulty,imageUrl:q.imageUrl,imageAlt:q.imageAlt,imageSource:q.imageSource};
}
function categoryTracks(cat:CategoryId):TrackId[]{
  const m:Partial<Record<CategoryId,TrackId[]>>={
    medicina:['faculdade','biologicas','revalida'],revalida:['revalida','faculdade','biologicas'],farmacia:['faculdade','biologicas'],enfermagem:['faculdade','biologicas'],biomedicina:['faculdade','biologicas'],
    matematica:['exatas','enem','concursos'],raciocinio:['exatas','enem','concursos'],fisica:['exatas','enem','faculdade'],quimica:['exatas','enem','faculdade'],biologia:['biologicas','enem','faculdade'],
    direito:['concursos','faculdade','humanas'],constituicao:['concursos','brasil','humanas'],administracao:['concursos','faculdade'],contabilidade:['concursos','faculdade','exatas'],informatica:['concursos','tecnologia'],computacao:['faculdade','tecnologia','exatas'],engenharia:['faculdade','exatas'],
    brasil:['brasil','enem','concursos'],cidadania:['brasil-vivido','brasil','humanas'],historia:['historia','enem','humanas'],geografia:['enem','humanas','geopolitica'],geopolitica:['geopolitica','enem','concursos'],
    literatura:['livros','humanas','enem'],filosofia:['pensamento','humanas'],sociologia:['humanas','enem'],psicologia:['faculdade','humanas'],religioes:['religioes','humanas'],teologia:['religioes','faculdade'],midia:['pensamento','humanas'],
    cinema:['entretenimento','cinema'],series:['entretenimento','series'],musica:['entretenimento'],games:['entretenimento','tecnologia'],artes:['artes','humanas'],cultura:['entretenimento','humanas'],tecnologia:['tecnologia','exatas'],ciencia:['ciencia','enem'],natureza:['ciencia','biologicas'],espaco:['ciencia'],esportes:['entretenimento'],gastronomia:['entretenimento','brasil'],mundo:['geopolitica'],economia:['concursos','humanas','brasil'],portugues:['enem','concursos','humanas'],
  };return m[cat]??['geral'];
}
function peers(pool:Seed[],seed:Seed):Seed[]{
  const same=pool.filter(x=>x.category===seed.category&&x.concept!==seed.concept);
  return same.length>=3?same:pool.filter(x=>x.concept!==seed.concept);
}
function rotate<T>(items:T[],offset:number){return items.length?items.map((_,i)=>items[(i+offset)%items.length]!):items;}
function generatedFromSeeds(category:CategoryId,count:number,pool:Seed[],idStart:number):Question[]{
  const own=[...new Map(pool.filter(s=>s.category===category).map(s=>[s.concept.toLocaleLowerCase('pt-BR'),s] as const)).values()];
  if(own.length<4)throw new Error(`Seed pool too small for ${category}`);
  const out:Question[]=[];
  for(let i=0;i<count;i++){
    const seed=own[i%own.length]!; const ps=peers(own,seed); const base=(i*3+Math.floor(i/own.length))%ps.length;
    const distract=unique([ps[base]?.concept,ps[(base+1)%ps.length]?.concept,ps[(base+2)%ps.length]?.concept].filter((x):x is string=>Boolean(x)&&x!==seed.concept));
    for(const p of ps)if(distract.length<3&&!distract.includes(p.concept)&&p.concept!==seed.concept)distract.push(p.concept);
    const round=Math.floor(i/own.length);const template=TEMPLATES[round%TEMPLATES.length]!;const prefix=PREFIXES[Math.floor(round/TEMPLATES.length)%PREFIXES.length]!;
    const shift=(i+seed.concept.length)%4;
    // Alternate recognition (description -> concept) with recall/comprehension
    // (concept -> description). This keeps large catalogs from feeling like the
    // same flashcard with only different wording.
    let question:string,choices:[string,string,string,string],answer:number;
    if(round%2===1){
      const factDistractors=ps.slice(base,base+3).map(x=>x.fact);
      for(const p of ps)if(factDistractors.length<3&&!factDistractors.includes(p.fact)&&p.fact!==seed.fact)factDistractors.push(p.fact);
      const facts=unique([seed.fact,...factDistractors]).slice(0,4);
      while(facts.length<4)facts.push(`Não corresponde ao conceito ${seed.concept}.`);
      choices=rotate(facts,shift) as [string,string,string,string];answer=choices.indexOf(seed.fact);
      const reverse=REVERSE_TEMPLATES[Math.floor(round/2)%REVERSE_TEMPLATES.length]!;
      question=`${prefix} ${reverse(seed)}`;
    }else{
      const choicesRaw=[seed.concept,...distract.slice(0,3)];
      choices=rotate(choicesRaw,shift) as [string,string,string,string];answer=choices.indexOf(seed.concept);
      question=`${prefix} ${template(seed)}`;
    }
    out.push({id:`g-${String(idStart+i).padStart(5,'0')}`,category,topic:seed.topic,concept:seed.concept,question,choices,answer,fact:seed.fact,brazil:category==='brasil'||category==='cidadania',tracks:seed.tracks??categoryTracks(category),difficulty:seed.difficulty??(i%7===0?'dificil':i%3===0?'facil':'medio'),...(seed.imageUrl?{imageUrl:seed.imageUrl,imageAlt:seed.imageAlt,imageSource:seed.imageSource}:{}),});
  }
  return out;
}

function numericMath(count:number,idStart:number):Question[]{const out:Question[]=[];for(let i=0;i<count;i++){const a=12+(i%89),b=3+((i*7)%37),kind=i%5;let question='',correct=0,fact='';let vals:number[]=[];
  if(kind===0){correct=a+b;question=`Uma turma registrou ${a} acertos em uma etapa e ${b} em outra. Quantos acertos foram registrados ao todo?`;fact=`Somando ${a}+${b}, obtemos ${correct}.`;vals=[correct,correct+2,Math.max(0,correct-3),a*b];}
  else if(kind===1){correct=a*b;question=`Um material custa R$ ${a} e são compradas ${b} unidades. Qual é o valor total?`;fact=`Multiplicação: ${a} × ${b} = ${correct}.`;vals=[correct,correct+b,Math.max(1,correct-a),a+b];}
  else if(kind===2){const p=[10,20,25,30,40,50][i%6]!;correct=a*p/100;question=`Quanto é ${p}% de ${a}?`;fact=`${p}% de ${a} = ${a} × ${p/100} = ${correct}.`;vals=[correct,correct+1,Math.max(0,correct-1),a-p];}
  else if(kind===3){const n=3+(i%7),step=2+(i%6),last=a;correct=last+n*step;question=`Na sequência ${last}, ${last+step}, ${last+2*step}, ... qual é o termo após avançar mais ${n} passos?`;fact=`A razão é ${step}; após ${n} passos, ${last}+${n}×${step}=${correct}.`;vals=[correct,correct+step,correct-step,last+n];}
  else {const x=2+(i%19),m=2+(i%9),c=1+(i%13),rhs=m*x+c;correct=x;question=`Se ${m}x + ${c} = ${rhs}, qual é o valor de x?`;fact=`Subtraindo ${c} e dividindo por ${m}, x=${x}.`;vals=[x,x+1,Math.max(0,x-1),m+x];}
  const choices=unique(vals.map(String)).slice(0,4);while(choices.length<4)choices.push(String(correct+choices.length+5));const shift=i%4;const ordered=rotate(choices,shift) as [string,string,string,string];out.push({id:`g-${String(idStart+i).padStart(5,'0')}`,category:'matematica',topic:'problemas-rapidos',concept:'Cálculo aplicado',question:`${numericPrefix(i)}${question}`,choices:ordered,answer:ordered.indexOf(String(correct)),fact,tracks:['exatas','enem','concursos'],difficulty:kind>=3?'medio':'facil'});}return out;}

function numericReasoning(count:number,idStart:number):Question[]{const out:Question[]=[];for(let i=0;i<count;i++){const a=2+(i%15),b=2+((i*5)%12);const type=i%4;let question='',correct='',fact='',opts:string[]=[];
  if(type===0){correct=String(a*b);question=`Se cada uma de ${a} equipes possui ${b} pessoas, quantas pessoas há ao todo?`;fact=`${a} grupos de ${b} correspondem a ${a}×${b}=${correct}.`;opts=[correct,String(a+b),String(a*b+b),String(Math.max(1,a*b-a))];}
  else if(type===1){const total=a*b;correct=String(a);question=`${total} itens foram divididos igualmente em ${b} grupos. Quantos itens ficaram em cada grupo?`;fact=`${total}÷${b}=${a}.`;opts=[correct,String(b),String(a+b),String(a*b)];}
  else if(type===2){correct='Alguns A podem ser C';question='Se todo A é B e alguns B são C, qual conclusão é logicamente possível sem ser obrigatória?';fact='Das premissas não decorre que todo A seja C, mas é possível que alguns A pertençam também a C.';opts=[correct,'Todo A é C','Nenhum A é C','Todo C é A'];}
  else {correct='A proposição original é falsa';question='Se a negação de uma proposição é verdadeira, o que se conclui sobre a proposição original?';fact='Uma proposição e sua negação têm valores lógicos opostos.';opts=[correct,'A proposição original é verdadeira','As duas são verdadeiras','Nada pode ser concluído'];}
  const ordered=four(opts,correct,i);out.push({id:`g-${String(idStart+i).padStart(5,'0')}`,category:'raciocinio',topic:'logica-e-proporcao',concept:'Raciocínio lógico',question:`${numericPrefix(i)}${question}`,choices:ordered,answer:ordered.indexOf(correct),fact,tracks:['concursos','enem','exatas'],difficulty:type>=2?'medio':'facil'});}return out;}

function numericPhysics(count:number,idStart:number):Question[]{const out:Question[]=[];for(let i=0;i<count;i++){const type=i%4;let question='',correct='',fact='',opts:string[]=[];
  if(type===0){const v=5+(i%25),t=2+((i*3)%12),d=v*t;correct=`${d} m`;question=`Um corpo move-se com velocidade constante de ${v} m/s por ${t} s. Qual distância percorre?`;fact=`No movimento uniforme, d=v·t=${v}×${t}=${d} m.`;opts=[correct,`${v+t} m`,`${d+t} m`,`${Math.max(1,d-v)} m`];}
  else if(type===1){const m=2+(i%18),a=1+((i*5)%8),f=m*a;correct=`${f} N`;question=`Uma força resultante produz aceleração de ${a} m/s² em uma massa de ${m} kg. Qual é a força?`;fact=`Pela segunda lei de Newton, F=m·a=${m}×${a}=${f} N.`;opts=[correct,`${m+a} N`,`${f+a} N`,`${Math.max(1,f-m)} N`];}
  else if(type===2){const p=100+(i%20)*25,t=2+(i%9),e=p*t;correct=`${e} J`;question=`Um dispositivo opera com potência de ${p} W durante ${t} s. Qual energia transfere nesse intervalo?`;fact=`Energia = potência × tempo = ${p}×${t}=${e} J.`;opts=[correct,`${p+t} J`,`${Math.floor(p/t)} J`,`${e+t*10} J`];}
  else {const freq=2+(i%18),period=(1/freq).toFixed(2);correct=`${period} s`;question=`Uma oscilação tem frequência de ${freq} Hz. Aproximadamente qual é seu período?`;fact=`Período e frequência são inversos: T=1/f=1/${freq}≈${period} s.`;opts=[correct,`${freq} s`,`${(freq/2).toFixed(2)} s`,`${(1/(freq+2)).toFixed(2)} s`];}
  const ordered=four(opts,correct,i);out.push({id:`g-${String(idStart+i).padStart(5,'0')}`,category:'fisica',topic:'fisica-aplicada',concept:'Relações físicas',question:`${numericPrefix(i)}${question}`,choices:ordered,answer:ordered.indexOf(correct),fact,tracks:['exatas','enem','faculdade'],difficulty:type===3?'medio':'facil'});}return out;}

function numericChemistry(count:number,idStart:number):Question[]{const out:Question[]=[];for(let i=0;i<count;i++){const type=i%4;let question='',correct='',fact='',opts:string[]=[];
  if(type===0){const mol=1+(i%8),mass=18*mol;correct=`${mass} g`;question=`Considerando massa molar da água igual a 18 g/mol, qual massa corresponde a ${mol} mol de H₂O?`;fact=`m=n·M=${mol}×18=${mass} g.`;opts=[correct,`${mol+18} g`,`${18/mol} g`,`${mass+18} g`];}
  else if(type===1){const ph=2+(i%10);correct=ph<7?'Ácida':ph===7?'Neutra':'Básica';question=`Uma solução apresenta pH ${ph}. Como ela é classificada na escala usual de pH?`;fact=`Em condições usuais, pH abaixo de 7 indica acidez, 7 neutralidade e acima de 7 basicidade.`;opts=[correct,'Ácida','Neutra','Básica'].filter((x,j,a)=>a.indexOf(x)===j);while(opts.length<4)opts.push('Não é possível classificar');}
  else if(type===2){const c=2+(i%9),v=1+(i%5),n=c*v;correct=`${n} mol`;question=`Uma solução idealizada tem concentração de ${c} mol/L e volume de ${v} L. Quantos mols de soluto ela contém?`;fact=`n=C·V=${c}×${v}=${n} mol.`;opts=[correct,`${c+v} mol`,`${c/v} mol`,`${n+v} mol`];}
  else {correct='Perda de elétrons';question='Em uma reação de oxirredução, o que caracteriza oxidação de uma espécie?';fact='Oxidação corresponde à perda de elétrons; redução corresponde ao ganho de elétrons.';opts=[correct,'Ganho de elétrons','Ganho de prótons em qualquer situação','Redução do número de átomos'];}
  const ordered=four(opts,correct,i);out.push({id:`g-${String(idStart+i).padStart(5,'0')}`,category:'quimica',topic:'quimica-aplicada',concept:'Química aplicada',question:`${numericPrefix(i)}${question}`,choices:ordered,answer:ordered.indexOf(correct),fact,tracks:['exatas','enem','faculdade'],difficulty:type===2?'medio':'facil'});}return out;}

function numericAccounting(count:number,idStart:number):Question[]{const out:Question[]=[];for(let i=0;i<count;i++){const assets=1000+(i%80)*250,liab=200+(i%30)*100,equity=assets-liab;const correct=`R$ ${equity.toLocaleString('pt-BR')}`;const question=`Uma entidade apresenta ativos de R$ ${assets.toLocaleString('pt-BR')} e passivos de R$ ${liab.toLocaleString('pt-BR')}. Pela equação patrimonial, qual é o patrimônio líquido?`;const fact=`Ativo = Passivo + Patrimônio Líquido; logo PL = ${assets} - ${liab} = ${equity}.`;const opts=[correct,`R$ ${(assets+liab).toLocaleString('pt-BR')}`,`R$ ${liab.toLocaleString('pt-BR')}`,`R$ ${(equity+100).toLocaleString('pt-BR')}`];const ordered=four(opts,correct,i);out.push({id:`g-${String(idStart+i).padStart(5,'0')}`,category:'contabilidade',topic:'equacao-patrimonial',concept:'Equação patrimonial',question:`${numericPrefix(i)}${question}`,choices:ordered,answer:ordered.indexOf(correct),fact,tracks:['concursos','faculdade','exatas'],difficulty:'facil'});}return out;}

function numericEconomy(count:number,idStart:number):Question[]{const out:Question[]=[];for(let i=0;i<count;i++){const price=100+(i%50)*10,rate=5+((i*3)%20),final=price*(1+rate/100);const correct=`R$ ${final.toFixed(2).replace('.',',')}`;const question=`Um preço de R$ ${price.toFixed(2).replace('.',',')} aumenta ${rate}%. Qual passa a ser o novo valor, desconsiderando arredondamentos adicionais?`;const fact=`Novo valor = ${price}×(1+${rate}/100) = ${final.toFixed(2)}.`;const opts=[correct,`R$ ${(price+rate).toFixed(2).replace('.',',')}`,`R$ ${(price*(1-rate/100)).toFixed(2).replace('.',',')}`,`R$ ${(final+10).toFixed(2).replace('.',',')}`];const ordered=four(opts,correct,i);out.push({id:`g-${String(idStart+i).padStart(5,'0')}`,category:'economia',topic:'percentuais-e-inflacao',concept:'Variação percentual',question:`${numericPrefix(i)}${question}`,choices:ordered,answer:ordered.indexOf(correct),fact,tracks:['concursos','enem','brasil','humanas'],difficulty:'facil'});}return out;}

function numericEngineering(count:number,idStart:number):Question[]{const out:Question[]=[];for(let i=0;i<count;i++){const force=1000+(i%20)*500,area=1+(i%9),stress=force/area;const correct=`${stress.toFixed(0)} Pa`;const question=`Uma força normal de ${force} N atua uniformemente sobre uma área de ${area} m². Qual é a tensão média idealizada?`;const fact=`Tensão média = força/área = ${force}/${area} ≈ ${stress.toFixed(0)} Pa.`;const opts=[correct,`${(force*area).toFixed(0)} Pa`,`${(force+area).toFixed(0)} Pa`,`${(stress+100).toFixed(0)} Pa`];const ordered=four(opts,correct,i);out.push({id:`g-${String(idStart+i).padStart(5,'0')}`,category:'engenharia',topic:'mecanica-basica',concept:'Tensão média',question:`${numericPrefix(i)}${question}`,choices:ordered,answer:ordered.indexOf(correct),fact,tracks:['faculdade','exatas'],difficulty:'medio'});}return out;}

export function buildMassiveQuestions(legacy:Question[]):Question[]{
  const seeds=[...legacy.map(fromQuestion),...healthSeeds,...revalidaSeeds,...broadExtraSeeds];
  const all:Question[]=[];let id=1;
  const special:Partial<Record<CategoryId,(count:number,idStart:number)=>Question[]>>={matematica:numericMath,raciocinio:numericReasoning,fisica:numericPhysics,quimica:numericChemistry,contabilidade:numericAccounting,economia:numericEconomy,engenharia:numericEngineering};
  for(const [category,count] of Object.entries(GENERATED_QUESTION_QUOTAS) as [CategoryId,number][]){
    const custom=special[category];const customCount=custom?Math.min(count,Math.ceil(count*0.72)):0;
    if(custom&&customCount){const part=custom(customCount,id);all.push(...part);id+=part.length;}
    const remain=count-customCount;if(remain){const part=generatedFromSeeds(category,remain,seeds,id);all.push(...part);id+=part.length;}
  }
  if(all.length!==10000)throw new Error(`Expected 10000 generated questions, got ${all.length}`);
  return all;
}
