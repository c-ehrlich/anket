import { QuestionType } from '@prisma/client';
import { z } from 'zod';
import { multipleChoiceOptionReturnSchema } from '../multipleChoiceOption/multipleChoiceOption.schema';

export const questionReturnSchema = z.object({
  id: z.string({}).cuid(),
  question: z.string({}),
  details: z.string({}),
  isRequired: z.boolean({}),
  questionType: z.nativeEnum(QuestionType),
  multipleChoiceOptions: z.array(multipleChoiceOptionReturnSchema),
});
