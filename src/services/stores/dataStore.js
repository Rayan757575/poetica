
import { create } from 'zustand'

export const useNotebookStore = create((set) => ({
    selectedNotebook: null,
    setSelectedData: (selectedNotebook) => set({ selectedNotebook }),
}))

export const usePoemStore = create((set) => ({
    selectedPoem: null,
    setSelectedData: (selectedPoem) => set({ selectedPoem }),
}))