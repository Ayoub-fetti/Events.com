'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useReservations } from '@/hooks/use-reservations';
import { Reservation } from '@/types/reservation.types';
import { toast } from 'react-toastify';

export default function ReservationDetail() {
  const params = useParams();
  const router = useRouter();
  const { reservations, fetchAllReservations, updateReservationStatus } =
    useReservations();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadReservation();
  }, []);

  const loadReservation = async () => {
    try {
      await fetchAllReservations();
      const found = reservations.find((r) => r._id === params.id);
      if (found) setReservation(found);
    } catch (error) {
      console.error('Error loading reservation:', error);
      toast.error('Failed to load reservation details');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (status: string) => {
    try {
      setUpdating(true);
      await updateReservationStatus(params.id as string, status);
      toast.success('Status changed successfully');
      setTimeout(() => router.push('/admin/reservations'), 1000);
    } catch (err: any) {
      console.log('Error message', err);
      toast.error('Error happened');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      confirmed: 'bg-green-500/10 text-green-400 border-green-500/20',
      refused: 'bg-red-500/10 text-red-400 border-red-500/20',
      cancelled: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    };

    const statusIcons = {
      pending: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      confirmed: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      refused: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      cancelled: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ),
    };

    return (
      <span
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border ${statusStyles[status as keyof typeof statusStyles] || statusStyles.pending}`}
      >
        {statusIcons[status as keyof typeof statusIcons]}
        <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400">Loading reservation details...</p>
        </div>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-gray-400 font-medium mb-2">
              Reservation not found
            </p>
            <button
              onClick={() => router.back()}
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div>
          <h1 className="text-3xl font-bold mb-1">Reservation Details</h1>
          <p className="text-gray-500">
            View and manage reservation information
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Details Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
            {/* Event Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Event Information
              </h2>
              <div className="bg-[#0B0F1A] rounded-xl p-4 border border-white/5">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Event Title
                </label>
                <p className="text-lg text-white font-medium">
                  {typeof reservation.eventId === 'object'
                    ? reservation.eventId.title
                    : reservation.eventId}
                </p>
                {typeof reservation.eventId === 'object' &&
                  reservation.eventId.description && (
                    <p className="text-sm text-gray-400 mt-2">
                      {reservation.eventId.description}
                    </p>
                  )}
              </div>

              {typeof reservation.eventId === 'object' && (
                <div className="grid grid-cols-2 gap-4">
                  {reservation.eventId.date && (
                    <div className="bg-[#0B0F1A] rounded-xl p-4 border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Event Date
                        </label>
                      </div>
                      <p className="text-sm text-white">
                        {new Date(
                          reservation.eventId.date,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {reservation.eventId.location && (
                    <div className="bg-[#0B0F1A] rounded-xl p-4 border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Location
                        </label>
                      </div>
                      <p className="text-sm text-white">
                        {reservation.eventId.location}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                User Information
              </h2>
              <div className="bg-[#0B0F1A] rounded-xl p-4 border border-white/5">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Email Address
                </label>
                <p className="text-lg text-white font-medium">
                  {typeof reservation.userId === 'object'
                    ? reservation.userId.email
                    : reservation.userId}
                </p>
                {typeof reservation.userId === 'object' &&
                  reservation.userId.fullName && (
                    <>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mt-4 mb-2">
                        Full Name
                      </label>
                      <p className="text-white">
                        {reservation.userId.fullName}
                      </p>
                    </>
                  )}
              </div>
            </div>
          </div>

          {/* Action Buttons for Pending */}
          {reservation.status === 'pending' && (
            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Actions</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleStatusChange('confirmed')}
                  disabled={updating}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white
                           bg-green-600 hover:bg-green-500
                           transition-all duration-200
                           active:scale-[0.98]
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    {updating ? 'Processing...' : 'Confirm Reservation'}
                  </span>
                </button>
                <button
                  onClick={() => handleStatusChange('refused')}
                  disabled={updating}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white
                           bg-red-600 hover:bg-red-500
                           transition-all duration-200
                           active:scale-[0.98]
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    {updating ? 'Processing...' : 'Refuse Reservation'}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
              Reservation Status
            </h3>
            <div className="flex justify-center">
              {getStatusBadge(reservation.status)}
            </div>
          </div>

          {/* Timeline Card */}
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
              Timeline
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-cyan-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Created
                  </p>
                  <p className="text-sm text-white">
                    {reservation.createdAt
                      ? new Date(reservation.createdAt).toLocaleString()
                      : 'N/A'}
                  </p>
                </div>
              </div>
              {reservation.updatedAt && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Last Updated
                    </p>
                    <p className="text-sm text-white">
                      {new Date(reservation.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Reservation ID Card */}
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
              Reservation ID
            </h3>
            <div className="bg-[#0B0F1A] rounded-lg p-3 border border-white/5">
              <p className="text-xs text-gray-300 font-mono break-all">
                {reservation._id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
