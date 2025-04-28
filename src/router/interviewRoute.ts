import { Router } from 'express';
import HttpStatus from 'http-status';
import {
    createInterview,
    deleteInterview,
    getInterviewsByUserId,
    getInterviewsGrouypedByDate,
} from '../controllers/interviewController';
import { createInterviewAnalysisSchema, getInterviewAnalysisSchema } from '../schemas';
import { createInterviewAnalysis, getInterviewAnalysis } from '../services';

export const interviewRouter = Router();

interviewRouter.post('/', createInterview);

interviewRouter.delete('/:id', deleteInterview);

interviewRouter.get('/:userId', getInterviewsByUserId);

interviewRouter.get('/:userId/schedule', getInterviewsGrouypedByDate);

interviewRouter.get('/analysis/:interviewId', async (req, res) => {
    const { interviewId } = getInterviewAnalysisSchema.parse(req.params);

    const interviewAnalysis = await getInterviewAnalysis(interviewId);

    res.status(HttpStatus.OK).send({ analysis: interviewAnalysis });
});

interviewRouter.post('/analysis', async (req, res) => {
    const body = createInterviewAnalysisSchema.parse(req.body);

    await createInterviewAnalysis(body);

    res.status(HttpStatus.CREATED).send({ message: 'Interview analysis created successfully' });
});
