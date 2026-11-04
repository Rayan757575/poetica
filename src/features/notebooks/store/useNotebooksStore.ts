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
  addNotebook: (title: string, wallpaper?: string) => Notebook;
  removeNotebook: (id: string) => void;
};

export const useNotebooksStore = create<NotebooksState>()(
  persist(
    (set) => ({
      notebooks: [uncategorizedNotebook],
      addNotebook: (title, wallpaper) => {
        const notebook: Notebook = {
          id: Date.now().toString(),
          title,
          wallpaper,
          createdAt: new Date().toISOString(),
          createdBy: DEFAULT_AUTHOR,
        };
        set((state) => ({ notebooks: [...state.notebooks, notebook] }));
        return notebook;
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
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<NotebooksState> | undefined;
        return {
          ...currentState,
          ...persisted,
          notebooks: ensureUncategorized(persisted?.notebooks ?? currentState.notebooks),
        };
      },
    }
  )
);