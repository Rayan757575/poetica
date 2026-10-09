import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text, View } from 'react-native';

import { useNotebooksStore } from '@/features/notebooks/store/useNotebooksStore';

// No v1, o botão de criar aqui chamava createNotebook com um array
// quebrado (`[id = 0, name = ..., wallpaper = ...]`, que nem é um
// objeto válido). Aqui ele realmente cria um notebook novo.
export default function HomeScreen() {
  const addNotebook = useNotebooksStore((state) => state.addNotebook);
  const notebooksCount = useNotebooksStore((state) => state.notebooks.length);

  const createQuickNotebook = () => {
    addNotebook(`My poems ${notebooksCount + 1}`);
  };

  return (
    <View className="flex-1 bg-light px-6 pt-16">
      <View className="flex-row items-center justify-between">
        <Text className="font-medium text-3xl text-dark">Home</Text>
        <Pressable onPress={createQuickNotebook}>
          <Ionicons name="add-circle-outline" size={28} color="#0a63f4" />
        </Pressable>
      </View>
      <Text className="mt-4 text-dark/60">
        {notebooksCount} notebook(s) — veja todos na aba Notebooks.
      </Text>
    </View>
  );
}
