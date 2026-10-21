# ZUP! — Pacote de sementes para importar perguntas (20/10/2026)

Este pacote foi preparado para o **ZUP! 2.1.0** (ou superior), usando o fluxo de seeds pela API no Render e PostgreSQL no Neon.

## Resultado da preparação

- **24.122 perguntas recebidas e preservadas** nas duas abas e nos CSVs (20.415 com 4 alternativas; 3.707 com 5).
- **362 perguntas de 18 temas prontas para um primeiro seed remoto**, sem gerar questões novas ou inventar justificativas. São perguntas existentes da **Open Trivia Database**, com explicação já preenchida, dificuldade fornecida pela fonte, enunciado/alternativas estruturalmente válidos e licença CC BY-SA 4.0 identificada no site oficial.
- **23.760 questões mantidas para complementar**: explicação fundamentada ausente, dificuldade não definida, pendência específica de direitos/atualidade ou problema técnico. Não foram descartadas.
- A responsável pelo ZUP! **declarou ter revisado as questões e gabaritos**. Essa declaração foi registrada com data 20/10/2026; ela **não substitui auditoria especializada ou comprovação individual de direitos de terceiros**. Não foi inventado nome próprio de revisor nem a data em que cada pergunta foi revisada.
- **Nenhum arquivo foi publicado no Neon ou no Render durante a preparação.**

As CC BY-SA exigem crédito, link para a licença, indicação de alterações e compartilhamento das adaptações sob as condições aplicáveis. Os campos de fonte, crédito e licença foram preservados. Fonte oficial: https://opentdb.com/api_config.php e texto da licença https://creativecommons.org/licenses/by-sa/4.0/ . A autorização do conjunto não é garantia absoluta sobre materiais de terceiros eventualmente incorporados.

## 1 — Onde colocar os arquivos no Windows

Abra sua pasta **`zup-main`** no VS Code. Ela é a pasta PRINCIPAL que contém `app`, `api`, `scripts` e `package.json`.

**Extraia o conteúdo deste ZIP diretamente dentro de `zup-main`.** Após extrair, devem existir estes caminhos:

```text
zup-main/
  app/                                  (já existente)
  api/                                  (já existente)
  scripts/
    publish-content-seed.cjs            (já existente na versão 2.1.0)
    publicar-lote-curado.cjs            (novo: vem neste ZIP)
  seeds-revisados/
    literatura.json
    cinema.json
    ... outros 16 arquivos JSON
  dados-curadoria/
    ZUP-CURADORIA-PRONTA-E-PENDENCIAS.xlsx
    perguntas-4-alternativas.csv
    perguntas-5-alternativas.csv
  manifesto-seeds.json
  LEIA-PRIMEIRO.md
```

**Não coloque o ZIP dentro de `app` ou `api`.** Se o descompactador criar uma pasta `ZUP-IMPORTAR-PERGUNTAS`, abra essa pasta e copie **o conteúdo dela** para dentro de `zup-main`.

### Segurança do Git

Não envie planilhas grandes, bancos de terceiros nem credenciais para um repositório público sem conferir permissões e licenças. Para impedir que os dados de importação entrem em `git add .`, acrescente ao `.gitignore` da raiz, se ainda não existirem:

```gitignore
/dados-curadoria/
/seeds-revisados/
/manifesto-seeds.json
```

O novo script `scripts/publicar-lote-curado.cjs` pode ser versionado (não contém credenciais). Nenhuma senha ou token está neste pacote.

## 2 — PRIMEIRO comando: validar localmente (NÃO publica)

No terminal do **VS Code, na pasta `zup-main`**, execute:

```powershell
node .\scripts\publicar-lote-curado.cjs --check
```

O esperado no início é:

```text
ZUP! pacote validado: 18 categorias, 362 questoes com explicacao e fonte.
Modo seguro: SEM publicacao.
```

No fim deverá aparecer: `Validacao local concluida. Nada publicado.`

Se aparecer `publish-content-seed.cjs` inexistente, você está na pasta errada ou seu projeto ainda não contém o backend/scripts do ZUP! 2.1.0.

## 3 — ANTES de publicar: conferir Render/Neon

