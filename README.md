# ZUP! 2.1.0 — Neon PostgreSQL + seeds de perguntas e explicações sem nova build

ZUP! é um app/jogo de conhecimento em Expo SDK 57 com feed vertical, microaprendizados, quizzes, revisão espaçada, biblioteca, gamificação e simulados.



## Migração Neon Free e planilha de curadoria — 20/10/2026

- Guia obrigatório: **`docs/NEON-RENDER-E-CURADORIA.md`**. Nenhuma credencial ou dado foi enviado ao Neon; ainda é necessário configurar Render, criar Neon e fazer o deploy.
- Banco recebido: **20.622 candidatas, 0 aprovadas**. Nenhuma questão não revisada foi colocada em partidas. A aba Excel de cinco opções agora é aceita integralmente.
- Para gerar seeds depois da revisão: `scripts/export-curadoria-xlsx.py` e `scripts/prepare-curadoria-seeds.cjs`. Auditoria recebida: `docs/CURADORIA-RECEBIDA-20-10-2026.json`.
- No backend, `DB_PROVIDER=neon`, `DATABASE_URL` pooled SSL, `DB_POOL_MAX=3` e `ZUP_CONTENT_REVISION_LIMIT=3` (backup independente recomendado).
- Esta versão exige build nova para suportar cinco alternativas; futuras mudanças apenas de perguntas/aulas serão feitas por seed.

## Conteudo dinamico publicado pelo backend (20/10/2026)

- Apos uma unica build que inclui esta integracao, perguntas **e explicacoes completas** sao atualizadas por seeds versionados no Neon PostgreSQL, servidos pela API hospedada no Render sem gerar novas builds do Expo.
- Atualiza resumo, corpo, "Ler mais", atividade, exemplo, bibliografia, questoes, alternativas, gabarito e justificativa.
- Manifest + pacotes separados por categoria, cache limitado dos temas recentes, fallback local e sincronizacao por interesses e ao abrir materia.
- Revisoes imutaveis (janela de retencao configuravel), rollback e controle de publicacao concorrente. Publicacao autenticada com `ZUP_CONTENT_ADMIN_TOKEN` de 32+ caracteres; nenhum segredo no aplicativo.
- Importacao de CSV autorizado (`scripts/prepare-content-seed.cjs`) ou aulas em JSON; `scripts/publish-content-seed.cjs --check|--publish|--list|--rollback`.
- **Leia `docs/ATUALIZAR-CONTEUDO-SEM-BUILD.md` antes de publicar.** Sem `DATABASE_URL` configurado, a API de conteudo responde 503 e o app continua com o acervo embarcado.
- Esta release adiciona a **infraestrutura**, nao milhares de perguntas novas nem explicacoes ja publicadas no servidor.

## Feed personalizado e preparacao para grandes bancos (20/10/2026)

- O **Pra voce** intercala aproximadamente **4 cards dos interesses selecionados e 1 de descoberta** a cada 5, enquanto ha conteudo disponivel. Prefencias com pouco acervo recebem menos; o app nao finge ter centenas de perguntas.
- O feed pode exibir **aulas ou curiosidades de fontes identificadas**. Escolher Livros, Games ou Esportes da prioridade aos respectivos cartoes, mesmo sem aula editorial pronta.
- Perfil e onboarding liberam 25 trilhas de interesses (incluindo Livros, Cinema, Series, Games, Esportes, Musica, Animais e Ciencia).
- Cartoes de perguntas entram no quiz pelo item exato e saem do feed depois de respondidos, mantendo XP e historico de progresso.
- O importador **nao cria perguntas**: `node scripts/import-question-bank.cjs perguntas.csv --check` valida um banco de perguntas existentes autorizado e revisado. Use `--write` somente depois de corrigir erros e instalar as dependencias em `app`.
- A importacao conserva ID estavel, enunciado, 4 ou 5 alternativas, gabarito, tema/subtema, obra/universo, explicacao, fonte, licenca e justificativa documental de reutilizacao. Livros atuais e livros classicos podem ocupar diferentes universos literarios.
- Meta editorial: **700 a 1.000 perguntas por categoria**. O projeto **nao chegou a esse numero**: as 26 curiosidades anteriores continuam sendo o primeiro pequeno lote; a planilha-modelo separada deve ser preenchida com material licenciado antes de ampliar o app.
- Leia `docs/IMPORTACAO-DE-PERGUNTAS.md` antes de reutilizar perguntas de livros, sites, jogos ou provas. Credito nao e permissao de copia.

## Estado desta release

- **44 matérias, aulas editoriais com botão “Ler mais” e exercícios selecionados sem definições repetidas**. As milhares de fichas automáticas originais permanecem apenas no acervo histórico para preservar IDs e progresso.
- Medicina, Farmacologia, Anatomia e **Revalida** reforçados sem tirar o foco das demais áreas.
- ENEM, concursos, faculdade, humanas, exatas, biológicas, tecnologia, negócios, direito, Brasil, cultura, entretenimento, religiões e pensamento crítico.
- Simulado Inteligente de 20, 45 ou 60 questões, limitado à disponibilidade de itens inéditos das áreas escolhidas.
- Maratona de 10 perguntas.
- Imagens didáticas em questões compatíveis, inclusive anatomia.
- Feed fullscreen com degradê contínuo, sem a emenda horizontal antiga.
- Sem botão flutuante amarelo de retomada no feed.
- Sem anúncios.
- Sem cadastro obrigatório.
- **Todos os recursos desta primeira versão de loja estão gratuitos.**
- **Nenhuma tela de Premium, Mercado Pago ou compra é exposta pelo app 1.8.0.**

