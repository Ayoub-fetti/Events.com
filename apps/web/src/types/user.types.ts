export enum Role {
  ADMIN = 'admin',
  PARTICIPANT = 'participant',
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserDto {
  fullName: string;
  email: string;
  password: string;
  role?: Role;
}
export interface UpdateUserDto {
  fullName?: string;
  email?: string;
  password?: string;
  role?: Role;
  isActive?: boolean;
}
