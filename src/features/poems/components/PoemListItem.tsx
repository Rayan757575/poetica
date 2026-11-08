import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { listThumbRadius, listThumbSize, scale } from '@/shared/theme/metrics';
import type { Poem } from '../types';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}

// Modelo "Mini-Folha Tonal Direta": miniatura 56x56 na mesma caixa tonal do
// CreateCard, com traços internos representando título e versos do poema.
export function PoemListItem({ poem }: { poem: Poem }) {
  const hasContent = poem.content.trim().length > 0;

  return (
    <Link href={`/poem/${poem.id}`} asChild>
      <Pressable className="mb-4 flex-row items-center">
        <View
          className="items-start justify-center border border-primaryTint-mid bg-primaryTint-soft px-3"
          style={{ width: listThumbSize, height: listThumbSize, borderRadius: listThumbRadius }}
        >
          <View
            className="mb-1.5 rounded-full bg-primary"
            style={{ width: scale(16), height: 2.5 }}
          />
          {hasContent ? (
            <>
              <View
                className="mb-1 rounded-full bg-cursor"
                style={{ width: scale(28), height: 2 }}
              />
              <View
                className="mb-1 rounded-full bg-cursor"
                style={{ width: scale(24), height: 2 }}
              />
              <View className="rounded-full bg-selection" style={{ width: scale(16), height: 2 }} />
            </>
          ) : (
            <View className="rounded-full bg-selection" style={{ width: scale(20), height: 2 }} />
          )}
        </View>
        <View className="ml-3 flex-1">
          <Text className="font-regular text-base text-primary" numberOfLines={1}>
            {poem.title}
          </Text>
          <Text className="mt-1 font-ui text-xs">
            <Text className="text-primary">{formatDate(poem.updatedAt)}</Text>
            <Text className="text-muted"> - atualizado por {poem.updatedBy}</Text>
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
