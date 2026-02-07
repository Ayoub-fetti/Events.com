import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Link from 'next/link';

export default function Home() {
  // Static events data - you'll replace this with real events later
  const staticEvents = [
    {
      id: 1,
      title: 'Tech Conference 2026',
      description: 'Join us for the biggest tech conference of the year featuring industry leaders and innovative workshops.',
      date: 'March 15, 2026',
      time: '9:00 AM',
      location: 'San Francisco, CA',
      category: 'Technology',
      attendees: 245,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    },
    {
      id: 2,
      title: 'Art Exhibition Opening',
      description: 'Experience contemporary art from emerging artists. Opening night with live music and refreshments.',
      date: 'March 20, 2026',
      time: '6:00 PM',
      location: 'New York, NY',
      category: 'Art',
      attendees: 128,
      image: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&q=80',
    },
    {
      id: 3,
      title: 'Business Networking Mixer',
      description: 'Connect with entrepreneurs and business professionals in a relaxed evening setting.',
      date: 'March 22, 2026',
      time: '7:00 PM',
      location: 'Chicago, IL',
      category: 'Business',
      attendees: 89,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
    },
    {
      id: 4,
      title: 'Music Festival 2026',
      description: 'Two days of incredible live music featuring top artists and local bands across multiple stages.',
      date: 'April 5-6, 2026',
      time: '12:00 PM',
      location: 'Austin, TX',
      category: 'Music',
      attendees: 1850,
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
    },
    {
      id: 5,
      title: 'Startup Pitch Competition',
      description: 'Watch innovative startups pitch their ideas to a panel of investors. $50K prize for the winner.',
      date: 'April 10, 2026',
      time: '2:00 PM',
      location: 'Boston, MA',
      category: 'Business',
      attendees: 156,
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
    },
    {
      id: 6,
      title: 'Food & Wine Festival',
      description: 'Taste dishes from renowned chefs and sample wines from around the world at this culinary celebration.',
      date: 'April 15, 2026',
      time: '5:00 PM',
      location: 'Los Angeles, CA',
      category: 'Food',
      attendees: 432,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F1A]">
      <Header />

      <main className="flex-grow">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 right-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl"></div>
        </div>

        {/* Hero Section */}
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Discover Amazing
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Events For You
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Browse and join exciting upcoming events
            </p>
          </div>
        </div>

        {/* Events Section */}
        <div className="relative max-w-7xl mx-auto px-6 pb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Upcoming Events
            </h2>
            <Link
              href="/auth/register"
              className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors flex items-center gap-1"
            >
              <span>View all</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staticEvents.map((event) => (
              <div
                key={event.id}
                className="bg-[#111827] border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-200 group"
              >
                {/* Event Image */}
                <div className="relative h-48 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] to-transparent opacity-60"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      {event.category}
                    </span>
                  </div>
                  {/* Placeholder for image - you can replace with actual images */}
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-cyan-400/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {event.description}
                    </p>
                  </div>

                  {/* Event Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>

                  {/* Join Button - requires authentication */}
                  <Link
                    href="/auth/login"
                    className="w-full py-3 rounded-xl font-medium text-white text-center
                             bg-gradient-to-r from-cyan-500 to-blue-600
                             hover:from-cyan-400 hover:to-blue-500
                             transition-all duration-200
                             active:scale-[0.98]
                             flex items-center justify-center gap-2
                             shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                  >
                    <span>Join Event</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center bg-[#111827] border border-white/10 rounded-2xl p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Want to see more events?
            </h3>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Create an account to unlock access to thousands of events and start connecting with your community
            </p>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white
                       bg-gradient-to-r from-cyan-500 to-blue-600
                       hover:from-cyan-400 hover:to-blue-500
                       shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40
                       transition-all duration-200
                       active:scale-[0.98]"
            >
              <span>Create Free Account</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}