import axios from 'axios';
import { CreateSurvey, SurveyFE } from '../backend/survey/survey.schema';

export const createSurveyWithData = async (data: CreateSurvey) => {
  const survey: SurveyFE = await axios
    .post('/api/survey', data)
    .then((res) => res.data);
  return survey;
};

// TODO: create an actual hook for this? or not necessary?
