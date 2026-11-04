import { Link } from 'expo-router';
import { Image, Pressable, Text } from 'react-native';
const notebookDefaultImage = require('@/assets/images/vangogh-2.jpg');

import { scale } from '@/shared/theme/metrics';
import type { Notebook } from '../types';

const CARD_SIZE = scale(150);

export function NotebookCard({ notebook }: { notebook: Notebook }) {
  return (
    <Link href={`/notebook/${notebook.id}`} asChild>
      <Pressable className="mb-6 items-center" style={{ width: CARD_SIZE }}>
        {notebook.wallpaper ? (
          <Image
            source={{ uri: notebook.wallpaper }}
            style={{ width: CARD_SIZE, height: CARD_SIZE, borderRadius: 30 }}
          />
        ) : (
          <Image
            source={notebookDefaultImage}
            style={{ width: CARD_SIZE, height: CARD_SIZE, borderRadius: 30 }}
          />
        )}
        <Text className="mt-1 font-regular text-xs text-primary">{notebook.title}</Text>
      </Pressable>
    </Link>
  );
}
