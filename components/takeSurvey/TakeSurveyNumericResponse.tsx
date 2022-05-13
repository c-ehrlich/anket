import { Button, SegmentedControl, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { UpdateQuestionResponseRequest } from '../../api/questionResponse/questionResponse.schema';
import { SurveyQuestionWithResponses } from '../../api/surveyParticipation/surveyParticipation.schema';
import useDeleteQuestionResponse from '../../hooks/surveyParticipation/useDeleteQuestionResponse';
import useUpsertQuestionResponse from '../../hooks/surveyParticipation/useUpsertQuestionResponse';

interface TakeSurveyNumericResponseProps {
  surveyId: string;
  question: SurveyQuestionWithResponses;
  questionIndex: number;
  surveyParticipationId: string;
  answerNumeric: number;
}
const TakeSurveyNumericResponse = (props: TakeSurveyNumericResponseProps) => {
  const deleteQuestionResponseMutation = useDeleteQuestionResponse({
    surveyId: props.surveyId,
  });

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
      questionId: props.question.id,
      surveyParticipationId: props.surveyParticipationId,
      answerNumeric: valueNumber,
    });
  };

  useEffect(() => {
    setAnswerNumeric(props.answerNumeric);
  }, [props.answerNumeric, setAnswerNumeric]);

  return (
    <Stack>
      {/* TODO:
      
        * This is a dirty hack and doesn't work for people on screen readers
        * because we're just hiding stuff with opacity.
        * 
        * The reason the SegmentedControl is an issue is because there's no way to completely
        * deselect once a value has been selected - not even by setting it to -1, null, etc.
        * 
        * Rebuild this in the future using a heavily modified RadioGroup or something */}
      <SegmentedControl
        fullWidth
        value={String(answerNumeric)}
        orientation={xs ? 'vertical' : 'horizontal'}
        data={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
        onChange={handleEditResponseNumeric}
        styles={{
          active: {
            opacity: answerNumeric !== null && answerNumeric >= 0 ? '1' : '0',
          },
        }}
      />
      <div>
      <Button
          size='xs'
          variant='outline'
          onClick={() => {
            setAnswerNumeric(-1);
            deleteQuestionResponseMutation.mutate({
              questionResponseId: props.question.questionResponses[0].id,
              questionIndex: props.questionIndex,
            });
          }}
          disabled={answerNumeric === -1}
        >
          Remove answer
        </Button>
      </div>
    </Stack>
  );
};

export default TakeSurveyNumericResponse;
