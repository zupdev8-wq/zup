# Changelog

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
