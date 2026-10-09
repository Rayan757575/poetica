import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Ops!' }} />
      <View className="flex-1 items-center justify-center bg-white px-4">
        <Text className="mb-4 text-dark">Essa tela não existe.</Text>
        <Link href="/home" className="text-primary">
          Voltar para o início
        </Link>
      </View>
    </>
  );
}
