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

export const createResumeAnalysis = async (req: Request, res: Response) => {
    try {
        const { userId, analysis } = req.body;

        if (!userId || !analysis) {
            res.status(status.BAD_REQUEST).json({ error: 'Missing required fields' });
            return;
        }

        const result = await resumeService.createResumeAnalysis(userId, analysis);
        res.status(status.OK).json(result);
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send(error);
    }
};

export const createResumeSpellCheck = async (req: Request, res: Response) => {
    try {
        const { userId, spellCheck } = req.body;

        if (!userId || !spellCheck) {
            res.status(status.BAD_REQUEST).json({ error: 'Missing required fields' });
            return;
        }

        const result = await resumeService.createResumeSpellCheck(userId, spellCheck);
        res.status(status.OK).json(result);
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send(error);
    }
};

export const getResumeAnalysis = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            res.status(status.BAD_REQUEST).json({ error: 'No user ID provided' });
            return;
        }

        const result = await resumeService.getResumeAnalysis(userId);
        res.status(status.OK).json(result);
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send(error);
    }
};

export const getResumeSpellCheck = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            res.status(status.BAD_REQUEST).json({ error: 'No user ID provided' });
            return;
        }

        const result = await resumeService.getResumeSpellCheck(userId);
        res.status(status.OK).json(result);
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send(error);
    }
};
