import { object, string, TypeOf } from 'zod';

const surveyCore = object({
  name: string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }).max(100, 'Maximum Name length is 100 chars'),
  description: string({
    invalid_type_error: 'Description must be a string',
  })
    .max(1000, 'Maximum Description length is 1000 chars')
    .optional(),
  authorId: string({
    required_error: 'Author ID is required',
    invalid_type_error: 'Author ID must be a string',
  }).cuid('Author ID must be a valid CUID'),
});

export const createSurveySchema = object({
  body: surveyCore,
});

export type CreateSurveyInput = TypeOf<typeof createSurveySchema>['body'];
export type CreateSurveyResponse = TypeOf<typeof createSurveySchema>['body'];
