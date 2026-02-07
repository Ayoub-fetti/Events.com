'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useEvents } from '@/hooks/use-events';
import { useReservations } from '@/hooks/use-reservations';
import httpClient from '@/services/utils/http-client';

export default function EventDetail() {
  const params = useParams();
  const router = useRouter();
  const { fetchEvent, selectedEvent, loading } = useEvents();
  const { reservations, fetchMyReservations, createReservation } =
    useReservations();
  const [reservedCount, setReservedCount] = useState(0);

  useEffect(() => {
    fetchEvent(params.id as string);
    fetchMyReservations();
    loadReservedCount();
  }, []);

  const loadReservedCount = async () => {
    try {
      const { data } = await httpClient.get(
        `/reservations/event/${params.id}/count`,
      );
      setReservedCount(data.count);
    } catch (error) {
      setReservedCount(0);
    }
  };

  const hasReservation = reservations.some(
    (r) =>
      (typeof r.eventId === 'object' ? r.eventId._id : r.eventId) ===
        params.id && r.status !== 'canceled',
  );

  const isFull = selectedEvent && reservedCount >= selectedEvent.capacity;

  const handleReserve = async () => {
    try {
      await createReservation({ eventId: params.id as string });
      alert('Reservation created successfully!');
      fetchMyReservations();
      loadReservedCount();
      router.push('/participant/reservations');
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Failed to create reservation');
    }
  };

  if (loading || !selectedEvent) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {selectedEvent.image && (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${selectedEvent.image}`}
            alt={selectedEvent.title}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{selectedEvent.title}</h1>
          <p className="text-gray-700 mb-4">{selectedEvent.description}</p>
          <div className="space-y-2 mb-6">
            <p className="text-gray-600">
              📍 Location: {selectedEvent.location}
            </p>
            <p className="text-gray-600">
              📅 Date: {new Date(selectedEvent.date).toLocaleString()}
            </p>
            <p className="text-gray-600">
              👥 Capacity: {reservedCount}/{selectedEvent.capacity}
            </p>
          </div>
          {hasReservation ? (
            <p className="text-green-600 font-semibold">
              You already have a reservation for this event
            </p>
          ) : isFull ? (
            <p className="text-red-600 font-semibold">This event is full</p>
          ) : (
            <button
              onClick={handleReserve}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Make Reservation
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
