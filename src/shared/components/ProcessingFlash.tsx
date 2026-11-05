import { useEffect, type ReactNode } from 'react';
import { Animated, Easing, StyleSheet, View, useAnimatedValue } from 'react-native';

import { colors } from '@/shared/theme/colors';

type ProcessingFlashProps = {
  /**
   * Incrementar esse número dispara a transição de reordenação. Usamos um
   * contador controlado pela tela, e não o valor da ordenação em si, para
   * só animar em ação explícita do usuário — nunca na hidratação do storage.
   */
  trigger: number;
  children: ReactNode;
};

const SLIDE_OFFSET = 10;

// Combina o escurecimento rápido estilo Spotify (`colors.backdrop`, matriz
// quente do `ink`) com um micro-slide + fade da própria lista ao emergir
// reordenada. Usa apenas `opacity` e `transform` com `useNativeDriver: true`,
// rodando 100% na UI thread com custo fixo O(1), sem recalcular layout de
// cada item da FlatList.
export function ProcessingFlash({ trigger, children }: ProcessingFlashProps) {
  const veilOpacity = useAnimatedValue(0);
  const contentProgress = useAnimatedValue(1);

  useEffect(() => {
    if (trigger === 0) return;
    veilOpacity.stopAnimation();
    contentProgress.stopAnimation();

    Animated.parallel([
      Animated.sequence([
        Animated.timing(veilOpacity, {
          toValue: 1,
          duration: 90,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(veilOpacity, {
          toValue: 0,
          duration: 190,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(contentProgress, {
          toValue: 0,
          duration: 80,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(contentProgress, {
          toValue: 1,
          duration: 200,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [trigger, veilOpacity, contentProgress]);

  return (
    <View className="flex-1 overflow-hidden">
      <Animated.View
        className="flex-1"
        style={{
          opacity: contentProgress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 1],
          }),
          transform: [
            {
              translateY: contentProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [SLIDE_OFFSET, 0],
              }),
            },
          ],
        }}
      >
        {children}
      </Animated.View>
      <Animated.View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: colors.backdrop,
            opacity: veilOpacity,
          },
        ]}
      />
    </View>
  );
}
