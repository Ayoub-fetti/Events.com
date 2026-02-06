import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-20 text-center flex-grow">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Gérez vos événements facilement
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Créez, organisez et participez à des événements en quelques clics
        </p>
        <Link
          href="/auth/register"
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-indigo-700"
        >
          Commencer
        </Link>
      </div>
      <Footer />
    </div>
  );
}
