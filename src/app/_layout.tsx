import '@/global.css';

import {
  Lemonada_400Regular,
  Lemonada_500Medium,
  Lemonada_600SemiBold,
  Lemonada_700Bold,
} from '@expo-google-fonts/lemonada';
import { Literata_400Regular, Literata_700Bold } from '@expo-google-fonts/literata';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Lemonada_400Regular,
    Lemonada_500Medium,
    Lemonada_600SemiBold,
    Lemonada_700Bold,
    Literata_400Regular,
    Literata_700Bold,
    Inter_400Regular,
    Inter_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}