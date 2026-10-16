# Checklist de release — ZUP! 1.7

## Aplicativo

- [ ] `npm run setup` concluído sem erros.
- [ ] `npm run typecheck` concluído.
- [ ] testes concluídos.
- [ ] Expo Doctor sem bloqueios.
- [ ] testar iPhone pequeno, iPhone com Dynamic Island e Android físico.
- [ ] testar feed vertical e navegação horizontal.
- [ ] testar retorno de quiz/simulado interrompido.
- [ ] verificar que o feed não troca sozinho e que a foto só muda quando o card muda.
- [ ] validar diversidade das fotos em pelo menos 100 cards consecutivos.

## Premium / Mercado Pago

- [ ] PostgreSQL persistente configurado no Render.
- [ ] `PUBLIC_API_URL` HTTPS correto.
- [ ] `MERCADO_PAGO_ACCESS_TOKEN` configurado somente no backend.
- [ ] `MERCADO_PAGO_WEBHOOK_SECRET` configurado.
- [ ] webhook cadastrado em `/v1/webhooks/mercadopago`.
- [ ] testar checkout escolhendo Pix.
- [ ] testar checkout escolhendo cartão.
- [ ] validar aprovado, pendente, recusado/cancelado e estorno.
- [ ] validar que uma compra aprovada só adiciona 30 dias uma vez.
- [ ] validar renovação antes do vencimento.
- [ ] validar bloqueio depois do vencimento.
- [ ] confirmar que o app nunca libera Premium apenas por estado local.

## PlayerId e recuperação

- [ ] confirmar que a primeira conexão gera playerId + token e armazena no SecureStore.
- [ ] confirmar que o código não aparece durante o uso normal.
- [ ] confirmar que após compra aprovada o código aparece e pode ser copiado.
- [ ] testar “Troquei de aparelho e já era Premium” em outro aparelho físico.
- [ ] confirmar que o token antigo deixa de funcionar depois da transferência.
- [ ] confirmar que a restauração gera um novo código e invalida o anterior.
- [ ] confirmar que código vencido/errado não restaura Premium.

## Simulado Inteligente

- [ ] testar busca Cebraspe + Câmara + cargo.
- [ ] testar ENEM/OAB/faculdade.
- [ ] validar 20, 45 e 60 questões.
- [ ] garantir ausência de questões já concluídas.
- [ ] revisar explicações e matérias inferidas contra o edital real antes de promover um simulado como específico.

## Conteúdo 1.7

- [ ] validar 10.960 perguntas e 44 categorias no aparelho.
- [ ] testar Revalida/Medicina/Farmacologia e também Humanas, Exatas, Concursos, ENEM e Entretenimento.
- [ ] testar questões com imagem anatômica e links de atribuição.
- [ ] validar que questões já concluídas não voltam na rotação normal.
- [ ] revisar amostras editoriais de cada área antes de publicar como conteúdo de prova específico.

## Imagens

- [ ] revisar disponibilidade e licença/atribuição das fotos finais.
- [ ] substituir URLs inadequadas ou 404.
- [ ] decidir CDN/armazenamento próprio antes de escalar.
- [ ] testar cache e comportamento em rede lenta/offline.

## Lojas

- [ ] revisar regras atuais de pagamento externo/alternativo da App Store para Brasil.
- [ ] revisar regras atuais de cobrança alternativa do Google Play para Brasil.
- [ ] configurar APIs, entitlements, disclosures e metadata exigidos pela loja/plataforma antes da submissão.
