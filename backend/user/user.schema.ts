import { z } from 'zod';

const userWithSurveysSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  image: z.string().nullable(),
  surveys: z.array(
    z.object({
      id: z.string().cuid(),
      name: z.string(),
      picture: z.string().url(),
      description: z.string(),
      isCompleted: z.boolean(),
      isPublic: z.boolean(),
      participations: z.array(
        z.object({
          isComplete: z.boolean(),
        })
      ),
    })
  ),
});

export type UserWithSurveysFE = z.infer<typeof userWithSurveysSchema>;
