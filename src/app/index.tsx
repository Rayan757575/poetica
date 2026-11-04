import { router } from 'expo-router';
import { useEffect } from 'react';
import { Image, Text, View } from 'react-native';

export default function SplashRoute() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/welcome');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image
        source={require('@/assets/images/logoPoetica.png')}
        style={{ width: 200, height: 200 }}
        resizeMode="contain"
      />
      <Text className="mt-2 font-bold text-4xl text-dark">Poética</Text>
    </View>
  );
}
