import prisma from '../prisma';
import { CreateInterviewAnalysisSchema } from '../schemas';
import { getConfig } from './config';
import { getStorageClient } from './storage';

const { googleStorageAudioBucket: bucket } = getConfig();

export const getInterviewAnalysis = async (interviewId: string) =>
    await prisma.interview_analysis.findFirst({ where: { interview_id: interviewId } });

export const createInterviewAnalysis = async (analysis: CreateInterviewAnalysisSchema) =>
    await prisma.interview_analysis.upsert({
        create: analysis,
        update: analysis,
        where: { interview_id: analysis.interview_id },
    });

export const getInterviewAudioFile = async (interviewId: string) => {
    try {
        return await getStorageClient().downloadFile(bucket, `${interviewId}.wav`);
    } catch (error) {
        console.error('Error downloading audio:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};

export const getInterviewAnalysisContext = async (interviewId: string, userId: string) => {
    const interview = await prisma.interview.findFirst({ where: { id: interviewId, user_id: userId } });
    if (!interview) {
        throw new Error('Interview not found or does not belong to the user');
    }

    const history = await prisma.interview_analysis.findMany({
        where: { interview_id: { not: interviewId }, interview: { user_id: userId, date: { lte: interview.date } } },
        select: { analysis: true },
        orderBy: { interview: { date: 'desc' } },
        take: 3,
    });
    const skills = await prisma.user_skill.findMany({
        where: { user_id: userId },
        select: { skill: { select: { name: true } } },
    });

    return { history, skills: skills.map(({ skill: { name } }) => name) };
};
