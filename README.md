# ZUP! 1.6.0

ZUP! transforma o hábito de rolar a tela em aprendizado rápido e gamificado. O app combina feed vertical, microaulas, quizzes, biblioteca, repetição espaçada, XP, estrelas, streak, companheiros evolutivos e trilhas de estudo.

## O que há nesta versão

- 960 perguntas em 43 categorias/matérias.
- 680 microaprendizados em 20 trilhas/filtros.
- Feed vertical com fotos reais e banco visual muito maior, com variação por card para reduzir repetição.
- Perguntas respondidas saem da rotação normal; repetição fica no modo Revisão.
- Microaula -> quiz relacionado de até 5 perguntas.
- ENEM, concursos, faculdade, Humanas, Exatas, Biológicas, entretenimento, Brasil vivido, religiões, teologia e pensamento crítico.
- Premium por **R$ 9,99 / 30 dias**, controlado pelo backend.
- Sem cadastro e sem login: a instalação recebe um `playerId` anônimo.
- Premium restaurável em outro aparelho por um código `ZUP-XXXX-XXXX-XXXX`.
- Simulado Inteligente Premium de 20, 45 ou 60 questões, com explicações curtas.

## Rodar o app

Requer Node.js 22.13+.

```powershell
cd app
npm run setup
npm start
```

O `npm start` abre explicitamente no Expo Go e limpa o cache do Metro.

## Identidade e Premium

O aplicativo não usa conta, senha ou login. Quando o backend estiver configurado:

1. o ZUP cria um `playerId` aleatório e um token de aparelho;
2. as credenciais ficam no SecureStore;
3. `GET /v1/premium/status` é a fonte de verdade do acesso Premium;
4. ao tocar em **Quero ser Premium**, `POST /v1/premium/checkout` cria o checkout do Mercado Pago;
5. o usuário escolhe Pix ou cartão no ambiente do Mercado Pago;
6. o webhook confirma o pagamento e acrescenta 30 dias a `premium_until`;
7. depois da confirmação, o app mostra um código de recuperação para o usuário copiar e guardar;
8. em outro aparelho, `POST /v1/recovery/restore` transfere o acesso e gira token + código de recuperação.

O código de recuperação só é mostrado quando o Premium acaba de ser ativado ou quando o usuário pede para vê-lo.

Veja `docs/PREMIUM-MERCADO-PAGO.md`.

## Variáveis do app

```env
EXPO_PUBLIC_API_URL=https://seu-zup-api.onrender.com
EXPO_PUBLIC_PRIVACY_URL=
EXPO_PUBLIC_SUPPORT_URL=
```

## Variáveis do backend

```env
DATABASE_URL=...
DATABASE_SSL=false
CORS_ORIGINS=...
PUBLIC_API_URL=https://seu-zup-api.onrender.com
MERCADO_PAGO_ACCESS_TOKEN=...
MERCADO_PAGO_WEBHOOK_SECRET=...
```

Nunca coloque o Access Token do Mercado Pago no aplicativo Expo.

## Estrutura

- `app/` — Expo / React Native.
- `app/src/services/backend.ts` — playerId, Premium e recuperação.
- `app/src/photos.ts` — banco curado de fotos reais e seleção visual.
- `app/src/exams.ts` — planos e geração dos simulados.
- `api/` — API Node/Express/PostgreSQL para jogadores, Premium, recuperação e Mercado Pago.
- `tests/` — testes de catálogo, progresso, sessões, UI e configuração.
