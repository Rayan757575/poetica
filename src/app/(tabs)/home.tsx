import { router } from 'expo-router';
import { Text, View } from 'react-native';

import {
  UNCATEGORIZED_NOTEBOOK_ID,
  useNotebooksStore,
} from '@/features/notebooks/store/useNotebooksStore';
import { usePoemsStore } from '@/features/poems/store/usePoemsStore';
import { CreateCard } from '@/shared/components/CreateCard';
import { ScreenHeader } from '@/shared/components/ScreenHeader';
import { subtleDividerStyle } from '@/shared/theme/elevation';

export default function HomeScreen() {
  const notebooksCount = useNotebooksStore((state) => state.notebooks.length);
  const addPoem = usePoemsStore((state) => state.addPoem);

  const createQuickPoem = () => {
    const poem = addPoem(UNCATEGORIZED_NOTEBOOK_ID);
    router.push(`/poem/${poem.id}`);
  };

  return (
    <View className="flex-1 bg-backgroundTabs">
      <ScreenHeader title="Home" />
      <View style={subtleDividerStyle} className="px-6 pb-4">
        <Text className="mt-6 text-dark/60">
          {notebooksCount} notebook(s) — veja todos na aba Notebooks.
        </Text>
      </View>

      <View className="flex-1 items-center justify-center">
        <CreateCard
          label="Novo poema"
          onPress={createQuickPoem}
          size={200}
          radius={8}
          textPosition="inside"
        />
      </View>
    </View>
  );
}
