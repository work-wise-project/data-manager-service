import prisma from '../prisma';
import { ResumeAnalysisSchemaType } from '../schemas';
import { getConfig } from './config';
import { getStorageClient } from './storage';

const { googleStorageResumeBucket: bucket } = getConfig();

class ResumeService {
    private static instance: ResumeService;
    private constructor() {}

    public static getInstance(): ResumeService {
        if (!ResumeService.instance) {
            ResumeService.instance = new ResumeService();
        }
        return ResumeService.instance;
    }

    uploadResume = async (file: Express.Multer.File) => {
        try {
            //delete existing resume if it exists
            await prisma.resume.deleteMany({
                where: { user_id: file.originalname },
            });
            return await getStorageClient().uploadFile(bucket, file.originalname, file.buffer, file.mimetype);
        } catch (error) {
            console.error('Error uploading resume:', error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    };

    getResume = async (
        userId: string
    ): Promise<{
        fileBuffer: Buffer;
        mimeType: string | undefined;
    }> => {
        try {
            return await getStorageClient().downloadFile(bucket, userId);
        } catch (error) {
            console.error('Error downloading resume:', error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    };

    createResumeAnalysis = async (userId: string, analysis: ResumeAnalysisSchemaType) => {
        try {
            return await prisma.resume.upsert({
                create: {
                    user_id: userId,
                    analysis,
                },
                update: {
                    analysis,
                },
                where: { user_id: userId },
            });
        } catch (error) {
            console.error('Error creating resume analysis:', error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    };

    createResumeSpellCheck = async (userId: string, spellCheck: string) => {
        try {
            return await prisma.resume.upsert({
                create: {
                    user_id: userId,
                    spell_check: spellCheck,
                },
                update: {
                    spell_check: spellCheck,
                },
                where: { user_id: userId },
            });
        } catch (error) {
            console.error('Error creating resume spell check:', error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    };

    getResumeAnalysis = async (userId: string) => {
        try {
            return await prisma.resume.findUniqueOrThrow({
                where: { user_id: userId },
                select: { analysis: true },
            });
        } catch (error) {
            console.error('Error fetching resume analysis:', error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    };

    getResumeSpellCheck = async (userId: string) => {
        try {
            return await prisma.resume.findUniqueOrThrow({
                where: { user_id: userId },
                select: { spell_check: true },
            });
        } catch (error) {
            console.error('Error fetching resume spell check:', error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    };
}

export const resumeService = ResumeService.getInstance();
