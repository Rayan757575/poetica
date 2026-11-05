# Poética 📖

App mobile de escrita (poesia e afins) em **React Native + Expo**. Os textos são organizados em **notebooks**, na mesma lógica de playlists: cada notebook agrupa poemas por assunto, gênero ou heterônimo.

> Este repositório é a **v2**, reescrita do zero sobre o mesmo repositório do projeto original (histórico antigo sobrescrito via `git push --force`). Também é uma peça de portfólio profissional.

## Sumário

- [Stack](#stack)
- [Setup](#setup)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Design system](#design-system)
- [Regras de negócio](#regras-de-negócio)
- [Decisões técnicas](#decisões-técnicas)
- [Estado atual](#estado-atual)
- [Roadmap](#roadmap)
- [Segurança](#segurança)
- [Convenções do projeto](#convenções-do-projeto)

## Stack

| Área | Tecnologia |
|------|------------|
| Base | Expo SDK 57, React Native 0.86.3, React 19.2.3, TypeScript (`strict`) |
| Navegação | Expo Router (file-based) |
| Estado | Zustand + `persist` com `@react-native-async-storage/async-storage` |
| Estilo | NativeWind v4 (Tailwind) |
| Ícones | `@expo/vector-icons/Ionicons` |
| Responsividade | `react-native-size-matters` |
| Fontes | Lemonada (marca/títulos), Literata (corpo do editor), Inter (labels de UI) |

O app é testado principalmente via **Expo Go**, o que restringe o uso de libs nativas.

## Setup

```bash
npm install
npx expo install --fix   # alinha as versões dos pacotes do Expo
npx expo start
```

Path aliases (resolvidos nativamente pelo Metro a partir do `tsconfig.json`, sem `babel-plugin-module-resolver`):

- `@/*` → `./src/*`
- `@/assets/*` → `./assets/*`

## Estrutura de pastas

```
src/
  app/                      # Expo Router: só rotas/composição
    index.tsx               # Splash (2s, redireciona para /welcome)
    welcome.tsx             # Onboarding (UI estática, sem auth)
    (tabs)/
      _layout.tsx           # Tabs (Home, Notebooks) + notebook/[id] com href:null
      home.tsx
      notebooks.tsx
      notebook/[id].tsx     # Dentro de (tabs) para manter a navbar
    poem/[id].tsx           # Editor, fora de (tabs): sem navbar
    +not-found.tsx
  features/
    notebooks/              # components, store/useNotebooksStore.ts, types.ts
    poems/                  # components, store/usePoemsStore.ts, types/
  shared/
    components/             # ScreenHeader, SortFilterBar, SortOptionsSheet, CreateCard
    lib/                    # storage.ts, api.ts
    theme/                  # colors, typography, metrics, elevation, index
  global.css
assets/images/              # logo, wallpapers, ícones
```

## Design system

Os tokens em `src/shared/theme/` são a fonte única de verdade: `colors.ts` e `typography.ts` são importados diretamente pelo `tailwind.config.js`, sem duplicação.

| Token | Valor | Uso |
|-------|-------|-----|
| `primary` | `#0a63f4` | Cor central do app (decisão inegociável) |
| `white` | `#FFFFFF` | |
| `light` | `#F8F8FF` | |
| `secondary` | `#D5DEEF` | Placeholder de capa de notebook |
| `dark` | `#161616` | Texto padrão |
| `backgroundTabs` | `#F7F5F1` | Fundo de Home/Notebooks |
| `backgroundReading` | `#FBF6EE` | Fundo do notebook-detail e do editor (sépia) |
| `ink` | `#2B2320` | Texto do corpo do editor |
| `notebookAccents` | terracotta, sage, mustard, dustyBlue | Cores de capa (ainda sem UI) |

Racional: azul favorece tarefas criativas (Mehta & Zhu, 2009, *Science*); fundos quentes reduzem a fadiga ocular em leitura longa; Lemonada (arredondada) fica na marca e nos títulos, e Literata no corpo por ser desenhada para leitura em tela.

## Regras de negócio

### Notebooks
- Existe o notebook fixo **"Sem categoria"** (`UNCATEGORIZED_NOTEBOOK_ID = 'uncategorized'`). Ele não pode ser removido, é seedado como primeiro item e reinjetado via `merge` do `persist` se faltar.
- `createdBy`/`updatedBy`: `"você"` para o que o usuário cria e `"sistema"` para "Sem categoria". Não são exibidos na UI.
- Listas ordenadas do **mais recente para o mais antigo** (`slice().reverse()`).
- A migração retroativa de `createdBy` (`migrateNotebooks`) foi removida a pedido do dono. Não reintroduzir sem pedir.

### Poemas
- Campos de `Poem`: `id, notebookId, title, content, type, createdAt, createdBy, updatedAt, updatedBy`.
- `PoemType = 'soneto' | 'haicai' | 'trova' | 'livre'`, com `'livre'` como padrão. Cada tipo tem um arquivo de metadados em `features/poems/types/` contendo só `{ id }`. Propriedades específicas ainda não foram definidas.
- Todo poema novo se chama **"Novo poema"**, e `addPoem(notebookId)` não recebe título.
- O editor salva no **unmount** (cleanup de `useEffect`, lendo refs), cobrindo seta, botão físico e gesto de voltar.
- `recentPoemIds` (últimos 5 poemas) é um array simples e não um LRU: com N=5 a diferença é irrelevante e serializa direto em JSON.

### Navegação e visual
- `ScreenHeader` tem fundo branco próprio e usa `useSafeAreaInsets()`.
- `SortFilterBar` e o bloco de texto da Home usam `subtleDividerStyle` (borda fina + sombra leve), sem fundo próprio.
- O ícone do toggle lista/grade mostra o modo que será alcançado ao tocar.
- O `FlatList` usa `key={viewMode}`, pois `numColumns` não pode mudar sem remontar.

## Decisões técnicas

- **AsyncStorage em vez de MMKV:** o MMKV exige dev client nativo e não roda no Expo Go. Para voltar a ele, gere um dev client (`npx expo run:android` ou EAS Build) e altere `src/shared/lib/storage.ts`.
- **Responsividade só em dimensões cruas** (`style={}`) via `scale()`/`verticalScale()`/`moderateScale()`. As classes do Tailwind não são escaladas, porque o `tailwind.config.js` roda no build e não no dispositivo.
- **Bottom sheet sem lib:** `SortOptionsSheet` usa `Modal` (`animationType="none"`) com `Animated`, com fade no fundo e slide no cartão separados.
- **Zero dependências novas** quando a API nativa resolve.
- `axios` existe em `shared/lib/api.ts`, mas nada o usa hoje.
- Sem testes nem CI/CD.

## Estado atual

**Funciona**
- Fluxo Splash → Welcome → Tabs (Home/Notebooks) → Notebook → Editor.
- Criação e listagem de notebooks e poemas, com edição de título e conteúdo.
- Notebook "Sem categoria" protegido.
- Toggle lista/grade.
- Componentes compartilhados e tokens centralizados.

**Pendente ou incerto**
- Variante `textPosition="row"` do `CreateCard` (aprovada, ainda não escrita). É a próxima tarefa.
- Ordenação (`SortOptionsSheet`) é só visual.
- Ícones de busca e "+" em `ScreenHeader` de Notebooks estão inertes.
- Sem autenticação real.
- Sem UI para capa de notebook (`wallpaper` cai sempre em `vangogh-2.jpg`) nem para `notebookAccents`.
- Lista de "últimos poemas" na Home: o dono reportou que não funciona, mas a revisão não achou bug. **Verificar em build real.**

## Roadmap

1. **Fase 1 (em andamento):** recriar a funcionalidade da v1 em stack moderna.
2. **Fase 2 (parcial):** nova identidade visual inspirada no Pinterest (paleta, tipografia, grid dinâmico).
3. **Fase 3 (não iniciada):** editor com busca de sinônimos ao selecionar uma palavra, e possivelmente recursos estilo Kindle como a Wikipédia. Há um `TODO` em `src/app/poem/[id].tsx` apontando para `@10play/tentap-editor`.

## Segurança

O código da v1 tinha uma chave do RapidAPI hardcoded em `services/api/index.js`. Ela não foi trazida para a v2, mas commits antigos podem continuar acessíveis em forks ou clones feitos antes do force-push. **Confirme que a chave foi revogada no painel do RapidAPI.**

## Convenções do projeto

- Comentários, comunicação e copy de UI em **pt-BR**.
- Diffs cirúrgicos: respeitar nomenclaturas e estruturas existentes.
- Perguntar antes de decidir em pontos ambíguos ou de arquitetura cara de reverter.
- Preferir a solução mais simples para o tamanho real do problema, e deixar explícito no código onde uma solução mais robusta caberia se a escala mudar.
- Explicar o "porquê" das decisões não óbvias nos comentários.
