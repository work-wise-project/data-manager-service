import prisma from '../prisma';
import { Storage } from '@google-cloud/storage';
const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS || './path-to-your-service-account.json';
const bucketName = process.env.GOOGLE_STORAGE_BUCKET || './sssssssssssss';

export const storage = new Storage({ keyFilename });

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
            const blob = storage.bucket(bucketName).file(file.originalname);
            const blobStream = blob.createWriteStream({
                resumable: false,
                contentType: file.mimetype,
            });

            return new Promise((resolve, reject) => {
                blobStream.on('error', (err) => {
                    console.error('Upload error:', err);
                    reject(err);
                });

                blobStream.on('finish', () => {
                    const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
                    resolve(publicUrl);
                });

                blobStream.end(file.buffer);
            });
        } catch (error) {
            console.error('Error uploading resume:', error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    };
}

export const resumeService = ResumeService.getInstance();
