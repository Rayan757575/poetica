import { useEffect, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  Modal,
  Pressable,
  Text,
  View,
  useAnimatedValue,
} from 'react-native';

import { colors } from '@/shared/theme/colors';
import { scale } from '@/shared/theme/metrics';
import type { Notebook } from '../types';

const notebookDefaultImage = require('@/assets/images/vangogh-2.jpg');

type NotebookDeleteDialogProps = {
  visible: boolean;
  notebook: Notebook | null;
  onCancel: () => void;
  onConfirm: (notebook: Notebook) => void;
};

const DIALOG_THUMB_SIZE = scale(44);

// Modelo Dialog 3: card flutuante centralizado sobre o `colors.backdrop`,
// com animação rápida de opacity (0 -> 1) e scale (0.95 -> 1) em 180ms.
export function NotebookDeleteDialog({
  visible,
  notebook,
  onCancel,
  onConfirm,
}: NotebookDeleteDialogProps) {
  const [modalVisible, setModalVisible] = useState(visible);
  const [renderedNotebook, setRenderedNotebook] = useState<Notebook | null>(notebook);
  const backdropOpacity = useAnimatedValue(0);
  const cardScale = useAnimatedValue(0.95);

  if (visible && !modalVisible) {
    setModalVisible(true);
  }
  if (notebook && notebook !== renderedNotebook) {
    setRenderedNotebook(notebook);
  }

  useEffect(() => {
    if (visible) {
      backdropOpacity.setValue(0);
      cardScale.setValue(0.95);

      const frame = requestAnimationFrame(() => {
        Animated.parallel([
          Animated.timing(backdropOpacity, {
            toValue: 1,
            duration: 180,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(cardScale, {
            toValue: 1,
            duration: 180,
            easing: Easing.out(Easing.cubic),
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
        duration: 140,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(cardScale, {
        toValue: 0.95,
        duration: 140,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) setModalVisible(false);
    });
  }, [visible, modalVisible, backdropOpacity, cardScale]);

  if (!renderedNotebook) return null;

  return (
    <Modal visible={modalVisible} transparent animationType="none" onRequestClose={onCancel}>
      <View className="flex-1 justify-center px-6">
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
          <Pressable style={{ flex: 1 }} onPress={onCancel} />
        </Animated.View>

        <Animated.View
          style={{
            width: '100%',
            opacity: backdropOpacity,
            transform: [{ scale: cardScale }],
          }}
        >
          <View className="w-full rounded-3xl border border-border bg-surfaceElevated p-5">
            <View className="flex-row items-center">
              <Image
                source={
                  renderedNotebook.wallpaper
                    ? { uri: renderedNotebook.wallpaper }
                    : notebookDefaultImage
                }
                style={{
                  width: DIALOG_THUMB_SIZE,
                  height: DIALOG_THUMB_SIZE,
                  borderRadius: 8,
                }}
              />
              <View className="ml-3 flex-1">
                <Text className="font-ui text-xs text-muted">Confirmar exclusão</Text>
                <Text className="mt-0.5 font-regular text-sm text-primary" numberOfLines={1}>
                  {renderedNotebook.title}
                </Text>
              </View>
            </View>

            <View className="my-3.5 h-[1px] w-full bg-border" />

            <Text className="mb-4 font-reading text-xs leading-relaxed text-ink">
              Deseja deletar este notebook e os poemas associados a ele? Esta ação não pode ser
              desfeita.
            </Text>

            <View className="flex-row items-center justify-end gap-2.5">
              <Pressable
                onPress={onCancel}
                className="rounded-full bg-primaryTint-soft px-4 py-2 active:bg-primaryTint-mid"
              >
                <Text className="font-uiMedium text-xs text-cursor">Cancelar</Text>
              </Pressable>
              <Pressable
                onPress={() => onConfirm(renderedNotebook)}
                className="rounded-full bg-primary px-5 py-2 active:bg-primaryPressed"
              >
                <Text className="font-uiMedium text-xs text-white">Deletar</Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
