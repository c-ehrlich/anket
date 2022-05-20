import { QuestionType } from '@prisma/client';
import { z } from 'zod';
import { questionResponseFESchema } from '../questionResponse/questionResponse.schema';

export const getSurveyParticipationDataSchema = z.object({
  body: z.object({
    surveyId: z.string().cuid(),
    userId: z.string().cuid(),
  }),
});
export type GetSurveyParticipationData = z.infer<
  typeof getSurveyParticipationDataSchema
>['body'];

const surveyParticipationCore = {
  surveyId: z.string().cuid(),
  userId: z.string().cuid(),
  isComplete: z.boolean(),
};

export const surveyParticipationCoreSchema = z.object({
  ...surveyParticipationCore,
});
export type SurveyParticipationCore = z.infer<
  typeof surveyParticipationCoreSchema
>;

export const surveyParticipationFESchema = z.object({
  ...surveyParticipationCore,
  questionResponses: questionResponseFESchema.array(),
});
export type SurveyParticipationFE = z.infer<typeof surveyParticipationFESchema>;

///////////////////////////
// schema for TakeSurvey //
///////////////////////////

const multipleChoiceOptionSelectionSchema = z.object({
  id: z.string().cuid(),
  selected: z.boolean(),
});
export type MultipleChoiceOptionSelection = z.infer<
  typeof multipleChoiceOptionSelectionSchema
>;

const multipleChoiceOptionSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  order: z.number().gte(0),
  multipleChoiceOptionSelections: z.array(multipleChoiceOptionSelectionSchema),
});
export type MultipleChoiceOptionFE = z.infer<typeof multipleChoiceOptionSchema>;

const surveyQuestionWithResponses = {
  id: z.string().cuid(),
  order: z.number().gte(0),
  question: z.string(),
  questionType: z.nativeEnum(QuestionType),
  details: z.string(),
  isRequired: z.boolean(),
  multipleChoiceOptions: z.array(multipleChoiceOptionSchema),
  questionResponses: z.array(
    z.object({
      id: z.string().cuid(),
      answerBoolean: z.boolean().nullable(),
      answerNumeric: z.number().nullable(),
      answerText: z.string().nullable(),
    })
  ),
};
const surveyQuestionWithResponsesSchema = z.object(surveyQuestionWithResponses);
export type SurveyQuestionWithResponses = z.infer<
  typeof surveyQuestionWithResponsesSchema
>;

export const surveyWithParticipationAndUserResponsesSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isPublic: z.boolean(),
  isCompleted: z.boolean(),
  author: z.object({
    id: z.string().cuid(),
    name: z.string().nullable(),
    email: z.string().nullable(),
    image: z.string().nullable(),
  }),
  participations: z.array(
    z.object({
      id: z.string().cuid(),
      isComplete: z.boolean(),
    })
  ),
  questions: z.array(z.object(surveyQuestionWithResponses)),
});
export type SurveyWithParticipationAndUserResponses = z.infer<
  typeof surveyWithParticipationAndUserResponsesSchema
>;

// TODO are we using this in the Frontend?
export const toggleMCMItemRequestSchema = z.object({
  body: z.object({
    surveyId: z.string().cuid(),
    selected: z.boolean(),
  }),
});
export type ToggleMCMItemRequest = z.infer<
  typeof toggleMCMItemRequestSchema
>['body'];

const dashboardSurveyParticipationSchema = z.object({
  id: z.string().cuid(),
  isComplete: z.boolean(),
  updatedAt: z.date(),
  survey: z.object({
    id: z.string().cuid(),
    name: z.string(),
    description: z.string(),
    author: z.object({
      name: z.string().nullable(),
      image: z.string().nullable(),
    }),
  }),
});
export type DashboardSurveyParticipation = z.infer<
  typeof dashboardSurveyParticipationSchema
>;

export const updateSurveyParticipationDataSchema = z.object({
  body: z
    .object({
      isComplete: z.boolean(),
    })
    .optional(),
});
export type UpdateSurveyParticipationData = z.infer<
  typeof updateSurveyParticipationDataSchema
>['body'];

const updateSurveyParticipationResponseSchema = z.object({
  id: z.string().cuid(),
  isComplete: z.boolean(),
});
export type UpdateSurveyParticipationResponse = z.infer<
  typeof updateSurveyParticipationResponseSchema
>;
