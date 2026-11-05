import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, View, useWindowDimensions } from 'react-native';

import { useNotebooksStore } from '@/features/notebooks/store/useNotebooksStore';
import { PoemCard } from '@/features/poems/components/PoemCard';
import { PoemListItem } from '@/features/poems/components/PoemListItem';
import { NEW_POEM_ID, usePoemsStore } from '@/features/poems/store/usePoemsStore';
import type { Poem } from '@/features/poems/types';
import { CreateCard } from '@/shared/components/CreateCard';
import { ProcessingFlash } from '@/shared/components/ProcessingFlash';
import { ScreenHeader } from '@/shared/components/ScreenHeader';
import { SortFilterBar } from '@/shared/components/SortFilterBar';
import { SortOptionsSheet } from '@/shared/components/SortOptionsSheet';
import { useScreenPreference } from '@/shared/store/useScreenPreferencesStore';
import { cardSize } from '@/shared/theme/metrics';

type RowItem = { kind: 'create' } | { kind: 'poem'; poem: Poem };

export default function NotebookScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const notebook = useNotebooksStore((state) => state.notebooks.find((n) => n.id === id));
  const { width: screenWidth } = useWindowDimensions();
  const { viewMode, sortKey, toggleViewMode, setSortKey } = useScreenPreference('notebookDetail');
  const [sortSheetVisible, setSortSheetVisible] = useState(false);
  const [sortFlashTrigger, setSortFlashTrigger] = useState(0);

  // Fecha o sheet ao escolher e dispara o flash só quando a ordenação muda.
  const selectSortKey = (key: string) => {
    setSortSheetVisible(false);
    if (key === sortKey) return;
    setSortKey(key);
    setSortFlashTrigger((count) => count + 1);
  };

  const allPoems = usePoemsStore((state) => state.poems);
  // Filtra o notebook e ordena conforme a chave do SortOptionsSheet.
  // `filter` já devolve um array novo, então `sort` não muta o store.
  const poems = useMemo(() => {
    const notebookPoems = allPoems.filter((poem) => poem.notebookId === id);
    switch (sortKey) {
      case 'alphabetical':
        return notebookPoems.sort((a, b) =>
          a.title.localeCompare(b.title, 'pt-BR', { sensitivity: 'base' })
        );
      case 'creationOrder':
        return notebookPoems.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
      case 'recentlyUpdated':
      default:
        return notebookPoems.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
    }
  }, [allPoems, id, sortKey]);

  // Abre o editor em modo rascunho: o poema só é gravado no store se o
  // usuário escrever algo (ver poem/[id].tsx).
  const createPoem = () => {
    if (!id) return;
    router.push({ pathname: '/poem/[id]', params: { id: NEW_POEM_ID, notebookId: id } });
  };

  const rowData: RowItem[] = [
    { kind: 'create' },
    ...poems.map((poem) => ({ kind: 'poem' as const, poem })),
  ];

  const sideInset = Math.max((screenWidth - cardSize) / 2, 24);

  return (
    <View className="flex-1 bg-backgroundReading">
      <ScreenHeader title={notebook?.title ?? 'Notebook'} showBorder={false} />
      <SortFilterBar
        viewMode={viewMode}
        onToggleViewMode={toggleViewMode}
        onSortPress={() => setSortSheetVisible(true)}
      />

      <ProcessingFlash trigger={sortFlashTrigger}>
        {viewMode === 'albums' ? (
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
                  <CreateCard label="Novo poema" onPress={createPoem} textPosition="inside" />
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
                <CreateCard label="Novo poema" onPress={createPoem} textPosition="row" />
              ) : (
                <PoemListItem poem={item.poem} />
              )
            }
          />
        )}
      </ProcessingFlash>

      <SortOptionsSheet
        visible={sortSheetVisible}
        onClose={() => setSortSheetVisible(false)}
        selectedKey={sortKey}
        onSelect={selectSortKey}
        options={[
          { key: 'recentlyUpdated', label: 'Alterado recentemente' },
          { key: 'alphabetical', label: 'Alfabética' },
          { key: 'creationOrder', label: 'Ordem de criação' },
        ]}
      />
    </View>
  );
}
