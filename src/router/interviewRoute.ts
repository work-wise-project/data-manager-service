import { Router } from 'express';
import HttpStatus from 'http-status';
import {
    createInterview,
    deleteInterview,
    getInterviewsByUserId,
    getInterviewsGroupedByDate,
} from '../controllers/interviewController';
import { createInterviewAnalysisSchema, getInterviewAnalysisSchema } from '../schemas';
import { createInterviewAnalysis, getInterviewAnalysis, getInterviewAudioFile } from '../services';

export const interviewRouter = Router();

interviewRouter.get('/analysis/:interviewId', async (req, res) => {
    const { interviewId } = getInterviewAnalysisSchema.parse(req.params);

    const interviewAnalysis = await getInterviewAnalysis(interviewId);
    const file = await getInterviewAudioFile(interviewId);

    res.status(HttpStatus.OK).send({ analysis: interviewAnalysis, file });
});

interviewRouter.post('/analysis', async (req, res) => {
    const body = createInterviewAnalysisSchema.parse(req.body);

    await createInterviewAnalysis(body);

    res.status(HttpStatus.CREATED).send({ message: 'Interview analysis created successfully' });
});

interviewRouter.post('/', createInterview);

interviewRouter.delete('/:id', deleteInterview);

interviewRouter.get('/:userId', getInterviewsByUserId);

interviewRouter.get('/:userId/schedule', getInterviewsGroupedByDate);
