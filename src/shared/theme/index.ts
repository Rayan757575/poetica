import { colors } from './colors';
import { fontFamily, fontSize } from './typography';

export const theme = {
  colors,
  fontFamily,
  fontSize,
} as const;

export * from './colors';
export * from './typography';