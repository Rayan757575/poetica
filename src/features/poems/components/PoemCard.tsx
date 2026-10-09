import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import type { Poem } from '../types';

// Mesmas proporções do PoemContainer/PoemText do v1 (200x200, fundo azul,
// texto branco, título em cima e prévia do conteúdo embaixo).
export function PoemCard({ poem }: { poem: Poem }) {
  return (
    <Link href={`/poem/${poem.id}`} asChild>
      <Pressable
        className="mr-6 items-center justify-start rounded-lg bg-primary p-5"
        style={{ width: 200, height: 200 }}
      >
        <Text className="mb-5 font-medium text-white" numberOfLines={1}>
          {poem.title}
        </Text>
        <View className="h-24 w-full items-center">
          <Text className="text-white" numberOfLines={4}>
            {poem.content || 'Poema vazio.'}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
