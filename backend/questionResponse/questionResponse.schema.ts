import { z } from 'zod';

export const questionResponseFESchema = z.object({
  questionId: z.string().cuid(),
  answerBoolean: z.boolean().nullable(),
  answerNumeric: z.number().int().min(0).nullable(),
  answerText: z.string().nullable(),
  surveyParticipationId: z.string().cuid().nullable(),
});
export type QuestionResponseFE = z.infer<typeof questionResponseFESchema>;

const updateQuestionResponseCore = {
  surveyParticipationId: z.string().cuid(),
  questionId: z.string().cuid(),
};

export const updateQuestionResponseRequestSchema = z.object({
  body: z.object({
    ...updateQuestionResponseCore,

    answerBoolean: z.boolean().optional(),
    answerNumeric: z.number().int().min(0).max(10).optional(),
    answerText: z.string().optional(),
  }),
});
export type UpdateQuestionResponseRequest = z.infer<
  typeof updateQuestionResponseRequestSchema
>['body'];

export const deleteQuestionResponseRequestSchema = z.object({
  questionId: z.string().cuid(),
});
export type DeleteQuestionResponseRequest = z.infer<
  typeof deleteQuestionResponseRequestSchema
>;
