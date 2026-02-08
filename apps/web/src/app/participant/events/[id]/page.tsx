'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useEvents } from '@/hooks/use-events';
import { useReservations } from '@/hooks/use-reservations';
import httpClient from '@/services/utils/http-client';
import { toast } from 'react-toastify';

export default function EventDetail() {
  const params = useParams();
  const router = useRouter();
  const { fetchEvent, selectedEvent, loading } = useEvents();
  const { reservations, fetchMyReservations, createReservation } =
    useReservations();
  const [reservedCount, setReservedCount] = useState(0);
  const [isReserving, setIsReserving] = useState(false);

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
  const availableSpots = selectedEvent
    ? selectedEvent.capacity - reservedCount
    : 0;
  const capacityPercentage = selectedEvent
    ? (reservedCount / selectedEvent.capacity) * 100
    : 0;

  const handleReserve = async () => {
    try {
      setIsReserving(true);
      await createReservation({ eventId: params.id as string });
      fetchMyReservations();
      loadReservedCount();
      toast.success('Reservation created successfully!');
      setTimeout(() => router.push('/participant/reservations'), 1000);
    } catch (err: any) {
      console.error('Error message:', err);
      toast.error('Error happened');
    } finally {
      setIsReserving(false);
    }
  };

  if (loading || !selectedEvent) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400">Loading event details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header with Back Button */}
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
          <h1 className="text-3xl font-bold text-white mb-1">Event Details</h1>
          <p className="text-gray-400">
            View event information and make a reservation
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Event Details - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event Image */}
          <div className="bg-[#111827] border border-white/10 rounded-2xl overflow-hidden">
            {selectedEvent.image ? (
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${selectedEvent.image}`}
                alt={selectedEvent.title}
                className="w-full h-80 object-cover"
              />
            ) : (
              <div className="w-full h-80 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-cyan-400/30"
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
              </div>
            )}
          </div>

          {/* Event Information */}
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                {selectedEvent.title}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>

            {/* Event Details Grid */}
            <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-white/10">
              <div className="bg-[#0B0F1A] rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
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
                  </div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Date & Time
                  </span>
                </div>
                <p className="text-white font-medium">
                  {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(selectedEvent.date).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>

              <div className="bg-[#0B0F1A] rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Location
                  </span>
                </div>
                <p className="text-white font-medium">
                  {selectedEvent.location}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reservation Card - Right Column */}
        <div className="space-y-6">
          {/* Capacity Card */}
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">Event Capacity</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Reserved</span>
                <span className="text-white font-semibold">
                  {reservedCount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Available</span>
                <span
                  className={`font-semibold ${availableSpots > 0 ? 'text-green-400' : 'text-red-400'}`}
                >
                  {availableSpots}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Total Capacity</span>
                <span className="text-white font-semibold">
                  {selectedEvent.capacity}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 uppercase tracking-wide">
                  Capacity
                </span>
                <span className="text-xs font-medium text-gray-300">
                  {Math.round(capacityPercentage)}%
                </span>
              </div>
              <div className="w-full bg-[#0B0F1A] rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    capacityPercentage >= 90
                      ? 'bg-red-500'
                      : capacityPercentage >= 70
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                  }`}
                  style={{ width: `${capacityPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Reservation Action Card */}
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Make a Reservation
            </h3>

            {hasReservation ? (
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-green-400"
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
                  </div>
                  <div>
                    <p className="text-green-400 font-semibold mb-1">
                      Already Reserved
                    </p>
                    <p className="text-sm text-green-400/80">
                      You have a reservation for this event
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => router.push('/participant/reservations')}
                  className="w-full mt-4 py-3 rounded-xl font-medium text-green-400
                           bg-green-500/10 border border-green-500/20
                           hover:bg-green-500/20
                           transition-all duration-200"
                >
                  View My Reservations
                </button>
              </div>
            ) : isFull ? (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-red-400"
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
                    <p className="text-red-400 font-semibold mb-1">
                      Event Full
                    </p>
                    <p className="text-sm text-red-400/80">
                      This event has reached maximum capacity
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-[#0B0F1A] rounded-xl p-4 border border-white/5">
                  <p className="text-sm text-gray-400 mb-2">
                    You are about to reserve a spot at:
                  </p>
                  <p className="text-white font-medium">
                    {selectedEvent.title}
                  </p>
                </div>
                <button
                  onClick={handleReserve}
                  disabled={isReserving}
                  className="w-full py-3.5 rounded-xl font-semibold text-white
                           bg-gradient-to-r from-cyan-500 to-blue-600
                           hover:from-cyan-400 hover:to-blue-500
                           shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40
                           transition-all duration-200
                           active:scale-[0.98]
                           disabled:opacity-50 disabled:cursor-not-allowed
                           flex items-center justify-center gap-2"
                >
                  {isReserving ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Reserve My Spot</span>
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-500 text-center">
                  Your reservation will be subject to admin approval
                </p>
              </div>
            )}
          </div>

          {/* Event Status Card */}
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
              Event Status
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-white font-medium">Active & Open</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
