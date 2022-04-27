import { QuestionType } from '@prisma/client';
import { z } from 'zod';
import { multipleChoiceOptionResponseSchema } from '../multipleChoiceOption/multipleChoiceOption.schema';

// QuestionFE type for the frontend

export const questionResponseSchema = z.object({
  id: z.string({}).cuid(),
  question: z.string({}),
  details: z.string({}),
  order: z.number({}),
  isRequired: z.boolean({}),
  questionType: z.nativeEnum(QuestionType),
  multipleChoiceOptions: z.array(multipleChoiceOptionResponseSchema),
  surveyId: z.string({}).cuid(),
});

export type QuestionFE = z.infer<typeof questionResponseSchema>;

// For schema validation

export const editQuestionSchema = z.object({
  body: z
    .object({
      question: z.string({}),
      details: z.string({}),
      isRequired: z.boolean({}),
      questionType: z.nativeEnum(QuestionType),
    })
    .partial()
    .strict()
    .refine((data) => Object.keys(data).length >= 1),
});
export type EditQuestionData = z.infer<typeof editQuestionSchema>['body'];

export const reorderQuestionSchema = z.object({
  body: z.object({
    order: z.number().int(),
  }),
});
export type ReorderQuestionData = z.infer<typeof reorderQuestionSchema>['body'];

export const createQuestionSchema = z.object({
  body: z.object({
    surveyId: z.string({}).cuid(),
  }),
});
export type CreateQuestionData = z.infer<typeof createQuestionSchema>['body'];
