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

  async create(createEventDto: CreateEventDto, image?: File): Promise<Event> {
    const formData = new FormData();
    Object.entries(createEventDto).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    if (image) formData.append('image', image);
    const { data } = await httpClient.post('/events', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  }

  async update(
    id: string,
    updateEventDto: UpdateEventDto,
    image?: File,
  ): Promise<Event> {
    const formData = new FormData();
    Object.entries(updateEventDto).forEach(([key, value]) => {
      if (value !== undefined) formData.append(key, value.toString());
    });
    if (image) formData.append('image', image);
    const { data } = await httpClient.put(`/events/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
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
