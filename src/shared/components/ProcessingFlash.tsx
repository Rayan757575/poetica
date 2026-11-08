import { useEffect, type ReactNode } from 'react';
import { Animated, Easing, StyleSheet, View, useAnimatedValue } from 'react-native';

import { colors } from '@/shared/theme/colors';

type ProcessingFlashProps = {
  /**
   * Incrementar esse número dispara a transição de reordenação (Modelo R3:
   * Scale-Settle em 2 fases, 75ms recolhimento + 130ms acomodação = 205ms).
   * Usamos um contador controlado pela tela para só animar em ação explícita
   * do usuário — nunca na hidratação do storage.
   */
  trigger: number;
  children: ReactNode;
};

const MAX_VEIL_OPACITY = 0.35;

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
          toValue: MAX_VEIL_OPACITY,
          duration: 75,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(veilOpacity, {
          toValue: 0,
          duration: 130,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(contentProgress, {
          toValue: 0,
          duration: 75,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(contentProgress, {
          toValue: 1,
          duration: 130,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [trigger, veilOpacity, contentProgress]);

  return (
    <View className="flex-1 overflow-hidden">
      <Animated.View
        style={{
          flex: 1,
          opacity: contentProgress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.25, 1],
          }),
          transform: [
            {
              scale: contentProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.975, 1],
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
