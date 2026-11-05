export const colors = {
  // Cor de ação/marca — usada no app inteiro (splash, CTA, ícones, cards de poema)
  primary: '#0a63f4',
  // Variantes de interação, cursor e seleção de texto
  primaryPressed: '#084EC2', // feedback tátil de peso ao pressionar ações primárias
  cursor: '#3B7BE3', // guia o olho no fundo sépia sem a vibração elétrica do primary puro
  selection: '#C8DCF8', // azul aquarelado que ilumina a palavra selecionada sobre o papel quente

  // Neutros já usados nas telas atuais
  white: '#FFFFFF',
  light: '#F8F8FF',
  secondary: '#D5DEEF', // placeholder de capa de notebook sem imagem
  dark: '#161616',

  // Fundos por tempo de permanência na tela (pesquisa de fadiga ocular)
  backgroundTabs: '#F7F5F1', // Home / Notebooks
  backgroundReading: '#FBF6EE', // tela do notebook + editor (sépia)
  ink: '#2B2320', // texto do corpo do editor

  // Faixa intermediária entre o header branco e o fundo das telas
  // (SortFilterBar e bloco de resumo da Home) — mais clara que
  // backgroundTabs/backgroundReading e mais quente que o branco puro.
  surfaceBar: '#FCFBF8',
  // Ícones/textos secundários discretos (cinza quente, combina com os fundos sépia)
  muted: '#6B665F',
  // Hierarquia da "tinta" e neutros silenciosos
  placeholder: '#A39C93', // grafite claro e quente — reduz o peso da página em branco
  border: '#E6E1D8', // divisórias quentes com aspecto de corte de papelaria

  // Superfícies de sobreposição (modais, bottom sheets e popovers)
  surfaceElevated: '#FFFDF9', // branco aquecido que não parece frio sobre o fundo sépia
  backdrop: 'rgba(27, 22, 20, 0.45)', // escurecimento com matriz quente do ink

  // Semântica de ação destrutiva (carmim/terracota queimado — alerta sem estresse visual)
  danger: '#C84B31',

  // Tons claros derivados do `primary` — fundos suaves que conversam com
  // o azul da marca (ex.: degradê da Welcome) sem competir com os botões.
  primaryTint: {
    soft: '#EEF4FF',
    mid: '#D9E7FE',
  },

  // Paleta curada pra cor de capa do notebook (escolha do usuário)
  notebookAccents: {
    terracotta: '#7A4A32',
    sage: '#8A9A5B',
    mustard: '#D7A63E',
    dustyBlue: '#4A6FA5',
  },
} as const;

export type ColorToken = keyof typeof colors;
export type NotebookAccent = keyof typeof colors.notebookAccents;
