import Ionicons from '@expo/vector-icons/Ionicons';
import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/shared/theme/colors';
import { moderateScale } from '@/shared/theme/metrics';

type ScreenHeaderProps = {
  title: string;
  onBack?: () => void;
  centerTitle?: boolean;
  rightSlot?: ReactNode;
  /** Borda inferior quase imperceptível, ligada por padrão. */
  showBorder?: boolean;
  /** Cor/opacidade da borda — passe outro valor (ou showBorder={false}) pra mudar/remover. */
  borderColor?: string;
};

export function ScreenHeader({
  title,
  onBack,
  centerTitle = false,
  rightSlot,
  showBorder = true,
  borderColor = colors.border,
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
      {centerTitle ? (
        <>
          <View className="w-10 items-start">
            {onBack && (
              <Pressable onPress={onBack} hitSlop={12} accessibilityLabel="Voltar">
                <Ionicons name="arrow-back" size={24} color={colors.dark} />
              </Pressable>
            )}
          </View>
          <Text
            className="flex-1 px-2 text-center font-medium text-3xl text-dark"
            numberOfLines={1}
          >
            {title}
          </Text>
          <View className="w-10 items-end">{rightSlot}</View>
        </>
      ) : (
        <>
          <View className="flex-row items-center gap-3">
            {onBack && (
              <Pressable onPress={onBack} hitSlop={12} accessibilityLabel="Voltar">
                <Ionicons name="arrow-back" size={24} color={colors.dark} />
              </Pressable>
            )}
            <Text className="font-medium text-3xl text-dark">{title}</Text>
          </View>
          {rightSlot}
        </>
      )}
    </View>
  );
}
