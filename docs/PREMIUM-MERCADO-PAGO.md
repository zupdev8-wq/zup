# Premium + Mercado Pago — ZUP! 1.6.0

## Regra do produto

- sem cadastro;
- sem login;
- sem campo de e-mail no ZUP;
- R$ 9,99 por 30 dias;
- Premium liberado/bloqueado pelo backend;
- restauração por código de recuperação.

## Identidade anônima

Na primeira conexão com a API, `POST /v1/guests` cria:

- `playerId` aleatório;
- token do aparelho;
- código de recuperação no formato `ZUP-XXXX-XXXX-XXXX`.

O app guarda token, playerId e o código no SecureStore. O código não precisa aparecer durante o uso normal.

## Comprar Premium

`POST /v1/premium/checkout`

O backend cria uma preferência do Checkout Pro por R$ 9,99. O aplicativo abre `checkoutUrl` e o usuário escolhe Pix ou cartão no ambiente do Mercado Pago. Dados de pagamento não passam pelo ZUP.

Enquanto a compra estiver pendente, o app consulta:

`GET /v1/premium/purchases/:id`

Depois que o backend confirmar `active: true`, o ZUP mostra o código de recuperação para o usuário copiar e guardar.

## Recuperar em outro aparelho

Na tela Premium, o usuário toca em **Troquei de aparelho e já era Premium** e informa o código.

`POST /v1/recovery/restore`

Ao recuperar com sucesso:

- o backend localiza o mesmo player;
- exige que o Premium ainda esteja ativo;
- invalida o token antigo;
- cria um token novo para o aparelho atual;
- gira o código de recuperação;
- devolve o novo código para ser guardado.

Isso faz a restauração funcionar como transferência de aparelho, não como login compartilhável.

## Ver o código novamente

Com Premium ativo, o usuário pode tocar em **Ver meu código de recuperação**. Se a instalação ainda possui o código salvo, ele é exibido. Se não possuir, `POST /v1/recovery/code` gira um novo código no backend.

## Webhook

Configure no Mercado Pago:

```text
https://SEU-BACKEND/v1/webhooks/mercadopago
```

A API valida `x-signature`, consulta o pagamento diretamente no Mercado Pago e só libera o Premium quando valor, moeda, referência e status conferem. Um pagamento só é aplicado uma vez. Estorno/chargeback confirmado pode reverter o período correspondente.

## Expiração

`players.premium_until` controla a liberação. O backend responde `active: false` automaticamente depois da data de vencimento. Renovações somam 30 dias ao prazo ainda restante.

## Variáveis

```env
DATABASE_URL=...
DATABASE_SSL=false
PUBLIC_API_URL=https://seu-zup-api.onrender.com
CORS_ORIGINS=...
MERCADO_PAGO_ACCESS_TOKEN=...
MERCADO_PAGO_WEBHOOK_SECRET=...
```

No app:

```env
EXPO_PUBLIC_API_URL=https://seu-zup-api.onrender.com
```
