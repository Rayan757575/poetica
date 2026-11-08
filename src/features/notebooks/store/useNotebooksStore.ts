import * as Crypto from 'expo-crypto';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { zustandStorage } from '@/shared/lib/storage';
import type { Notebook } from '../types';

export const UNCATEGORIZED_NOTEBOOK_ID = 'uncategorized';
const DEFAULT_AUTHOR = 'você';

const uncategorizedNotebook: Notebook = {
  id: UNCATEGORIZED_NOTEBOOK_ID,
  title: 'Sem categoria',
  createdAt: new Date(0).toISOString(),
  createdBy: 'sistema',
};

function ensureUncategorized(notebooks: Notebook[]): Notebook[] {
  if (notebooks.some((notebook) => notebook.id === UNCATEGORIZED_NOTEBOOK_ID)) {
    return notebooks;
  }
  return [uncategorizedNotebook, ...notebooks];
}

type NotebooksState = {
  notebooks: Notebook[];
  // Efêmero (não vai pro AsyncStorage): identifica o notebook recém-criado
  // na sessão atual pra animar só a entrada dele (modelo C1).
  lastCreatedNotebookId: string | null;
  addNotebook: (title: string, wallpaper?: string, description?: string) => Notebook;
  updateNotebook: (
    id: string,
    patch: Partial<Pick<Notebook, 'title' | 'description' | 'wallpaper'>>
  ) => void;
  removeNotebook: (id: string) => void;
};

export const useNotebooksStore = create<NotebooksState>()(
  persist(
    (set) => ({
      notebooks: [uncategorizedNotebook],
      lastCreatedNotebookId: null,
      addNotebook: (title, wallpaper, description) => {
        const trimmedTitle = title.trim();
        const trimmedDescription = description?.trim();
        const notebook: Notebook = {
          id: Crypto.randomUUID(),
          title: trimmedTitle || title,
          description: trimmedDescription ? trimmedDescription : undefined,
          wallpaper,
          createdAt: new Date().toISOString(),
          createdBy: DEFAULT_AUTHOR,
        };
        set((state) => ({
          notebooks: [...state.notebooks, notebook],
          lastCreatedNotebookId: notebook.id,
        }));
        return notebook;
      },
      updateNotebook: (id, patch) => {
        if (id === UNCATEGORIZED_NOTEBOOK_ID) return;
        set((state) => ({
          notebooks: state.notebooks.map((notebook) => {
            if (notebook.id !== id) return notebook;
            const nextTitle =
              patch.title !== undefined ? patch.title.trim() || notebook.title : notebook.title;
            const nextDescription =
              'description' in patch
                ? patch.description?.trim()
                  ? patch.description.trim()
                  : undefined
                : notebook.description;
            const nextWallpaper = 'wallpaper' in patch ? patch.wallpaper : notebook.wallpaper;

            return {
              ...notebook,
              title: nextTitle,
              description: nextDescription,
              wallpaper: nextWallpaper,
            };
          }),
        }));
      },
      removeNotebook: (id) => {
        if (id === UNCATEGORIZED_NOTEBOOK_ID) return;
        set((state) => ({
          notebooks: state.notebooks.filter((notebook) => notebook.id !== id),
        }));
      },
    }),
    {
      name: 'notebooks-storage',
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({ notebooks: state.notebooks }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<NotebooksState> | undefined;
        return {
          ...currentState,
          ...persisted,
          lastCreatedNotebookId: null,
          notebooks: ensureUncategorized(persisted?.notebooks ?? currentState.notebooks),
        };
      },
    }
  )
);
