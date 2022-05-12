import { SegmentedControl } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { UpdateQuestionResponseRequest } from '../../api/questionResponse/questionResponse.schema';
import useUpsertQuestionResponse from '../../hooks/surveyParticipation/useUpsertQuestionResponse';

interface TakeSurveyNumericResponseProps {
  surveyId: string;
  questionId: string;
  surveyParticipationId: string;
  answerNumeric: number;
}
const TakeSurveyNumericResponse = (props: TakeSurveyNumericResponseProps) => {
  const xs = useMediaQuery('(max-width: 576px)');

  const [answerNumeric, setAnswerNumeric] = useState<number | null>(
    props.answerNumeric
  );
  const upsertQuestionResponseMutation = useUpsertQuestionResponse({
    surveyId: props.surveyId,
  });

  const debounceEditResponseNumeric = useDebouncedCallback(
    (data: UpdateQuestionResponseRequest) =>
      upsertQuestionResponseMutation.mutate(data),
    1000
  );

  const handleEditResponseNumeric = (value: string) => {
    const valueNumber = Number(value);
    setAnswerNumeric(valueNumber);
    debounceEditResponseNumeric({
      questionId: props.questionId,
      surveyParticipationId: props.surveyParticipationId,
      answerNumeric: valueNumber,
    });
  };

  return (
    <SegmentedControl
      fullWidth
      value={String(answerNumeric)}
      orientation={xs ? 'vertical' : 'horizontal'}
      data={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
      onChange={handleEditResponseNumeric}
    />
  );
};

export default TakeSurveyNumericResponse;
