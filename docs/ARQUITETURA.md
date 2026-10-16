# Arquitetura — ZUP! 1.5

## Mobile

Expo SDK 57 + React Native. O progresso do jogo permanece local e passa por normalização/migração antes de chegar à UI.

O feed usa paginação vertical, fotos reais remotas, microaulas e sessões de quiz. Questões concluídas saem da seleção normal; revisão é separada.

## Backend

Node/Express + PostgreSQL no Render.

Responsabilidades atuais:

- criar identidade anônima do jogador;
- autenticar por bearer token de alta entropia;
- guardar o vencimento Premium;
- criar cobranças Mercado Pago;
- verificar webhook e reconciliar pagamentos diretamente com o provedor;
- impedir aplicação duplicada de uma mesma compra;
- fornecer status Premium ao app.

O segredo do Mercado Pago existe somente no backend.

## Simulado Inteligente

O app interpreta a busca do usuário e monta um plano com categorias relevantes. O gerador escolhe apenas questões ainda não concluídas e distribui o simulado entre as matérias do plano. Sessões podem ter até 60 questões e sobrevivem à persistência local.

O banco atual contém questões próprias do ZUP; não há promessa de reprodução oficial de editais/provas.
