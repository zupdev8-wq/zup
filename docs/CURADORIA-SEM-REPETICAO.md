# ZUP! — Conteúdo sem repetições (17/10/2026)

## O que mudou

- O feed publica **apenas aulas editoriais completas**. As fichas geradas em massa não aparecem como aulas.
- As 44 disciplinas permanecem representadas, com aulas contendo uma abertura curta, explicação e botão **Ler mais**.
- O "Ler mais" apresenta material complementar e opcional (casos, consequências, comparações, aprofundamento). A definição principal não é reutilizada como resumo, exemplo ou ideia final.
- Uma aula visualizada ou aprendida não retorna automaticamente no feed. Ela permanece acessível na Biblioteca quando aberta ou salva.
- Perguntas de modelos `g-*`/`x-*` foram retiradas do **jogo**: variar o prefácio de uma definição não cria uma pergunta nova.
- O quiz usa questões contextuais selecionadas (`h-*`, `p-*` e originais que não pedem definição pronta), preservando os IDs antigos para compatibilidade com o progresso.
- Respostas já dadas não voltam nem no modo Revisão. Se existir outra pergunta de aplicação realmente nova sobre o conceito/tópico, ela poderá aparecer. Se não existir, a sessão termina sem reciclar definições.
- Novas questões autorais trabalham interpretação, cálculo, aplicação, exceções e análise de casos, em vez de perguntar a definição novamente.

## O que os números significam

O arquivo `docs/content/catalog.json` mantém o catálogo histórico completo para conservação dos identificadores. O número de registros históricos **não equivale** ao total de exercícios publicados. As aulas e questões exibidas no aplicativo são conjuntos editoriais selecionados, e podem crescer com novas revisões.

## Testes de curadoria

`npm --prefix app test` verifica:

1. somente aulas selecionadas são publicadas no feed;
2. nenhuma definição/resumo ou parágrafo idêntico é repetido dentro das aulas selecionadas;
3. ausência de cópias muito semelhantes dentro de uma mesma aula;
4. nenhuma explicação do quiz coincide literalmente com as seções das aulas publicadas;
5. perguntas antigas geradas com templates não entram em rodadas;
6. perguntas já respondidas nunca retornam nas rodadas comuns ou na Revisão;
7. todas as 44 categorias dispõem de exercícios contextualizados e as sessões respeitam variedade de conceitos;
8. progresso e IDs de conteúdo continuam compatíveis com a estrutura anterior.

**Limite editorial:** nenhum filtro mecânico consegue garantir, sozinho, que textos sobre temas próximos jamais tragam ideias semanticamente parecidas. A regra de não repetir definições depende também de revisão humana para cada inclusão de conteúdo. Prefira publicar menos aulas verdadeiramente completas a liberar milhares de paráfrases.

## Acrescentar conteúdo novo

- **Aulas:** crie conteúdo em `app/src/editorialLessons.ts` e aprofundamentos em `app/src/deepDives.ts`.
- **Questões:** coloque casos próprios em `app/src/scenarioQuestions.ts` ou `app/src/authoredQuestions.ts`, usando conceito/tópico explícitos e explicação que acrescente informação.
- **Critérios:** não reproduzir definição no enunciado, nas alternativas e no feedback; não reusar o mesmo caso com valores ou nomes trocados; evitar distratores absurdos; conferir exatidão e atualização, especialmente em Saúde e Direito.
- **Catálogo:** gere `docs/content/catalog.json` a partir de `app/src/questions.ts` após compilar os tipos no script de teste, e rode novamente todos os testes.
