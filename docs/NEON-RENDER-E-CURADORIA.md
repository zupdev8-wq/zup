# ZUP! 2.1.0 — Neon Free + Render + seeds de perguntas e explicações

## Estado desta entrega (20/10/2026)

A estrutura foi preparada **localmente** e testada sem credenciais reais. **Neon e Render NÃO foram configurados neste ambiente**; nenhum banco de dados foi criado, nenhuma pergunta foi publicada e nenhum conteúdo de produção foi alterado. O aplicativo continuará com o acervo embarcado até que se faça o deploy e publique um seed realmente aprovado.

Arquitetura: iPhone/Android -> API HTTPS no Render -> Neon PostgreSQL (URL pooled, TLS validado). Apenas a API conhece `DATABASE_URL`, senha PostgreSQL e `ZUP_CONTENT_ADMIN_TOKEN`.

O mesmo seed remoto já aceita perguntas, justificativas, aulas completas, seções "Ler mais", exemplos e leituras complementares. O app identifica as revisões via `GET /v1/content/manifest`; faz download por tema; usa cache limitado e fallback offline. IDs estáveis preservam XP e histórico. O publicador cria revisões por categoria, permite rollback das versões retidas e agora detecta conflitos de publicação (HTTP 409), para evitar sobrescrever uma revisão concorrente.

**Importante:** a versão 2.1 aceita tanto 4 quanto 5 alternativas, inclusive toque na alternativa E, gabarito, retomada de sessão e simulados. Essa parte do app requer uma build que inclua o código 2.1; depois, alterar apenas os conteúdos não requer nova build. Categorias totalmente novas ou mudanças no aplicativo ainda exigem atualização de código.

## 1. Configurar Neon Free (uma vez)

1. Acesse https://console.neon.tech/ e crie um projeto exclusivo `zup-prod` numa região próxima à instância Render. Use Free enquanto os limites atenderem.
2. Abra **Connect** e selecione **Pooled connection**. Copie a connection string do PostgreSQL. O host costuma incluir `-pooler` e terminar em `.neon.tech`.
3. No serviço da API ZUP! do **Render**, configure estas variáveis em **Environment**:

```env
DB_PROVIDER=neon
DATABASE_URL=postgresql://USUARIO:SENHA@HOST-POOLER.neon.tech/neondb?sslmode=require
DB_POOL_MAX=3
ZUP_CONTENT_REVISION_LIMIT=3
ZUP_CONTENT_ADMIN_TOKEN=CHAVE_ALEATORIA_DE_64_CARACTERES_HEX
PUBLIC_API_URL=https://zup-api.onrender.com
```

A URL e a chave no exemplo são **placeholders**. Cole os valores reais no Render, NUNCA no código-fonte, no Git nem em `EXPO_PUBLIC_*`. Para gerar a chave:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

A conexão lê os campos da URL e impõe TLS verificado no driver `pg`; parâmetros `sslmode=disable`, `allow` e `prefer` são rejeitados. As conexões ativas são limitadas a 3 por padrão e ficam ociosas por pouco tempo. Se o Neon incluir `channel_binding=require`, ele é habilitado no driver. Nunca use `rejectUnauthorized:false`.

4. Faça o deploy do backend atualizado. Se o Render usa `Root Directory=api`, mantenha Build Command `npm install` e Start Command `npm start` (ou o seu fluxo equivalente). O servidor cria tabelas na inicialização. Confira `https://zup-api.onrender.com/v1/content/manifest` — quando configurado, responde com `categories: []` até a primeira publicação.
5. Publique conteúdos **somente após confirmar os direitos e gabaritos**. O backend deve continuar acessível enquanto o Neon Free entra e sai de repouso; uma primeira conexão poderá demorar mais.

**Migrar um PostgreSQL anterior:** caso já exista banco com jogadores, pagamentos ou progresso na API, faça primeiro um backup/migração com `pg_dump` e `pg_restore` e compare contagens. Trocar `DATABASE_URL` sem migrar os registros faria o novo banco parecer vazio. Não faça uma troca em produção sem essa verificação. Esse processo não está automatizado nesta entrega.

**Limites e custos:** Neon Free anunciou 1 GB por projeto em outubro/2026, mas limites podem mudar. Monitore CPU, armazenamento, tráfego e disponibilidade. Publicações do tipo snapshot duplicam temporariamente dados: são preservadas as últimas 3 revisões por categoria para conter o espaço. Rollback de revisões mais antigas que a janela não fica disponível; mantenha backups independentes e os seeds aprovados fora do banco. Consulte os limites atualizados em https://neon.com/pricing e as opções de conexão em https://neon.com/docs/connect/connect-from-any-app .

## 2. Banco entregue — 20.622 candidatas, nenhuma aprovada

O arquivo `MODELO-BANCO-PERGUNTAS-ZUP-preenchido(1).xlsx` é idêntico à versão contida no ZIP da curadoria (SHA-256 verificado). As 44 categorias incluem 43 com registros e uma vazia. Foram identificadas 16.915 perguntas de quatro alternativas e 3.707 de cinco. Há 414 explicações editoriais (ainda não validadas) e 2.749 referências externas ao ENEM, sem textos de perguntas.

