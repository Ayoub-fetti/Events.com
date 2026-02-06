'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/admin/dashboard', label: 'Dashboard' },
    { href: '/admin/events', label: 'Events' },
    { href: '/admin/users', label: 'Users' },
    { href: '/admin/reservations', label: 'Reservations' },
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
