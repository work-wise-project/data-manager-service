import prisma from '../prisma';
import { getStorageClient } from './storage';

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
            return await getStorageClient().uploadFile(file.originalname, file.buffer, file.mimetype);
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
            return await getStorageClient().downloadFile(userId);
        } catch (error) {
            console.error('Error downloading resume:', error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    };
}

export const resumeService = ResumeService.getInstance();
