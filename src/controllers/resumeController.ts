import { Request, Response } from 'express';
import status from 'http-status';
import { resumeService } from '../services/resumeService';

export const uploadResume = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }
        const resume = await resumeService.uploadResume(req.file);
        res.status(status.OK).json(resume);
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send(error);
    }
};
