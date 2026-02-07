'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useReservations } from '@/hooks/use-reservations';
import { Reservation } from '@/types/reservation.types';

export default function ReservationDetail() {
  const params = useParams();
  const router = useRouter();
  const { reservations, fetchAllReservations, updateReservationStatus } =
    useReservations();
  const [reservation, setReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    loadReservation();
  }, []);

  const loadReservation = async () => {
    await fetchAllReservations();
    const found = reservations.find((r) => r._id === params.id);
    if (found) setReservation(found);
  };

  const handleStatusChange = async (status: string) => {
    await updateReservationStatus(params.id as string, status);
    router.push('/admin/reservations');
  };

  if (!reservation) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Reservation Details</h1>
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-500">
            Event
          </label>
          <p className="text-lg">
            {typeof reservation.eventId === 'object'
              ? reservation.eventId.title
              : reservation.eventId}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">
            User
          </label>
          <p className="text-lg">
            {typeof reservation.userId === 'object'
              ? reservation.userId.email
              : reservation.userId}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">
            Status
          </label>
          <p className="text-lg capitalize">{reservation.status}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">
            Created At
          </label>
          <p className="text-lg">
            {reservation.createdAt
              ? new Date(reservation.createdAt).toLocaleString()
              : 'N/A'}
          </p>
        </div>
        {reservation.status === 'pending' && (
          <div className="flex gap-2 pt-4">
            <button
              onClick={() => handleStatusChange('confirmed')}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Confirm
            </button>
            <button
              onClick={() => handleStatusChange('refused')}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Refuse
            </button>
          </div>
        )}
        <button
          onClick={() => router.back()}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Back
        </button>
      </div>
    </div>
  );
}
