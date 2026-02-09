import { User } from '@/types/user.types';
import httpClient from '../utils/http-client';
import {
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from '@/types/auth.types';

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await httpClient.post('/auth/login', credentials);
    localStorage.setItem('token', data.access_token);
    return data;
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    const { data } = await httpClient.post('/auth/register', userData);
    localStorage.setItem('token', data.access_token);
    return data;
  }

  async logout(): Promise<void> {
    localStorage.removeItem('token');
  }
}

const authService = new AuthService();
export default authService;
