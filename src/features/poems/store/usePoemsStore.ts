import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { zustandStorage } from '@/shared/lib/storage';
import type { Poem } from '../types';

type PoemsState = {
  poems: Poem[];
  addPoem: (notebookId: string, title: string) => Poem;
  updatePoem: (id: string, patch: Partial<Pick<Poem, 'title' | 'content'>>) => void;
  removePoem: (id: string) => void;
};

// No v1, o botão de voltar da tela Text chamava uma createNewPoem()
// que estava inteira comentada — ou seja, nada era salvo. Aqui o save
// de fato acontece (updatePoem, chamado ao sair da tela do editor).
export const usePoemsStore = create<PoemsState>()(
  persist(
    (set, get) => ({
      poems: [],
      addPoem: (notebookId, title) => {
        const poem: Poem = {
          id: Date.now().toString(),
          notebookId,
          title,
          content: '',
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ poems: [...state.poems, poem] }));
        return poem;
      },
      updatePoem: (id, patch) =>
        set((state) => ({
          poems: state.poems.map((poem) =>
            poem.id === id
              ? { ...poem, ...patch, updatedAt: new Date().toISOString() }
              : poem
          ),
        })),
      removePoem: (id) =>
        set((state) => ({ poems: state.poems.filter((poem) => poem.id !== id) })),
    }),
    {
      name: 'poems-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
