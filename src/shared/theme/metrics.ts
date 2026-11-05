import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export { scale, verticalScale, moderateScale };

// Medidas padrão de card/lista. O NotebookCard é a referência do modo
// "albums" e o NotebookListItem a do modo "list" — PoemCard, PoemListItem
// e CreateCard usam os mesmos valores pra tudo ficar alinhado.
export const cardSize = scale(150);
export const cardRadius = 30;
export const listThumbSize = scale(56);
export const listThumbRadius = 8;
