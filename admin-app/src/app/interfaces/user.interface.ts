import { Role } from './role.interface';

export interface User {
  _id: string;
  name: string;
  email: string;
  img: string;
  role: Role;
  google: boolean;
  isActive: boolean;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
