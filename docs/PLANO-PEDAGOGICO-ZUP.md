# ZUP! | Plano pedagógico e padrão de qualidade

Data: 17/10/2026. Este documento distingue o que foi entregue do trabalho ainda necessário.

## Objetivo

O ZUP! deve ensinar competências observáveis: compreender, explicar, aplicar, comparar, argumentar, calcular e detectar erros. Quantidade de fichas, tempo na tela e XP não são medidas suficientes de aprendizagem.

## O que está implementado nesta versão

- 94 aulas publicadas distribuídas em 44 categorias; o acervo histórico de 10 mil questões automáticas não está liberado para partidas comuns.
- **Ler mais** tem aprofundamento editorial, exemplos, comparações e **Leituras complementares** por aula.
- Cada leitura traz tipo (livro, artigo científico ou documento oficial), referência, autor(es) e orientação de leitura voltada àquela aula.
- Links exibidos somente para obras de acesso conhecido, origens institucionais e artigos com DOI. O título/autor de livros sem link podem ser consultados em bibliotecas.
- 15 perguntas curtas de autoexplicação estão disponíveis para as aulas correspondentes, com pista oculta até a solicitação voluntária.
- O jogo deixa de reciclar a mesma pergunta ou definição e não completa sessões com perguntas fora do assunto para atingir uma quantidade fixa.
- Feedback do quiz anuncia acerto/erro e expõe uma justificativa específica, quando disponibilizada no dado original.

Esses itens foram implementados e passaram por validação automatizada; isso não substitui testes de usabilidade com estudantes nem revisão por professores e especialistas.

## Modelo desejado para cada aula

1. **Objetivo avaliável:** "ao final, compare a responsabilidade de uma associação e de seus associados"; nunca "entenda tudo sobre pessoa jurídica".
2. **Ponto de partida:** problema simples para ativar conhecimento prévio, sem pedir a definição decorada.
3. **Explicação direta:** uma única exposição do conceito, depois desenvolvimento sem paráfrases redundantes.
4. **Exemplo resolvido:** demonstrar o raciocínio passo a passo, incluindo limites e casos excepcionais.
5. **Aplicação ativa:** problema inédito, distratores plausíveis e critério explícito de acerto.
6. **Feedback para aprender:** explicar a causa do erro e como corrigir o raciocínio, sem simplesmente reimprimir a definição.
7. **Aprofundamento opcional:** Ler mais + leituras complementares com objetivo específico de investigação.
8. **Recuperação posterior:** questão nova do mesmo objetivo, apresentada após intervalo; repetir o conceito para praticá-lo é diferente de repetir a definição ou o enunciado.

## Prioridades futuras (ainda não implementadas)

**P0 | Auditoria editorial humana e fontes.** Um editor de área deve conferir o livro, a pertinência do capítulo, DOI, autoria, data, atualidade, respostas e fatos. Em Medicina, Direito e outros temas de risco, a aprovação por profissional habilitado deve ser requisito antes de publicação. Criar status `draft / reviewed / approved` e campos `reviewedBy`, `reviewedAt`, `sourceEdition`, `sourceSection`, `nextReviewAt`.

**P1 | Trilha por pré-requisitos.** Organizar cada campo em fundamentos, intermediário e aplicação; o aluno não deve encontrar estatística inferencial sem ter consolidado proporções, medidas descritivas e probabilidade. Fazer diagnóstico inicial curto e recomendar o próximo estudo com base nas lacunas.

**P2 | Banco autoral por competência.** Para cada habilidade, escrever diferentes problemas reais com justificativa de alternativas incorretas, gradação de dificuldade e um verificador de semelhança semântica editorial. Variar contexto, não sinônimos ou números cosméticos.

**P3 | Revisão espaçada com transferência.** O algoritmo já armazena revisões, mas depende de itens novos para funcionar sem repetir questões. Expandir o banco, revisar dificuldade/tempo de retorno e diferenciar "esqueci" de "confundi com outro conceito".

**P4 | Feedback por erro.** Catalogar os erros comuns de cada questão e dar feedback para a alternativa escolhida: "você confundiu massa com quantidade de matéria" é melhor que apenas informar a opção correta. Quando necessário, oferecer um exemplo resolvido, não a mesma definição.

**P5 | Acessibilidade e usabilidade.** Testar com VoiceOver, tamanhos dinâmicos de fonte, contraste e uma mão; avaliar tempo de leitura, excesso de informação e clareza do texto com estudantes reais, incluindo pessoas com baixa familiaridade digital.

**P6 | Evidência de aprendizagem real.** Medir retenção após 7/30 dias, transferência para problemas inéditos, tempo para dominação por competência e precisão da autoconfiança. Não usar somente tempo de tela ou número de respostas como sucesso.

## Critérios para publicar uma nova aula

- Um único enunciado de definição, sem reaparecer no resumo, desenvolvimento, quiz, feedback ou revisão.
- Ponto de partida e aplicação testados com alunos da faixa de conhecimento pretendida.
- Bibliografia verificável: autor, título, ano/edição quando necessário, seção pertinente e URL institucional/DOI onde houver. Não inventar links, não afirmar "artigo científico" para texto de divulgação.
- Pelo menos dois problemas de natureza distinta por habilidade, com resposta e justificativa revisadas.
- Testes de dados, links, semelhança textual e navegação; parecer do revisor humano identificado antes de publicá-la.
- Revisão de atualidade programada para temas mutáveis, especialmente saúde, legislação, tecnologia e atualidades.

## Base de evidência pedagógica

- Dunlosky et al. (2013), *Improving Students' Learning With Effective Learning Techniques* (recuperação ativa e prática distribuída): https://doi.org/10.1177/1529100612453266
- National Academies, *How People Learn II* (recuperação, espaçamento e autoexplicação): https://www.nationalacademies.org/read/24783/chapter/7
- Education Endowment Foundation, *Feedback* (feedback acionável, ligado à tarefa): https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/feedback
- Education Endowment Foundation, *Metacognition and Self-Regulation* (planejar, monitorar, avaliar): https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/metacognition

**Limite:** nenhum documento pedagógico ou teste automatizado comprova que o ZUP! está validado educacionalmente. A ferramenta ainda precisa de currículo integral, testes de aprendizagem e revisão editorial independente por especialistas. A IA pode ajudar na preparação, mas o critério de publicação não deve ser a geração automática.
