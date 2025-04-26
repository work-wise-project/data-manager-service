import { Request, Response } from 'express';
import status from 'http-status';
import { interviewService } from '../services/interviewService';

export const createInterview = async (req: Request, res: Response) => {
    try {
        console.log('Creating interview...');
        const { userId, date, jobLink, title, payload } = req.body;
        const user_id = payload?.userId || userId;
        if (!user_id || !date || !jobLink || !title) {
            res.status(status.BAD_REQUEST).send({ message: 'Missing required fields' });
            return;
        }
        const interview = await interviewService.createInterview({
            user_id,
            date,
            job_link: jobLink,
            title,
        });
        res.status(status.OK).json(interview);
    } catch (error) {
        console.log('Error creating interview:', error);
        res.status(status.BAD_REQUEST).send(error);
    }
};

export const deleteInterview = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { payload } = req.body;
        const userId = payload?.userId || req.body.userId;
        if (!id) {
            res.status(status.BAD_REQUEST).send({ message: 'Missing interview ID' });
            return;
        }
        const deletedInterview = await interviewService.deleteInterview(id, userId);
        res.status(status.OK).json(deletedInterview);
    } catch (error) {
        console.log('Error deleting interview:', error);
        res.status(status.BAD_REQUEST).send(error);
    }
};

export const getInterviewsByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            res.status(status.BAD_REQUEST).send({ message: 'Missing user ID' });
            return;
        }
        const interviews = await interviewService.getInterviewsByUserId(userId);
        res.status(status.OK).json(interviews);
    } catch (error) {
        console.log('Error fetching interviews:', error);
        res.status(status.BAD_REQUEST).send(error);
    }
};

export const getInterviewsGrouypedByDate = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            res.status(status.BAD_REQUEST).send({ message: 'Missing user ID' });
            return;
        }
        const interviews = await interviewService.getInterviewsGrouypedByDate(userId);
        res.status(status.OK).json(interviews);
    } catch (error) {
        console.log('Error fetching grouped interviews:', error);
        res.status(status.BAD_REQUEST).send(error);
    }
};
