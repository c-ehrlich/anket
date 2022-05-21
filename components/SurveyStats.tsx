import React from 'react';
import { SurveyStatsResponse } from '../api/surveyStats/surveyStats.schema';

type PageProps = { survey: SurveyStatsResponse };

const SurveyStats = (props: PageProps) => {
  return <div>SurveyStats {JSON.stringify(props.survey)}</div>;
};

export default SurveyStats;
