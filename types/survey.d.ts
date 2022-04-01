import { Survey, User } from '@prisma/client';

type SurveyWithAuthor = Partial<Survey> & {
  author: User;
};
