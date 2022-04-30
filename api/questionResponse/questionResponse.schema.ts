import { boolean, number, string, z } from 'zod';

export const questionResponseFESchema = z.object({
  questionId: string().cuid(),
  answerBoolean: boolean().nullable(),
  answerNumeric: number().int().min(0).nullable(),
  answerText: string().nullable(),
  multipleChoiceOptionId: string().nullable(),
});
export type QuestionResponseFE = z.infer<typeof questionResponseFESchema>;
