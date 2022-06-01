import React, { useMemo } from 'react';
import { SurveyStatsResponseQuestion } from '../../backend/surveyStats/surveyStats.schema';
import SurveyStatsBarChart from './SurveyStatsBarChart';

function SurveyStats0to10({
  question,
}: {
  question: SurveyStatsResponseQuestion;
}) {
  const data = useMemo(() => {
    const results = [
      { name: '0', quantity: 0},
      { name: '1', quantity: 0},
      { name: '2', quantity: 0},
      { name: '3', quantity: 0},
      { name: '4', quantity: 0},
      { name: '5', quantity: 0},
      { name: '6', quantity: 0},
      { name: '7', quantity: 0},
      { name: '8', quantity: 0},
      { name: '9', quantity: 0},
      { name: '10', quantity: 0},
    ]
    question.questionResponses.forEach((r) => {
      r.answerNumeric && results[r.answerNumeric] && ++results[r.answerNumeric].quantity
    })
    return results;
  }, [question]);

  return <SurveyStatsBarChart data={data} />;
}

export default SurveyStats0to10;
