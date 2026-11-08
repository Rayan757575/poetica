import Ionicons from '@expo/vector-icons/Ionicons';
import { type ComponentRef, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
  useAnimatedValue,
} from 'react-native';

import { colors } from '@/shared/theme/colors';
import { listThumbSize } from '@/shared/theme/metrics';

const notebookDefaultImage = require('@/assets/images/vangogh-2.jpg');

type NotebookFormSheetProps = {
  visible: boolean;
  mode: 'create' | 'edit';
  defaultTitle: string;
  initialDescription?: string;
  initialWallpaper?: string;
  onClose: () => void;
  onSubmit: (data: { title: string; description?: string; wallpaper?: string }) => void;
};

const SHEET_OFFSET = 420;

export function NotebookFormSheet({
  visible,
  mode,
  defaultTitle,
  initialDescription,
  initialWallpaper,
  onClose,
  onSubmit,
}: NotebookFormSheetProps) {
  const [modalVisible, setModalVisible] = useState(visible);
  const [wasVisible, setWasVisible] = useState(false);
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(initialDescription ?? '');
  const [wallpaper, setWallpaper] = useState<string | undefined>(initialWallpaper);

  const titleInputRef = useRef<ComponentRef<typeof TextInput>>(null);
  const backdropOpacity = useAnimatedValue(0);
  const sheetTranslateY = useAnimatedValue(SHEET_OFFSET);

  if (visible && !wasVisible) {
    setWasVisible(true);
    setModalVisible(true);
    setTitle(defaultTitle);
    setDescription(initialDescription ?? '');
    setWallpaper(initialWallpaper);
  } else if (!visible && wasVisible) {
    setWasVisible(false);
  }

  useEffect(() => {
    if (visible) {
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

      const focusTimer = setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(focusTimer);
    } else {
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
    }
  }, [visible, backdropOpacity, sheetTranslateY]);

  const handleSubmit = () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    onSubmit({
      title: trimmedTitle || defaultTitle,
      description: trimmedDescription ? trimmedDescription : undefined,
      wallpaper,
    });
  };

  return (
    <Modal visible={modalVisible} transparent animationType="none" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-end"
      >
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

        <Animated.View
          style={{ transform: [{ translateY: sheetTranslateY }] }}
          className="rounded-t-3xl bg-surfaceElevated px-6 pb-8 pt-4"
        >
          <View className="mb-4 h-1 w-10 self-center rounded-full bg-border" />

          <View className="flex-row items-center">
            <Pressable style={{ width: listThumbSize, height: listThumbSize }}>
              <Image
                source={wallpaper ? { uri: wallpaper } : notebookDefaultImage}
                style={{ width: listThumbSize, height: listThumbSize, borderRadius: 10 }}
              />
              <View className="absolute -bottom-1 -right-1 h-6 w-6 items-center justify-center rounded-full border-2 border-surfaceElevated bg-primary">
                <Ionicons name="camera-outline" size={12} color={colors.white} />
              </View>
            </Pressable>

            <View className="ml-3.5 flex-1">
              <Text className="mb-1 font-ui text-xs text-muted">
                {mode === 'edit' ? 'Editar notebook' : 'Novo notebook'}
              </Text>
              <TextInput
                ref={titleInputRef}
                value={title}
                onChangeText={setTitle}
                selectTextOnFocus={true}
                selectionColor={colors.selection}
                cursorColor={colors.cursor}
                placeholder={defaultTitle}
                placeholderTextColor={colors.placeholder}
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
                className="rounded-xl border border-primary bg-backgroundReading px-3 py-2 font-regular text-xs text-ink"
              />
            </View>
          </View>

          <View className="my-4 h-[1px] w-full bg-border" />

          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Descrição opcional..."
            placeholderTextColor={colors.placeholder}
            selectionColor={colors.selection}
            cursorColor={colors.cursor}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            className="mb-4 min-h-[64px] rounded-xl border border-border bg-backgroundReading px-3.5 py-2.5 font-reading text-xs text-ink"
          />

          <View className="flex-row items-center justify-end gap-2.5">
            <Pressable
              onPress={onClose}
              className="rounded-full bg-backgroundTabs px-4 py-2 active:opacity-80"
            >
              <Text className="font-uiMedium text-xs text-muted">Cancelar</Text>
            </Pressable>
            <Pressable
              onPress={handleSubmit}
              className="rounded-full bg-primary px-5 py-2 active:bg-primaryPressed"
            >
              <Text className="font-uiMedium text-xs text-white">
                {mode === 'edit' ? 'Salvar' : 'Criar'}
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
