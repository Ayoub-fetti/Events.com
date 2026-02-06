export enum Role {
  ADMIN = 'admin',
  PARTICIPANT = 'participant',
}

export interface User {
  _id: string;
  fullNmae: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
