import Ionicons from '@expo/vector-icons/Ionicons';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';

import { NotebookCard } from '@/features/notebooks/components/NotebookCard';
import { NotebookListItem } from '@/features/notebooks/components/NotebookListItem';
import { useNotebooksStore } from '@/features/notebooks/store/useNotebooksStore';
import type { Notebook } from '@/features/notebooks/types';
import { CreateCard } from '@/shared/components/CreateCard';
import { ScreenHeader } from '@/shared/components/ScreenHeader';
import { SortFilterBar, type ListViewMode } from '@/shared/components/SortFilterBar';
import { SortOptionsSheet } from '@/shared/components/SortOptionsSheet';
import { colors } from '@/shared/theme/colors';

type GridItem = { kind: 'create' } | { kind: 'notebook'; notebook: Notebook };

export default function NotebooksScreen() {
  const notebooks = useNotebooksStore((state) => state.notebooks);
  const addNotebook = useNotebooksStore((state) => state.addNotebook);
  const [viewMode, setViewMode] = useState<ListViewMode>('list');
  const [sortSheetVisible, setSortSheetVisible] = useState(false);
  const [sortKey, setSortKey] = useState('recent');

  const createNotebook = () => {
    addNotebook(`My poems ${notebooks.length + 1}`);
  };

  const orderedNotebooks = useMemo(() => notebooks.slice().reverse(), [notebooks]);

  const gridData: GridItem[] = [
    { kind: 'create' },
    ...orderedNotebooks.map((notebook) => ({ kind: 'notebook' as const, notebook })),
  ];

  return (
    <View className="flex-1 bg-backgroundTabs">
      <ScreenHeader
        title="Notebooks"
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
        onToggleViewMode={() => setViewMode((mode) => (mode === 'list' ? 'albums' : 'list'))}
        onSortPress={() => setSortSheetVisible(true)}
      />
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
            return <CreateCard label="Novo notebook" onPress={createNotebook} />;
          }
          return viewMode === 'albums' ? (
            <NotebookCard notebook={item.notebook} />
          ) : (
            <NotebookListItem notebook={item.notebook} />
          );
        }}
      />
      <SortOptionsSheet
        visible={sortSheetVisible}
        onClose={() => setSortSheetVisible(false)}
        selectedKey={sortKey}
        onSelect={setSortKey}
        options={[
          { key: 'recent', label: 'Criado recentemente' },
          { key: 'alphabetical', label: 'Alfabética' },
          { key: 'creationOrder', label: 'Ordem de criação' },
        ]}
      />
    </View>
  );
}