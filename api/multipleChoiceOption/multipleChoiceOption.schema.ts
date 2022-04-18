import { z } from 'zod';

const createDefaultMultipleChoiceOptionSchema = z.object({
  questionId: z.string({}).uuid()
})

export const multipleChoiceOptionReturnSchema = z.object({
  id: z.string({}).cuid(),
  name: z.string({}),
})