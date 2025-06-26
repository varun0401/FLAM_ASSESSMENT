'use client';

import Header from '@/components/Header';
import { useStore } from '../store/useStore';
import './globals.css';

export default function RootLayout({ children }) {
  const dark = useStore(state => state.darkMode);
  const toggle = useStore(state => state.toggleDarkMode);

  return (
    <html className={dark ? 'dark' : ''}>
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white">
        <Header />
        <div className="p-4">
          <button
            onClick={toggle}
            className="fixed top-4 right-4  bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded "
          >
            {dark ? '☀️ Light' : '🌙 Dark'}
          </button>
          {children}
        </div>
      </body>
    </html>
  );
}
