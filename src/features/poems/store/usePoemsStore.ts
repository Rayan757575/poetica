import * as Crypto from 'expo-crypto';
import { useMemo } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { zustandStorage } from '@/shared/lib/storage';
import type { Poem } from '../types';

const MAX_RECENT_POEMS = 5;
const DEFAULT_AUTHOR = 'você'; // fixo por enquanto — métricas futuras

// Título usado quando o usuário não digita nenhum. No editor ele aparece só
// como placeholder, então manter o nome padrão continua sendo uma escolha
// válida (basta não preencher o título).
export const DEFAULT_POEM_TITLE = 'Novo poema';

// Id reservado da rota do editor para um poema ainda não salvo (rascunho).
// Ids reais são UUIDs (expo-crypto), então não há colisão.
export const NEW_POEM_ID = 'new';

function titleOrDefault(title: string): string {
  return title.trim() ? title : DEFAULT_POEM_TITLE;
}

function bumpRecent(recentIds: string[], poemId: string): string[] {
  const withoutCurrent = recentIds.filter((id) => id !== poemId);
  return [poemId, ...withoutCurrent].slice(0, MAX_RECENT_POEMS);
}

type PoemsState = {
  poems: Poem[];
  recentPoemIds: string[];
  // Recebe título/conteúdo porque o poema só é criado ao sair do editor,
  // se algo tiver sido escrito (rascunhos vazios nunca chegam ao storage).
  // Título vazio vira DEFAULT_POEM_TITLE.
  addPoem: (notebookId: string, data: Pick<Poem, 'title' | 'content'>) => Poem;
  updatePoem: (id: string, patch: Partial<Pick<Poem, 'title' | 'content'>>) => void;
  removePoem: (id: string) => void;
};

export const usePoemsStore = create<PoemsState>()(
  persist(
    (set) => ({
      poems: [],
      recentPoemIds: [],
      addPoem: (notebookId, data) => {
        const now = new Date().toISOString();
        const poem: Poem = {
          id: Crypto.randomUUID(),
          notebookId,
          title: titleOrDefault(data.title),
          content: data.content,
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
        set((state) => {
          const current = state.poems.find((poem) => poem.id === id);
          if (!current) return state;

          const nextTitle = patch.title !== undefined ? titleOrDefault(patch.title) : current.title;
          const nextContent = patch.content !== undefined ? patch.content : current.content;

          // Se título e conteúdo finais continuam idênticos ao que já estava
          // salvo, evita atualizar `updatedAt` e poupa escrita no AsyncStorage.
          if (nextTitle === current.title && nextContent === current.content) {
            return state;
          }

          return {
            poems: state.poems.map((poem) =>
              poem.id === id
                ? {
                    ...poem,
                    title: nextTitle,
                    content: nextContent,
                    updatedAt: new Date().toISOString(),
                    updatedBy: DEFAULT_AUTHOR,
                  }
                : poem
            ),
            recentPoemIds: bumpRecent(state.recentPoemIds, id),
          };
        }),
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
