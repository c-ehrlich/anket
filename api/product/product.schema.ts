import { object, string, TypeOf } from 'zod';

const productCore = {
  name: string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  creatorId: string({
    required_error: 'Creator Id is required',
    invalid_type_error: 'Creator Id must be a string',
  }).cuid({ message: 'Creator Id must be a CUID' }),
};

export const createProductSchema = object({
  body: object({
    ...productCore
  }),
});

export const createProductResponseSchema = object({
  ...productCore
});

export type CreateProductInput = TypeOf<typeof createProductSchema>['body'];
export type CreateProductResponse = TypeOf<typeof createProductResponseSchema>;
