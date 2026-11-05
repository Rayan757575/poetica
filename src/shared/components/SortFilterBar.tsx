import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  View,
  useAnimatedValue,
  useWindowDimensions,
} from 'react-native';

import { colors } from '@/shared/theme/colors';
import { subtleDividerStyle } from '@/shared/theme/elevation';

export type ListViewMode = 'list' | 'albums';

type SortFilterBarProps = {
  onSortPress?: () => void;
  viewMode: ListViewMode;
  onToggleViewMode: () => void;
  showBorder?: boolean;
  borderColor?: string;
  /** Incrementado quando a ordenação muda — dispara o feixe azul (Modelo R3). */
  processingTrigger?: number;
};

// Faixa colada no ScreenHeader: fundo `surfaceBar` (tom entre o branco do
// header e o fundo da tela), ícones em `muted` e borda só embaixo (com
// sombra leve) pra dar a ideia de que ela fica "por cima" do conteúdo.
// O zIndex garante que a sombra não seja coberta pela lista logo abaixo.
export function SortFilterBar({
  onSortPress,
  viewMode,
  onToggleViewMode,
  showBorder = true,
  borderColor,
  processingTrigger = 0,
}: SortFilterBarProps) {
  const { width: screenWidth } = useWindowDimensions();
  const beamProgress = useAnimatedValue(0);

  useEffect(() => {
    if (processingTrigger === 0) return;
    beamProgress.stopAnimation();
    beamProgress.setValue(0);
    Animated.timing(beamProgress, {
      toValue: 1,
      duration: 240,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [processingTrigger, beamProgress]);

  const beamWidth = screenWidth * 0.45;

  return (
    <View
      style={
        showBorder
          ? borderColor
            ? { ...subtleDividerStyle, borderBottomColor: borderColor }
            : subtleDividerStyle
          : undefined
      }
      className="z-10 flex-row items-center justify-between overflow-hidden bg-surfaceBar px-6 py-2"
    >
      <Pressable onPress={onSortPress} hitSlop={12}>
        <Ionicons name="swap-vertical-outline" size={20} color={colors.muted} />
      </Pressable>
      <Pressable onPress={onToggleViewMode} hitSlop={12}>
        <Ionicons
          name={viewMode === 'albums' ? 'list-outline' : 'albums-outline'}
          size={20}
          color={colors.muted}
        />
      </Pressable>
      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 2,
          width: beamWidth,
          borderRadius: 999,
          backgroundColor: colors.primary,
          opacity: beamProgress.interpolate({
            inputRange: [0, 0.15, 0.8, 1],
            outputRange: [0, 1, 1, 0],
          }),
          transform: [
            {
              translateX: beamProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [-beamWidth, screenWidth],
              }),
            },
          ],
        }}
      />
    </View>
  );
}
