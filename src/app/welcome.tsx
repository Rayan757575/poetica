import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/shared/theme/colors';
import { moderateScale, scale } from '@/shared/theme/metrics';

// Cores oficiais das marcas — só existem aqui, por isso não entram no
// design system (`colors.ts`).
const brand = {
  apple: { background: '#000000', text: '#FFFFFF' },
  google: { background: '#FFFFFF', border: '#DADCE0', text: '#3C4043', icon: '#4285F4' },
};

// Ionicons só renderiza glifos de uma cor: o "G" do Google fica no azul da
// marca. Para o logo multicolorido seria preciso react-native-svg ou um PNG.

const HERO_HEIGHT_RATIO = 0.68;
const BADGE_SIZE = scale(112);
const LOGO_SIZE = scale(88);

// A imagem é um View absoluto + Image (ImageBackground foi depreciado) e o
// gradiente termina em `backgroundTabs`, o mesmo fundo das telas internas,
// pra transição entre a Welcome e o app ficar contínua.
export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const continueToApp = () => router.replace('/home');

  const heroBackground = 'rgba(247,245,241,0)'; // backgroundTabs com alpha 0 (evita o "cinza" do transparent no iOS)

  return (
    <View className="flex-1 bg-backgroundTabs">
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: height * HERO_HEIGHT_RATIO,
        }}
      >
        <Image
          source={require('@/assets/images/wallpaper1.jpg')}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
        <LinearGradient
          colors={[heroBackground, 'rgba(247,245,241,0.7)', colors.backgroundTabs]}
          locations={[0.3, 0.75, 1]}
          style={StyleSheet.absoluteFill}
        />
      </View>

      <View
        className="flex-1 justify-between px-6"
        style={{
          paddingTop: insets.top + moderateScale(24),
          paddingBottom: insets.bottom + moderateScale(24),
        }}
      >
        <View className="items-center">
          <View
            className="items-center justify-center rounded-full bg-white/90"
            style={{
              width: BADGE_SIZE,
              height: BADGE_SIZE,
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.12,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Image
              source={require('@/assets/images/logoPoetica.png')}
              style={{ width: LOGO_SIZE, height: LOGO_SIZE }}
              resizeMode="contain"
            />
          </View>
        </View>

        <View className="items-center">
          <Text className="mb-6 font-medium text-2xl text-dark">Welcome Poética</Text>

          <Pressable
            onPress={continueToApp}
            className="w-full max-w-xs flex-row items-center justify-center rounded-full bg-primary py-4"
            style={{
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Text className="font-regular text-white">Sign up for free</Text>
          </Pressable>

          <View className="my-4 w-full max-w-xs flex-row items-center">
            <View className="h-px flex-1 bg-dark/15" />
            <Text className="mx-3 text-sm text-muted">Or</Text>
            <View className="h-px flex-1 bg-dark/15" />
          </View>

          <Pressable
            onPress={continueToApp}
            className="mb-3 w-full max-w-xs flex-row items-center justify-center rounded-full py-4"
            style={{ backgroundColor: brand.apple.background }}
          >
            <Ionicons name="logo-apple" size={20} color={brand.apple.text} />
            <Text className="ml-3 font-regular" style={{ color: brand.apple.text }}>
              Continue with Apple
            </Text>
          </Pressable>

          <Pressable
            onPress={continueToApp}
            className="w-full max-w-xs flex-row items-center justify-center rounded-full border py-4"
            style={{ backgroundColor: brand.google.background, borderColor: brand.google.border }}
          >
            <Ionicons name="logo-google" size={20} color={brand.google.icon} />
            <Text className="ml-3 font-regular" style={{ color: brand.google.text }}>
              Continue with Google
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
