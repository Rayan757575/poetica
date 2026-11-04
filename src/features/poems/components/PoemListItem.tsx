import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { scale } from '@/shared/theme/metrics';
import type { Poem } from '../types';

const THUMB_SIZE = scale(56);

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}

export function PoemListItem({ poem }: { poem: Poem }) {
  return (
    <Link href={`/poem/${poem.id}`} asChild>
      <Pressable className="mb-4 flex-row items-center">
        <View
          className="items-center justify-center rounded-lg bg-primary"
          style={{ width: THUMB_SIZE, height: THUMB_SIZE }}
        >
          <Ionicons name="document-text-outline" size={24} color="#FFFFFF" />
        </View>
        <View className="ml-3">
          <Text className="font-regular text-base text-primary">{poem.title}</Text>
          <Text className="mt-1 text-xs">
            <Text className="text-primary">{formatDate(poem.updatedAt)}</Text>
            <Text className="text-dark/50"> · {poem.createdBy}</Text>
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}