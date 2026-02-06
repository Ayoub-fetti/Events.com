import httpClient from '../utils/http-client';
import {
  Event,
  CreateEventDto,
  UpdateEventDto,
  FilterEventsDto,
} from '@/types/event.types';

class EventsService {
  async findAll(filters?: FilterEventsDto): Promise<Event[]> {
    const { data } = await httpClient.get('/events', { params: filters });
    return data;
  }

  async findOne(id: string): Promise<Event> {
    const { data } = await httpClient.get(`/events/${id}`);
    return data;
  }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const { data } = await httpClient.post('/events', createEventDto);
    return data;
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const { data } = await httpClient.put(`/events/${id}`, updateEventDto);
    return data;
  }

  async publish(id: string): Promise<Event> {
    const { data } = await httpClient.patch(`/events/${id}/publish`);
    return data;
  }

  async cancel(id: string): Promise<Event> {
    const { data } = await httpClient.patch(`/events/${id}/cancel`);
    return data;
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`/events/${id}`);
  }

  async findPublished(filters?: FilterEventsDto): Promise<Event[]> {
    const { data } = await httpClient.get('/events/published', {
      params: filters,
    });
    return data;
  }
}
const eventsService = new EventsService();
export default eventsService;
