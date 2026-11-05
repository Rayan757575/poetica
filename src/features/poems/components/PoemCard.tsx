import { Link } from 'expo-router';
import { Pressable, Text } from 'react-native';

import { scale } from '@/shared/theme/metrics';
import type { Poem } from '../types';

const CARD_SIZE = scale(200);

export function PoemCard({ poem }: { poem: Poem }) {
  return (
    <Link href={`/poem/${poem.id}`} asChild>
      <Pressable
        className="mr-6 items-start justify-start rounded-lg bg-primary p-5"
        style={{ width: CARD_SIZE, height: CARD_SIZE }}
      >
        <Text className="mb-3 font-medium text-white" numberOfLines={1}>
          {poem.title}
        </Text>
        <Text className="font-reading text-sm text-white/90" numberOfLines={6}>
          {poem.content || 'Poema vazio.'}
        </Text>
      </Pressable>
    </Link>
  );
}
