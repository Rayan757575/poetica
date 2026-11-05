import Ionicons from '@expo/vector-icons/Ionicons';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';

import { NotebookCard } from '@/features/notebooks/components/NotebookCard';
import { NotebookListItem } from '@/features/notebooks/components/NotebookListItem';
import {
  UNCATEGORIZED_NOTEBOOK_ID,
  useNotebooksStore,
} from '@/features/notebooks/store/useNotebooksStore';
import type { Notebook } from '@/features/notebooks/types';
import { CreateCard } from '@/shared/components/CreateCard';
import { ProcessingFlash } from '@/shared/components/ProcessingFlash';
import { ScreenHeader } from '@/shared/components/ScreenHeader';
import { SortFilterBar } from '@/shared/components/SortFilterBar';
import { SortOptionsSheet } from '@/shared/components/SortOptionsSheet';
import { useScreenPreference } from '@/shared/store/useScreenPreferencesStore';
import { colors } from '@/shared/theme/colors';

type GridItem = { kind: 'create' } | { kind: 'notebook'; notebook: Notebook };

export default function NotebooksScreen() {
  const notebooks = useNotebooksStore((state) => state.notebooks);
  const addNotebook = useNotebooksStore((state) => state.addNotebook);
  const { viewMode, sortKey, toggleViewMode, setSortKey } = useScreenPreference('notebooks');
  const [sortSheetVisible, setSortSheetVisible] = useState(false);
  const [sortFlashTrigger, setSortFlashTrigger] = useState(0);

  // Fecha o sheet ao escolher (padrão de apps como o Spotify) e dispara o
  // flash só quando a ordenação realmente muda.
  const selectSortKey = (key: string) => {
    setSortSheetVisible(false);
    if (key === sortKey) return;
    setSortKey(key);
    setSortFlashTrigger((count) => count + 1);
  };

  // "Sem categoria" é fixo e não entra na contagem, então o primeiro
  // notebook criado pelo usuário é "My poems 1".
  const createNotebook = () => {
    const userNotebooksCount = notebooks.filter(
      (notebook) => notebook.id !== UNCATEGORIZED_NOTEBOOK_ID
    ).length;
    addNotebook(`My poems ${userNotebooksCount + 1}`);
  };

  // Ordenação por chave do SortOptionsSheet. `slice()` evita mutar o array
  // do store. Com poucos notebooks, ordenar a cada mudança é barato; se a
  // escala crescer, vale memoizar por chave ou ordenar já no store.
  const orderedNotebooks = useMemo(() => {
    const sorted = notebooks.slice();
    switch (sortKey) {
      case 'alphabetical':
        return sorted.sort((a, b) =>
          a.title.localeCompare(b.title, 'pt-BR', { sensitivity: 'base' })
        );
      case 'creationOrder':
        return sorted.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
      case 'recent':
      default:
        return sorted.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    }
  }, [notebooks, sortKey]);

  const gridData: GridItem[] = [
    { kind: 'create' },
    ...orderedNotebooks.map((notebook) => ({ kind: 'notebook' as const, notebook })),
  ];

  return (
    <View className="flex-1 bg-backgroundTabs">
      <ScreenHeader
        title="Notebooks"
        showBorder={false}
        rightSlot={
          <View className="flex-row items-center gap-4">
            <Pressable onPress={() => {}}>
              <Ionicons name="search-outline" size={22} color={colors.dark} />
            </Pressable>
            <Pressable onPress={() => {}}>
              <Ionicons name="add-outline" size={24} color={colors.dark} />
            </Pressable>
          </View>
        }
      />
      <SortFilterBar
        viewMode={viewMode}
        onToggleViewMode={toggleViewMode}
        onSortPress={() => setSortSheetVisible(true)}
      />
      <ProcessingFlash trigger={sortFlashTrigger}>
        <FlatList
          key={viewMode}
          data={gridData}
          keyExtractor={(item) => (item.kind === 'create' ? 'create' : item.notebook.id)}
          numColumns={viewMode === 'albums' ? 2 : 1}
          columnWrapperStyle={
            viewMode === 'albums' ? { justifyContent: 'space-between' } : undefined
          }
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16 }}
          renderItem={({ item }) => {
            if (item.kind === 'create') {
              return (
                <CreateCard
                  label="Novo notebook"
                  onPress={createNotebook}
                  textPosition={viewMode === 'albums' ? 'below' : 'row'}
                />
              );
            }
            return viewMode === 'albums' ? (
              <NotebookCard notebook={item.notebook} />
            ) : (
              <NotebookListItem notebook={item.notebook} />
            );
          }}
        />
      </ProcessingFlash>
      <SortOptionsSheet
        visible={sortSheetVisible}
        onClose={() => setSortSheetVisible(false)}
        selectedKey={sortKey}
        onSelect={selectSortKey}
        options={[
          { key: 'recent', label: 'Criado recentemente' },
          { key: 'alphabetical', label: 'Alfabética' },
          { key: 'creationOrder', label: 'Ordem de criação' },
        ]}
      />
    </View>
  );
}
