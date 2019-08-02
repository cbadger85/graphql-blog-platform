import { Role } from './Role';

export interface ICreateUser {
  name: string;
  username: string;
  email: string;
  password: string;
  role: Role[];
}
