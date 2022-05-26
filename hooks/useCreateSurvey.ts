import axios from 'axios';
import { SurveyFE } from '../backend/survey/survey.schema';

export const createSurvey = async () => {
  const survey: SurveyFE = await axios
    .put('/api/survey')
    .then((res) => res.data);
  return survey;
};

// TODO: create an actual hook for this? or not necessary?
