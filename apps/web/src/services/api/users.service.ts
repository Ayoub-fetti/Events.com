import httpClient from '../utils/http-client';
import { User, UpdateUserDto } from '@/types/user.types';

class UsersService {
  async findAll(): Promise<User[]> {
    const { data } = await httpClient.get('/users');
    return data;
  }

  async findOne(id: string): Promise<User> {
    const { data } = await httpClient.get(`/users/${id}`);
    return data;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { data } = await httpClient.put(`/users/${id}`, updateUserDto);
    return data;
  }

  async remove(id: string): Promise<void> {
    await httpClient.delete(`/users/${id}`);
  }
}

const userService = new UsersService();
export default userService;
