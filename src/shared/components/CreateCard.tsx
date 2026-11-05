import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text, View } from 'react-native';

import { colors } from '@/shared/theme/colors';
import { cardRadius, cardSize, listThumbRadius, listThumbSize } from '@/shared/theme/metrics';

type CreateCardProps = {
  label: string;
  onPress: () => void;
  // 'below'/'inside' seguem o NotebookCard (modo "albums"); 'row' espelha
  // NotebookListItem/PoemListItem (miniatura + texto ao lado), usado
  // quando o viewMode da tela não é 'albums'.
  textPosition?: 'below' | 'inside' | 'row';
};

export function CreateCard({ label, onPress, textPosition = 'below' }: CreateCardProps) {
  if (textPosition === 'row') {
    return (
      <Pressable onPress={onPress} className="mb-4 flex-row items-center">
        <View
          className="items-center justify-center border-2 border-dashed border-primary bg-backgroundTabs"
          style={{ width: listThumbSize, height: listThumbSize, borderRadius: listThumbRadius }}
        >
          <Ionicons name="add" size={Math.round(listThumbSize * 0.5)} color={colors.primary} />
        </View>
        <Text className="ml-3 font-regular text-base text-primary">{label}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      className={
        textPosition === 'below' ? 'mb-6 items-center' : 'mr-6 items-center justify-center'
      }
    >
      <View
        className="items-center justify-center border-2 border-dashed border-primary bg-backgroundTabs"
        style={{ width: cardSize, height: cardSize, borderRadius: cardRadius }}
      >
        <Ionicons name="add" size={Math.round(cardSize * 0.25)} color={colors.primary} />
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
