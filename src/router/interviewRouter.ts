import { Router } from 'express';
import { createInterviewAnalysis, getInterviewAnalysis } from '../services';
import HttpStatus from 'http-status';
import { createInterviewAnalysisSchema, getInterviewAnalysisSchema } from '../schemas';

export const createInterviewRouter = () => {
    const router = Router();

    router.get('/analysis/:interviewId', async (req, res) => {
        const { interviewId } = getInterviewAnalysisSchema.parse(req.params);

        const interviewAnalysis = await getInterviewAnalysis(interviewId);

        res.status(HttpStatus.OK).send({ analysis: interviewAnalysis });
    });

    router.post('/analysis', async (req, res) => {
        const body = createInterviewAnalysisSchema.parse(req.body);

        await createInterviewAnalysis(body);

        res.status(HttpStatus.CREATED).send({ message: 'Interview analysis created successfully' });
    });

    return router;
};
