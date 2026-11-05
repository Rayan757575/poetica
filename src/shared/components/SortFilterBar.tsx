import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, View } from 'react-native';

import { colors } from '@/shared/theme/colors';
import { subtleDividerStyle } from '@/shared/theme/elevation';

export type ListViewMode = 'list' | 'albums';

type SortFilterBarProps = {
  onSortPress?: () => void;
  viewMode: ListViewMode;
  onToggleViewMode: () => void;
  showBorder?: boolean;
  borderColor?: string;
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
}: SortFilterBarProps) {
  return (
    <View
      style={
        showBorder
          ? borderColor
            ? { ...subtleDividerStyle, borderBottomColor: borderColor }
            : subtleDividerStyle
          : undefined
      }
      className="z-10 flex-row items-center justify-between bg-surfaceBar px-6 py-2"
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
    </View>
  );
}
