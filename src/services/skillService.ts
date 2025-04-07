import prisma from '../prisma';
import { User } from '../types/user';

class SkillService {
  private static instance: SkillService;
  private constructor() {}

  public static getInstance(): SkillService {
    if (!SkillService.instance) {
      SkillService.instance = new SkillService();
    }
    return SkillService.instance;
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

  getAllSkills = async () => {
    try {
      const skills = await prisma.skill.findMany({
        where: {
          isDeleted: false,
        },
      });
      return skills;
    } catch (error) {
      console.error('Error getting all skills:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  };
}

export const skillService = SkillService.getInstance();
