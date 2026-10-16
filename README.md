# ZUP! 1.7.1 — lançamento gratuito para as lojas

ZUP! é um app/jogo de conhecimento em Expo SDK 57 com feed vertical, microaprendizados, quizzes, revisão espaçada, biblioteca, gamificação e simulados.

## Estado desta release

- **10.960 questões** distribuídas por 44 categorias.
- Medicina, Farmacologia, Anatomia e **Revalida** reforçados sem tirar o foco das demais áreas.
- ENEM, concursos, faculdade, humanas, exatas, biológicas, tecnologia, negócios, direito, Brasil, cultura, entretenimento, religiões e pensamento crítico.
- Simulado Inteligente de 20, 45 ou 60 questões.
- Maratona de 10 perguntas.
- Imagens didáticas em questões compatíveis, inclusive anatomia.
- Feed fullscreen com degradê contínuo, sem a emenda horizontal antiga.
- Sem botão flutuante amarelo de retomada no feed.
- Sem anúncios.
- Sem cadastro obrigatório.
- **Todos os recursos desta primeira versão de loja estão gratuitos.**
- **Nenhuma tela de Premium, Mercado Pago ou compra é exposta pelo app 1.7.1.**

## Monetização futura

A implementação anterior de Premium, recuperação e Mercado Pago foi mantida no repositório apenas como base técnica para uma atualização futura. Ela não é importada pelo `App.tsx` desta release e não fica acessível pela navegação do aplicativo.

Quando a monetização for reativada, a integração deve ser revisada de acordo com as regras vigentes da App Store e Google Play antes de uma nova submissão.

## Projeto EAS

Owner: `zupdev8-wq`

Projeto: `@zupdev8-wq/zup`

O `app/app.json` já contém o `extra.eas.projectId` vinculado ao projeto EAS criado para o ZUP.

## URLs públicas

- API: `https://zup-api.onrender.com`
- Privacidade: `https://zup-api.onrender.com/privacy`
- Termos: `https://zup-api.onrender.com/terms`
- Suporte: `https://zup-api.onrender.com/support`
- Contato: `https://zup-api.onrender.com/contact`
- Exclusão de dados: `https://zup-api.onrender.com/delete-data`
- E-mail: `zupdev8@gmail.com`

## Rodar localmente

```powershell
cd app
npm install
npx expo start --go -c
```

## Validar antes da build

```powershell
cd ..
npm test
npm run release:check
```

## Build de produção

Depois de confirmar as variáveis `EXPO_PUBLIC_*` no ambiente `production` do EAS:

```powershell
cd app
eas build --platform all --profile production
```

O iOS gera a build para App Store Connect e o Android gera o AAB para Google Play.
