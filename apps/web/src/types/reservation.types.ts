import { Event } from './event.types';
export enum StatusReservation {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  REFUSED = 'refused',
  CANCELED = 'canceled',
}

export interface Reservation {
  _id: string;
  eventId: string | Event;
  userId: string | { _id: string; name: string; email: string };
  status: StatusReservation;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateReservationDto {
  eventId: string;
  userId: string;
}
