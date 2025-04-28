import { resume, user, user_career, user_education, user_skill } from '@prisma/client';

export type UserBody = user & {
    resume?: resume;
    education?: user_education[];
    career?: user_career[];
    skills?: user_skill[];
};
