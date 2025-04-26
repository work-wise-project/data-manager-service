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
            await getStorageClient().uploadFile(file.originalname, file.buffer);
        } catch (error) {
            console.error('Error uploading resume:', error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    };
}

export const resumeService = ResumeService.getInstance();
