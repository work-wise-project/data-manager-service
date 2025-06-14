import { resume, user, user_career, user_education, user_skill } from '@prisma/client';

export type UserBody = user & {
    resume?: resume;
    education?: (Omit<user_education, 'id' | 'user_id'> & { is_deleted?: boolean })[];
    career?: (Omit<user_career, 'id' | 'user_id'> & { is_deleted?: boolean })[];
    skills?: (Pick<user_skill, 'skill_id'> & { is_deleted?: boolean })[];
};

export type UserUpdateInput = {
    name?: string;
    email?: string;
    refresh_tokens?: string[];
    resume?: resume;
    education?: (Omit<user_education, 'id' | 'user_id'> & { is_deleted?: boolean })[];
    career?: (Omit<user_career, 'id' | 'user_id'> & { is_deleted?: boolean })[];
    skills?: (Pick<user_skill, 'skill_id'> & { is_deleted?: boolean })[];
};
