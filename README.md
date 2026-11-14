# Poética 📖

App mobile de escrita criativa e poesia desenvolvido em **React Native + Expo**. Os textos são organizados em **notebooks**, seguindo a lógica de coleções literárias: cada notebook agrupa poemas por temática, gênero ou heterônimo.

> Este repositório abriga a **v2** do aplicativo, reescrita em arquitetura moderna como projeto autoral e peça de portfólio profissional.

## Sumário

- [Stack](#stack)
- [Setup](#setup)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Design system](#design-system)

## Stack

| Área           | Tecnologia                                                                 |
| -------------- | -------------------------------------------------------------------------- |
| Base           | Expo SDK 57, React Native 0.86.3, React 19.2.3, TypeScript (`strict`)      |
| Navegação      | Expo Router (file-based)                                                   |
| Estado         | Zustand + `persist` com `@react-native-async-storage/async-storage`        |
| Estilo         | NativeWind v4 (Tailwind CSS)                                               |
| Ícones         | `@expo/vector-icons/Ionicons`                                              |
| Responsividade | `react-native-size-matters`                                                |
| Fontes         | Lemonada (marca/títulos), Literata (corpo do editor), Inter (labels de UI) |

## Setup

```bash
npm install
npx expo install --fix   # alinha as versões dos pacotes do Expo
npx expo start
```

Path aliases (resolvidos nativamente pelo Metro a partir do `tsconfig.json`):

- `@/*` → `./src/*`
- `@/assets/*` → `./assets/*`

## Estrutura de pastas

```
src/
  app/                      # Expo Router: rotas e composição de telas
    index.tsx               # Redirecionamento inicial
    welcome.tsx             # Tela de boas-vindas (onboarding)
    (tabs)/
      _layout.tsx           # Navegação por abas (Home, Notebooks)
      home.tsx              # Captura rápida e poemas recentes
      notebooks/
        _layout.tsx         # Stack aninhado de notebooks
        index.tsx           # Listagem e gerenciamento de notebooks
        [id].tsx            # Detalhe do notebook e listagem de poemas
    poem/[id].tsx           # Editor imersivo de poemas
    +not-found.tsx
  features/
    notebooks/              # Componentes, store e tipagens de notebooks
    poems/                  # Componentes, store e tipagens de poemas
  shared/
    components/             # Componentes visuais e transições compartilhadas
    lib/                    # Utilitários de persistência e infraestrutura
    store/                  # Preferências persistidas de visualização e ordenação
    theme/                  # Tokens de cores, tipografia, métricas e elevação
  global.css
assets/images/              # Marca, capas e ativos visuais
```

## Design system

Os tokens em `src/shared/theme/` formam a fonte única de verdade visual do aplicativo, equilibrando dois momentos cognitivos: **exploração/organização** (guiada pelo azul central) e **introspecção/escrita** (apoiada por tons de papel sépia e tinta quente).

| Valor                                 | Uso / Especificação                                                  |
| ------------------------------------- | -------------------------------------------------------------------- |
| `#0a63f4`                             | Cor primária central do aplicativo e foco de ação                    |
| `#084EC2`                             | Feedback tátil de pressão em ações primárias                         |
| `#3B7BE3`                             | Cursor de digitação no fundo sépia (contraste sem vibração elétrica) |
| `#C8DCF8`                             | Seleção de texto aquarelada sobre o papel quente                     |
| `#FFFFFF`                             | Branco puro para textos sobre fundos primários e destaques           |
| `#F8F8FF`                             | Superfície clara de apoio                                            |
| `#D5DEEF`                             | Placeholder secundário de capas                                      |
| `#161616`                             | Texto escuro de alto contraste                                       |
| `#F7F5F1`                             | Fundo de navegação das abas principais (Home e Notebooks)            |
| `#FBF6EE`                             | Fundo de leitura e do editor de poemas (papel sépia)                 |
| `#2B2320`                             | Tinta quente para o texto literário e corpo do editor                |
| `#FCFBF8`                             | Superfície de faixas de controle, filtros e fichas literárias        |
| `#FFFDF9`                             | Superfície aquecida para modais, diálogos e bottom sheets            |
| `rgba(27, 22, 20, 0.45)`              | Escurecimento quente de fundo para modais e transições               |
| `#6B665F`                             | Ícones e metadados secundários discretos                             |
| `#A39C93`                             | Placeholders silenciosos em grafite quente                           |
| `#E6E1D8`                             | Divisórias e bordas com aspecto de papelaria                         |
| `#C84B31`                             | Ações destrutivas em tom carmim/terracota queimado                   |
| `#EEF4FF` / `#D9E7FE`                 | Superfícies e bordas tonais derivadas da cor primária                |
| Terracotta, Sage, Mustard, Dusty Blue | Paleta complementar de acentos para capas de coleções                |

**Racional tipográfico e cromático:** O azul estimula tarefas criativas e organiza os pontos de ação (Mehta & Zhu, 2009, _Science_), enquanto os fundos aquecidos reduzem a fadiga ocular durante sessões prolongadas de escrita. A fonte **Lemonada** confere identidade autoral à marca e aos títulos, a **Literata** oferece conforto ótico para leitura e composição poética em tela, e a **Inter** assegura legibilidade neutra nos controles de interface.
