> **Atualização 2.1:** leia primeiro `docs/NEON-RENDER-E-CURADORIA.md` para Neon Free, questões de 5 alternativas, limite de revisões e uso da planilha recebida.

# ZUP! - sementes (seeds) para perguntas e explicacoes sem nova build

## O que e atualizado

Um seed publica dados com revisao por materia: **questoes, alternativas, gabaritos, justificativas (`fact`), aulas, resumos, exemplos, "Ler mais", desafios, bibliografia e links de leituras complementares**. O aplicativo baixa pacotes conforme os interesses escolhidos e a categoria aberta. O app conserva uma copia local **limitada aos pacotes recentes, aproximadamente 3 MB** (Android AsyncStorage tem limite por padrao). Se nao ha internet, o conteudo ja baixado permanece; os demais temas usam as aulas e perguntas originalmente embarcadas no aplicativo. Nenhuma revisao apaga XP, historico, respostas ou conteudos salvos.

Uma pergunta ou aula corrigida mantem o mesmo `id`: nao deve receber novo ID para tentar aumentar a contagem. Para remover uma questao incorreta, publicar o ID em `retiredQuestionIds`. Para tirar uma aula, publicar o ID em `retiredLessonIds`. Historicos com esses IDs continuam no progresso do estudante, sem recontar XP. A retirada so afeta a apresentacao e a selecao futura. A atualizacao de um gabarito so e aplicada fora de um quiz em andamento.

## Configuracao inicial - uma unica vez

1. Fazer o deploy do backend `api` atualizado no Render e adicionar um **Neon PostgreSQL persistente** via `DB_PROVIDER=neon` e `DATABASE_URL` (URL pooled SSL). O endpoint de conteudo responde 503 se esse banco nao estiver configurado. A estrutura de dados e criada automaticamente no inicio do backend.
2. No terminal local (PowerShell), gerar uma chave forte:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

3. Guardar o valor no Render (Environment) como `ZUP_CONTENT_ADMIN_TOKEN` e tambem no terminal local durante a publicacao: `$env:ZUP_CONTENT_ADMIN_TOKEN="CHAVE_GERADA"`. **Nao** colocar em `EXPO_PUBLIC_*`, repo Git, screenshot ou build. Reiniciar/redeploy do backend apos salvar.
4. Distribuir **uma ultima build do app com o mecanismo de sincronizacao**. Builds anteriores nao conhecem os novos endpoints e nao recebem seeds; a partir dai, *alteracoes de conteudo* nao precisam de nova build.
5. Opcionalmente especificar `ZUP_CONTENT_API_URL` no terminal se usar URL diferente de `https://zup-api.onrender.com` (o cliente usa `EXPO_PUBLIC_CONTENT_URL` / `EXPO_PUBLIC_API_URL`).

## A) Publicar lotes de perguntas existentes

Prepare o CSV UTF-8 com as colunas do modelo `docs/MODELO-BANCO-PERGUNTAS-ZUP.xlsx`. Cada linha precisa estar **aprovada por um revisor** e ter origem e direito de uso conferidos. A conversao nao gera perguntas nem declara direitos por conta propria. Na pasta raiz `zup-main`:

```powershell
node scripts/prepare-content-seed.cjs .\perguntas.csv --out .\seeds --reviewer "NOME DO REVISOR" --confirm-accuracy --confirm-rights
node scripts/publish-content-seed.cjs --check .\seeds\literatura.json
node scripts/publish-content-seed.cjs --publish .\seeds\literatura.json
```

`--confirm-accuracy` e `--confirm-rights` sao declaracoes de quem publica: a ferramenta nao consegue verificar legalidade ou qualidade editorial automaticamente. Para 700-1.000 perguntas por materia, faca um arquivo por materia e publique quantas revisoes forem necessarias. Cada versao aceita ate 1.200 perguntas/250 aulas e ate 8 MB de JSON por materia.

## B) Atualizar uma explicacao, "Ler mais" ou leitura complementar

O seed tem o **mesmo formato** e pode conter `questions: []` e `lessons: [ ... ]`. Uma aula pode conter, dentre outros, os campos:

- `id`: o ID **ja utilizado** pela aula, por exemplo `lesson-brasil-02`, para atualizar a mesma aula sem perder os salvos.
- `category`, `tracks`, `quizQuestionId`: categoria, trilhas e ID de uma pergunta existente ou publicada no mesmo seed.
- `title`, `hook`, `summary`, `body` (array de paragrafos), `takeaway`, `updatedAt`, `evergreen`, `minutes`: textos da aula.
- `readMore: { heading, sections: [{ title, text }] }`: aprofundamento opcional.
- `recommendedReadings: [{ kind, title, creators, focus, url? }]`: livros, artigos ou fontes primarias (links somente HTTPS).
- `selfCheck: {question, hint}`: atividade de recuperacao ativa.
- `sources: [{title,url}]`: pelo menos uma fonte rastreavel (HTTPS).

Veja `docs/content-seeds/EXEMPLO-AULA-NAO-PUBLICAR.json`. Edite os campos e preencha a revisao humana depois de verificar os fatos e os direitos; o arquivo modelo **e bloqueado** enquanto as duas verificacoes forem `false`.

```powershell
node scripts/publish-content-seed.cjs --check .\meu-seed-aula.json
node scripts/publish-content-seed.cjs --publish .\meu-seed-aula.json
```

O publicador **mescla por ID** com as questoes e aulas existentes no servidor dessa categoria; um seed so de explicacoes nao remove o banco de perguntas. Alteracoes de aulas e questoes sao publicadas em uma revisao atomica no PostgreSQL. A revisao publicada deve conter o estado completo do acervo do servidor naquela categoria, montado pelo publicador automaticamente.

## C) Verificar, desfazer e monitorar

O manifest publico esta em `https://zup-api.onrender.com/v1/content/manifest`. Cada categoria tem uma revisao. O pacote e acessado em `/v1/content/bundles/literatura?revision=NUMERO` (HTTPS, sem login de usuario). Para listar revisoes e fazer rollback autorizado:

```powershell
node scripts/publish-content-seed.cjs --list literatura
node scripts/publish-content-seed.cjs --rollback literatura 12 --confirm
```

Informe um numero real mostrado em `--list`. Rollback **nao exclui** revisoes posteriores; ele apenas muda o apontador da versao ativa no banco. Os aparelhos recebem a versao restaurada na sincronizacao seguinte, preservando o progresso.

### Limites importantes

- **O backend precisa estar implantado e com PostgreSQL**; gerar JSON localmente nao atualiza o app por si so.
- A sincronizacao automatica ocorre na inicializacao, ao voltar ao app e ao abrir um tema. Ela consulta apenas os temas prioritarios e baixa outros sob demanda, evitando o download de dezenas de milhares de perguntas de uma vez. Se a conexao falhar, nao desativa o acervo local.
- Novos **temas** que ainda nao existem no tipo `CategoryId`, alteracoes de layout, bibliotecas ou funcionalidades ainda requerem atualizacao do codigo e build (ou estrategia separada de OTA compativel com as regras das lojas).
- URLs de imagem ou recursos externos devem possuir direitos de uso. O sistema nao baixa executaveis, nao roda codigo remoto e rejeita URLs sem HTTPS em fontes/editoriais.
- Um registro de licenca no banco **nao cria permissao de copia**; confirmar os direitos de cada origem antes de publicar. Aprovacao humana e validação factual continuam obrigatorias.
