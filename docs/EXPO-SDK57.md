# Ambiente Expo SDK 57

A migração SDK 55 → 57 já havia sido feita na versão anterior, que a usuária confirmou ter aberto.
Esta revisão **não muda de SDK**. O principal acréscimo de dependência é `react-native-svg` 15.15.4.

| Dependência | Declaração do projeto |
|---|---|
| Expo | ~57.0.26 |
| React / React DOM | 19.2.3 |
| React Native | 0.86.3 |
| Safe Area Context | ~5.7.0 |
| React Native SVG | 15.15.4 |
| AsyncStorage | 2.2.0 |
| Node | >= 22.13.0 |

Referências oficiais consultadas em 15/10/2026:
- SVG SDK 57 / incluído no Expo Go: https://docs.expo.dev/versions/v57.0.0/sdk/svg/
- Matriz do SDK: https://raw.githubusercontent.com/expo/expo/sdk-57/packages/expo/bundledNativeModules.json
- Atualização de SDK: https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/
- Safe areas: https://docs.expo.dev/develop/user-interface/safe-areas/
- Barras de sistema: https://docs.expo.dev/develop/user-interface/system-bars/

## Instalação

O script `setup` usa as dependências declaradas e executa `expo install --fix` para alinhar o SDK.
Depois roda `expo install --check`, `tsc --noEmit`, os testes e o Expo Doctor. Se qualquer etapa falhar,
o processo para antes de iniciar o Metro. Não ignore a falha.

Não foi possível gerar um `package-lock.json` real neste ambiente sem acesso ao registro npm.
Após uma instalação local bem-sucedida e os testes, versionar o lockfile gerado no GitHub é recomendado.
Não invente um lockfile nem copie o lock do SDK 55. Este ZIP não inclui `node_modules`.

## Falhas comuns

**Missing script setup:** nesta versão o script existe tanto em ZUP quanto em ZUP/app.
Confira que abriu o novo ZIP e não o terminal de outra pasta.

**Expo Go incompatível:** confira se o QR é do Metro novo, se a instalação foi concluída e se o
pacote Expo instalado em `app/node_modules` é 57.x. Feche o servidor antigo antes de abrir outro.

**Plugin não encontrado / react-native-svg ausente:** o código foi substituído, mas as novas
dependências não foram instaladas. Execute `npm run setup` e aguarde a conclusão.

**SDK antigo detectado:** guarde a pasta anterior e extraia o ZIP em uma pasta nova. Não misture
`node_modules`, lockfiles ou `.expo` de outra instalação.

**Sem QR ou sem conexão:** mantenha PC e celular na mesma rede, sem bloquear o Metro no firewall.
O comando `npm run start:tunnel` dentro de app é uma alternativa de desenvolvimento e pode instalar
o componente de túnel, consumir rede e pedir confirmação. Não é modo de produção.

Não há alteração automática da conta Expo, Apple, Play Console, Render ou GitHub.
