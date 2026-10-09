import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { zustandStorage } from '@/shared/lib/storage';
import type { Notebook } from '../types';

type NotebooksState = {
  notebooks: Notebook[];
  addNotebook: (title: string, wallpaper?: string) => Notebook;
  removeNotebook: (id: string) => void;
};

// Mesma lib de estado que o v1 já usava (zustand) — só troca o storage
// de persistência (AsyncStorage -> MMKV) e corrige os bugs do v1:
// getNotebooks() do v1 devolvia a string crua do AsyncStorage sem dar
// JSON.parse, e deleteNotebook fazia `Array[db].filter(...)`, que não
// funciona. Com zustand persist isso é resolvido pela própria lib.
export const useNotebooksStore = create<NotebooksState>()(
  persist(
    (set, get) => ({
      notebooks: [],
      addNotebook: (title, wallpaper) => {
        const notebook: Notebook = {
          id: Date.now().toString(),
          title,
          wallpaper,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ notebooks: [...state.notebooks, notebook] }));
        return notebook;
      },
      removeNotebook: (id) =>
        set((state) => ({
          notebooks: state.notebooks.filter((notebook) => notebook.id !== id),
        })),
    }),
    {
      name: 'notebooks-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
