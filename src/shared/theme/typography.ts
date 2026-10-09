export const fontFamily = {
  // Marca / títulos / botões
  brandRegular: 'Lemonada_400Regular',
  brandMedium: 'Lemonada_500Medium',
  brandSemiBold: 'Lemonada_600SemiBold',
  brandBold: 'Lemonada_700Bold',

  // Corpo do poema / leitura longa
  reading: 'Literata_400Regular',
  readingBold: 'Literata_700Bold',

  // Interface / labels / abas
  ui: 'Inter_400Regular',
  uiMedium: 'Inter_500Medium',
} as const;

export const fontSize = {
  display: 32,
  title: 24,
  body: 16,
  label: 13,
  caption: 11,
} as const;

export type FontFamilyToken = keyof typeof fontFamily;