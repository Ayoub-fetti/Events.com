import httpClient from '../utils/http-client';
import { Reservation, CreateReservationDto } from '@/types/reservation.types';

class ReservationsService {
  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const { data } = await httpClient.post('/reservations', {
      eventId: createReservationDto.eventId,
    });
    return data;
  }

  async findAll(): Promise<Reservation[]> {
    const { data } = await httpClient.get('/reservations');
    return data;
  }

  async getMyReservations(): Promise<Reservation[]> {
    const { data } = await httpClient.get('/reservations/my-reservations');
    return data;
  }

  async cancel(id: string): Promise<Reservation> {
    const { data } = await httpClient.patch(`/reservations/${id}/cancel`);
    return data;
  }

  async downloadTicket(id: string): Promise<Blob> {
    const { data } = await httpClient.get(`/reservations/${id}/ticket`, {
      responseType: 'blob',
    });
    return data;
  }

  async findByEvent(eventId: string): Promise<Reservation[]> {
    const { data } = await httpClient.get(`/reservations/event/${eventId}`);
    return data;
  }

  async updateStatus(id: string, status: string): Promise<Reservation> {
    const { data } = await httpClient.patch(`/reservations/${id}/status`, {
      status,
    });
    return data;
  }
}

const reservationsService = new ReservationsService();
export default reservationsService;
