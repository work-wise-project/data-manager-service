import { User } from './user';

export interface UserEducation {
  id: number;
  userId: string;
  user: User;
  institute: string;
  years: number;
}
