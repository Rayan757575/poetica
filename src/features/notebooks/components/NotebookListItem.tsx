import { Link } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
const notebookDefaultImage = require('@/assets/images/vangogh-2.jpg');

import { scale } from '@/shared/theme/metrics';
import type { Notebook } from '../types';

const THUMB_SIZE = scale(56);

// Variante em linha do NotebookCard — imagem à esquerda, título do
// lado, createdBy embaixo. Baseado na descrição em texto (a imagem de
// referência "RAP" não veio anexada); ajusto quando você mandar.
export function NotebookListItem({ notebook }: { notebook: Notebook }) {
  return (
    <Link href={`/notebook/${notebook.id}`} asChild>
      <Pressable className="mb-4 flex-row items-center">
        <Image
          source={notebook.wallpaper ? { uri: notebook.wallpaper } : notebookDefaultImage}
          style={{ width: THUMB_SIZE, height: THUMB_SIZE, borderRadius: 8 }}
        />
        <View className="ml-3">
          <Text className="font-regular text-base text-primary">{notebook.title}</Text>
          <Text className="mt-1 text-xs text-dark/50">{notebook.createdBy}</Text>
        </View>
      </Pressable>
    </Link>
  );
}
