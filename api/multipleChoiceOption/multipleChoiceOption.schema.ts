import { z } from 'zod';

const createDefaultMultipleChoiceOptionSchema = z.object({
  questionId: z.string({}).uuid()
})

export const multipleChoiceOptionResponseSchema = z.object({
  id: z.string({}).cuid(),
  name: z.string({}),
})

export type MultipleChoiceOptionResponse = z.infer<typeof multipleChoiceOptionResponseSchema>;
