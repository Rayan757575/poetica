import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text, View } from 'react-native';

import { colors } from '@/shared/theme/colors';
import { scale } from '@/shared/theme/metrics';

type CreateCardProps = {
  label: string;
  onPress: () => void;
  size?: number;
  radius?: number;
  textPosition?: 'below' | 'inside';
};

export function CreateCard({
  label,
  onPress,
  size = 150,
  radius = 30,
  textPosition = 'below',
}: CreateCardProps) {
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
