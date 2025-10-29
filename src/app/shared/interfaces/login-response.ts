import { User } from './user';
export interface LoginResponse {
  success: boolean;
  access_token?: string; // si tu backend usa JWT
  user?: User; // datos del usuario desde el backend
}

export interface SignUpResponse {
  success: boolean;
  access_token?: string;
  user?: User;
}