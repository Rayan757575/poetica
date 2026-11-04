import type { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { moderateScale } from '@/shared/theme/metrics';

type ScreenHeaderProps = {
  title: string;
  rightSlot?: ReactNode;
  /** Borda inferior quase imperceptível, ligada por padrão. */
  showBorder?: boolean;
  /** Cor/opacidade da borda — passe outro valor (ou showBorder={false}) pra mudar/remover. */
  borderColor?: string;
};

export function ScreenHeader({
  title,
  rightSlot,
  showBorder = true,
  borderColor = 'rgba(22,22,22,0.08)',
}: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top + moderateScale(12),
        borderBottomWidth: showBorder ? 1 : 0,
        borderBottomColor: borderColor,
      }}
      className="flex-row items-center justify-between bg-white px-6 pb-4"
    >
      <Text className="font-medium text-3xl text-dark">{title}</Text>
      {rightSlot}
    </View>
  );
}
