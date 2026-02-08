export enum Status {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  CANCELED = 'canceled',
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  capacity: number;
  status: Status;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateEventDto {
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  status: Status;
  image?: string | null;
}
export interface UpdateEventDto {
  title?: string;
  description?: string;
  date?: string;
  location?: string;
  capacity?: number;
  status?: Status;
  image?: string;
}

export interface FilterEventsDto {
  status?: Status;
  dateForm?: string;
  dateTo?: string;
}
