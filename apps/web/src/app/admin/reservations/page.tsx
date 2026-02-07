'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useReservations } from '@/hooks/use-reservations';

export default function AdminReservations() {
  const {
    reservations,
    loading,
    fetchAllReservations,
    updateReservationStatus,
  } = useReservations();

  useEffect(() => {
    fetchAllReservations();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    await updateReservationStatus(id, status);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Reservations</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Event
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {reservations.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No reservations
                </td>
              </tr>
            ) : (
              reservations.map((reservation) => (
                <tr key={reservation._id}>
                  <td className="px-6 py-4">
                    {typeof reservation.eventId === 'object'
                      ? reservation.eventId.title
                      : reservation.eventId}
                  </td>
                  <td className="px-6 py-4">
                    {typeof reservation.userId === 'object'
                      ? reservation.userId.email
                      : reservation.userId}
                  </td>
                  <td className="px-6 py-4">{reservation.status}</td>
                  <td className="px-6 py-4 space-x-2">
                    <Link
                      href={`/admin/reservations/${reservation._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                    {reservation.status === 'pending' && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusChange(reservation._id, 'confirmed')
                          }
                          className="text-green-600 hover:underline"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(reservation._id, 'refused')
                          }
                          className="text-red-600 hover:underline"
                        >
                          Refuse
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
