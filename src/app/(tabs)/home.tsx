import { router } from 'expo-router';
import { FlatList, Text, View, useWindowDimensions } from 'react-native';

import {
  UNCATEGORIZED_NOTEBOOK_ID,
  useNotebooksStore,
} from '@/features/notebooks/store/useNotebooksStore';
import { PoemCard } from '@/features/poems/components/PoemCard';
import { NEW_POEM_ID, useRecentPoems } from '@/features/poems/store/usePoemsStore';
import type { Poem } from '@/features/poems/types';
import { CreateCard } from '@/shared/components/CreateCard';
import { ScreenHeader } from '@/shared/components/ScreenHeader';
import { subtleDividerStyle } from '@/shared/theme/elevation';
import { cardSize } from '@/shared/theme/metrics';

type RowItem = { kind: 'create' } | { kind: 'poem'; poem: Poem };

export default function HomeScreen() {
  const notebooksCount = useNotebooksStore((state) => state.notebooks.length);
  const recentPoems = useRecentPoems();
  const { width: screenWidth } = useWindowDimensions();

  const createQuickPoem = () => {
    // Rascunho: só vira poema salvo (em "Sem categoria") se algo for escrito.
    router.push({
      pathname: '/poem/[id]',
      params: { id: NEW_POEM_ID, notebookId: UNCATEGORIZED_NOTEBOOK_ID },
    });
  };

  // Mesma lista horizontal do modo "albums" do notebook: CreateCard seguido
  // dos 5 poemas mais recentes, com o primeiro card centralizado na tela.
  const rowData: RowItem[] = [
    { kind: 'create' },
    ...recentPoems.map((poem) => ({ kind: 'poem' as const, poem })),
  ];

  const sideInset = Math.max((screenWidth - cardSize) / 2, 24);

  return (
    <View className="flex-1 bg-backgroundTabs">
      <ScreenHeader title="Home" showBorder={false} />
      <View style={subtleDividerStyle} className="z-10 bg-surfaceBar px-6 py-3">
        <Text className="text-sm text-muted">
          {notebooksCount} notebook(s) — veja todos na aba Notebooks.
        </Text>
      </View>

      <View className="flex-1 justify-center">
        <FlatList
          horizontal
          data={rowData}
          keyExtractor={(item) => (item.kind === 'create' ? 'create' : item.poem.id)}
          showsHorizontalScrollIndicator={false}
          style={{ height: cardSize, flexGrow: 0 }}
          contentContainerStyle={{ paddingLeft: sideInset, paddingRight: 24 }}
          renderItem={({ item }) =>
            item.kind === 'create' ? (
              <CreateCard label="Novo poema" onPress={createQuickPoem} textPosition="inside" />
            ) : (
              <PoemCard poem={item.poem} />
            )
          }
        />
      </View>
    </View>
  );
}
