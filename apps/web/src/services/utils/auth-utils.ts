import { JwtPayload } from '@/types/auth.types';
import { Role } from '@/types/user.types';

const TOKEN_KEY = 'token';

export const authUtils = {
  setToken: (token: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, token);
    }
  },

  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  },

  removeToken: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
    }
  },

  decodeJwt: (token: string): JwtPayload | null => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  },

  isTokenExpired: (token: string): boolean => {
    const decoded = authUtils.decodeJwt(token);
    if (!decoded?.exp) return true;
    return Date.now() >= decoded.exp * 1000;
  },

  hasRole: (requiredRole: Role | Role[]): boolean => {
    const token = authUtils.getToken();
    if (!token) return false;

    const decoded = authUtils.decodeJwt(token);
    if (!decoded?.role) return false;

    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    return roles.includes(decoded.role as Role);
  },

  isAdmin: (): boolean => {
    return authUtils.hasRole(Role.ADMIN);
  },

  isParticipant: (): boolean => {
    return authUtils.hasRole(Role.PARTICIPANT);
  },
};
