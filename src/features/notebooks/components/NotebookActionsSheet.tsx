import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Animated, Image, Modal, Pressable, Text, View, useAnimatedValue } from 'react-native';

import { colors } from '@/shared/theme/colors';
import { listThumbRadius, listThumbSize } from '@/shared/theme/metrics';
import type { Notebook } from '../types';

const notebookDefaultImage = require('@/assets/images/vangogh-2.jpg');

type NotebookActionsSheetProps = {
  visible: boolean;
  notebook: Notebook | null;
  onClose: () => void;
  onEdit: (notebook: Notebook) => void;
  onShare?: (notebook: Notebook) => void;
  onDelete: (notebook: Notebook) => void;
};

const SHEET_OFFSET = 400;

export function NotebookActionsSheet({
  visible,
  notebook,
  onClose,
  onEdit,
  onShare,
  onDelete,
}: NotebookActionsSheetProps) {
  const [modalVisible, setModalVisible] = useState(visible);
  const [renderedNotebook, setRenderedNotebook] = useState<Notebook | null>(notebook);
  const backdropOpacity = useAnimatedValue(0);
  const sheetTranslateY = useAnimatedValue(SHEET_OFFSET);

  if (visible && !modalVisible) {
    setModalVisible(true);
  }
  if (notebook && notebook !== renderedNotebook) {
    setRenderedNotebook(notebook);
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

  if (!renderedNotebook) return null;

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
          <View className="rounded-t-3xl bg-surfaceElevated px-6 pb-8 pt-4">
            <View className="mb-4 h-1 w-10 self-center rounded-full bg-border" />

            <View className="flex-row items-center">
              <Image
                source={
                  renderedNotebook.wallpaper
                    ? { uri: renderedNotebook.wallpaper }
                    : notebookDefaultImage
                }
                style={{
                  width: listThumbSize,
                  height: listThumbSize,
                  borderRadius: listThumbRadius,
                }}
              />
              <View className="ml-3.5 flex-1">
                <Text className="font-regular text-base text-primary" numberOfLines={1}>
                  {renderedNotebook.title}
                </Text>
                <Text className="mt-0.5 font-ui text-xs text-muted" numberOfLines={1}>
                  {renderedNotebook.description || renderedNotebook.createdBy}
                </Text>
              </View>
            </View>

            <View className="my-3.5 h-[1px] w-full bg-border" />

            <Pressable
              onPress={() => onEdit(renderedNotebook)}
              className="flex-row items-center gap-3 rounded-xl px-2.5 py-3 active:bg-backgroundTabs"
            >
              <Ionicons name="create-outline" size={18} color={colors.primary} />
              <Text className="font-uiMedium text-sm text-ink">Editar</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                onShare?.(renderedNotebook);
                onClose();
              }}
              className="flex-row items-center gap-3 rounded-xl px-2.5 py-3 active:bg-backgroundTabs"
            >
              <Ionicons name="share-social-outline" size={18} color={colors.primary} />
              <Text className="font-uiMedium text-sm text-ink">Compartilhar</Text>
            </Pressable>

            <Pressable
              onPress={() => onDelete(renderedNotebook)}
              className="flex-row items-center gap-3 rounded-xl px-2.5 py-3 active:bg-backgroundTabs"
            >
              <Ionicons name="trash-outline" size={18} color={colors.primary} />
              <Text className="font-uiMedium text-sm text-ink">Deletar</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
