'use client';
import { useEffect } from 'react';
import { useReservations } from '@/hooks/use-reservations';

export default function ParticipantReservations() {
  const {
    reservations,
    loading,
    fetchMyReservations,
    cancelReservation,
    downloadTicket,
  } = useReservations();

  useEffect(() => {
    fetchMyReservations();
  }, []);

  const handleDownload = async (id: string) => {
    try {
      const blob = await downloadTicket(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ticket-${id}.pdf`;
      a.click();
    } catch (error) {
      alert('Failed to download ticket');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Reservations</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Event
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
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
                    {typeof reservation.eventId === 'object'
                      ? new Date(reservation.eventId.date).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        reservation.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : reservation.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {reservation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    {reservation.status === 'confirmed' && (
                      <button
                        onClick={() => handleDownload(reservation._id)}
                        className="text-blue-600 hover:underline"
                      >
                        Download Ticket
                      </button>
                    )}
                    {reservation.status === 'pending' && (
                      <button
                        onClick={() => cancelReservation(reservation._id)}
                        className="text-red-600 hover:underline"
                      >
                        Cancel
                      </button>
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
