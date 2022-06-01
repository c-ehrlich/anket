import { useMemo } from 'react';
import { SurveyStatsResponseQuestion } from '../../backend/surveyStats/surveyStats.schema';
import SurveyStatsPieChart from './SurveyStatsPieChart';

export default function SurveyStatsYesNo({
  question,
}: {
  question: SurveyStatsResponseQuestion;
}) {
  const data = useMemo(() => {
    const results = [
      { name: 'No', quantity: 0 },
      { name: 'Yes', quantity: 0 },
    ];
    question.questionResponses.forEach((r) => {
      r.answerBoolean === true ? results[1].quantity++ : results[0].quantity++;
    });
    return results;
  }, [question]);

  return <SurveyStatsPieChart data={data} />;
}
