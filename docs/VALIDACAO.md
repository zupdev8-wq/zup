# Relatório de validação — ZUP! 1.7.0

## Resultado desta entrega

- **10.960 perguntas** no catálogo: 960 preservadas + **10.000 novas**.
- **44 categorias** e **21 trilhas**, incluindo Revalida sem transformar o produto em um app apenas de saúde.
- **10.960 enunciados únicos** e IDs estáveis/únicos.
- **286 questões com imagem específica** em conteúdos de anatomia/saúde, com fonte/atribuição registrada.
- **1.260 microaprendizados**; questões relacionadas compartilham o mesmo núcleo de aprendizagem quando faz sentido.
- **84/84 testes mobile/domínio aprovados**.
- **5/5 testes da API Premium/recuperação aprovados**.
- `node --check` aprovado para `api/src/server.js`, `api/src/legal.js` e `api/src/premium.js`.
- compilação TypeScript isolada do motor/testes (`tsc -p app/tsconfig.test.json`) aprovada.
- todas as questões têm quatro alternativas distintas, resposta válida e explicação não vazia.
- o motor confirma que cada questão pode ser alcançada uma vez na rotação normal e que uma questão concluída não é forçada a reaparecer.
- simulados Premium continuam aceitando sessões longas, incluindo 45 questões únicas, e agora reconhecem Revalida.
- Premium permanece autoritativo no backend por `premium_until`, sem login/e-mail e com recuperação por código.
- páginas públicas de privacidade, termos, suporte, contato e exclusão continuam integradas ao backend.

## Conteúdo de saúde

O conteúdo médico é educacional e voltado a estudo. A expansão inclui anatomia, fisiologia, patologia, clínica, farmacologia, enfermagem, biomedicina e Revalida. Não foram incluídas prescrições individualizadas nem instruções de dose para substituir avaliação clínica, protocolo oficial ou treinamento supervisionado.

## Limitação deste ambiente

O `tsc --noEmit` completo do app não pôde ser executado porque o `node_modules` completo do Expo/React não está disponível neste ambiente. A compilação isolada e os testes estruturais passaram, mas a validação final deve ser repetida no computador de desenvolvimento com `npm run setup`, `npm run typecheck` e teste físico em iPhone/Android.

## Antes da publicação definitiva

- testar o catálogo ampliado em aparelho físico, especialmente memória, abertura inicial e fluidez do feed;
- revisar amostras editoriais de todas as áreas e, para simulados específicos, comparar com o edital/prova de referência;
- testar imagens médicas em rede lenta e os respectivos links de atribuição;
- testar Mercado Pago, renovação, expiração, estorno e recuperação em aparelhos físicos;
- revisar requisitos vigentes da App Store e Google Play para pagamento digital alternativo;
- validar Safe Area, navegação, cache de fotos e checkout nas builds finais.
