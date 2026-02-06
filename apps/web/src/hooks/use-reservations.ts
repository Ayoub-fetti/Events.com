'use client';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setReservations,
  addReservation,
  updateReservation as updateReservationAction,
  removeReservation,
  setLoading,
  setError,
} from '@/store/slices/reservations.slice';
import reservationsService from '@/services/api/reservations.service';
import { CreateReservationDto } from '@/types/reservation.types';

export const useReservations = () => {
  const dispatch = useAppDispatch();
  const { reservations, loading, error } = useAppSelector(
    (state) => state.reservations,
  );

  const fetchMyReservations = async () => {
    dispatch(setLoading(true));
    try {
      const data = await reservationsService.getMyReservations();
      dispatch(setReservations(data));
    } catch (err: unknown) {
      dispatch(
        setError(err instanceof Error ? err.message : 'An error occurred'),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchEventReservations = async (eventId: string) => {
    dispatch(setLoading(true));
    try {
      const data = await reservationsService.findByEvent(eventId);
      dispatch(setReservations(data));
    } catch (err: unknown) {
      dispatch(
        setError(err instanceof Error ? err.message : 'An error occurred'),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const createReservation = async (reservationData: CreateReservationDto) => {
    const data = await reservationsService.create(reservationData);
    dispatch(addReservation(data));
    return data;
  };

  const cancelReservation = async (id: string) => {
    const data = await reservationsService.cancel(id);
    dispatch(updateReservationAction(data));
    return data;
  };

  const updateReservationStatus = async (id: string, status: string) => {
    const data = await reservationsService.updateStatus(id, status);
    dispatch(updateReservationAction(data));
    return data;
  };

  const downloadTicket = async (id: string) => {
    return await reservationsService.downloadTicket(id);
  };

  return {
    reservations,
    loading,
    error,
    fetchMyReservations,
    fetchEventReservations,
    createReservation,
    cancelReservation,
    updateReservationStatus,
    downloadTicket,
  };
};
