import { z } from 'zod';
import { questionResponseSchema } from '../question/question.schema';

const user = z.object({
  id: z.string().cuid(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  // there are other things on the user object but we don't want to send them
});

const userWithoutEmail = z.object({
  id: z.string().cuid(),
  name: z.string().nullable(),
  image: z.string().nullable(),
});

// createDefaultSurvey input
export const createDefaultSurveySchema = z.object({
  body: z.object({
    authorId: z
      .string({
        required_error: 'Author ID is required',
        invalid_type_error: 'Author ID must be a string',
      })
      .cuid('Author ID must be a valid CUID'),
  }),
});

export type CreateDefaultSurveyInput = z.infer<
  typeof createDefaultSurveySchema
>['body'];

// createDefaultSurvey return
const createDefaultSurveyResponseSchema = z.object({
  id: z.string({}).cuid(),
  name: z.string({}),
  description: z.string({}),
  isCompleted: z.boolean({}),
  isPublic: z.boolean({}),
  questions: z.array(questionResponseSchema),
});

export type SurveyFE = z.infer<typeof createDefaultSurveyResponseSchema>;

const surveyFEWithAuthorSchema = z.object({
  id: z.string({}).cuid(),
  name: z.string({}),
  description: z.string({}),
  isCompleted: z.boolean({}),
  isPublic: z.boolean({}),
  questions: z.array(questionResponseSchema),
  author: user,
});

export type SurveyFEWithAuthor = z.infer<typeof surveyFEWithAuthorSchema>;

// For route validation & according frontend types
export const editSurveySchema = z.object({
  body: z
    .object({
      name: z.string(),
      description: z.string(),
      isPublic: z.boolean(),
    })
    .partial()
    .strict()
    .refine(
      // (data) => data.name || data.description || data.isPublic,
      (data) => Object.keys(data).length >= 1,
      'Need to submit at least one field'
    ),
});
export type EditSurveyData = z.infer<typeof editSurveySchema>['body'];

const surveyWithAuthorSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string(),
  isCompleted: z.boolean(),
  isPublic: z.boolean(),
  author: userWithoutEmail,
});
export type SurveyPreviewWithAuthor = z.infer<typeof surveyWithAuthorSchema>;

const surveyWithAuthorAndInteractionSchema = surveyWithAuthorSchema.extend({
  participations: z.array(
    z.object({
      isComplete: z.boolean(),
    })
  ),
});
export type SurveyPreviewWithAuthorAndInteraction = z.infer<
  typeof surveyWithAuthorAndInteractionSchema
>;
