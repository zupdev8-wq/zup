# ZUP! — origem, licença e qualidade das perguntas externas (v1.8.0)

**Objetivo:** substituir perguntas automáticas e artificiais por itens com uma origem rastreável. A fonte de cada pergunta aparece no aplicativo **depois da resposta**, com link. Esse lote inicial é um piloto; não significa que todas as disciplinas estejam revisadas ou que o banco inteiro seja composto de questões oficiais.

## 1. Open Trivia Database — questões existentes, traduzidas/adaptadas

- Fonte: [Open Trivia Database](https://opentdb.com/api_config.php).
- Licença declarada no site da API: **Creative Commons Attribution–ShareAlike 4.0 International (CC BY-SA 4.0)**, [termos completos](https://creativecommons.org/licenses/by-sa/4.0/).
- Foram selecionadas **24 perguntas pré-existentes** da API, traduzidas e, quando necessário, adaptadas para português brasileiro, com respostas explicadas. Os itens `t-0001` a `t-0025` (exceto `t-0023`, suprimido por repetir o mesmo tema) identificam este conjunto.
- Os lotes recuperados durante a curadoria foram: [50 questões](https://opentdb.com/api.php?amount=50), [30 questões](https://opentdb.com/api.php?amount=30), [20 questões](https://opentdb.com/api.php?amount=20), [10 questões](https://opentdb.com/api.php?amount=10). A API é randômica; esses endereços **não são URLs permanentes para cada pergunta**. A cópia atual e sua adaptação em português estão em `app/src/externalQuestions.ts` e `docs/content/catalog.json`.
- **Atribuição:** conteúdo original © colaboradores da Open Trivia Database, reutilizado conforme CC BY-SA 4.0. **Alterações feitas pelo ZUP!:** tradução para pt-BR, adequação de opções, adição de comentários e categorização. O material adaptado de perguntas da Open Trivia Database em `app/src/externalQuestions.ts` é oferecido sob **CC BY-SA 4.0**. Demais partes do ZUP! não são automaticamente licenciadas sob essa licença.
- **Atenção:** a licença é de uso com atribuição e compartilhamento pela mesma licença. Não retirar a atribuição do aplicativo ou do pacote ao distribuir; adições/alterações ao banco adaptado devem ser compartilhadas nos mesmos termos. Verifique obrigações de distribuição da licença ao publicar em lojas.

## 2. Curiosidades verificadas em fontes institucionais (não são perguntas copiadas)

Duas perguntas adicionais vieram dos temas sugeridos pela proprietária do app e foram redigidas a partir de fatos públicos, **não** copiadas de um quiz existente; elas **não** recebem atribuição indevida à Open Trivia Database:

- `t-0026` — dieta de ursos-polares: [WWF, Polar Bear](https://www.worldwildlife.org/species/polar-bear/).
- `t-0027` — ave de mergulho mais rápido: [Guinness World Records, Fastest bird (diving)](https://www.guinnessworldrecords.com/world-records/70929-fastest-bird-diving). O recorde refere-se ao mergulho, não ao voo horizontal.

## 3. Provas acadêmicas e concursos

As provas oficiais estão **disponíveis por links**, mas **não foram copiadas para o banco offline do ZUP! nesta release**:

- [Inep — ENEM 2025, provas e gabaritos](https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos/2025).
- [Inep — ENEM 2024, provas e gabaritos](https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos/2024).
- [Inep — Encceja, provas e gabaritos](https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/encceja/provas-e-gabaritos).

Disponibilidade pública **não é autorização automática para republicação comercial**. Antes de importar questões integrais, verifique direitos de uso (incluindo gráficos, fotos, trechos literários e materiais de terceiros); guarde banca, prova, ano, cargo, número, gabarito oficial e link para a fonte; faça revisão jurídica/editorial e teste os recursos de acessibilidade. Questões de livros, Perguntados, Genk e plataformas comerciais exigem licença/autorização ou uso de acervos expressamente abertos. Não copie conteúdo protegido indiscriminadamente.

## 4. Barreiras de qualidade antes de publicar mais perguntas

1. **Fonte e direitos** identificados individualmente; número da questão da prova original quando existir.
2. **Resposta inequívoca**, alternativa certa checada contra gabarito ou documento oficial; três distratores do mesmo assunto, plausíveis e não repetidos.
3. **Questão útil**, sem “Em uma revisão conceitual...”, sem um fato que já entrega a resposta no enunciado, sem quatro afirmações simultaneamente verdadeiras quando só uma é permitida.
4. **Feedback diferente do enunciado** — apresentar a informação que faltava, uma relação interessante ou por que aquela resposta está correta.
5. **Acessibilidade** de imagens e respeito aos direitos sobre elementos visuais.
6. **Revisão editorial humana** das traduções/adaptações: conteúdo do acervo é pré-existente, mas tradução e alternativas podem introduzir erros.
7. **Novidade por conceito e ID:** o jogador não recebe novamente a mesma questão; o app não preenche uma rodada com perguntas não relacionadas só para atingir cinco itens.

## 5. Onde está implementado

- `app/src/externalQuestions.ts` — perguntas externas com metadados de fonte.
- `app/src/game.ts` — modo `discover`, seleção sem repetição e separação das questões antigas.
- `app/src/exams.ts` — exclusão expressa de curiosidades no simulado acadêmico.
- `app/src/progress.ts` — sessões antigas geradas por template são descartadas sem apagar pontos, histórico ou XP.
- `app/src/screens/ExploreScreen.tsx` — modo “Curiosidades divertidas” e links para provas originais.
- `app/src/screens/QuizScreen.tsx` — link para fonte após resposta e fallback visual das imagens.
- `tests/sourced-questions.test.cjs` — testes de procedência, qualidade estrutural, não repetição, continuidade e isolamento de simulado.
