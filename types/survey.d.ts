import { Survey, User } from '@prisma/client';
import { CreateDefaultSurveyResponse } from '../api/survey/survey.schema';

type SurveyWithAuthor = Omit<CreateDefaultSurveyResponse, 'questions'> & {
  author: User;
};
