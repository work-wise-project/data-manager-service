import prisma from '../prisma';

class UserCareerService {
    private static instance: UserCareerService;
    private constructor() {}

    public static getInstance(): UserCareerService {
        if (!UserCareerService.instance) {
            UserCareerService.instance = new UserCareerService();
        }
        return UserCareerService.instance;
    }

    async getCareerByUser(userId: string) {
        return await prisma.user_career.findMany({
            where: {
                user_id: userId,
            },
        });
    }
}

export const userCareerService = UserCareerService.getInstance();
