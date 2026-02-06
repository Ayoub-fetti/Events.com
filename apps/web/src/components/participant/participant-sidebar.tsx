'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ParticipantSidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/participant/dashboard', label: 'Dashboard' },
    { href: '/participant/events', label: 'Events' },
    { href: '/participant/reservations', label: 'My Reservations' },
  ];

  return (
    <aside className="w-64 bg-white shadow-md h-full">
      <nav className="p-4 space-y-2">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`block px-4 py-2 rounded ${
              pathname === href
                ? 'bg-indigo-600 text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
