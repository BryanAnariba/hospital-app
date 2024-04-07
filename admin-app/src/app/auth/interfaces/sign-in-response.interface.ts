import { User } from '../../interfaces/user.interface';

export interface SignInResponse {
  token: string;
  user: User;
}
