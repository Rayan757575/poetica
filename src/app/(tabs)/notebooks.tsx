import { FlatList, Text, View } from 'react-native';

import { NotebookCard } from '@/features/notebooks/components/NotebookCard';
import { useNotebooksStore } from '@/features/notebooks/store/useNotebooksStore';

export default function NotebooksScreen() {
  const notebooks = useNotebooksStore((state) => state.notebooks);

  return (
    <View className="flex-1 bg-light">
      <View className="ml-11 h-24 justify-center bg-light">
        <Text className="font-medium text-3xl text-dark">Notebooks</Text>
      </View>
      <FlatList
        data={notebooks}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16 }}
        renderItem={({ item }) => <NotebookCard notebook={item} />}
        ListEmptyComponent={
          <Text className="text-dark/60">
            Nenhum notebook ainda. Crie um na aba Home.
          </Text>
        }
      />
    </View>
  );
}
