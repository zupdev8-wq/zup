## 2.0.0 - 20/10/2026 - Seeds de perguntas e explicacoes, sem build por publicacao

- Backend com versoes de conteudo por categoria no PostgreSQL, manifest publico e endpoints de pacotes HTTPS.
- Publicacao autenticada de perguntas e aulas completas por linha de comando, com validacao editorial, mesclagem por ID, historico e rollback.
- App sincroniza perguntas, respostas explicadas, aulas e Ler mais, priorizando interesses, consulta temas sob demanda e mantem cache local com fallback offline.
- A sessao ativa nao e alterada no meio do quiz; progresso, XP e IDs permanecem intactos.
- Primeira build com este codigo e deploy de backend necessarios uma vez; futuros seeds nao requerem build nova.
- Nota: nenhuma nova pergunta comercial/prova externa foi inventada ou importada nesta etapa; direitos autorais e revisao humana seguem indispensaveis.
- Instrucoes: docs/ATUALIZAR-CONTEUDO-SEM-BUILD.md.

## 1.8.0 — 20/10/2026 — Curiosidades de acervo existente, fontes e zero templates em jogo

- Novo modo “Curiosidades divertidas” com 24 questões pt-BR adaptadas da Open Trivia Database (CC BY-SA 4.0), mais 2 curiosidades sustentadas por WWF e Guinness.
- Informações de origem e link no feedback; atribuição clara da licença e separação entre trivia e simulados acadêmicos.
- Links para provas e gabaritos oficiais do Inep sem republicar enunciados de concursos, livros ou plataformas comerciais sem autorização.
- Abertura de sessões antigas `g-*`/`x-*` bloqueada, preservando XP, IDs e históricos antigos.
- Imagens das perguntas mostram ilustração de categoria durante o carregamento e no erro, evitando cartões vazios.
- 96 testes mobile + 5 API passaram; testes de compilação estrita da UI e revisão editorial humana ainda necessários para lançamento.

# Changelog

## 17/10/2026  -  Leituras complementares e estudo ativo (base 1.7.1)

- integra em **Ler mais** uma bibliografia orientada por assunto em todas as 94 aulas;
- registra 109 indicações: livros, artigos científicos com DOI e documentos oficiais com links seguros;
- acrescenta 15 desafios de autoexplicação com pista voluntária;
- ajusta a linguagem do feedback e valida renderização de novas interfaces;
- publica um plano pedagógico de revisão humana, trilhas, feedback e aprendizagem mensurável;
- não altera APIs, IDs, contas, configurações EAS, monetização nem progresso persistido.

## 17/10/2026 — Pacote editorial sem repetição (mantém base 1.7.1)

- publica somente aulas editoriais completas, cobrindo 44 categorias, com seção opcional "Ler mais";
- retira do feed fichas com texto genérico ou definições reapresentadas;
- retira 10 mil variações automáticas e duplas de definições das partidas (IDs ainda preservados no histórico);
- acrescenta 79 questões autorais com situações práticas, cálculo e interpretação;
- evita repetir definição no resumo, no desenvolvimento, na conclusão e na explicação do quiz;
- não recicla perguntas já respondidas nem no modo Revisão; usa outro exercício relacionado se houver;
- expõe no feed apenas conteúdos ainda não vistos/aprendidos, mantendo a Biblioteca;
- atualiza textos informativos e cria testes automáticos de duplicidade de conteúdo;
- preserva versões, bundle IDs, perfis EAS, API, recursos gratuitos e navegação.


## 1.7.1 — primeira release gratuita para lojas

- remove a entrada de Premium e qualquer checkout da navegação do app;
- libera Simulado Inteligente e Maratona de 10 perguntas gratuitamente;
- mantém a implementação de Premium/Mercado Pago apenas como código dormente para atualização futura;
- atualiza páginas públicas de privacidade, termos, suporte e exclusão de dados para refletir a versão gratuita;
- corrige novamente a emenda horizontal do feed usando um único degradê SVG contínuo;
- preserva as 10.960 questões e o conteúdo ampliado de Medicina/Revalida e demais áreas;
- vincula `app.json` ao projeto EAS `@zupdev8-wq/zup`.

## 1.7.0 — Banco de 10 mil novas questões + Revalida + anatomia visual

- preserva as 960 questões anteriores e adiciona 10.000 novas (10.960 totais);
- 44 categorias e 21 trilhas;
- nova categoria/trilha Revalida com 600 questões e casos educacionais;
- medicina, farmacologia, enfermagem e biomedicina ampliadas sem dominar o catálogo;
- 286 questões com imagens didáticas específicas e fonte vinculada;
- quiz prioriza diversidade de conceitos antes de repetir variações do mesmo tema;
- presets de Simulado Inteligente para Revalida;
- páginas públicas de privacidade, termos, suporte, contato e exclusão preservadas;
- botão flutuante amarelo de retomada removido do feed.

## 1.7.0 — Premium sem login + recuperação + banco de imagens ampliado

- remove coleta de e-mail do fluxo Premium;
- identifica o jogador por `playerId` anônimo + token no SecureStore;
- adiciona código de recuperação `ZUP-XXXX-XXXX-XXXX`;
- restauração transfere o Premium para o novo aparelho e gira token/código;
- código só aparece após ativação, restauração ou pedido explícito do usuário;
- checkout único do Mercado Pago deixa Pix/cartão no ambiente do provedor;
- mantém Premium autoritativo no backend por `premium_until`;
- banco visual passa a ter mais de 90 fotos reais únicas e seleção variada por card;
- feed usa variante visual por posição para reduzir repetição de imagens.

## 1.5.0 — Premium real + Mercado Pago + Simulado Inteligente

- Premium passa a ser autorizado exclusivamente pelo backend.
- R$ 9,99 libera 30 dias; expiração bloqueia automaticamente recursos Premium.
- Pix com QR Code/copia-e-cola via Mercado Pago.
- Cartão via checkout hospedado pelo Mercado Pago.
- webhook assinado e reconciliação server-to-server.
- estado Premium local antigo não concede acesso.
- Simulado Inteligente Premium com 20, 45 ou 60 questões.
- pesquisa/descrição por banca, órgão, cidade, cargo, curso e matérias.
- presets para Cebraspe, Câmara, Prefeitura, carreiras policiais, fiscal, saúde, TI, engenharia, OAB, ENEM e cursos universitários.
- explicações curtas após cada questão.
- questões já respondidas permanecem fora da rotação normal.
- estrutura de quiz adaptada para sessões longas.

## 1.4.1 — Feed estável

- feed deixa de reordenar enquanto o usuário apenas visualiza/salva cards;
- correções de JSX e estabilidade.
