import { z } from 'zod';
import { questionResponseSchema } from '../question/question.schema';

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
