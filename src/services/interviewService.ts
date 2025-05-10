import prisma from '../prisma';
import { interview } from '@prisma/client';
import { CreateInterviewPreparationSchema } from '../schemas';

class InterviewService {
    private static instance: InterviewService;
    private constructor() {}

    public static getInstance(): InterviewService {
        if (!InterviewService.instance) {
            InterviewService.instance = new InterviewService();
        }
        return InterviewService.instance;
    }

    async createInterview(data: Omit<interview, 'id'>) {
        const createdInterview = await prisma.interview.create({ data });

        return createdInterview;
    }

    async deleteInterview(id: string, userId?: string) {
        await prisma.interview_analysis.deleteMany({
            where: {
                interview_id: id,
            },
        });

        const deletedInterview = await prisma.interview.delete({
            where: { id, user_id: userId },
        });

        return deletedInterview;
    }

    async getInterviewsByUserId(userId: string) {
        const interviews = await prisma.interview.findMany({
            where: { user_id: userId },
        });

        return interviews;
    }

    async getInterviewsGroupedByDate(userId: string) {
        const result = await prisma.$queryRaw<{ records: any[]; day: string }[]>`
            SELECT 
            json_agg(i) AS records, 
                TO_CHAR(DATE(date), 'DD/MM/YYYY') AS day
            FROM interview i
            WHERE i.user = CAST(${userId} AS uuid)
            GROUP BY DATE(date)
            ORDER BY day;
            `;

        const groupedByDay = result.reduce((acc: Record<string, any[]>, curr) => {
            const { day, records } = curr;
            acc[day] = records;
            return acc;
        }, {} as Record<string, any[]>);

        return groupedByDay;
    }

    async getInterviewPreparationByInterviewId(interviewId: string) {
        try {
            const interviewPreparation = await prisma.interview_preparation.findFirst({
                where: { interview_id: interviewId },
            });
            return interviewPreparation;
        } catch (error) {
            console.error('Error fetching interview preparation:', error);
            throw error;
        }
    }

    async createInterviewPreparation(preparation: CreateInterviewPreparationSchema) {
        const interviewPreparation = await prisma.interview_preparation.upsert({
            create: preparation,
            update: preparation,
            where: { interview_id: preparation.interview_id },
        });

        return interviewPreparation;
    }
}

export const interviewService = InterviewService.getInstance();
