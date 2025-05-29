import { Request, Response } from 'express';
import status from 'http-status';
import { interviewService } from '../services/interviewService';
import { createInterviewPreparationSchema, getInterviewPreparationSchema } from '../schemas';
import { userCareerService } from '../services/userCareerService';
import { userEducationService } from '../services/userEducationService';
import { userSkillService } from '../services/userSkillService';

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

export const getInterviewPreparationData = async (req: Request, res: Response) => {
    try {
        const { id } = req.query;
        if (!id) {
            res.status(status.BAD_REQUEST).send({ message: 'Missing interview ID' });
            return;
        }
        const interview = await interviewService.getInterviewById(id as string);
        if (!interview) {
            res.status(status.NOT_FOUND).send({ message: 'Interview not found' });
            return;
        }

        const [career, education, skills, analysis, preparation] = await Promise.all([
            userCareerService.getCareerByUser(interview.user_id),
            userEducationService.getEducationByUser(interview.user_id),
            userSkillService.getSkillsByUser(interview.user_id),
            interviewService.getLatestInterviewAnalysisByUserId(interview.user_id),
            interviewService.getLatestInterviewPreparationByUserId(interview.user_id),
        ]);

        const pointsToImprove =
            analysis?.analysis && typeof analysis?.analysis === 'object' && 'points_to_improve' in analysis.analysis
                ? (analysis.analysis as { points_to_improve: string[] }).points_to_improve
                : [];

        res.status(status.OK).json({
            jobLink: interview.job_link,
            skillsList: skills.map((skill) => skill.skill.name) || [],
            education: education.map((edu) => `${edu.institute} - ${edu.years} years`) || [],
            career:
                career.map(
                    (job) =>
                        `${job.company ? job.company + ' -' : ''} ${job.job_title ? '' + job.job_title + '-' : ''} ${
                            job.years ? job.years + ' years' : ''
                        } `
                ) || [],
            prevMaterialLinks: preparation?.material_links || [],
            pointsToImprove: pointsToImprove || [],
        });
    } catch (error) {
        console.log('Error fetching interview:', error);
        res.status(status.BAD_REQUEST).send(error);
    }
};

export const getInterviewsGroupedByDate = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            res.status(status.BAD_REQUEST).send({ message: 'Missing user ID' });
            return;
        }
        const interviews = await interviewService.getInterviewsGroupedByDate(userId);
        res.status(status.OK).json(interviews);
    } catch (error) {
        console.log('Error fetching grouped interviews:', error);
        res.status(status.BAD_REQUEST).send(error);
    }
};

export const getInterviewPreparation = async (req: Request, res: Response) => {
    try {
        const { interviewId } = getInterviewPreparationSchema.parse(req.params);
        if (!interviewId) {
            res.status(status.BAD_REQUEST).send({ message: 'Missing interview ID' });
            return;
        }
        const interviewPreparation = await interviewService.getInterviewPreparationByInterviewId(interviewId);
        if (!interviewPreparation) {
            res.status(status.NOT_FOUND).send({ message: 'Interview preparation not found' });
            return;
        }
        res.status(status.OK).json(interviewPreparation);
    } catch (error) {
        console.log('Error fetching interview preparation:', error);
        res.status(status.BAD_REQUEST).send(error);
    }
};

export const createInterviewPreparation = async (req: Request, res: Response) => {
    try {
        const body = createInterviewPreparationSchema.parse(req.body);
        if (!body) {
            res.status(status.BAD_REQUEST).send({ message: 'Missing required fields' });
            return;
        }
        const interviewPreparation = await interviewService.createInterviewPreparation(body);
        res.status(status.OK).json(interviewPreparation);
    } catch (error) {
        console.log('Error creating interview preparation:', error);
        res.status(status.BAD_REQUEST).send(error);
    }
};
