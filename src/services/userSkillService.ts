import prisma from '../prisma';

class UserSkillService {
    private static instance: UserSkillService;
    private constructor() {}

    public static getInstance(): UserSkillService {
        if (!UserSkillService.instance) {
            UserSkillService.instance = new UserSkillService();
        }
        return UserSkillService.instance;
    }

    async getSkillsByUser(userId: string) {
        return await prisma.user_skill.findMany({
            where: {
                user_id: userId,
            },
            include: {
                skill: true,
            },
        });
    }
}

export const userSkillService = UserSkillService.getInstance();