1. Confirme que a API `zup-api` no Render recebeu o deploy da **versão 2.1.0** (ou superior).
2. Confirme que o Render tem a `DATABASE_URL` do **Neon** com pooling e TLS, e que o PostgreSQL já foi inicializado pelo backend. Caso haja um banco antigo com dados importantes, migre antes de trocar a URL. A mudança da variável não copia registros antigos.
3. Confirme que o Render tem `ZUP_CONTENT_ADMIN_TOKEN` com pelo menos 32 caracteres, definido somente como variável de ambiente (não em arquivo Git).
4. Abra **https://zup-api.onrender.com/v1/content/manifest** no navegador e verifique se retorna um JSON com `schemaVersion: 1` e `categories`, mesmo que `categories` esteja vazio. Se retornar 503 ou erro, pare e corrija a implantação primeiro.
5. O aplicativo instalado precisa incluir a sincronização de conteúdo remoto do **ZUP! 2.1.0**. Essa implementação requer uma build inicial; publicações posteriores do conteúdo dispensam nova build.

## 4 — Publicar **uma categoria de teste** (só depois de confirmar o passo 3)

No PowerShell do VS Code, ainda na raiz `zup-main`:

```powershell
$env:ZUP_CONTENT_API_URL="https://zup-api.onrender.com"
$segredo=Read-Host "Digite o ZUP_CONTENT_ADMIN_TOKEN que esta no Render" -AsSecureString
$env:ZUP_CONTENT_ADMIN_TOKEN=[System.Net.NetworkCredential]::new("",$segredo).Password
node .\scripts\publicar-lote-curado.cjs --publish --only literatura --confirm PUBLICAR
```

Isso publica **82 perguntas de Literatura** (sem apagar perguntas existentes; o publicador oficial mescla por ID). Após o sucesso, confira o manifest e abra Literatura no ZUP! conectado à internet.

## 5 — Publicar as 18 categorias do lote (após o teste)

```powershell
node .\scripts\publicar-lote-curado.cjs --publish --confirm PUBLICAR
Remove-Item Env:ZUP_CONTENT_ADMIN_TOKEN
```

O script executa o publicador oficial uma categoria de cada vez. Se alguma falhar, ele para e mostra qual falhou. Já publicadas não precisam ser repetidas; repetição por ID é idempotente e não deve duplicar perguntas.

## 6 — Fazer seeds novos depois, sem build

Abra `dados-curadoria/ZUP-CURADORIA-PRONTA-E-PENDENCIAS.xlsx`. As colunas `zup_status_importacao` e `zup_pendencias` indicam o que falta. Preservar IDs, opções, fontes e gabaritos. Não preencher explicações vazias com texto genérico.

Quando houver novas perguntas **efetivamente** com explicação fundamentada, dificuldade classificada, licença conferida, revisão documentada, e flags resolvidas:

```powershell
py .\scripts\export-curadoria-xlsx.py ".\dados-curadoria\ZUP-CURADORIA-PRONTA-E-PENDENCIAS.xlsx" --out .\dados-curadoria
node .\scripts\prepare-curadoria-seeds.cjs --input .\dados-curadoria\perguntas-4-alternativas.csv --input .\dados-curadoria\perguntas-5-alternativas.csv --check
```

Quando `--check` aprovar, gere novas seeds em **outra pasta** e use o publicador oficial individualmente:

```powershell
node .\scripts\prepare-curadoria-seeds.cjs --input .\dados-curadoria\perguntas-4-alternativas.csv --input .\dados-curadoria\perguntas-5-alternativas.csv --write --out .\seeds-futuros
node .\scripts\publish-content-seed.cjs --check .\seeds-futuros\literatura.json
node .\scripts\publish-content-seed.cjs --publish .\seeds-futuros\literatura.json
```

O comando `publicar-lote-curado.cjs` valida os **hashes do primeiro lote** e não deve ser reutilizado após editar o conteúdo original. Para novos lotes, gere novos arquivos e use o publicador oficial conforme acima. Se uma categoria ultrapassar 1.200 perguntas por revisão, a versão 2.1 precisará de uma evolução de backend + app para suportar volumes maiores, testada antes de publicar.

### Direitos e conteúdo

A planilha contém conjuntos declarados MIT, CC BY-SA 4.0 e CC BY 4.0. **Licença de um dataset não certifica automaticamente direitos sobre questões de provas ou materiais de terceiros**: verifique as ressalvas nas colunas `quality_flags`, `rights_basis` e `license_url`. Questões de Direito/Medicina podem exigir verificação de atualidade e revisão especializada. A importação automática não certifica que os gabaritos estejam corretos.
