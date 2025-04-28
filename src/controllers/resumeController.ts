import { Request, Response } from 'express';
import status from 'http-status';
import { resumeService } from '../services/resumeService';

export const uploadResume = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            res.status(status.BAD_REQUEST).json({ error: 'No file uploaded' });
            return;
        }
        const mimetype = req.body.mimeType;

        const resumePublicUrl = await resumeService.uploadResume({ ...req.file, mimetype });

        res.status(status.OK).json(resumePublicUrl);
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send(error);
    }
};

export const getResume = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            res.status(status.BAD_REQUEST).json({ error: 'No file name provided' });
            return;
        }

        const { fileBuffer, mimeType } = await resumeService.getResume(userId?.toString());

        if (!mimeType) {
            res.status(status.INTERNAL_SERVER_ERROR).json({ error: 'MIME type not found' });
            return;
        }
        res.set('Content-Type', mimeType);
        res.status(status.OK).send(fileBuffer);
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send(error);
    }
};
