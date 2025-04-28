import { Router } from 'express';
import {
    createInterview,
    deleteInterview,
    getInterviewsByUserId,
    getInterviewsGrouypedByDate,
} from '../controllers/interviewController';

export const interviewRouter = Router();

interviewRouter.post('/', createInterview);

interviewRouter.delete('/:id', deleteInterview);

interviewRouter.get('/:userId', getInterviewsByUserId);

interviewRouter.get('/:userId/schedule', getInterviewsGrouypedByDate);
