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
