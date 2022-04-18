import { z } from 'zod';
import { questionReturnSchema } from '../question/question.schema';

// createDefaultSurvey input
const createDefaultSurveySchema = z.object({
  body: z.object({
    authorId: z
      .string({
        required_error: 'Author ID is required',
        invalid_type_error: 'Author ID must be a string',
      })
      .cuid('Author ID must be a valid CUID'),
  }),
});

export type CreateDefaultSurveyInput = z.infer<
  typeof createDefaultSurveySchema
>['body'];

// createDefaultSurvey return
const createDefaultSurveyResponseSchema = z.object({
  id: z.string({}).cuid(),
  name: z.string({}),
  description: z.string({}),
  questions: z.array(questionReturnSchema),
});

export type CreateDefaultSurveyResponse = z.infer<
  typeof createDefaultSurveyResponseSchema
>;

// const surveyCore = {
//   name: z
//     .string({
//       required_error: 'Name is required',
//       invalid_type_error: 'Name must be a string',
//     })
//     .max(100, 'Maximum Name length is 100 chars'),
//   description: z
//     .string({
//       invalid_type_error: 'Description must be a string',
//     })
//     .max(1000, 'Maximum Description length is 1000 chars')
//     .optional(),
//   authorId: z
//     .string({
//       required_error: 'Author ID is required',
//       invalid_type_error: 'Author ID must be a string',
//     })
//     .cuid('Author ID must be a valid CUID'),
// };

// const surveyCoreWithoutAuthorID = {
//   name: z
//     .string({
//       required_error: 'Name is required',
//       invalid_type_error: 'Name must be a string',
//     })
//     .max(100, 'Maximum Name length is 100 chars'),
//   description: z
//     .string({
//       invalid_type_error: 'Description must be a string',
//     })
//     .max(1000, 'Maximum Description length is 1000 chars')
//     .optional(),
// };

// const questionInputSchema = z.object({
//   id: z.string({}).optional(),
//   question: z.string({
//     required_error: 'Question is required',
//     invalid_type_error: 'Question must be a string',
//   }),
//   details: z
//     .string({
//       invalid_type_error: 'Details must be a string',
//     })
//     .optional(),
//   questionType: z.nativeEnum(QuestionType),
//   isRequired: z.boolean({
//     required_error: 'isRequired is required (lol)',
//     invalid_type_error: 'isRequired must be a boolean',
//   }),
//   multipleChoiceOptions: z
//     .array(
//       z.object({
//         name: z.string({
//           required_error: 'Option name is required',
//           invalid_type_error: 'Option name must be a string',
//         }),
//       })
//     )
//     .optional(),
// });

// export const createSurveySchema = z.object({
//   body: z.object(surveyCore),
// });

// export const createSurveyWithEverythingSchema = z.object({
//   body: z.object({
//     ...surveyCoreWithoutAuthorID,
//     questions: z.array(questionInputSchema),
//   }),
// });

// export type CreateSurveyInput = z.infer<typeof createSurveySchema>['body'];

// export type CreateSurveyWithEverythingInput = z.infer<
//   typeof createSurveyWithEverythingSchema
// >['body'];

// export type CreateQuestionInput = z.infer<typeof questionInputSchema>;

// export type CreateSurveyResponse = z.infer<typeof createSurveySchema>['body'];
