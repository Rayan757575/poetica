import { Link } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
const notebookDefaultImage = require('../../../../assets/images/vangogh-2.jpg');

import type { Notebook } from '../types';

// Mesmas proporções do NotebookContainer/NotebookImage do v1
// (150x150, borderRadius 30, texto 12px na cor primary).
export function NotebookCard({ notebook }: { notebook: Notebook }) {
  return (
    <Link href={`/notebook/${notebook.id}`} asChild>
      <Pressable className="mb-6 items-center" style={{ width: 150 }}>
        {notebook.wallpaper ? (
          <Image
            source={{ uri: notebook.wallpaper }}
            style={{ width: 150, height: 150, borderRadius: 30 }}
          />
        ) : (
          <Image
            source={notebookDefaultImage}
            style={{ width: 150, height: 150, borderRadius: 30 }}
          />
        )}
        <Text className="mt-1 font-regular text-xs text-primary">{notebook.title}</Text>
      </Pressable>
    </Link>
  );
}
