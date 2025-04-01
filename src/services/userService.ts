import prisma from '../prisma';
import { User } from '../types/user';

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

  async createUser(user: User) {
    const createdUser = await prisma.user.create({
      data: {
        ...user,
        Resume: user.Resume
          ? {
              create: user.Resume,
            }
          : undefined,
        Education: user.Education
          ? {
              create: user.Education,
            }
          : undefined,
        Career: user.Career
          ? {
              create: user.Career,
            }
          : undefined,
        refreshToken: user.refreshToken ? user.refreshToken : undefined,
      },
    });

    return createdUser;
  }

  async updateUser(id: string, userUpdates: User) {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...userUpdates,
        Resume: userUpdates.Resume
          ? {
              update: userUpdates.Resume,
            }
          : undefined,
        Education: userUpdates.Education?.length
          ? {
              update: userUpdates.Education.map((edu) => ({
                where: { id: edu.id },
                data: { ...edu },
              })),
            }
          : undefined,
        Career: userUpdates.Career?.length
          ? {
              update: userUpdates.Career.map((career) => ({
                where: { id: career.id },
                data: { ...career },
              })),
            }
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
