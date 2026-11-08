import { Link } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

import { listThumbRadius, listThumbSize } from '@/shared/theme/metrics';
import type { Notebook } from '../types';

const notebookDefaultImage = require('@/assets/images/vangogh-2.jpg');

type NotebookListItemProps = {
  notebook: Notebook;
  onLongPress?: (notebook: Notebook) => void;
};

// Variante em linha do NotebookCard — imagem à esquerda, título do
// lado, createdBy embaixo.
export function NotebookListItem({ notebook, onLongPress }: NotebookListItemProps) {
  return (
    <Link href={`/notebooks/${notebook.id}`} asChild>
      <Pressable onLongPress={() => onLongPress?.(notebook)} className="mb-4 flex-row items-center">
        <Image
          source={notebook.wallpaper ? { uri: notebook.wallpaper } : notebookDefaultImage}
          style={{ width: listThumbSize, height: listThumbSize, borderRadius: listThumbRadius }}
        />
        <View className="ml-3">
          <Text className="font-regular text-base text-primary">{notebook.title}</Text>
          <Text className="mt-1 text-xs text-dark/50">{notebook.createdBy}</Text>
        </View>
      </Pressable>
    </Link>
  );
}
