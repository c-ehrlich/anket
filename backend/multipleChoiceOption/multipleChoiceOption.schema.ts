import { z } from 'zod';

const name = z.string({});
const id = z.string({}).cuid({});
const order = z.number({});

const multipleChoiceOptionFE = {
  id,
  name,
  order,
};

export const multipleChoiceOptionResponseSchema = z.object(
  multipleChoiceOptionFE
);
export type MultipleChoiceOptionFE = z.infer<
  typeof multipleChoiceOptionResponseSchema
>;

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

export const reorderMultipleChoiceOptionsSchema = z.object({
  body: z.array(z.object(multipleChoiceOptionFE)),
});
// NOTE: no type here, just use MultipleChoiceOptionFE[]
