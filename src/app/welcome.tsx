import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Image, ImageBackground, Pressable, Text, View } from 'react-native';

// No v1, <Header/> era chamado sem a prop image_url, então o fundo nunca
// aparecia (o import de wallpaper1 ficava sem uso). Aqui a imagem
// realmente é exibida.
export default function WelcomeScreen() {
  const continueToApp = () => router.replace('/home');

  return (
    <View className="flex-1 bg-white">
      <ImageBackground
        source={require('@/assets/images/wallpaper1.jpg')}
        style={{ width: '100%', height: 320 }}
      >
        <LinearGradient
          colors={['transparent', '#FFFFFF']}
          className="h-full w-full items-center justify-end pb-4"
        >
          <Image
            source={require('@/assets/images/logoPoetica.png')}
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
          />
        </LinearGradient>
      </ImageBackground>

      <View className="flex-1 items-center bg-white px-6 pt-6">
        <Text className="mb-4 font-medium text-2xl text-dark">Welcome Poética</Text>

        <Pressable
          onPress={continueToApp}
          className="mb-3 w-full max-w-xs flex-row items-center justify-center rounded-full bg-primary py-4"
        >
          <Text className="font-regular text-white">Sign up for free</Text>
        </Pressable>

        <Text className="mb-3 text-dark">Or</Text>

        <Pressable
          onPress={continueToApp}
          className="mb-3 w-full max-w-xs flex-row items-center justify-center rounded-full border border-dark py-4"
        >
          <Text className="font-regular text-dark">Continue with Apple</Text>
        </Pressable>

        <Pressable
          onPress={continueToApp}
          className="w-full max-w-xs flex-row items-center justify-center rounded-full border border-dark py-4"
        >
          <Text className="font-regular text-dark">Continue with Google</Text>
        </Pressable>
      </View>
    </View>
  );
}
