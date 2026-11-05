import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/shared/theme/colors';
import { moderateScale } from '@/shared/theme/metrics';

type PoemEditorHeaderProps = {
  onBack: () => void;
  /** Ainda sem ação — reservado pra exportar/baixar o poema. */
  onDownloadPress?: () => void;
  /** Ainda sem ação — reservado pro menu de opções do poema. */
  onMenuPress?: () => void;
  /** Borda inferior discreta, ligada por padrão (mesmo padrão do ScreenHeader). */
  showBorder?: boolean;
};

const ICON_SIZE = 24;

// Barra superior do editor: voltar à esquerda, ações à direita. Segue o
// ScreenHeader (safe area via insets, borda opcional), mas no fundo sépia
// do editor (`backgroundReading`) pra não quebrar a leitura.
export function PoemEditorHeader({
  onBack,
  onDownloadPress,
  onMenuPress,
  showBorder = true,
}: PoemEditorHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top + moderateScale(8),
        borderBottomWidth: showBorder ? 1 : 0,
        borderBottomColor: colors.border,
      }}
      className="flex-row items-center justify-between bg-backgroundReading px-6 pb-3"
    >
      <Pressable onPress={onBack} hitSlop={12} accessibilityLabel="Voltar">
        <Ionicons name="arrow-back" size={ICON_SIZE} color={colors.ink} />
      </Pressable>
      <View className="flex-row items-center gap-5">
        <Pressable onPress={onDownloadPress} hitSlop={12} accessibilityLabel="Baixar poema">
          <Ionicons name="download-outline" size={ICON_SIZE} color={colors.ink} />
        </Pressable>
        <Pressable onPress={onMenuPress} hitSlop={12} accessibilityLabel="Mais opções">
          <Ionicons name="ellipsis-vertical" size={ICON_SIZE - 2} color={colors.ink} />
        </Pressable>
      </View>
    </View>
  );
}
