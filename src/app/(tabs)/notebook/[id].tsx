import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, View, useWindowDimensions } from 'react-native';

import { useNotebooksStore } from '@/features/notebooks/store/useNotebooksStore';
import { PoemCard } from '@/features/poems/components/PoemCard';
import { PoemListItem } from '@/features/poems/components/PoemListItem';
import { usePoemsStore } from '@/features/poems/store/usePoemsStore';
import type { Poem } from '@/features/poems/types';
import { CreateCard } from '@/shared/components/CreateCard';
import { ScreenHeader } from '@/shared/components/ScreenHeader';
import { SortFilterBar, type ListViewMode } from '@/shared/components/SortFilterBar';
import { SortOptionsSheet } from '@/shared/components/SortOptionsSheet';
import { scale, verticalScale } from '@/shared/theme/metrics';

type RowItem = { kind: 'create' } | { kind: 'poem'; poem: Poem };

export default function NotebookScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const notebook = useNotebooksStore((state) => state.notebooks.find((n) => n.id === id));
  const { width: screenWidth } = useWindowDimensions();
  const [viewMode, setViewMode] = useState<ListViewMode>('albums');
  const [sortSheetVisible, setSortSheetVisible] = useState(false);
  const [sortKey, setSortKey] = useState('recentlyUpdated');

  const allPoems = usePoemsStore((state) => state.poems);
  const poems = useMemo(
    () => allPoems.filter((poem) => poem.notebookId === id).slice().reverse(),
    [allPoems, id]
  );
  const addPoem = usePoemsStore((state) => state.addPoem);

  const createPoem = () => {
    if (!id) return;
    const poem = addPoem(id);
    router.push(`/poem/${poem.id}`);
  };

  const rowData: RowItem[] = [
    { kind: 'create' },
    ...poems.map((poem) => ({ kind: 'poem' as const, poem })),
  ];

  const cardWidth = scale(200);
  const sideInset = Math.max((screenWidth - cardWidth) / 2, 24);

  return (
    <View className="flex-1 bg-backgroundReading">
      <ScreenHeader title={notebook?.title ?? 'Notebook'} />
      <SortFilterBar
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode((mode) => (mode === 'list' ? 'albums' : 'list'))}
        onSortPress={() => setSortSheetVisible(true)}
      />

      {viewMode === 'albums' ? (
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
      ) : (
        <FlatList
          data={rowData}
          keyExtractor={(item) => (item.kind === 'create' ? 'create' : item.poem.id)}
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16 }}
          renderItem={({ item }) =>
            item.kind === 'create' ? (
              <CreateCard label="Novo poema" onPress={createPoem} />
            ) : (
              <PoemListItem poem={item.poem} />
            )
          }
        />
      )}

      <SortOptionsSheet
        visible={sortSheetVisible}
        onClose={() => setSortSheetVisible(false)}
        selectedKey={sortKey}
        onSelect={setSortKey}
        options={[
          { key: 'recentlyUpdated', label: 'Alterado recentemente' },
          { key: 'alphabetical', label: 'Alfabética' },
          { key: 'creationOrder', label: 'Ordem de criação' },
        ]}
      />
    </View>
  );
}