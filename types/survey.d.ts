import { Survey, User } from '@prisma/client';
import { SurveyFE } from '../api/survey/survey.schema';

type SurveyWithAuthor = Omit<SurveyFE, 'questions'> & {
  author: User;
};
