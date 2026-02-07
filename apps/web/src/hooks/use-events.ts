'use client';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setEvents,
  setSelectedEvent,
  addEvent,
  updateEvent as updateEventAction,
  removeEvent,
  setLoading,
  setError,
} from '@/store/slices/events.slice';
import eventsService from '@/services/api/events.service';
import {
  CreateEventDto,
  UpdateEventDto,
  FilterEventsDto,
} from '@/types/event.types';

export const useEvents = () => {
  const dispatch = useAppDispatch();
  const { events, selectedEvent, loading, error } = useAppSelector(
    (state) => state.events,
  );

  const fetchEvents = async (filters?: FilterEventsDto) => {
    dispatch(setLoading(true));
    try {
      const data = await eventsService.findAll(filters);
      dispatch(setEvents(data));
    } catch (err: unknown) {
      dispatch(
        setError(err instanceof Error ? err.message : 'An error occurred'),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchPublishedEvents = async (filters?: FilterEventsDto) => {
    dispatch(setLoading(true));
    try {
      const data = await eventsService.findPublished(filters);
      dispatch(setEvents(data));
    } catch (err: unknown) {
      dispatch(
        setError(err instanceof Error ? err.message : 'An error occurred'),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchEvent = async (id: string) => {
    dispatch(setLoading(true));
    try {
      const data = await eventsService.findOne(id);
      dispatch(setSelectedEvent(data));
      return data;
    } catch (err: unknown) {
      dispatch(
        setError(err instanceof Error ? err.message : 'An error occurred'),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const createEvent = async (eventData: CreateEventDto, image?: File) => {
    const data = await eventsService.create(eventData, image);
    dispatch(addEvent(data));
    return data;
  };

  const updateEvent = async (
    id: string,
    eventData: UpdateEventDto,
    image?: File,
  ) => {
    const data = await eventsService.update(id, eventData, image);
    dispatch(updateEventAction(data));
    return data;
  };

  const publishEvent = async (id: string) => {
    const data = await eventsService.publish(id);
    dispatch(updateEventAction(data));
    return data;
  };

  const cancelEvent = async (id: string) => {
    const data = await eventsService.cancel(id);
    dispatch(updateEventAction(data));
    return data;
  };

  const deleteEvent = async (id: string) => {
    await eventsService.remove(id);
    dispatch(removeEvent(id));
  };

  return {
    events,
    selectedEvent,
    loading,
    error,
    fetchEvents,
    fetchPublishedEvents,
    fetchEvent,
    createEvent,
    updateEvent,
    publishEvent,
    cancelEvent,
    deleteEvent,
  };
};
