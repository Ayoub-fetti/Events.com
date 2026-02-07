'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useEvents } from '@/hooks/use-events';
import Loading from '@/components/shared/loading';

export default function ParticipantEvents() {
  const { events, loading, fetchPublishedEvents } = useEvents();

  useEffect(() => {
    fetchPublishedEvents();
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Available Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length === 0 ? (
          <p className="text-gray-500">No events available</p>
        ) : (
          events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              {event.image && (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${event.image}`}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {event.description.substring(0, 100)}...
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  📍 {event.location}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  📅 {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  👥 Capacity: {event.capacity}
                </p>
                <Link
                  href={`/participant/events/${event._id}`}
                  className="block text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
