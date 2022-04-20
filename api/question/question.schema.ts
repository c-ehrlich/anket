import { QuestionType } from '@prisma/client';
import { z } from 'zod';
import { multipleChoiceOptionResponseSchema } from '../multipleChoiceOption/multipleChoiceOption.schema';

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

export type QuestionResponse = z.infer<typeof questionResponseSchema>

