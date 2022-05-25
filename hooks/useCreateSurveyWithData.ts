import axios from 'axios';
import { CreateSurvey, SurveyFE } from '../api/survey/survey.schema';

export const createSurveyWithData = async (data: CreateSurvey) => {
  console.log(data);
  const survey: SurveyFE = await axios
    .post('/api/survey', data)
    .then((res) => res.data);
  return survey;
};

// TODO: create an actual hook for this? or not necessary?