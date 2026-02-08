import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { authUtils } from './auth-utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const httpClient: AxiosInstance = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: { 'Content-Type': 'application/json' },
});

httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window === 'undefined') return config;

    const token = authUtils.getToken();

    if (token) {
      if (authUtils.isTokenExpired(token)) {
        authUtils.removeToken();
        window.location.href = '/auth/login';
        return Promise.reject(new Error('Token expired'));
      }
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      const isPublicRoute = error.config?.url?.includes('/events/published');

      if (!isPublicRoute) {
        authUtils.removeToken();
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  },
);

export default httpClient;
