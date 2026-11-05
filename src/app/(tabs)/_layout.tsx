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
      <Tabs.Screen
        name="notebooks"
        options={{
          title: 'Notebooks',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library-outline" color={color as string} size={size} />
          ),
        }}
      />
      {/* Faz parte do navegador de tabs (pra manter o navbar visível),
          mas tabBarButton nulo tira esse item da própria tab bar — ele só é
          alcançado a partir do card de um notebook. */}
      <Tabs.Screen
        name="notebook/[id]"
        options={{ tabBarButton: () => null, tabBarItemStyle: { display: 'none' } }}
      />
    </Tabs>
  );
}
