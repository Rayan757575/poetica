import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

import { colors } from '@/shared/theme/colors';
import { fontFamily, fontSize } from '@/shared/theme/typography';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: colors.white, borderTopColor: 'rgba(22,22,22,0.08)' },
        tabBarLabelStyle: { fontFamily: fontFamily.uiMedium, fontSize: fontSize.caption },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color as string} size={size} />
          ),
        }}
      />
      {/* `notebooks` é uma pasta com Stack próprio (notebooks/_layout.tsx):
          lista + detalhe do notebook vivem dentro desta aba, com a navbar
          visível e transição nativa de push entre eles. */}
      <Tabs.Screen
        name="notebooks"
        options={{
          title: 'Notebooks',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library-outline" color={color as string} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
