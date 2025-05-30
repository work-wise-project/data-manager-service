import { Router } from 'express';
import HttpStatus from 'http-status';
import {
    createInterview,
    createInterviewPreparation,
    deleteInterview,
    getInterviewPreparation,
    getInterviewPreparationData,
    getInterviewsByUserId,
    getInterviewsGroupedByDate,
} from '../controllers/interviewController';
import { createInterviewAnalysisSchema, getInterviewAnalysisSchema } from '../schemas';
import { createInterviewAnalysis, getInterviewAnalysis, getInterviewAudioFile } from '../services';

export const interviewRouter = Router();

interviewRouter.get('/analysis/:interviewId', async (req, res) => {
    try {
        const { interviewId } = getInterviewAnalysisSchema.parse(req.params);

        const interviewAnalysis = await getInterviewAnalysis(interviewId);
        const { fileBuffer, mimeType } = await getInterviewAudioFile(interviewId);

        res.status(HttpStatus.OK).send({
            analysis: interviewAnalysis,
            file: { mimeType, fileBuffer: fileBuffer.toString('base64') },
        });
    } catch (error) {
        console.error(error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Failed to fetch interview analysis' });
    }
});

interviewRouter.post('/analysis', async (req, res) => {
    try {
        const body = createInterviewAnalysisSchema.parse(req.body);

        await createInterviewAnalysis(body);

        res.status(HttpStatus.CREATED).send({ message: 'Interview analysis created successfully' });
    } catch (error) {
        console.error(error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Failed to create interview analysis' });
    }
});

interviewRouter.get('/preparation/:interviewId', getInterviewPreparation);

interviewRouter.post('/preparation', createInterviewPreparation);

interviewRouter.post('/', createInterview);

interviewRouter.delete('/:id', deleteInterview);

interviewRouter.get('/preparation-data', getInterviewPreparationData);

interviewRouter.get('/:userId', getInterviewsByUserId);

interviewRouter.get('/:userId/schedule', getInterviewsGroupedByDate);
