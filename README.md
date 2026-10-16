# ZUP! 1.7.0

ZUP! transforma o hábito de rolar a tela em aprendizado rápido e gamificado. O app combina feed vertical, microaulas, quizzes, biblioteca, repetição espaçada, XP, estrelas, streak, companheiros evolutivos, simulados e trilhas de estudo.

## O que há nesta versão

- **10.960 perguntas** no total: 960 preservadas + **10.000 novas**.
- **44 categorias/matérias** e **21 trilhas/filtros**.
- **1.260 microaprendizados**; perguntas do mesmo conceito podem compartilhar a mesma explicação curta.
- Banco equilibrado entre Brasil, concursos, ENEM, faculdade, Humanas, Exatas, Biológicas, saúde, tecnologia, Direito, negócios, cultura, entretenimento, religiões e pensamento crítico.
- Medicina ganhou profundidade em anatomia, fisiologia, clínica, epidemiologia e bioética, sem dominar o catálogo.
- Nova categoria e trilha **Revalida**, com 600 questões/casos educacionais de clínica, pediatria, gineco-obstetrícia, cirurgia, urgência, saúde coletiva, ética e SUS.
- Farmácia/farmacologia, Enfermagem e Biomedicina foram ampliadas.
- **286 questões possuem imagem didática específica**, principalmente anatomia e corpo humano, além do banco de fotos reais do feed.
- Quizzes agora priorizam conceitos diferentes dentro da mesma rodada para reduzir sensação de repetição.
- Pergunta respondida sai da rotação normal; repetição fica no modo Revisão.
- Microaula -> quiz relacionado de até 5 perguntas.
- Premium por **R$ 9,99 / 30 dias**, controlado pelo backend.
- Sem cadastro e sem login: a instalação recebe um `playerId` anônimo.
- Premium restaurável em outro aparelho por um código `ZUP-XXXX-XXXX-XXXX`.
- Simulado Inteligente Premium de 20, 45 ou 60 questões, incluindo presets de Revalida.

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
EXPO_PUBLIC_API_URL=https://zup-api.onrender.com
EXPO_PUBLIC_PRIVACY_URL=https://zup-api.onrender.com/privacy
EXPO_PUBLIC_SUPPORT_URL=https://zup-api.onrender.com/support
EXPO_PUBLIC_TERMS_URL=https://zup-api.onrender.com/terms
```

## Variáveis do backend

```env
DATABASE_URL=...
DATABASE_SSL=false
CORS_ORIGINS=...
PUBLIC_API_URL=https://zup-api.onrender.com
MERCADO_PAGO_ACCESS_TOKEN=...
MERCADO_PAGO_WEBHOOK_SECRET=...
```

Nunca coloque o Access Token do Mercado Pago no aplicativo Expo.

## Estrutura

- `app/` — Expo / React Native.
- `app/src/massiveQuestions.ts` — geração determinística das 10.000 novas questões, por área.
- `app/src/questions.ts` — catálogo consolidado e IDs estáveis.
- `app/src/services/backend.ts` — playerId, Premium e recuperação.
- `app/src/photos.ts` — banco curado de fotos reais e imagens didáticas.
- `app/src/exams.ts` — planos e geração dos simulados, incluindo Revalida.
- `api/` — API Node/Express/PostgreSQL para jogadores, Premium, recuperação, Mercado Pago e páginas públicas legais.
- `tests/` — testes de catálogo, progresso, sessões, UI e configuração.
