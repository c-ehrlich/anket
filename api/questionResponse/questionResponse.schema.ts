import { z } from 'zod';

export const questionResponseFESchema = z.object({
  questionId: z.string().cuid(),
  answerBoolean: z.boolean().nullable(),
  answerNumeric: z.number().int().min(0).nullable(),
  answerText: z.string().nullable(),
  multipleChoiceOptionId: z.string().cuid().nullable(),
});
export type QuestionResponseFE = z.infer<typeof questionResponseFESchema>;

const updateQuestionResponseCore = {
  surveyIdParticipation: z.string().cuid(),
  questionId: z.string().cuid(),
};

export const updateMCMRequestSchema = z.object({
  ...updateQuestionResponseCore,
  multipleChoiceOptionIds: z.string().cuid().array(),
});
export type UpdateMCMRequest = z.infer<typeof updateMCMRequestSchema>;

export const updateMCSRequestSchema = z.object({
  ...updateQuestionResponseCore,
  multipleChoiceOptionId: z.string().cuid().array(),
});
export type UpdateMCSRequest = z.infer<typeof updateMCSRequestSchema>;

export const updateBooleanRequestSchema = z.object({
  ...updateQuestionResponseCore,
  answerBoolean: z.boolean(),
});
export type UpdateBooleanRequest = z.infer<typeof updateBooleanRequestSchema>;

export const updateNumericRequestSchema = z.object({
  ...updateQuestionResponseCore,
  answerNumberic: z.number().int().min(0).max(10),
});
export type UpdateNumericRequest = z.infer<typeof updateNumericRequestSchema>;

export const updateTextRequestSchema = z.object({
  ...updateQuestionResponseCore,
  answerText: z.string(),
});
export type UpdateTextRequest = z.infer<typeof updateTextRequestSchema>;

export const deleteQuestionResponseRequestSchema = z.object({
  questionId: z.string().cuid(),
});
export type DeleteQuestionResponseRequest = z.infer<
  typeof deleteQuestionResponseRequestSchema
>;
