import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StateStorage } from 'zustand/middleware';

// O MMKV exige um dev client nativo (não roda dentro do Expo Go, que é
// como o app foi testado). Por isso a persistência volta a ser o
// AsyncStorage nessa fase — a interface do zustand/persist não muda.
// Pra trocar de volta pro MMKV mais pra frente: gere um dev client
// (`npx expo run:android` ou `eas build --profile development`),
// reinstale o react-native-mmkv e troque as duas linhas abaixo por
// `import { MMKV } from 'react-native-mmkv'; const storage = new MMKV(...)`.
export const zustandStorage: StateStorage = AsyncStorage;
