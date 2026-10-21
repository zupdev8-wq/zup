# ZUP! 2.1.0 — correção da relação entre imagens e assuntos

## Objetivo

Nenhum card deve ilustrar uma aula de enfermagem com foto genérica de leito,
um conceito de lógica com uma casa, uma aula de ciência com um laboratório ao
acaso ou uma explicação sobre fronteiras com uma construção não identificada.
A FOTO DEVE EXPLICAR VISUALMENTE O ASSUNTO. A categoria sozinha não basta.

## O que mudou

- O antigo seletor de Unsplash por categorias foi substituído pelo catálogo
  enviado (`app/src/photos.ts` + `app/src/photoCatalog.data.json`).
- Foram mantidas as 3.156 imagens e 229 temas enviados, com seus autores,
  fontes e informações de licença, sem alterar os metadados declarados.
- Quatro imagens adicionadas à curadoria: profissional efetivamente lavando
  as mãos, céu azul real, trilhos em perspectiva e diagrama lógico.
- A foto de um marco de fronteira de Ponta Porã já existia no catálogo;
  ela foi vinculada diretamente à aula de fronteira seca.
- Foram adicionadas correspondências editoriais para aulas específicas,
  como PCR (termociclador), Machado de Assis (retrato), ritmo (bateria),
  cheias do Pantanal (rio), fonte primária (manuscrito) e polinização.
- A correspondência automática consulta o título e apenas palavras-chave
  específicas. Foto genérica da disciplina **não** é permitida.
- Sem correspondência segura, o card exibe a arte vetorial da categoria;
  não inventa uma foto ou troca por uma imagem fora do contexto.
- Antes do quiz, imagens que poderiam revelar respostas são restringidas;
  imagens explicitamente cadastradas na questão continuam preservadas.
- A repetição nunca força uma troca por imagem de outra categoria.
- Imagens classificadas como ilustração/diagrama usam `contain` para não
  cortar o conteúdo didático; fotografias continuam ocupando o fundo todo.
- Créditos visíveis permitem abrir a origem e a licença da imagem cadastrada.
- URLs inacessíveis/dispositivos sem conexão retornam à arte de categoria.

## Cinco correções exemplificadas nas capturas

| Aula | Imagem escolhida |
| --- | --- |
| Higienização das mãos | Profissional lavando as mãos no contexto clínico (U.S. Navy / Wikimedia Commons) |
| Fronteira seca | Marco da fronteira de Ponta Porã (Wikimedia Commons) |
| Por que o céu é azul | Fotografia de céu azul real (Wikimedia Commons) |
| Argumento válido | Diagrama sobre premissas e conclusão (Wikimedia Commons) |
| Perspectiva linear | Trilhos ferroviários convergindo ao ponto de fuga (Wikimedia Commons) |

## Cobertura atual e expansão futura

Foram encontradas 94 microaulas editoriais publicadas no conjunto incluído no
ZIP de 20/10. Após esta atualização, 18 possuem associação concreta com uma
foto/diagrama revisado. As demais exibem um fundo vetorial neutro **até serem
curadas**. Isso é intencional: o aplicativo não deve prometer qualidade visual
à custa de informação enganosa.

Para ampliar o acervo sem perder qualidade:

1. Buscar imagens com relação direta ao assunto/objeto/local indicado no título.
2. Inspecionar a fotografia, o enquadramento vertical, licença e autoria.
3. Criar um tema específico em `ZUP_CURATED_TOPICS` ou associar a aula a
   um registro existente em `EDITORIAL_LESSON_PHOTOS`.
4. Rodar `npm test` e revisar ao menos três cards por assunto no iPhone.
5. Manter metadados e atribuições. Não utilizar apenas a categoria como pista.

Todas as imagens do catálogo são **remotas**. O banco preserva dados de autoria
/licenciamento fornecidos no arquivo enviado; a inclusão técnica não substitui
uma auditoria jurídica de licenças e direitos de imagem antes da publicação.
A conectividade de todas as 3.156 URLs não foi testada em um iPhone real.

## Testes

- `tests/photos-curation.test.cjs`: títulos, cinco capturas, metadados,
  fronteira Ponta Porã, fallback e proteção contra imagem-revelação no quiz.
- `tests/config.test.cjs`: feed full-screen, atribuição e ausência de imagem
  genérica em caso de baixa confiança.
- `tests/components.test.cjs`: renderização estrutural das telas, sem Expo real.

## Uso

Este ZIP é o projeto completo e já inclui os dois arquivos de foto e testes.
Copie o projeto inteiro para a pasta do ZUP no VS Code após guardar um backup.
Instale dependências via `npm install` se ainda não estiverem instaladas, em
seguida use `npm test` dentro da pasta `app` e `npm start` para testar no Expo.
**Não** é necessário enviar o JSON ou o `photos.ts` isoladamente ao Render
para corrigir fotos no aplicativo: essa seleção roda no app e precisa de uma
build/atualização do app para chegar aos dispositivos.
