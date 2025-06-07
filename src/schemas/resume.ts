import { z } from 'zod';

export const ResumeSchema = z.object({
    user_id: z.string(),
    analysis: z
        .object({
            general_review: z.string(),
            strengths: z.array(z.string()),
            weaknesses: z.array(z.string()),
        })
        .nullable(),
    spell_check: z.string().nullable(),
});
export type ResumeSchemaType = z.infer<typeof ResumeSchema>;

export const ResumeAnalysisSchema = z.object({
    analysis: z
        .object({
            general_review: z.string(),
            strengths: z.array(z.string()),
            weaknesses: z.array(z.string()),
        })
        .nullable(),
});
export type ResumeAnalysisSchemaType = z.infer<typeof ResumeAnalysisSchema>;
