import type { ViewStyle } from 'react-native';

import { colors } from './colors';

export const subtleDividerStyle: ViewStyle = {
  borderBottomWidth: 1,
  borderBottomColor: colors.border,
  shadowColor: colors.ink,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 3,
  elevation: 2,
};
