import { object, string, number, TypeOf } from 'zod';

export const createProductSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    creatorId: string({
      required_error: 'Creator Id is required',
    }),
  }),
});

export type CreateProductInput = TypeOf<typeof createProductSchema>['body'];
