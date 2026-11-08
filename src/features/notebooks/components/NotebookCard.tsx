import { Link } from 'expo-router';
import { Image, Pressable, Text } from 'react-native';

import { cardRadius, cardSize } from '@/shared/theme/metrics';
import type { Notebook } from '../types';

const notebookDefaultImage = require('@/assets/images/vangogh-2.jpg');

type NotebookCardProps = {
  notebook: Notebook;
  onLongPress?: (notebook: Notebook) => void;
};

export function NotebookCard({ notebook, onLongPress }: NotebookCardProps) {
  return (
    <Link href={`/notebooks/${notebook.id}`} asChild>
      <Pressable
        onLongPress={() => onLongPress?.(notebook)}
        className="mb-6 items-center"
        style={{ width: cardSize }}
      >
        <Image
          source={notebook.wallpaper ? { uri: notebook.wallpaper } : notebookDefaultImage}
          style={{ width: cardSize, height: cardSize, borderRadius: cardRadius }}
        />
        <Text className="mt-1 font-regular text-xs text-primary" numberOfLines={1}>
          {notebook.title}
        </Text>
      </Pressable>
    </Link>
  );
}
