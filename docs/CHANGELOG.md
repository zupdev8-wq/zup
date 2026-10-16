# Changelog

## 1.6.0 — Premium sem login + recuperação + banco de imagens ampliado

- remove coleta de e-mail do fluxo Premium;
- identifica o jogador por `playerId` anônimo + token no SecureStore;
- adiciona código de recuperação `ZUP-XXXX-XXXX-XXXX`;
- restauração transfere o Premium para o novo aparelho e gira token/código;
- código só aparece após ativação, restauração ou pedido explícito do usuário;
- checkout único do Mercado Pago deixa Pix/cartão no ambiente do provedor;
- mantém Premium autoritativo no backend por `premium_until`;
- banco visual passa a ter mais de 90 fotos reais únicas e seleção variada por card;
- feed usa variante visual por posição para reduzir repetição de imagens.

## 1.5.0 — Premium real + Mercado Pago + Simulado Inteligente

- Premium passa a ser autorizado exclusivamente pelo backend.
- R$ 9,99 libera 30 dias; expiração bloqueia automaticamente recursos Premium.
- Pix com QR Code/copia-e-cola via Mercado Pago.
- Cartão via checkout hospedado pelo Mercado Pago.
- webhook assinado e reconciliação server-to-server.
- estado Premium local antigo não concede acesso.
- Simulado Inteligente Premium com 20, 45 ou 60 questões.
- pesquisa/descrição por banca, órgão, cidade, cargo, curso e matérias.
- presets para Cebraspe, Câmara, Prefeitura, carreiras policiais, fiscal, saúde, TI, engenharia, OAB, ENEM e cursos universitários.
- explicações curtas após cada questão.
- questões já respondidas permanecem fora da rotação normal.
- estrutura de quiz adaptada para sessões longas.

## 1.4.1 — Feed estável

- feed deixa de reordenar enquanto o usuário apenas visualiza/salva cards;
- correções de JSX e estabilidade.
