'use client';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setCredentials,
  logout as logoutAction,
  setLoading,
} from '@/store/slices/auth.slice';
import authService from '@/services/api/auth.service';
import { LoginCredentials, RegisterData } from '@/types/auth.types';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated, loading } = useAppSelector(
    (state) => state.auth,
  );

  const login = async (credentials: LoginCredentials) => {
    dispatch(setLoading(true));
    try {
      const response = await authService.login(credentials);
      dispatch(
        setCredentials({ user: response.user, token: response.access_token }),
      );
      return response;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const register = async (userData: RegisterData) => {
    dispatch(setLoading(true));
    try {
      const response = await authService.register(userData);
      dispatch(
        setCredentials({ user: response.user, token: response.access_token }),
      );
      return response;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logout = async () => {
    await authService.logout();
    dispatch(logoutAction());
  };

  const getProfile = async () => {
    const profile = await authService.getProfile();
    if (token) dispatch(setCredentials({ user: profile, token }));
    return profile;
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    getProfile,
  };
};
