import { z } from 'zod';

const name = z.string({});
const id = z.string({}).cuid({});
const questionId = z.string({}).cuid({});
const order = z.number({});

export const multipleChoiceOptionResponseSchema = z.object({
  id,
  name,
  order,
});
export type MultipleChoiceOptionFE = z.infer<
  typeof multipleChoiceOptionResponseSchema
>;

export const createDefaultMultipleChoiceOptionSchema = z.object({
  body: z.object({ name, questionId }),
});

export const editMultipleChoiceOptionSchema = z.object({
  body: z
    .object({
      name,
    })
    .partial()
    .strict()
    .refine((data) => Object.keys(data).length >= 1),
});
export type EditMultipleChoiceOptionData = z.infer<
  typeof editMultipleChoiceOptionSchema
>['body'];

export const reorderMultipleChoiceOptionSchema = z.object({
  body: z.object({ order }),
});
export type ReorderMultipleChoiceOptionType = z.infer<
  typeof reorderMultipleChoiceOptionSchema
>['body'];
