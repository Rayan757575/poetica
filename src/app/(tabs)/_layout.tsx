import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

// Mesmas duas tabs do BottomBar customizado do v1 (Home + Notebooks),
// agora usando o Tabs nativo do Expo Router em vez de um BottomBar
// escrito à mão.
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0a63f4',
        tabBarInactiveTintColor: '#000000',
        tabBarStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="notebooks"
        options={{
          title: 'Notebooks',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
