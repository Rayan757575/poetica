import { useMemo } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { zustandStorage } from '@/shared/lib/storage';
import type { Poem } from '../types';

const MAX_RECENT_POEMS = 5;
const DEFAULT_AUTHOR = 'você'; // fixo por enquanto — métricas futuras, não exibido

function bumpRecent(recentIds: string[], poemId: string): string[] {
  const withoutCurrent = recentIds.filter((id) => id !== poemId);
  return [poemId, ...withoutCurrent].slice(0, MAX_RECENT_POEMS);
}

type PoemsState = {
  poems: Poem[];
  recentPoemIds: string[];
  // Sem parâmetro de título: todo poema novo nasce "Novo poema" (ponto
  // 5) até existir uma forma de nomear já na criação.
  addPoem: (notebookId: string) => Poem;
  updatePoem: (id: string, patch: Partial<Pick<Poem, 'title' | 'content'>>) => void;
  removePoem: (id: string) => void;
};

export const usePoemsStore = create<PoemsState>()(
  persist(
    (set) => ({
      poems: [],
      recentPoemIds: [],
      addPoem: (notebookId) => {
        const now = new Date().toISOString();
        const poem: Poem = {
          id: Date.now().toString(),
          notebookId,
          title: 'Novo poema',
          content: '',
          type: 'livre', // sem seletor de tipo na criação ainda, livre é o padrão
          createdAt: now,
          createdBy: DEFAULT_AUTHOR,
          updatedAt: now,
          updatedBy: DEFAULT_AUTHOR,
        };
        set((state) => ({
          poems: [...state.poems, poem],
          recentPoemIds: bumpRecent(state.recentPoemIds, poem.id),
        }));
        return poem;
      },
      updatePoem: (id, patch) =>
        set((state) => ({
          poems: state.poems.map((poem) =>
            poem.id === id
              ? {
                  ...poem,
                  ...patch,
                  updatedAt: new Date().toISOString(),
                  updatedBy: DEFAULT_AUTHOR,
                }
              : poem
          ),
          recentPoemIds: bumpRecent(state.recentPoemIds, id),
        })),
      removePoem: (id) =>
        set((state) => ({
          poems: state.poems.filter((poem) => poem.id !== id),
          recentPoemIds: state.recentPoemIds.filter((poemId) => poemId !== id),
        })),
    }),
    {
      name: 'poems-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export function useRecentPoems(limit = MAX_RECENT_POEMS): Poem[] {
  const poems = usePoemsStore((state) => state.poems);
  const recentPoemIds = usePoemsStore((state) => state.recentPoemIds);

  return useMemo(() => {
    const byId = new Map(poems.map((poem) => [poem.id, poem]));
    return recentPoemIds
      .slice(0, limit)
      .map((id) => byId.get(id))
      .filter((poem): poem is Poem => Boolean(poem));
  }, [poems, recentPoemIds, limit]);
}
