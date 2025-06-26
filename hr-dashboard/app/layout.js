'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { useStore } from '../store/useStore';
import './globals.css';

export default function RootLayout({ children }) {
  const dark = useStore(state => state.darkMode);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAuthenticated') === 'true';

    if (!isLoggedIn && pathname !== '/login') {
      router.push('/login');
    }

    if (isLoggedIn && pathname === '/login') {
      router.push('/');
    }
  }, [pathname, router]);

  return (
    <html className={dark ? 'dark' : ''}>
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white">
        {pathname !== '/login' && <Header />}
        <div className="p-4">
          {children}
        </div>
      </body>
    </html>
  );
}
