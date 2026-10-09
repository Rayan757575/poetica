import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

import { useNotebooksStore } from '@/features/notebooks/store/useNotebooksStore';
import { PoemCard } from '@/features/poems/components/PoemCard';
import { usePoemsStore } from '@/features/poems/store/usePoemsStore';

export default function NotebookScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const notebook = useNotebooksStore((state) => state.notebooks.find((n) => n.id === id));

  // Selecionar o array bruto (referência estável) e filtrar fora do
  // seletor. `state.poems.filter(...)` direto no seletor criava um
  // array novo a cada render, o que faz o zustand/useSyncExternalStore
  // achar que o estado mudou sempre — daí o "Maximum update depth
  // exceeded".
  const allPoems = usePoemsStore((state) => state.poems);
  const poems = useMemo(
    () => allPoems.filter((poem) => poem.notebookId === id),
    [allPoems, id]
  );
  const addPoem = usePoemsStore((state) => state.addPoem);

  // O v1 não tinha nenhum jeito de criar um poema pela UI (a tela Text só
  // era alcançada tocando num poema mockado) — esse botão fecha esse
  // buraco pra o fluxo funcionar de ponta a ponta.
  const createPoem = () => {
    if (!id) return;
    const poem = addPoem(id, `Poema ${poems.length + 1}`);
    router.push(`/poem/${poem.id}`);
  };

  return (
    <View className="flex-1 bg-white pt-16">
      <View className="mt-6 h-22 flex-row items-center justify-center bg-light">
        <Text className="font-medium text-2xl text-dark">{notebook?.title ?? 'Notebook'}</Text>
      </View>

      <View style={{ height: 200, marginVertical: 24 }}>
        <FlatList
          horizontal
          data={poems}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 24 }}
          renderItem={({ item }) => <PoemCard poem={item} />}
          ListEmptyComponent={
            <View className="justify-center">
              <Text className="text-dark/60">No Poem has been created yet</Text>
            </View>
          }
        />
      </View>

      <Pressable
        onPress={createPoem}
        className="mx-6 flex-row items-center justify-center rounded-full border border-primary py-3"
      >
        <Ionicons name="add" size={20} color="#0a63f4" />
        <Text className="ml-1 font-regular text-primary">Novo poema</Text>
      </Pressable>
    </View>
  );
}
