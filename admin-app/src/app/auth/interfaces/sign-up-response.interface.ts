import { Role } from "../../interfaces";

export interface SignUpResponse {
  token: string;
  user: UserResponse;
}

export interface UserResponse {
  name: string;
  email: string;
  img: string;
  role: string | Role;
  google: boolean;
  isActive: boolean;
  _id: string;
}
