# Relatório de validação — ZUP! 1.6.0

## Resultado desta entrega

- 82/82 testes mobile/domínio aprovados.
- 5/5 testes da camada Premium/recuperação aprovados.
- `node --check` aprovado para `api/src/server.js` e `api/src/premium.js`.
- TypeScript de domínio compilado com `strict` e sem erros.
- 40 arquivos TS/TSX passaram pelo parser/transpilador TypeScript sem erros de sintaxe.
- nenhum segredo real do Mercado Pago foi incluído.
- Premium continua autoritativo no backend por `premium_until`.
- playerId/token/código de recuperação usam SecureStore no app.
- restauração exige Premium ainda ativo, invalida o token anterior e gira o código.
- UI não solicita login nem dados de pagamento.
- banco visual contém mais de 90 URLs de fotos reais únicas e o feed varia a foto por posição.
- Simulado Inteligente continua testado com 45 questões únicas e exclusão de questões já concluídas.

## Limitação deste ambiente

Não foi feita uma instalação completa de `node_modules` nem teste físico em iPhone/Android nesta etapa. A validação final do runtime Expo deve ser feita no computador de desenvolvimento com `npm run setup` e `npm start`.

## Antes de produção

- criar/configurar o backend no Render;
- testar Mercado Pago com credenciais de teste e depois produção;
- cadastrar e validar webhook;
- testar compra, renovação, expiração, estorno e recuperação em dois aparelhos físicos;
- revisar requisitos vigentes das lojas para pagamento digital alternativo;
- validar carregamento/cache das fotos em rede lenta;
- gerar builds físicas iOS e Android e testar Safe Area, navegação e checkout.
