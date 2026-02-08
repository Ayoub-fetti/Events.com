import * as yup from 'yup';
import { Role } from '@/types/user.types';
import { Status } from '@/types/event.types';

export const loginSchema = yup.object({
  email: yup.string().email('Email invalide').required('Email requis'),
  password: yup
    .string()
    .min(6, 'Minimum 6 caractères')
    .required('Mot de passe requis'),
});

export const registerSchema = yup.object({
  fullName: yup
    .string()
    .min(3, 'Minimum 3 caractères')
    .required('Nom complet requis'),
  email: yup.string().email('Email invalide').required('Email requis'),
  password: yup
    .string()
    .min(6, 'Minimum 6 caractères')
    .required('Mot de passe requis'),
});

export const eventSchema = yup.object({
  title: yup.string().min(3, 'Minimum 3 caractères').required('Titre requis'),
  description: yup
    .string()
    .min(10, 'Minimum 10 caractères')
    .required('Description requise'),
  location: yup.string().required('Lieu requis'),
  date: yup.string().required('Date requise'),
  capacity: yup.number().min(1, 'Minimum 1').required('Capacité requise'),
  status: yup
    .mixed<Status>()
    .oneOf(Object.values(Status))
    .required('Statut requis'),
  image: yup.string().url('URL invalide').optional(),
});

export const userSchema = yup.object({
  fullName: yup
    .string()
    .min(3, 'Minimum 3 caractères')
    .required('Nom complet requis'),
  email: yup.string().email('Email invalide').required('Email requis'),
  password: yup.string().min(6, 'Minimum 6 caractères').optional(),
  role: yup.mixed<Role>().oneOf(Object.values(Role)).optional(),
  isActive: yup.boolean().optional(),
});

export const reservationSchema = yup.object({
  eventId: yup.string().required('Événement requis'),
});
