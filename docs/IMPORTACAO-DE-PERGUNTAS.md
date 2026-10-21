> **Atualização 2.1:** o importador local requer `rights_status=verificado`, `reviewer` e `reviewed_at`; para a planilha recebida (com 4 ou 5 opções), use preferencialmente `scripts/prepare-curadoria-seeds.cjs` e o guia `docs/NEON-RENDER-E-CURADORIA.md`. Não coloque rascunhos no app.

# Importacao de perguntas existentes - ZUP! 1.9.0

## Objetivo

Criar um acervo de 700-1.000 perguntas diferentes por **categoria** (44 categorias), sem geracao automatica de enunciados. Uma meta de 800 por categoria equivale a 35.200 perguntas revisadas; e um plano de longo prazo, nao a contagem atual.

## Planilha para enviar

Use `docs/MODELO-BANCO-PERGUNTAS-ZUP.xlsx` incluido neste pacote, aba **Perguntas**. Uma linha para cada pergunta. Envie o arquivo aqui e a importacao pode ser feita apos uma validacao editorial e juridica. Para importacao local, exporte a aba como CSV UTF-8, sem alterar os nomes das colunas.

| Coluna | Funcao |
| --- | --- |
| id | Vazio gera ID estavel; mantenha IDs apos publicacao |
| category | Um dos IDs da aba Temas: `literatura`, `natureza`, `esportes`, `direito`... |
| topic | Assunto preciso: `fauna-artica`, `direito-constitucional`, `romance-fantasia` |
| universe | Para literatura: `classicos-brasileiros`, `fantasia`, `romantasia`, `suspense`, `ficcao-cientifica`, `literatura-atual`... |
| work_title | Obra especifica: livro, serie, gibi ou titulo |
| question, choice_a...choice_d, correct | Pergunta original autorizada, quatro alternativas, letra A-D correta |
| explanation | Por que a alternativa correta funciona, sem repetir o enunciado |
| difficulty | `facil`, `medio`, `dificil` |
| kind | `discover` (curiosidades) ou `study` (estudo formal), nao misturar |
| tracks | Interesses separados por `|`: `livros|entretenimento` ou `faculdade|humanas` |
| source_title | Autor, livro/site, editora ou instituicao de origem |
| source_url | Link HTTPS quando existe; necessario para perguntas CC BY/CC BY-SA |
| license | `CC0`, `CC BY 4.0`, `CC BY-SA 4.0`, `DOMINIO_PUBLICO`, `AUTORIZADO`, `ORIGINAL_PROPRIO` |
| rights_basis | Link para termos de licenca, prova de dominio publico ou referencia ao contrato de autorizacao |
| source_item_id, source_year | Identificador original, pagina/prova, ano da fonte (se houver) |
| review_status | Apenas `aprovado` e importavel; `rascunho` e `exemplo` sao rejeitados |

### Direitos de autor

Dados biograficos, eventos e fatos de um livro podem ser usados em questoes que um titular permita criar, mas **o texto de questoes prontas de livros, sites ou jogos pode ser protegido**. A referencia bibliografica nao concede licenca para reproduzir questoes. No caso de concursos e provas oficiais, obter confirmacao especifica das permissoes de uso e de textos/imagens de terceiros. Para material de CC BY-SA, manter atribuicao, indicacao de adaptacoes e cumprir as condicoes ShareAlike, inclusive para derivados.

### Verificacao e importacao

```powershell
cd zup-main
cd app
npm install
cd ..
node scripts/import-question-bank.cjs caminho\perguntas.csv --check
node scripts/import-question-bank.cjs caminho\perguntas.csv --write
npm test
```

O importador bloqueia categorias inexistentes, campos vazios, alternativas repetidas, status nao aprovado e falta de informacao sobre os direitos. Isso e **validacao estrutural**; uma auditoria humana ainda precisa verificar corretude, traducao, atualizacao da fonte, distratores e autorizacao verdadeira. O acervo pronto fica em `app/src/importedQuestions.ts`, e o indice espelho em `docs/content/catalog.json`.

### Universos de livros

Literatura deve cobrir os classicos nacionais e internacionais, poesia, suspense, ficcao cientifica, terror, romantasia, fantasia epica, romance contemporaneo, HQs, mangas, livros juvenis, nao ficcao e obras atuais. Para livros comerciais modernos, **nao** copiar exercicios de livros nem textos extensos de sua obra sem autorizacao; usar apenas questoes preexistentes devidamente licenciadas ou autorizadas pelo titular. Guardar `work_title`, `universe`, editora/autor, lingua/edicao e proveniencia de cada pergunta.

### Banco grande em producao

Para dezenas de milhares de perguntas, a proxima etapa devera fazer pacotes baixaveis por categoria ou API paginada com cache offline. O importador local atual e uma base segura para receber lotes iniciais, nao uma plataforma de distribuicao de 35 mil perguntas em producao.
