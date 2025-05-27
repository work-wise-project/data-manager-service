import prisma from '../prisma';

class UserEducationService {
    private static instance: UserEducationService;
    private constructor() {}

    public static getInstance(): UserEducationService {
        if (!UserEducationService.instance) {
            UserEducationService.instance = new UserEducationService();
        }
        return UserEducationService.instance;
    }

    async getEducationByUser(userId: string) {
        return await prisma.user_education.findMany({
            where: {
                user_id: userId,
            },
        });
    }
}

export const userEducationService = UserEducationService.getInstance();
