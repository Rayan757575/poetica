import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Animated, Modal, Pressable, Text, View, useAnimatedValue } from 'react-native';

import { colors } from '@/shared/theme/colors';

export type SortOption = { key: string; label: string };

type SortOptionsSheetProps = {
  visible: boolean;
  onClose: () => void;
  options: SortOption[];
  selectedKey?: string;
  onSelect?: (key: string) => void;
};

const SHEET_OFFSET = 400; // bem abaixo da tela, ponto de partida/chegada do slide

// animationType="none" no Modal nativo: controlamos as duas animações
// na mão, porque o "slide" do Modal aplicava o mesmo movimento pro
// fundo inteiro, incluindo o backdrop — por isso ele "subia" junto,
// o que você notou como estranho. Agora o backdrop só tem fade
// (opacity) e só o cartão desliza (translateY).
export function SortOptionsSheet({
  visible,
  onClose,
  options,
  selectedKey,
  onSelect,
}: SortOptionsSheetProps) {
  const [modalVisible, setModalVisible] = useState(visible);
  const backdropOpacity = useAnimatedValue(0);
  const sheetTranslateY = useAnimatedValue(SHEET_OFFSET);

  if (visible && !modalVisible) {
    setModalVisible(true);
  }

  useEffect(() => {
    if (visible) {
      backdropOpacity.setValue(0);
      sheetTranslateY.setValue(SHEET_OFFSET);
      const frame = requestAnimationFrame(() => {
        Animated.parallel([
          Animated.timing(backdropOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(sheetTranslateY, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
        ]).start();
      });
      return () => cancelAnimationFrame(frame);
    }

    if (!modalVisible) return;

    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(sheetTranslateY, {
        toValue: SHEET_OFFSET,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) setModalVisible(false);
    });
  }, [visible, modalVisible, backdropOpacity, sheetTranslateY]);

  return (
    <Modal visible={modalVisible} transparent animationType="none" onRequestClose={onClose}>
      <View className="flex-1 justify-end">
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: colors.backdrop,
            opacity: backdropOpacity,
          }}
        >
          <Pressable style={{ flex: 1 }} onPress={onClose} />
        </Animated.View>
        <Animated.View style={{ transform: [{ translateY: sheetTranslateY }] }}>
          <View className="rounded-t-3xl bg-surfaceElevated px-6 pb-10 pt-4">
            <View className="mb-4 h-1 w-10 self-center rounded-full bg-border" />
            <Text className="mb-2 font-medium text-lg text-dark">Ordenar por</Text>
            {options.map((option) => (
              <Pressable
                key={option.key}
                onPress={() => onSelect?.(option.key)}
                className="flex-row items-center justify-between py-3"
              >
                <Text className="text-base text-dark">{option.label}</Text>
                {selectedKey === option.key && (
                  <Ionicons name="checkmark" size={20} color={colors.primary} />
                )}
              </Pressable>
            ))}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
