import prisma from '../prisma';
import { ResumeSchemaType } from '../schemas';
import { UserBody } from '../types';
import { UserUpdateInput } from '../types/user';

class UserService {
    private static instance: UserService;
    private constructor() {}

    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    async getUser(identifier: { id?: string; email?: string }) {
        const { id, email } = identifier;

        if (!id && !email) {
            throw new Error('Either id or email must be provided');
        }

        const user = await prisma.user.findUnique({
            where: id ? { id } : { email: email! },
            include: {
                user_education: true,
                user_career: true,
                user_skills: {
                    include: {
                        skill: true,
                    },
                },
            },
        });

        if (!user) {
            return null;
        }

        const { user_education, user_career, user_skills, ...rest } = user;

        return {
            ...rest,
            education: user_education,
            career: user_career,
            skills: user_skills.map((s) => s.skill),
        };
    }

    async createUser({ career, education, resume, ...user }: UserBody) {
        const createdUser = await prisma.user.create({
            data: {
                ...user,
                resume: resume
                    ? {
                          create: {
                              ...resume,
                              analysis: resume.analysis === null ? undefined : resume.analysis,
                          },
                      }
                    : undefined,
                user_education: education ? { createMany: { data: education } } : undefined,
                user_career: career ? { createMany: { data: career } } : undefined,
                refresh_tokens: [],
            },
        });

        return createdUser;
    }

    async updateUser(id: string, { career, education, resume, skills, ...userUpdates }: UserUpdateInput) {
        const prismaUpdates: any = {
            name: userUpdates.name,
            email: userUpdates.email,
            refresh_tokens: userUpdates.refresh_tokens,
            resume: resume ? { update: resume } : undefined,
        };

        if (education) {
            const toCreate = education.filter((e) => !e.is_deleted);
            const toDelete = education.filter((e) => e.is_deleted);

            prismaUpdates.user_education = {
                ...(toCreate.length && {
                    create: toCreate.map((edu) => ({
                        institute: edu.institute,
                        years: edu.years,
                    })),
                }),
                ...(toDelete.length && {
                    deleteMany: toDelete.map((edu) => ({
                        institute: edu.institute,
                        years: edu.years,
                    })),
                }),
            };
        }

        if (career) {
            const toCreate = career.filter((c) => !c.is_deleted);
            const toDelete = career.filter((c) => c.is_deleted);

            prismaUpdates.user_career = {
                ...(toCreate.length && {
                    create: toCreate.map((c) => ({
                        company: c.company,
                        years: c.years,
                    })),
                }),
                ...(toDelete.length && {
                    deleteMany: toDelete.map((c) => ({
                        company: c.company,
                        years: c.years,
                    })),
                }),
            };
        }
        if (skills) {
            const toCreate = skills.filter((s) => !s.is_deleted && s.skill_id !== undefined);
            const toDelete = skills.filter((s) => s.is_deleted && s.skill_id !== undefined);

            prismaUpdates.user_skills = {
                ...(toDelete.length && {
                    deleteMany: toDelete.map((s) => ({
                        skill_id: s.skill_id,
                    })),
                }),
                ...(toCreate.length && {
                    create: toCreate.map((s) => ({
                        skill: {
                            connect: { id: s.skill_id },
                        },
                    })),
                }),
            };
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: prismaUpdates,
        });

        if (!updatedUser) {
            throw new Error('User update failed');
        }

        return updatedUser;
    }

    async updateRefreshTokensUser(userId: string, refreshTokens: string[]) {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                refresh_tokens: refreshTokens,
            },
        });

        if (!updatedUser) {
            throw new Error('Failed to update refresh tokens');
        }

        return updatedUser;
    }
}

export const userService = UserService.getInstance();
