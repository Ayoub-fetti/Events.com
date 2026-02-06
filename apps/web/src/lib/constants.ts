import { Role } from '@/types/user.types';
import { Status } from '@/types/event.types';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
  },
  EVENTS: {
    BASE: '/events',
    BY_ID: (id: string) => `/events/${id}`,
  },
  RESERVATIONS: {
    BASE: '/reservations',
    BY_ID: (id: string) => `/reservations/${id}`,
    BY_EVENT: (eventId: string) => `/reservations/event/${eventId}`,
  },
  USERS: {
    BASE: '/users',
    BY_ID: (id: string) => `/users/${id}`,
  },
};

export const ROLES = {
  ADMIN: Role.ADMIN,
  PARTICIPANT: Role.PARTICIPANT,
} as const;

export const EVENT_STATUS = {
  DRAFT: Status.DRAFT,
  PUBLISHED: Status.PUBLISHED,
  CANCELED: Status.CANCELED,
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    EVENTS: '/admin/events',
    RESERVATIONS: '/admin/reservations',
    USERS: '/admin/users',
  },
  PARTICIPANT: {
    DASHBOARD: '/participant/dashboard',
    EVENTS: '/participant/events',
    RESERVATIONS: '/participant/reservations',
  },
};
