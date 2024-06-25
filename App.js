import { StatusBar } from 'expo-status-bar'
import { theme } from './src/styles'
import { ThemeProvider } from 'styled-components/native'
import {
  useFonts,
  Lemonada_400Regular,
  Lemonada_500Medium,
  Lemonada_600SemiBold,
  Lemonada_700Bold,
} from '@expo-google-fonts/lemonada'
import { Routes } from '~/routes';


export default function App() {
  let [fontsLoaded] = useFonts({
    Lemonada_400Regular,
    Lemonada_500Medium,
    Lemonada_600SemiBold,
    Lemonada_700Bold,
  })
  if (!fontsLoaded) {
    return null
  }
  return (
    <ThemeProvider theme={theme}>
      <Routes/>
    </ThemeProvider>
  )
}
