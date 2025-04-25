import prisma from '../prisma';
import { CreateInterviewAnalysisSchema } from '../schemas';

export const getInterviewAnalysis = async (interviewId: string) =>
    await prisma.interview_analysis.findFirst({ where: { interview_id: interviewId } });

export const createInterviewAnalysis = async (analysis: CreateInterviewAnalysisSchema) =>
    await prisma.interview_analysis.upsert({
        create: analysis,
        update: analysis,
        where: { interview_id: analysis.interview_id },
    });
