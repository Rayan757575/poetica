import { Stack } from 'expo-router';

import { colors } from '@/shared/theme/colors';

// Garante que um deep link direto pra /notebooks/[id] ainda tenha a
// lista "embaixo" na pilha (o voltar leva pra lista, não pra fora da aba).
export const unstable_settings = {
  initialRouteName: 'index',
};

// Stack aninhado dentro da aba Notebooks: lista (index) → detalhe ([id])
// ganha a mesma transição nativa de push que o editor de poemas tem, e a
// tab bar continua visível porque o Stack vive DENTRO do navegador de
// tabs. Substitui o antigo `notebook/[id]` registrado como aba oculta.
export default function NotebooksStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.backgroundTabs },
      }}
    />
  );
}
