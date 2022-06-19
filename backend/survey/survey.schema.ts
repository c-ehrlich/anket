import { z } from 'zod';
import { questionResponseSchema } from '../question/question.schema';

const createSurveySchema = {
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(6, 'Name must be at least 6 characters')
    .max(100, 'Name can not be more than 100 characters'),
  description: z
    .string({
      invalid_type_error: 'Description must be a string',
    })
    .max(1000, 'Description can not be longer than 1000 characters'),
  picture: z
    .string({ invalid_type_error: 'Image must be a URL or empty' })
    .url('Image must be a url or empty')
    .or(z.literal(''))
    .or(z.undefined()),
};
// schema for /survey/create (FE)
export const createSurveySchemaFE = z.object(createSurveySchema);

// schema for /survey/create (BE)
export const createSurveySchemaBE = z.object({
  body: z.object(createSurveySchema),
});

// type for /survey/create
export type CreateSurvey = z.infer<typeof createSurveySchemaFE>;

// Type for creating a default (empty) survey
const createDefaultSurveySchema = z.object({
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
  picture: z.string({}).url(),
  isCompleted: z.boolean({}),
  isPublic: z.boolean({}),
  questions: z.array(questionResponseSchema),
});
export type SurveyFE = z.infer<typeof createDefaultSurveyResponseSchema>;

// Frontend type for survey WITH author
const user = z.object({
  id: z.string().cuid(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  // there are other things on the user object but we don't want to send them
});
const surveyFEWithAuthorSchema = createDefaultSurveyResponseSchema.extend({
  author: user,
});
export type SurveyFEWithAuthor = z.infer<typeof surveyFEWithAuthorSchema>;

// For route validation & according frontend types
export const editSurveySchema = z.object({
  body: z
    .object({
      name: z.string(),
      description: z.string(),
      picture: z.string(),
      isPublic: z.boolean(),
      isCompleted: z.boolean(),
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

// Survey Preview with Author
const userWithoutEmail = z.object({
  id: z.string().cuid(),
  name: z.string().nullable(),
  image: z.string().nullable(),
});
const surveyWithAuthorSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  picture: z.string(),
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
