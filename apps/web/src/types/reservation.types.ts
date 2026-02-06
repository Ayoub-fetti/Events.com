export enum StatusReservation {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  REFUSED = 'refused',
  CANCELED = 'canceled',
}

export interface Reservation {
  _id: string;
  eventId: string;
  userId: string;
  status: StatusReservation;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateReservationDto {
  eventId: string;
  userId: string;
}
