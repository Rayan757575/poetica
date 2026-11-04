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
      className="flex-row items-center justify-between px-6 py-3"
    >
      <Pressable onPress={onSortPress}>
        <Ionicons name="swap-vertical-outline" size={22} color={colors.dark} />
      </Pressable>
      <Pressable onPress={onToggleViewMode}>
        <Ionicons
          name={viewMode === 'albums' ? 'list-outline' : 'albums-outline'}
          size={22}
          color={colors.dark}
        />
      </Pressable>
    </View>
  );
}