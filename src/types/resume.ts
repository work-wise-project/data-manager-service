import { User } from './user';

export interface Resume {
  userId: string;
  user: User;
  file: string;
  analysis?: string;
  spellCheck?: string;
}
