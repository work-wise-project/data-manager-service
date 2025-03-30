import { User } from './user';

export interface UserCareer {
  id: number;
  userId: string;
  user: User;
  company: string;
  years: number;
}
