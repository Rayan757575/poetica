import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect } from 'react';
import {
  AccessibilityInfo,
  Animated,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useAnimatedValue,
  useWindowDimensions,
} from 'react-native';
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

const BADGE_SIZE = scale(132);
const LOGO_SIZE = scale(100);
const GRADIENT_CYCLE_MS = 6000;

// Degradê "dinâmico": duas camadas de LinearGradient (branco + tons claros
// do azul da marca) com direções diferentes; a de cima faz fade in/out em
// loop. Só anima `opacity` com o native driver, então roda na thread de UI
// sem custo na thread JS. Respeita a opção "reduzir movimento" do sistema.
function AnimatedBackground() {
  const overlayOpacity = useAnimatedValue(0);

  useEffect(() => {
    let loop: Animated.CompositeAnimation | undefined;
    let cancelled = false;

    AccessibilityInfo.isReduceMotionEnabled().then((reduceMotion) => {
      if (cancelled || reduceMotion) return;
      const half = GRADIENT_CYCLE_MS / 2;
      const easing = Easing.inOut(Easing.sin);
      loop = Animated.loop(
        Animated.sequence([
          Animated.timing(overlayOpacity, {
            toValue: 1,
            duration: half,
            easing,
            useNativeDriver: true,
          }),
          Animated.timing(overlayOpacity, {
            toValue: 0,
            duration: half,
            easing,
            useNativeDriver: true,
          }),
        ])
      );
      loop.start();
    });

    return () => {
      cancelled = true;
      loop?.stop();
    };
  }, [overlayOpacity]);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={[colors.white, colors.primaryTint.soft, colors.primaryTint.mid]}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: overlayOpacity }]}>
        <LinearGradient
          colors={[colors.primaryTint.mid, colors.white, colors.primaryTint.soft]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
}

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const continueToApp = () => router.replace('/home');

  return (
    <View className="flex-1 bg-white">
      <AnimatedBackground />

      <View
        className="flex-1 px-6"
        style={{
          paddingTop: insets.top + moderateScale(32),
          // Sobe os botões pra região centro-inferior (em vez de colados no rodapé).
          paddingBottom: insets.bottom + height * 0.12,
        }}
      >
        <Text className="text-center font-bold text-3xl text-dark">
          Bem-vindo <Text className="text-primary">ao</Text> Poética
        </Text>

        <View className="flex-1 items-center justify-center">
          <View
            className="items-center justify-center rounded-full bg-white"
            style={{
              width: BADGE_SIZE,
              height: BADGE_SIZE,
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.18,
              shadowRadius: 14,
              elevation: 6,
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
