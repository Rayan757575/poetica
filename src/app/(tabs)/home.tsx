import { router } from 'expo-router';
import { FlatList, Text, View, useWindowDimensions } from 'react-native';

import {
  UNCATEGORIZED_NOTEBOOK_ID,
  useNotebooksStore,
} from '@/features/notebooks/store/useNotebooksStore';
import { PoemCard } from '@/features/poems/components/PoemCard';
import { usePoemsStore, useRecentPoems } from '@/features/poems/store/usePoemsStore';
import type { Poem } from '@/features/poems/types';
import { CreateCard } from '@/shared/components/CreateCard';
import { ScreenHeader } from '@/shared/components/ScreenHeader';
import { subtleDividerStyle } from '@/shared/theme/elevation';
import { scale, verticalScale } from '@/shared/theme/metrics';

type RowItem = { kind: 'create' } | { kind: 'poem'; poem: Poem };

export default function HomeScreen() {
  const notebooksCount = useNotebooksStore((state) => state.notebooks.length);
  const addPoem = usePoemsStore((state) => state.addPoem);
  const recentPoems = useRecentPoems();
  const { width: screenWidth } = useWindowDimensions();

  const createQuickPoem = () => {
    const poem = addPoem(UNCATEGORIZED_NOTEBOOK_ID);
    router.push(`/poem/${poem.id}`);
  };

  // Mesma lista horizontal do modo "albums" do notebook: CreateCard seguido
  // dos 5 poemas mais recentes, com o primeiro card centralizado na tela.
  const rowData: RowItem[] = [
    { kind: 'create' },
    ...recentPoems.map((poem) => ({ kind: 'poem' as const, poem })),
  ];

  const cardWidth = scale(200);
  const sideInset = Math.max((screenWidth - cardWidth) / 2, 24);

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
          style={{ height: verticalScale(200), flexGrow: 0 }}
          contentContainerStyle={{ paddingLeft: sideInset, paddingRight: 24 }}
          renderItem={({ item }) =>
            item.kind === 'create' ? (
              <CreateCard
                label="Novo poema"
                onPress={createQuickPoem}
                size={200}
                radius={8}
                textPosition="inside"
              />
            ) : (
              <PoemCard poem={item.poem} />
            )
          }
        />
      </View>
    </View>
  );
}
