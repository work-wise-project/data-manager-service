import { z } from 'zod';

export const getInterviewAnalysisSchema = z.object({
    interviewId: z.string().uuid(),
});
export type GetInterviewAnalysisSchema = z.infer<typeof getInterviewAnalysisSchema>;

export const createInterviewAnalysisSchema = z.object({
    interview_id: z.string().uuid(),
    file_name: z.string().min(1, 'File name is required'),
    file_type: z.enum(['audio', 'text']),
    analysis: z.object({
        points_to_improve: z.array(z.string()),
        points_to_preserve: z.array(z.string()),
    }),
});
export type CreateInterviewAnalysisSchema = z.infer<typeof createInterviewAnalysisSchema>;
