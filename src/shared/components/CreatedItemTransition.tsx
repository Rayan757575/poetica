import { useEffect, type ReactNode } from 'react';
import { Animated, Easing, useAnimatedValue } from 'react-native';

type CreatedItemTransitionProps = {
  /**
   * Quando `true`, executa o pop elástico de entrada (Modelo C1: scale 0.82 -> 1
   * e opacity 0 -> 1 em 220ms). Quando `false` (itens hidratados do storage),
   * permanece estático em opacity 1 e scale 1 sem disparar animação.
   */
  isNew: boolean;
  children: ReactNode;
};

export function CreatedItemTransition({ isNew, children }: CreatedItemTransitionProps) {
  const opacity = useAnimatedValue(isNew ? 0 : 1);
  const scale = useAnimatedValue(isNew ? 0.82 : 1);

  useEffect(() => {
    if (!isNew) return;
    opacity.setValue(0);
    scale.setValue(0.82);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 180,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 220,
        easing: Easing.out(Easing.back(1.15)),
        useNativeDriver: true,
      }),
    ]).start();
  }, [isNew, opacity, scale]);

  return <Animated.View style={{ opacity, transform: [{ scale }] }}>{children}</Animated.View>;
}
