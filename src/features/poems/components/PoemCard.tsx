import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { scale } from '@/shared/theme/metrics';
import type { Poem } from '../types';

const CARD_SIZE = scale(200);

export function PoemCard({ poem }: { poem: Poem }) {
  return (
    <Link href={`/poem/${poem.id}`} asChild>
      <Pressable
        className="mr-6 items-center justify-start rounded-lg bg-primary p-5"
        style={{ width: CARD_SIZE, height: CARD_SIZE }}
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
