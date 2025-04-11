import prisma from '../prisma';
import { UserBody } from '../types';

class UserService {
    private static instance: UserService;
    private constructor() {}

    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    // async addSkillToUser(userId: string, skillName: string) {
    //   const skill = await prisma.skill.findUnique({
    //     where: {
    //       name: skillName,
    //     },
    //   });

    //   if (!skill) {
    //     throw new Error('Skill not found');
    //   }

    //   return await prisma.user.update({
    //     where: { id: userId },
    //     data: {
    //       skills: {
    //         connect: { id: skill.id },
    //       },
    //     },
    //   });
    // }

    // async removeSkillFromUser(userId: string, skillName: string) {
    //   // Find the skill by name
    //   const skill = await prisma.skill.findUnique({
    //     where: {
    //       name: skillName,
    //     },
    //   });

    //   if (!skill) {
    //     throw new Error('Skill not found');
    //   }

    //   // Remove the skill from the user's profile
    //   return await prisma.user.update({
    //     where: { id: userId },
    //     data: {
    //       skills: {
    //         disconnect: { id: skill.id },
    //       },
    //     },
    //   });
    // }

    // async createUserWithSkill(userId: string, skillName: string) {
    //   // Find the skill by name
    //   const skill = await prisma.skill.findUnique({
    //     where: {
    //       name: skillName,
    //     },
    //   });

    //   if (!skill) {
    //     throw new Error('Skill not found');
    //   }

    //   // Remove the skill from the user's profile
    //   return await prisma.user.update({
    //     where: { id: userId },
    //     data: {
    //       skills: {
    //         disconnect: { id: skill.id },
    //       },
    //     },
    //   });
    // }

    async getUserByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }

    async getUserById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        return user;
    }

    async createUser({ career, education, resume, ...user }: UserBody) {
        const createdUser = await prisma.user.create({
            data: {
                ...user,
                resume: resume ? { create: resume } : undefined,
                user_education: education ? { createMany: { data: education } } : undefined,
                user_career: career ? { createMany: { data: career } } : undefined,
                refresh_tokens: [],
            },
        });

        return createdUser;
    }

    async updateUser(id: string, { career, education, resume, ...userUpdates }: UserBody) {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                ...userUpdates,
                resume: resume ? { update: resume } : undefined,
                user_education: education?.length
                    ? { update: education.map(({ id, ...education }) => ({ where: { id }, data: { ...education } })) }
                    : undefined,
                user_career: career?.length
                    ? { update: career.map(({ id, ...career }) => ({ where: { id }, data: { ...career } })) }
                    : undefined,
            },
        });

        if (!updatedUser) {
            throw new Error('User update failed');
        }

        return updatedUser;
    }
}

export const userService = UserService.getInstance();
