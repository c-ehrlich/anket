import axios from 'axios';
import { CreateDefaultSurveyResponse } from '../api/survey/survey.schema';

export const createSurvey = async () => {
  const survey: CreateDefaultSurveyResponse = await axios
    .post('/api/survey')
    .then((res) => res.data);
  return survey;
};

// TODO: create an actual hook for this? or not necessary?
