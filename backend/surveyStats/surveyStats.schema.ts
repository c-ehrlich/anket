import { QuestionType } from '@prisma/client';
import z from 'zod';

export const surveyStatsResponseSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string(),
  picture: z.string(),
  updatedAt: z.date(),
  isPublic: z.boolean(),
  isCompleted: z.boolean(),
  author: z.object({
    id: z.string().cuid(),
    name: z.string().nullable(),
    image: z.string().url().nullable(),
  }),
  participations: z.array(
    z.object({
      id: z.string().cuid(),
    })
  ),
  questions: z.array(
    z.object({
      id: z.string().cuid(),
      question: z.string(),
      details: z.string(),
      questionType: z.nativeEnum(QuestionType),
      isRequired: z.boolean(),
      order: z.number().min(0).int(),
      questionResponses: z.array(
        z.object({
          id: z.string().cuid(),
          answerBoolean: z.boolean().nullable(),
          answerNumeric: z.number().nullable(),
          answerText: z.string().nullable(),
        })
      ),
      multipleChoiceOptions: z.array(
        z.object({
          id: z.string().cuid(),
          name: z.string(),
          multipleChoiceOptionSelections: z.array(
            z.object({
              id: z.string().cuid(),
              selected: z.boolean().nullable(),
            })
          ),
        })
      ),
    })
  ),
});
export type SurveyStatsResponse = z.infer<typeof surveyStatsResponseSchema>;
