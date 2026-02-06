import { User } from './user.types';

export interface LoginCredentials {
  email: string;
  password: string;
}
export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}
export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  exp?: number;
  iat?: number; // for timestamp
}
