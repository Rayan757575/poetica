import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { ListViewMode } from '@/shared/components/SortFilterBar';
import { zustandStorage } from '@/shared/lib/storage';

// Preferências de visualização (modo lista/albums + ordenação) que
// sobrevivem à navegação e ao fechamento do app.
//
// Escalabilidade: só grava quando o usuário toca no toggle ou escolhe uma
// ordenação (ação explícita e rara), nunca por render/scroll. É um objeto
// pequeno e fixo no AsyncStorage local — sem custo de rede/servidor.
//
// A tela de detalhe usa UMA preferência para todos os notebooks (decisão
// mais simples). Se no futuro cada notebook precisar lembrar a própria
// ordenação, basta trocar `notebookDetail` por um Record<notebookId, ...>.

export type ScreenKey = 'notebooks' | 'notebookDetail';

type ScreenPreference = {
  viewMode: ListViewMode;
  sortKey: string;
};

type ScreenPreferencesState = {
  preferences: Record<ScreenKey, ScreenPreference>;
  setViewMode: (screen: ScreenKey, viewMode: ListViewMode) => void;
  setSortKey: (screen: ScreenKey, sortKey: string) => void;
};

const defaultPreferences: Record<ScreenKey, ScreenPreference> = {
  notebooks: { viewMode: 'albums', sortKey: 'recent' },
  notebookDetail: { viewMode: 'albums', sortKey: 'recentlyUpdated' },
};

export const useScreenPreferencesStore = create<ScreenPreferencesState>()(
  persist(
    (set) => ({
      preferences: defaultPreferences,
      setViewMode: (screen, viewMode) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            [screen]: { ...state.preferences[screen], viewMode },
          },
        })),
      setSortKey: (screen, sortKey) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            [screen]: { ...state.preferences[screen], sortKey },
          },
        })),
    }),
    {
      name: 'screen-preferences',
      storage: createJSONStorage(() => zustandStorage),
      // Reaplica os defaults pra telas que não existiam quando os dados
      // foram salvos (ex.: uma nova ScreenKey adicionada depois).
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<ScreenPreferencesState> | undefined;
        return {
          ...currentState,
          preferences: { ...defaultPreferences, ...persisted?.preferences },
        };
      },
    }
  )
);

export function useScreenPreference(screen: ScreenKey) {
  const viewMode = useScreenPreferencesStore((state) => state.preferences[screen].viewMode);
  const sortKey = useScreenPreferencesStore((state) => state.preferences[screen].sortKey);
  const setViewModeFor = useScreenPreferencesStore((state) => state.setViewMode);
  const setSortKeyFor = useScreenPreferencesStore((state) => state.setSortKey);

  return {
    viewMode,
    sortKey,
    toggleViewMode: () => setViewModeFor(screen, viewMode === 'list' ? 'albums' : 'list'),
    setSortKey: (key: string) => setSortKeyFor(screen, key),
  };
}
