import { Resume } from './resume';
import { UserEducation } from './userEducation';
import { UserCareer } from './userCareer';

export interface User {
  id: string;
  email: string;
  name: string;
  Resume?: Resume;
  Education: UserEducation[];
  Career: UserCareer[];
}
