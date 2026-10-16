# ZUP! 1.7.1 — release gratuita das lojas

Esta release foi preparada para a primeira submissão do ZUP! às lojas.

## Decisão de produto

Todos os recursos visíveis do app estão gratuitos nesta versão. O usuário não encontra:

- tela ZUP! Premium;
- preço de R$ 9,99;
- Mercado Pago;
- Pix/cartão;
- botão de compra;
- recuperação de Premium;
- paywall.

O Simulado Inteligente e a Maratona de 10 perguntas estão liberados gratuitamente.

## Código futuro preservado

`app/src/screens/PremiumScreen.tsx`, `app/src/services/backend.ts`, `app/src/hooks/usePremiumAccess.ts` e os endpoints de pagamento do backend permanecem no repositório para desenvolvimento futuro, mas o `App.tsx` da 1.7.1 não importa nem navega para o fluxo Premium.

## Reativação futura

Não reative o fluxo de compra simplesmente adicionando o botão de volta. Antes de uma nova versão de loja, revisar os requisitos de cobrança digital vigentes da Apple e do Google e atualizar termos/privacidade.