## Conteúdo revisado (17/10/2026)

- O feed oferece somente aulas que receberam curadoria e explicações específicas; não mostra fichas criadas por templates.
- As definições não são reproduzidas em resumo, corpo, bloco final ou revisão. O botão **Ler mais** desenvolve consequências, exemplos e comparações.
- Aulas já visualizadas saem da rotação futura, mas continuam na Biblioteca.
- A revisão usa outras situações práticas ainda não respondidas. Se não existir material novo, não repete o exercício anterior.
- As **79 questões situacionais novas** estão em `app/src/scenarioQuestions.ts`; o conjunto liberado é propositalmente menor que o catálogo histórico.
- Consulte `docs/CURADORIA-SEM-REPETICAO.md` para as regras editoriais e os limites dos filtros automáticos.

## Conteúdo editorial sem repetição

- **94 aulas completas** em 44 categorias, cada uma com resumo, explicação e seção opcional *Ler mais*.
- Resumo apresenta a ideia central **uma única vez**. O texto expandido deve acrescentar casos, nuances, limites e comparações; a ficha de memorização não reescreve a definição.
- **62 exercícios de aplicação inéditos** vinculados a aulas específicas nesta atualização. Quando só há 1 ou 2 boas perguntas para determinado assunto, a interface informa o número real; não inventa 5 por obrigação.
- Questões geradas por variações de frases (`g-*` e `x-*`) permanecem apenas para compatibilidade com progresso antigo, **fora das partidas, revisões e simulados**.
- O sistema não recicla perguntas ou justificativas já concluídas nem reapresenta uma aula aberta no feed. A Biblioteca continua permitindo releitura **voluntária** de itens salvos.
- Não há garantia de detecção semântica perfeita por algoritmo; novos conteúdos devem passar por auditoria editorial e pelo teste de similaridade antes de publicação.

## Leituras complementares e estudo ativo (17/10/2026)

- **94 aulas com Leituras complementares** dentro de "Ler mais": 109 referências bibliográficas e institucionais, com uma orientação específica para cada leitura.
- Livros apresentam nome e autor, com link apenas quando há uma URL de acesso conhecida; artigos científicos apresentam DOI; documentos legais e institucionais apontam para fontes oficiais.
- **15 desafios de autoexplicação** com pista oculta até o aluno pedir ajuda, sem reproduzir definições.
- Linguagem do feedback de resposta atualizada para orientar raciocínio em vez de premiar acertos mecanicamente.
- `docs/PLANO-PEDAGOGICO-ZUP.md` explica o modelo pedagógico, as limitações atuais e o caminho para revisão humana, trilhas por pré-requisitos e validação com estudantes.

## Perguntas externas e modos separados (20/10/2026)

- **26 curiosidades com origem identificada**: 24 perguntas de uma base pré-existente da Open Trivia Database, sob CC BY-SA 4.0, traduzidas/adaptadas para português, e 2 curiosidades verificadas em fontes institucionais.
- **Descobrir & Jogar** na aba Quiz: apenas perguntas do acervo com fonte; roda até 5 sem repetir; a fonte aparece após responder.
- **Estudar e Simulado Inteligente** ficam separados do modo de curiosidades; essa atualização **não** inclui questões oficiais copiadas de concursos.
- **Provas originais para estudo**: links externos para cadernos e gabaritos do Inep (ENEM/Encceja), sem reproduzir obras protegidas.
- Perguntas antigas geradas com templates `g-*` e `x-*` ficam fora dos quizzes, simulados e revisões; uma partida legada em andamento com esses IDs é descartada sem apagar progresso, XP ou respostas já registradas.
- Não contamos perguntas geradas por templates como questões jogáveis. Não há reposição por frases semelhantes quando o lote se esgota.
- Referências, licença, créditos e limitações: `docs/FONTES-QUESTOES-EXTERNAS.md`. Plano de ampliação: `docs/PROXIMOS-ACERVOS-REAIS.md`.
- **Importante**: as traduções e respostas adaptadas ainda requerem uma revisão editorial humana antes de publicação em larga escala.

## Monetização futura

A implementação anterior de Premium, recuperação e Mercado Pago foi mantida no repositório apenas como base técnica para uma atualização futura. Ela não é importada pelo `App.tsx` desta release e não fica acessível pela navegação do aplicativo.

Quando a monetização for reativada, a integração deve ser revisada de acordo com as regras vigentes da App Store e Google Play antes de uma nova submissão.

## Projeto EAS

Owner: `zupdev8-wq`

Projeto: `@zupdev8-wq/zup`

O `app/app.json` já contém o `extra.eas.projectId` vinculado ao projeto EAS criado para o ZUP.

## URLs públicas

- API: `https://zup-api.onrender.com`
- Privacidade: `https://zup-api.onrender.com/privacy`
- Termos: `https://zup-api.onrender.com/terms`
- Suporte: `https://zup-api.onrender.com/support`
- Contato: `https://zup-api.onrender.com/contact`
- Exclusão de dados: `https://zup-api.onrender.com/delete-data`
- E-mail: `zupdev8@gmail.com`

## Rodar localmente

```powershell
cd app
npm install
npx expo start --go -c
```

## Validar antes da build

```powershell
cd ..
npm test
npm run release:check
```

## Build de produção

Depois de confirmar as variáveis `EXPO_PUBLIC_*` no ambiente `production` do EAS:

```powershell
cd app
eas build --platform all --profile production
```

O iOS gera a build para App Store Connect e o Android gera o AAB para Google Play.
