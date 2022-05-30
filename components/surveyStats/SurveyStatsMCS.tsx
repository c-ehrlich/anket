import { useDeferredValue } from 'react';
import { SurveyStatsResponseQuestion } from '../../backend/surveyStats/surveyStats.schema';
import SurveyStatsPieChart from './SurveyStatsPieChart';

export default function SurveyStatsMCS({
  question,
}: {
  question: SurveyStatsResponseQuestion;
}) {
  const data = useDeferredValue(() => {
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
  });

  return <SurveyStatsPieChart data={data()} />;
}
