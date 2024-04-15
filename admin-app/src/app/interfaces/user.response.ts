import { User } from '../models';
import { Role } from './role.interface';

export interface UserPaginationResponse {
  users:       User[];
  totalUsers:  number;
  previusPage: null;
  currentPage: string;
  nextPage:    string;
  limit:       number;
  skip:        number;
}
