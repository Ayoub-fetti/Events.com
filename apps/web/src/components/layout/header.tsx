import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          Events.com
        </Link>
        <nav className="space-x-4">
          <Link
            href="/auth/login"
            className="text-gray-600 hover:text-indigo-600"
          >
            Connexion
          </Link>
          <Link
            href="/auth/register"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Inscription
          </Link>
        </nav>
      </div>
    </header>
  );
}
