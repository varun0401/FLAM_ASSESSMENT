'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navLinks = [
  { name: 'Dashboard', href: '/' },
  { name: 'Bookmarks', href: '/bookmarks' },
  { name: 'Analytics', href: '/analytics' }
];

export default function Header() {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(prefersDark);
    document.documentElement.classList.toggle('dark', prefersDark);
  }, []);

  const toggleTheme = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">HR Dashboard</h1>

      <nav className="flex gap-6 items-center">
        {navLinks.map(link => (
          <Link key={link.href} href={link.href}>
            <span
              className={`cursor-pointer hover:underline ${pathname === link.href ? 'font-bold underline' : ''
                }`}
            >
              {link.name}
            </span>
          </Link>
        ))}
      </nav>
      <button
        onClick={toggleTheme}
        className=" top-4 right-4 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded "
      >
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
    </header>
  );
}
