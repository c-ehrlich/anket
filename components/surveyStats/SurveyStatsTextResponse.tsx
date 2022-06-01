import React from 'react'
import { SurveyStatsResponseQuestion } from '../../backend/surveyStats/surveyStats.schema';

function SurveyStatsTextResponse({
  question,
}: {
  question: SurveyStatsResponseQuestion;
}) {
  return (
    <div>SurveyStatsTextResponse</div>
  )
}

export default SurveyStatsTextResponse