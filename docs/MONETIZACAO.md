# ZUP! Premium — modelo comercial

> **Status na versão 1.7.1:** integração dormente. A primeira release das lojas é gratuita e não expõe Premium, preço, Mercado Pago ou checkout no aplicativo. Este documento fica apenas como referência para uma atualização futura.


O catálogo principal do ZUP continua gratuito e o Premium adiciona modos de estudo mais profundos.

## Preço

**R$ 9,99 por 30 dias.**

Cada pagamento confirmado adiciona 30 dias ao vencimento atual. Se o acesso já venceu, o novo período começa na confirmação.

## Pagamento

Ao tocar em **Quero ser Premium**, o ZUP abre o checkout seguro do Mercado Pago. Pix e cartão são escolhidos nesse checkout. O app não coleta dados de pagamento.

## Identidade

Não existe conta ZUP ou login. O backend identifica a instalação por `playerId` + token e associa o Premium a esse jogador. Um código de recuperação permite transferir um Premium ativo para outro aparelho.

## Regra de acesso

- `premium_until > now()` -> Premium ativo;
- expirado ou sem pagamento -> Premium bloqueado;
- estado local nunca concede Premium;
- pagamento só é aplicado uma vez;
- estorno/chargeback pode revogar o período correspondente;
- o app consulta o backend ao iniciar, voltar ao primeiro plano e depois do checkout.

## Recursos Premium

- Simulado Inteligente de 20, 45 ou 60 questões;
- busca/descrição por banca, órgão, cidade, cargo, curso ou matérias;
- explicação curta após cada resposta;
- Maratona de 10 perguntas;
- estrutura para mapa de domínio e recursos avançados posteriores.
