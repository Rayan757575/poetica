import { Text, View } from 'react-native';

import { useNotebooksStore } from '@/features/notebooks/store/useNotebooksStore';
import { ScreenHeader } from '@/shared/components/ScreenHeader';

export default function HomeScreen() {
  const notebooksCount = useNotebooksStore((state) => state.notebooks.length);

  return (
    <View className="flex-1 bg-backgroundTabs">
      <ScreenHeader title="Home" />
      <Text className="px-6 text-dark/60">
        {notebooksCount} notebook(s) — veja todos na aba Notebooks.
      </Text>
    </View>
  );
}