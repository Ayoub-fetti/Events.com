import httpClient from '../utils/http-client';

export class BaseService<T> {
  constructor(protected endpoint: string) {}

  async getAll(): Promise<T[]> {
    const { data } = await httpClient.get(this.endpoint);
    return data;
  }

  async getById(id: string | number): Promise<T> {
    const { data } = await httpClient.get(`${this.endpoint}/${id}`);
    return data;
  }

  async create(payload: Partial<T>): Promise<T> {
    const { data } = await httpClient.post(this.endpoint, payload);
    return data;
  }

  async update(id: string | number, payload: Partial<T>): Promise<T> {
    const { data } = await httpClient.put(`${this.endpoint}/${id}`, payload);
    return data;
  }

  async delete(id: string | number): Promise<void> {
    await httpClient.delete(`${this.endpoint}/${id}`);
  }
}
