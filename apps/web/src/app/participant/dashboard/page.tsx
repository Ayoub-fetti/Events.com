'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useEvents } from '@/hooks/use-events';
import { useReservations } from '@/hooks/use-reservations';

export default function ParticipantDashboard() {
  const { events, fetchPublishedEvents } = useEvents();
  const { reservations, fetchMyReservations } = useReservations();

  useEffect(() => {
    fetchPublishedEvents();
    fetchMyReservations();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">My Reservations</h3>
          <p className="text-3xl font-bold">{reservations.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Available Events</h3>
          <p className="text-3xl font-bold">{events.length}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/participant/events"
          className="bg-blue-600 text-white p-6 rounded-lg shadow hover:bg-blue-700 text-center"
        >
          Browse Events
        </Link>
        <Link
          href="/participant/reservations"
          className="bg-green-600 text-white p-6 rounded-lg shadow hover:bg-green-700 text-center"
        >
          My Reservations
        </Link>
      </div>
    </div>
  );
}
