'use client';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setUsers,
  updateUser as updateUserAction,
  setLoading,
  setError,
  removeUser,
} from '@/store/slices/users.slice';
import usersService from '@/services/api/users.service';
import { UpdateUserDto } from '@/types/user.types';

export const useUsers = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);

  const fetchUsers = async () => {
    dispatch(setLoading(true));
    try {
      const data = await usersService.findAll();
      dispatch(setUsers(data));
    } catch (err: unknown) {
      dispatch(
        setError(err instanceof Error ? err.message : 'An error occurred'),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchUser = async (id: string) => {
    return await usersService.findOne(id);
  };

  const updateUser = async (id: string, userData: UpdateUserDto) => {
    const data = await usersService.update(id, userData);
    dispatch(updateUserAction(data));
    return data;
  };

  const deleteUser = async (id: string) => {
    await usersService.remove(id);
    dispatch(removeUser(id));
  };

  return {
    users,
    loading,
    error,
    fetchUsers,
    fetchUser,
    updateUser,
    deleteUser,
  };
};
