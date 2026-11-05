import { useEffect, type ReactNode } from 'react';
import { Animated, StyleSheet, View, useAnimatedValue } from 'react-native';

import { colors } from '@/shared/theme/colors';

type ProcessingFlashProps = {
  /**
   * Incrementar esse número dispara o "flash" (escurece e volta). Usamos um
   * contador controlado pela tela, e não o valor da ordenação em si, para
   * só animar em ação explícita do usuário — nunca na hidratação do storage.
   */
  trigger: number;
  children: ReactNode;
};

const PEAK_OPACITY = 0.14;

// Escurece levemente o conteúdo e volta ao normal, sinalizando ao usuário
// que algo foi processado (ex.: troca de ordenação). Roda com o native
// driver (só `opacity`), então não ocupa a thread JS durante a animação.
export function ProcessingFlash({ trigger, children }: ProcessingFlashProps) {
  const opacity = useAnimatedValue(0);

  useEffect(() => {
    if (trigger === 0) return;
    opacity.stopAnimation();
    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 160, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0, duration: 320, useNativeDriver: true }),
    ]).start();
  }, [trigger, opacity]);

  return (
    <View className="flex-1">
      {children}
      <Animated.View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: colors.dark,
            opacity: opacity.interpolate({ inputRange: [0, 1], outputRange: [0, PEAK_OPACITY] }),
          },
        ]}
      />
    </View>
  );
}
