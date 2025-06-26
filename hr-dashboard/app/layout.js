'use client';

import Header from '@/components/Header';
import { useStore } from '../store/useStore';
import './globals.css';

export default function RootLayout({ children }) {
  const dark = useStore(state => state.darkMode);

  return (
    <html className={dark ? 'dark' : ''}>
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white">
        <Header />
        <div className="p-4">
          {children}
        </div>
      </body>
    </html>
  );
}
