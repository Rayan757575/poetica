import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { FlatList, Pressable, Text, View } from 'react-native';

import {
  UNCATEGORIZED_NOTEBOOK_ID,
  useNotebooksStore,
} from '@/features/notebooks/store/useNotebooksStore';
import { PoemCard } from '@/features/poems/components/PoemCard';
import { NEW_POEM_ID, useRecentPoems } from '@/features/poems/store/usePoemsStore';
import { ScreenHeader } from '@/shared/components/ScreenHeader';
import { colors } from '@/shared/theme/colors';
import { subtleDividerStyle } from '@/shared/theme/elevation';
import { cardSize } from '@/shared/theme/metrics';

export default function HomeScreen() {
  const notebooksCount = useNotebooksStore((state) => state.notebooks.length);
  const recentPoems = useRecentPoems();

  const createQuickPoem = () => {
    // Rascunho: só vira poema salvo (em "Sem categoria") se algo for escrito.
    router.push({
      pathname: '/poem/[id]',
      params: { id: NEW_POEM_ID, notebookId: UNCATEGORIZED_NOTEBOOK_ID },
    });
  };

  return (
    <View className="flex-1 bg-backgroundTabs">
      <ScreenHeader title="Home" showBorder={false} />
      <View style={subtleDividerStyle} className="z-10 bg-surfaceBar px-6 py-3">
        <Text className="text-sm text-muted">
          {notebooksCount} notebook(s) — veja todos na aba Notebooks.
        </Text>
      </View>

      <View className="px-6 pt-6">
        <Pressable
          onPress={createQuickPoem}
          style={subtleDividerStyle}
          className="rounded-3xl border border-primaryTint-mid bg-backgroundReading p-5"
        >
          <View className="flex-row items-center justify-between">
            <View className="rounded-full bg-primaryTint-soft px-3 py-1">
              <Text className="font-uiMedium text-xs text-primary">
                Rascunho rápido · Sem categoria
              </Text>
            </View>
            <View className="flex-row items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5">
              <Ionicons name="create-outline" size={14} color={colors.white} />
              <Text className="font-uiMedium text-xs text-white">Escrever</Text>
            </View>
          </View>
          <Text className="mt-3 font-reading text-base italic text-muted">
            {'"Qual verso veio à mente agora?"'}
          </Text>
        </Pressable>
      </View>

      <View className="mt-6 flex-1">
        <Text className="mb-3 px-6 font-uiMedium text-xs text-muted">
          Continuar escrevendo (Recentes)
        </Text>
        {recentPoems.length > 0 ? (
          <FlatList
            horizontal
            data={recentPoems}
            keyExtractor={(poem) => poem.id}
            showsHorizontalScrollIndicator={false}
            style={{ height: cardSize, flexGrow: 0 }}
            contentContainerStyle={{ paddingHorizontal: 24 }}
            renderItem={({ item }) => <PoemCard poem={item} />}
          />
        ) : (
          <Text className="px-6 font-reading text-sm text-muted">
            Seus últimos poemas editados aparecerão aqui.
          </Text>
        )}
      </View>
    </View>
  );
}
