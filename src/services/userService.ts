import prisma from '../prisma';

class UserService {
  private static instance: UserService;
  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async addSkillToUser(userId: string, skillName: string) {
    const skill = await prisma.skill.findUnique({
      where: {
        name: skillName,
      },
    });

    if (!skill) {
      throw new Error('Skill not found');
    }

    return await prisma.user.update({
      where: { id: userId },
      data: {
        skills: {
          connect: { id: skill.id },
        },
      },
    });
  }

  async removeSkillFromUser(userId: string, skillName: string) {
    // Find the skill by name
    const skill = await prisma.skill.findUnique({
      where: {
        name: skillName,
      },
    });

    if (!skill) {
      throw new Error('Skill not found');
    }

    // Remove the skill from the user's profile
    return await prisma.user.update({
      where: { id: userId },
      data: {
        skills: {
          disconnect: { id: skill.id },
        },
      },
    });
  }
}

export const userService = UserService.getInstance();
