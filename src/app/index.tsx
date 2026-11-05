import { Redirect } from 'expo-router';

// A splash agora é só a nativa (configurada no plugin `expo-splash-screen`
// do app.json e mantida visível por `preventAutoHideAsync` em _layout.tsx
// até as fontes carregarem). Esta rota só encaminha pra Welcome.
export default function SplashRoute() {
  return <Redirect href="/welcome" />;
}
