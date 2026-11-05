import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text, View } from 'react-native';

import { colors } from '@/shared/theme/colors';
import { scale } from '@/shared/theme/metrics';

type CreateCardProps = {
  label: string;
  onPress: () => void;
  size?: number;
  radius?: number;
  // 'row' espelha NotebookListItem/PoemListItem (miniatura + texto ao lado),
  // usado quando o viewMode da tela não é 'albums'.
  textPosition?: 'below' | 'inside' | 'row';
};

// Mesmo tamanho/raio da miniatura de NotebookListItem e PoemListItem.
const ROW_THUMB_SIZE = scale(56);
const ROW_THUMB_RADIUS = 8;

export function CreateCard({
  label,
  onPress,
  size = 150,
  radius = 30,
  textPosition = 'below',
}: CreateCardProps) {
  if (textPosition === 'row') {
    return (
      <Pressable onPress={onPress} className="mb-4 flex-row items-center">
        <View
          className="items-center justify-center border-2 border-dashed border-primary bg-backgroundTabs"
          style={{ width: ROW_THUMB_SIZE, height: ROW_THUMB_SIZE, borderRadius: ROW_THUMB_RADIUS }}
        >
          <Ionicons name="add" size={Math.round(ROW_THUMB_SIZE * 0.5)} color={colors.primary} />
        </View>
        <Text className="ml-3 font-regular text-base text-primary">{label}</Text>
      </Pressable>
    );
  }

  const boxSize = scale(size);

  return (
    <Pressable
      onPress={onPress}
      className={
        textPosition === 'below' ? 'mb-6 items-center' : 'mr-6 items-center justify-center'
      }
    >
      <View
        className="items-center justify-center border-2 border-dashed border-primary bg-backgroundTabs"
        style={{ width: boxSize, height: boxSize, borderRadius: radius }}
      >
        <Ionicons name="add" size={Math.round(boxSize * 0.25)} color={colors.primary} />
        {textPosition === 'inside' && (
          <Text className="mt-2 text-center font-medium text-primary">{label}</Text>
        )}
      </View>
      {textPosition === 'below' && (
        <Text className="mt-1 font-regular text-xs text-primary">{label}</Text>
      )}
    </Pressable>
  );
}
