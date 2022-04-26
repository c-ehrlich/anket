import { z } from 'zod';

export const createDefaultMultipleChoiceOptionSchema = z.object({
  name: z.string({}),
  questionId: z.string({}).cuid({})
})

export const multipleChoiceOptionResponseSchema = z.object({
  id: z.string({}).cuid(),
  order: z.number({}),
  name: z.string({}),
})

export type MultipleChoiceOptionFE = z.infer<typeof multipleChoiceOptionResponseSchema>;
