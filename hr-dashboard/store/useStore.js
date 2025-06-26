import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(persist(
  (set, get) => ({
    bookmarks: [],
    toggleBookmark: (id) => {
      const state = get();
      const updated = state.bookmarks.includes(id)
        ? state.bookmarks.filter(b => b !== id)
        : [...state.bookmarks, id];

      set({ bookmarks: updated });

      const today = new Date().toISOString().split('T')[0];
      const key = 'bookmark-history';
      const existing = JSON.parse(localStorage.getItem(key)) || [];

      if (!existing.some(e => e.date === today)) {
        existing.push({ date: today, count: updated.length });
        localStorage.setItem(key, JSON.stringify(existing));
      }
    },
    darkMode: false,
    toggleDarkMode: () => set(state => ({ darkMode: !state.darkMode }))
  }),
  {
    name: 'hr-dashboard-storage',
  }
));
