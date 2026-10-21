# Auditoria das questões locais do ZUP! — 21/10/2026

## Decisão

A partir desta revisão, o aplicativo mantém somente um **fallback local mínimo e auditado**. Todo novo banco de perguntas deve ser publicado pelo backend por **seed revisado**, sem reintroduzir geração massiva no bundle do app.

## Critérios mínimos aplicados ao acervo local

Uma questão local só permanece quando:

- possui fonte HTTPS rastreável;
- tem quatro ou cinco alternativas distintas e gabarito válido;
- possui explicação com pelo menos 80 caracteres e informação adicional à resposta;
- não usa moldes artificiais como “que conceito está sendo descrito?” ou paráfrases repetidas;
- tem enunciado suficientemente contextualizado;
- não depende de geração automática para inflar a quantidade do catálogo.

Macetes são opcionais e só devem ser usados quando realmente ajudam. Para novos seeds, dica de raciocínio e explicação devem ser específicas para o item.

## Resultado

- Perguntas-base analisadas: **400**
- Perguntas-base mantidas: **77**
- Perguntas-base removidas da build: **323**
- Variações artificiais `x-` removidas da build: **560**
- Questões geradas `g-` removidas da build: **10.000**
- Antigo lote local OpenTDB genérico removido da build: **24**
- Curiosidades locais com fonte específica mantidas: **2**
- Total local de fallback após a auditoria: **79**

### Distribuição do fallback base mantido

- `artes`: 4
- `brasil`: 5
- `constituicao`: 15
- `cultura`: 10
- `economia`: 8
- `espaco`: 11
- `gastronomia`: 2
- `geografia`: 4
- `geopolitica`: 10
- `historia`: 3
- `natureza`: 2
- `tecnologia`: 3

## Observação sobre conteúdo remoto

Esta limpeza **não apaga revisões já publicadas no backend**. Por exemplo, o banco de Games publicado por seed continua sendo sincronizado normalmente. A limpeza afeta apenas o conteúdo embutido na próxima versão/build do aplicativo.

## Arquivos antigos

Os arquivos de geração histórica podem continuar no repositório para rastreabilidade, mas `questions.ts` não os importa mais. Portanto, eles não compõem o catálogo local em tempo de execução.
