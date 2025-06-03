import { NextFunction, Request, Response, Router } from 'express';
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
import {
    createInterviewAnalysisSchema,
    getInterviewAnalysisContextSchema,
    getInterviewAnalysisSchema,
} from '../schemas';
import {
    createInterviewAnalysis,
    getInterviewAnalysis,
    getInterviewAnalysisContext,
    getInterviewAudioFile,
} from '../services';

export const asyncHandler =
    (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    (req: Request, res: Response, next: NextFunction) =>
        Promise.resolve(fn(req, res, next)).catch(next);

export const interviewRouter = Router();

interviewRouter.post(
    '/analysis/context',
    asyncHandler(async (req, res) => {
        const { interviewId, userId } = getInterviewAnalysisContextSchema.parse(req.body);

        const interviewAnalysis = await getInterviewAnalysisContext(interviewId, userId);

        res.status(HttpStatus.OK).send(interviewAnalysis);
    })
);

interviewRouter.get(
    '/analysis/:interviewId',
    asyncHandler(async (req, res) => {
        const { interviewId } = getInterviewAnalysisSchema.parse(req.params);

        const interviewAnalysis = await getInterviewAnalysis(interviewId);
        if (!interviewAnalysis) {
            res.status(HttpStatus.OK).send({ analysis: null, file: null });
            return;
        }

        const { fileBuffer, mimeType } = await getInterviewAudioFile(interviewId);

        res.status(HttpStatus.OK).send({
            analysis: interviewAnalysis,
            file: { mimeType, fileBuffer: fileBuffer.toString('base64') },
        });
    })
);

interviewRouter.post(
    '/analysis',
    asyncHandler(async (req, res) => {
        const body = createInterviewAnalysisSchema.parse(req.body);

        await createInterviewAnalysis(body);

        res.status(HttpStatus.CREATED).send({ message: 'Interview analysis created successfully' });
    })
);

interviewRouter.get('/preparation/:interviewId', getInterviewPreparation);

interviewRouter.post('/preparation', createInterviewPreparation);

interviewRouter.post('/', createInterview);

interviewRouter.delete('/:id', deleteInterview);

interviewRouter.get('/preparation-data', getInterviewPreparationData);

interviewRouter.get('/:userId', getInterviewsByUserId);

interviewRouter.get('/:userId/schedule', getInterviewsGroupedByDate);
