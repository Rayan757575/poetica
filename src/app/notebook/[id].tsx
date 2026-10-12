import { router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { FlatList, View } from 'react-native';

import { useNotebooksStore } from '@/features/notebooks/store/useNotebooksStore';
import { PoemCard } from '@/features/poems/components/PoemCard';
import { usePoemsStore } from '@/features/poems/store/usePoemsStore';
import type { Poem } from '@/features/poems/types';
import { CreateCard } from '@/shared/components/CreateCard';
import { ScreenHeader } from '@/shared/components/ScreenHeader';
import { moderateScale, verticalScale } from '@/shared/theme/metrics';

type RowItem = { kind: 'create' } | { kind: 'poem'; poem: Poem };

export default function NotebookScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const notebook = useNotebooksStore((state) => state.notebooks.find((n) => n.id === id));

  const allPoems = usePoemsStore((state) => state.poems);
  const poems = useMemo(
    () => allPoems.filter((poem) => poem.notebookId === id),
    [allPoems, id]
  );
  const addPoem = usePoemsStore((state) => state.addPoem);

  const createPoem = () => {
    if (!id) return;
    const poem = addPoem(id, `Poema ${poems.length + 1}`);
    router.push(`/poem/${poem.id}`);
  };

  const rowData: RowItem[] = [
    { kind: 'create' },
    ...poems.map((poem) => ({ kind: 'poem' as const, poem })),
  ];

  return (
    <View className="flex-1 bg-backgroundReading">
      <ScreenHeader title={notebook?.title ?? 'Notebook'} />
      <View style={{ height: verticalScale(200), marginVertical: moderateScale(24) }}>
        <FlatList
          horizontal
          data={rowData}
          keyExtractor={(item) => (item.kind === 'create' ? 'create' : item.poem.id)}
          contentContainerStyle={{ paddingHorizontal: 24 }}
          renderItem={({ item }) =>
            item.kind === 'create' ? (
              <CreateCard
                label="Novo poema"
                onPress={createPoem}
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