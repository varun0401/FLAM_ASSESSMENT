'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Dashboard', href: '/' },
  { name: 'Bookmarks', href: '/bookmarks' },
  { name: 'Analytics', href: '/analytics' }
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">HR Dashboard</h1>
      <nav className="flex gap-4  mr-[120px]">
        {navLinks.map(link => (
          <Link key={link.href} href={link.href}>
            <span
              className={`cursor-pointer hover:underline ${
                pathname === link.href ? 'font-bold underline' : ''
              }`}
            >
              {link.name}
            </span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
