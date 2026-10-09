export const colors = {
  // Cor de ação/marca — usada no app inteiro (splash, CTA, ícones, cards de poema)
  primary: '#0a63f4',

  // Neutros já usados nas telas atuais
  white: '#FFFFFF',
  light: '#F8F8FF',
  secondary: '#D5DEEF', // placeholder de capa de notebook sem imagem
  dark: '#161616',

  // Fundos por tempo de permanência na tela (pesquisa de fadiga ocular)
  backgroundTabs: '#F7F5F1',     // Home / Notebooks
  backgroundReading: '#FBF6EE',  // tela do notebook + editor (sépia)
  ink: '#2B2320',                 // texto do corpo do editor

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