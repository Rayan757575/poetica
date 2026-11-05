import { Link } from 'expo-router';
import { Pressable, Text } from 'react-native';

import { cardRadius, cardSize } from '@/shared/theme/metrics';
import type { Poem } from '../types';

// Mesmo tamanho/raio do NotebookCard (tokens em metrics.ts). O padding
// maior que o habitual evita que o texto encoste nos cantos arredondados.
export function PoemCard({ poem }: { poem: Poem }) {
  return (
    <Link href={`/poem/${poem.id}`} asChild>
      <Pressable
        className="mr-6 items-start justify-start overflow-hidden bg-primary p-5"
        style={{ width: cardSize, height: cardSize, borderRadius: cardRadius }}
      >
        <Text className="mb-2 font-medium text-white" numberOfLines={1}>
          {poem.title}
        </Text>
        <Text className="font-reading text-sm text-white/90" numberOfLines={3}>
          {poem.content || 'Poema vazio.'}
        </Text>
      </Pressable>
    </Link>
  );
}
