import { FlatList, View } from 'react-native';

import { NotebookCard } from '@/features/notebooks/components/NotebookCard';
import { useNotebooksStore } from '@/features/notebooks/store/useNotebooksStore';
import type { Notebook } from '@/features/notebooks/types';
import { CreateCard } from '@/shared/components/CreateCard';
import { ScreenHeader } from '@/shared/components/ScreenHeader';

type GridItem = { kind: 'create' } | { kind: 'notebook'; notebook: Notebook };

export default function NotebooksScreen() {
  const notebooks = useNotebooksStore((state) => state.notebooks);
  const addNotebook = useNotebooksStore((state) => state.addNotebook);

  const createNotebook = () => {
    addNotebook(`My poems ${notebooks.length + 1}`);
  };

  const gridData: GridItem[] = [
    { kind: 'create' },
    ...notebooks.map((notebook) => ({ kind: 'notebook' as const, notebook })),
  ];

  return (
    <View className="flex-1 bg-backgroundTabs">
      <ScreenHeader title="Notebooks" />
      <FlatList
        data={gridData}
        keyExtractor={(item) => (item.kind === 'create' ? 'create' : item.notebook.id)}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16 }}
        renderItem={({ item }) =>
          item.kind === 'create' ? (
            <CreateCard label="Novo notebook" onPress={createNotebook} />
          ) : (
            <NotebookCard notebook={item.notebook} />
          )
        }
      />
    </View>
  );
}