import { z } from 'zod';

export const upsertMultipleChoiceOptionResponseSchema = z.object({
  body: z.object({
    selected: z.boolean(),
  }),
});
export type UpsertMultipleChoiceOptionResponse = z.infer<
  typeof upsertMultipleChoiceOptionResponseSchema
>['body'];

const upsertMultipleChoiceOptionResponseServiceSchema = z.object({
  multipleChoiceOptionId: z.string().cuid(),
  surveyParticipationId: z.string().cuid(),
  selected: z.boolean(),
});
export type UpsertMultipleChoiceOptionResponseServiceInput = z.infer<
  typeof upsertMultipleChoiceOptionResponseServiceSchema
>;

const multipleChoiceOptionSelectionFESchema = z.object({
  id: z.string().cuid(),
  selected: z.boolean(),
});
export type MultipleChoiceOptionSelectionFE = z.infer<
  typeof multipleChoiceOptionSelectionFESchema
>;
