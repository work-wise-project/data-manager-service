import { text } from 'express';
import { z } from 'zod';

export const getInterviewAnalysisSchema = z.object({
    interviewId: z.string().uuid(),
});
export type GetInterviewAnalysisSchema = z.infer<typeof getInterviewAnalysisSchema>;

const analysisPointSchema = z.object({
    text: z.string().min(1, 'Text is required'),
    timestamp: z.string().optional(),
    trend: z.string().optional(),
});
export const createInterviewAnalysisSchema = z.object({
    interview_id: z.string().uuid(),
    file_name: z.string().min(1, 'File name is required'),
    file_type: z.enum(['audio', 'text']),
    analysis: z.object({
        points_to_improve: z.array(analysisPointSchema),
        points_to_preserve: z.array(analysisPointSchema),
    }),
});
export type CreateInterviewAnalysisSchema = z.infer<typeof createInterviewAnalysisSchema>;

export const getInterviewPreparationSchema = z.object({
    interviewId: z.string().uuid(),
});
export type GetInterviewPreparationSchema = z.infer<typeof getInterviewPreparationSchema>;

export const createInterviewPreparationSchema = z.object({
    interview_id: z.string().uuid(),
    company_info: z.string(),
    job_info: z.string(),
    material_links: z.array(z.string()),
});
export type CreateInterviewPreparationSchema = z.infer<typeof createInterviewPreparationSchema>;

export const getInterviewAnalysisContextSchema = z.object({
    interviewId: z.string().uuid(),
    userId: z.string().uuid(),
});
export type GetInterviewAnalysisContextSchema = z.infer<typeof getInterviewAnalysisContextSchema>;
