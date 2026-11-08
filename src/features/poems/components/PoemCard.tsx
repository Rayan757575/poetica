import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { colors } from '@/shared/theme/colors';
import { subtleDividerStyle } from '@/shared/theme/elevation';
import { cardRadius, cardSize } from '@/shared/theme/metrics';
import type { Poem } from '../types';

// Modelo "Ficha Literária em Papel": mesmo tamanho/raio do NotebookCard
// (tokens em metrics.ts), superfície `surfaceBar` com borda tonal e trecho
// do poema citado com filete vertical em `primary`.
export function PoemCard({ poem }: { poem: Poem }) {
  const trimmedContent = poem.content.trim();
  const hasContent = trimmedContent.length > 0;

  return (
    <Link href={`/poem/${poem.id}`} asChild>
      <Pressable
        className="mr-6 items-start justify-start overflow-hidden border border-primaryTint-mid bg-surfaceBar p-5 active:bg-primaryTint-soft"
        style={{
          ...subtleDividerStyle,
          borderBottomColor: colors.primaryTint.mid,
          width: cardSize,
          height: cardSize,
          borderRadius: cardRadius,
        }}
      >
        <Text className="mb-2 font-medium text-xs text-primary" numberOfLines={1}>
          {poem.title}
        </Text>
        <View className="border-l-2 border-primary pl-2.5">
          <Text
            className={`font-reading text-xs leading-relaxed ${
              hasContent ? 'text-ink' : 'text-placeholder'
            }`}
            numberOfLines={3}
          >
            {hasContent ? `“${trimmedContent}”` : '“Poema vazio.”'}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
