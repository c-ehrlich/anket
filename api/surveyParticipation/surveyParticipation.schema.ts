import { boolean, string, z } from 'zod';
import { questionResponseFESchema } from '../questionResponse/questionResponse.schema';

export const getSurveyParticipationDataSchema = z.object({
  body: z.object({
    surveyId: string().cuid(),
    userId: string().cuid(),
  }),
});
export type GetSurveyParticipationData = z.infer<
  typeof getSurveyParticipationDataSchema
>['body'];

export const surveyParticipationFESchema = z.object({
  surveyId: string().cuid(),
  userId: string().cuid(),
  isComplete: boolean(),
  questionResponses: questionResponseFESchema.array(),
});
export type SurveyParticipationFE = z.infer<typeof surveyParticipationFESchema>;