As candidatas vêm de OpenTDB (489), MMMLU (12.959), OAB (2.210) e HealthQA-BR (4.964). **Todos** os CSVs possuem `review_status=rascunho`; não há `rights_status=verificado`, aprovação humana ou explicações completas para a maioria. A declaração de licença do repositório não garante os direitos de cada item de terceiros. Saúde e Direito exigem revisão especializada e contextualizada.

O acervo de candidatos foi analisado **sem injetar milhares de questões não verificadas no app**. A planilha separada `ZUP-AUDITORIA-ACERVO-E-COBERTURA.xlsx` mostra as lacunas e etapas. É preciso ampliar fortemente categorias como Literatura (125), Games (61), Ciência (3), Português (18), Brasil (5) e Cidadania (0), em vez de contabilizar o excedente em Direito como se cobrisse esses temas.

## 3. Converter a planilha em CSV (quando você editar aprovações)

Se o Excel for a fonte principal, na pasta `zup-main` rode:

```powershell
py -m pip install openpyxl
py scripts/export-curadoria-xlsx.py "C:\CAMINHO\MODELO-BANCO-PERGUNTAS-ZUP-preenchido.xlsx" --out ".\dados-curadoria"
```

Isso gera exatamente dois arquivos: `perguntas-4-alternativas.csv` e `perguntas-5-alternativas.csv`, preservando IDs, campos de origem, a ordem das alternativas e a `choice_e`. O arquivo ZIP enviado já contém esses dois CSVs, então o passo Python é opcional enquanto você não editar o Excel.

## 4. Revisar e gerar seeds sem build

Para cada questão candidata a publicação, o editor deve preencher e verificar:

- `review_status=aprovado` **somente após aprovação humana real**;
- `rights_status=verificado` após conferência da licença/autorização daquele item;
- `reviewer` e `reviewed_at` (AAAA-MM-DD), identificando quem revisou;
- `explanation` específica, `difficulty`, `correct`, alternativas e `quality_flags` sem pendências;
- origem (`source_title`, `source_url`, `license`, `license_url` quando MIT), atribuição e, quando necessário, ano/edição da obra ou prova.

**Conferir sem criar nenhuma seed:**

```powershell
node scripts/prepare-curadoria-seeds.cjs --input .\dados-curadoria\perguntas-4-alternativas.csv --input .\dados-curadoria\perguntas-5-alternativas.csv --check --report .\auditoria-local.json
```

**Depois de revisar e aprovar, gerar arquivos JSON por categoria:**

```powershell
node scripts/prepare-curadoria-seeds.cjs --input .\dados-curadoria\perguntas-4-alternativas.csv --input .\dados-curadoria\perguntas-5-alternativas.csv --write --out .\seeds-revisados
```

Esse comando se recusa a gerar seeds se não houver aprovados ou se algum aprovado ainda contiver pendências. Usa IDs de origem estáveis convertidos deterministamente e preserva `sourceItemId`, obras/universos, créditos e licença.

**Validar e publicar somente um tema revisado, como Literatura:**

```powershell
node scripts/publish-content-seed.cjs --check .\seeds-revisados\literatura.json
$env:ZUP_CONTENT_API_URL="https://zup-api.onrender.com"
$env:ZUP_CONTENT_ADMIN_TOKEN="COLE_AQUI_A_CHAVE_DO_RENDER"
node scripts/publish-content-seed.cjs --publish .\seeds-revisados\literatura.json
```

A chave é apenas um exemplo; configure um segredo real no seu terminal. O publicador busca a versão atual, mescla por ID e envia a revisão esperada ao servidor. Se duas pessoas publicarem ao mesmo tempo, o segundo upload é rejeitado e deve reler a revisão. Se o Neon estiver sem conexão, a publicação falha sem alterar o acervo local.

**Voltar à versão anterior:**

```powershell
node scripts/publish-content-seed.cjs --list literatura
node scripts/publish-content-seed.cjs --rollback literatura NUMERO_DA_REVISAO --confirm
```

## 5. Explicações e "Ler mais" seguem o mesmo fluxo

Para atualizar um texto sem adicionar questões, publique um JSON com `lessons` e `questions: []` (veja `docs/content-seeds/EXEMPLO-AULA-NAO-PUBLICAR.json`). O publicador mescla aulas e questões por ID estável, sem remover o conteúdo de outra área. Não é necessário gerar uma build para corrigir uma explicação. O `review.accuracyChecked` e `review.rightsChecked` não devem ser preenchidos como `true` antes da verificação responsável.

## 6. Testes e ressalvas

Passaram os testes unitários do app com TypeScript para o núcleo e os testes da API sem precisar instalar toda a cadeia Expo/Render. O pacote **não** passou por integração ponta a ponta com Neon real, deploy Render ou teste físico no iPhone; não há senhas/acesso a essas contas. A instalação online das dependências da API expirou neste ambiente, logo os endpoints Express e a migração real de tabelas precisam de validação após instalação/deploy.

O cache do app fica limitado a aproximadamente 3 MB e sete categorias recentes para evitar estourar o AsyncStorage. Pacotes grandes podem funcionar online sem persistir completamente offline. Para distribuição offline integral de dezenas de milhares de questões, será necessário ampliar a estratégia com armazenamento local próprio/paginação, em vez de prometer que as 44 áreas estarão sempre offline.
