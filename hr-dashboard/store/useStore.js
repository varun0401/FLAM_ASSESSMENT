import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(persist(
  (set) => ({
    bookmarks: [],
    toggleBookmark: (id) =>
      set(state => ({
        bookmarks: state.bookmarks.includes(id)
          ? state.bookmarks.filter(b => b !== id)
          : [...state.bookmarks, id]
      })),
    darkMode: false,
    toggleDarkMode: () =>
      set(state => ({ darkMode: !state.darkMode }))
  }),
  {
    name: 'hr-dashboard-storage', // LocalStorage key
  }
));
