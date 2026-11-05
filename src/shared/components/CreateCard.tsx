import Ionicons from '@expo/vector-icons/Ionicons';
import { Animated, Easing, Pressable, Text, View, useAnimatedValue } from 'react-native';

import { colors } from '@/shared/theme/colors';
import { cardRadius, cardSize, listThumbRadius, listThumbSize } from '@/shared/theme/metrics';

type CreateCardProps = {
  label: string;
  subtitle?: string;
  onPress: () => void;
  // 'below'/'inside' seguem o NotebookCard (modo "albums"); 'row' espelha
  // NotebookListItem/PoemListItem (miniatura + texto ao lado), usado
  // quando o viewMode da tela não é 'albums'.
  textPosition?: 'below' | 'inside' | 'row';
};

const ROW_CAPSULE_SIZE = Math.round(listThumbSize * 0.52);
const ROW_ICON_SIZE = Math.round(listThumbSize * 0.34);
const CARD_CAPSULE_SIZE = Math.round(cardSize * 0.32);
const CARD_ICON_SIZE = Math.round(cardSize * 0.18);

export function CreateCard({ label, subtitle, onPress, textPosition = 'below' }: CreateCardProps) {
  const scale = useAnimatedValue(1);

  const handlePressIn = () => {
    Animated.timing(scale, {
      toValue: 0.94,
      duration: 80,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 120,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  if (textPosition === 'row') {
    return (
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="mb-4"
      >
        <Animated.View className="flex-row items-center" style={{ transform: [{ scale }] }}>
          <View
            className="items-center justify-center border border-primaryTint-mid bg-primaryTint-soft"
            style={{ width: listThumbSize, height: listThumbSize, borderRadius: listThumbRadius }}
          >
            <View
              className="items-center justify-center rounded-full bg-primaryTint-mid"
              style={{ width: ROW_CAPSULE_SIZE, height: ROW_CAPSULE_SIZE }}
            >
              <Ionicons name="add" size={ROW_ICON_SIZE} color={colors.primary} />
            </View>
          </View>
          <View className="ml-3">
            <Text className="font-regular text-base text-primary">{label}</Text>
            {subtitle && <Text className="mt-1 text-xs text-muted">{subtitle}</Text>}
          </View>
        </Animated.View>
      </Pressable>
    );
  }

  const isInside = textPosition === 'inside';

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className={
        textPosition === 'below' ? 'mb-6 items-center' : 'mr-6 items-center justify-center'
      }
    >
      <Animated.View className="items-center" style={{ transform: [{ scale }] }}>
        <View
          className="items-center justify-center border border-primaryTint-mid bg-primaryTint-soft px-3"
          style={{ width: cardSize, height: cardSize, borderRadius: cardRadius }}
        >
          <View
            className={`items-center justify-center rounded-full ${
              isInside ? 'bg-primary' : 'bg-primaryTint-mid'
            }`}
            style={{ width: CARD_CAPSULE_SIZE, height: CARD_CAPSULE_SIZE, borderRadius: 999 }}
          >
            <Ionicons
              name="add"
              size={CARD_ICON_SIZE}
              color={isInside ? colors.white : colors.primary}
            />
          </View>
          {isInside && (
            <>
              <Text className="mt-2.5 text-center font-medium text-xs text-primary">{label}</Text>
              {subtitle && (
                <Text className="mt-0.5 text-center font-reading text-xs text-muted">
                  {subtitle}
                </Text>
              )}
            </>
          )}
        </View>
        {textPosition === 'below' && (
          <Text className="mt-1 font-regular text-xs text-primary">{label}</Text>
        )}
      </Animated.View>
    </Pressable>
  );
}
