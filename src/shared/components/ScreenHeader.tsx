import type { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { moderateScale } from '@/shared/theme/metrics';

type ScreenHeaderProps = {
  title: string;
  rightSlot?: ReactNode;
};

// Base de qualquer tela com título no topo (Home, Notebooks, e agora
// o notebook também). Sem bg próprio — herda da tela, pra nunca mais
// criar aquela faixa de cor destoando do resto da página. O respiro
// do topo vem do safe-area-context, não de um pt-16 chutado, então
// fica consistente em qualquer aparelho. Isso também já é a base pra
// quando isso virar uma nav-bar fixa de verdade.
export function ScreenHeader({ title, rightSlot }: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingTop: insets.top + moderateScale(12) }}
      className="flex-row items-center justify-between px-6 pb-4"
    >
      <Text className="font-medium text-3xl text-dark">{title}</Text>
      {rightSlot}
    </View>
  );
}