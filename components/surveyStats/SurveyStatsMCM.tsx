import React, {  useMemo } from 'react';
import { SurveyStatsResponseQuestion } from '../../backend/surveyStats/surveyStats.schema';
import SurveyStatsBarChart from './SurveyStatsBarChart';

function SurveyStatsMCM({
  question,
}: {
  question: SurveyStatsResponseQuestion;
}) {
  const data = useMemo(() => {
    let results: { name: string; quantity: number }[] = [];
    question.multipleChoiceOptions.forEach((option) => {
      results.push({
        name: option.name,
        quantity: option.multipleChoiceOptionSelections.reduce((acc, cur) => {
          return cur.selected ? ++acc : acc;
        }, 0),
      });
    });
    return results.sort((a, b) => a.quantity - b.quantity);
  }, [question]);

  return <SurveyStatsBarChart data={data} />;
}

export default SurveyStatsMCM;
