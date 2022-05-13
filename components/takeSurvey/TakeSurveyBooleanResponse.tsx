import { RadioGroup, Radio, Stack, Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { UpdateQuestionResponseRequest } from '../../api/questionResponse/questionResponse.schema';
import { SurveyQuestionWithResponses } from '../../api/surveyParticipation/surveyParticipation.schema';
import useDeleteQuestionResponse from '../../hooks/surveyParticipation/useDeleteQuestionResponse';
import useUpsertQuestionResponse from '../../hooks/surveyParticipation/useUpsertQuestionResponse';

interface TakeSurveyBooleanResponseProps {
  surveyId: string;
  questionIndex: number;
  question: SurveyQuestionWithResponses;
  surveyParticipationId: string;
  answerBoolean: boolean | null;
}
const TakeSurveyBooleanResponse = (props: TakeSurveyBooleanResponseProps) => {
  const deleteQuestionResponseMutation = useDeleteQuestionResponse({
    surveyId: props.surveyId,
  });

  const [answerBoolean, setAnswerBoolean] = useState<boolean | null>(
    props.answerBoolean
  );
  const upsertQuestionResponseMutation = useUpsertQuestionResponse({
    surveyId: props.surveyId,
  });

  const debouncedEditResponseBoolean = useDebouncedCallback(
    (data: UpdateQuestionResponseRequest) =>
      upsertQuestionResponseMutation.mutate(data),
    1000
  );

  const handleEditResponseBoolean = (value: string) => {
    const boolValue = value === 'yes' ? true : false;
    setAnswerBoolean(boolValue);
    debouncedEditResponseBoolean({
      questionId: props.question.id,
      surveyParticipationId: props.surveyParticipationId,
      answerBoolean: boolValue,
    });
  };

  useEffect(() => {
    setAnswerBoolean(props.answerBoolean);
  }, [props.answerBoolean, setAnswerBoolean]);

  return (
    <Stack>
      <RadioGroup
        orientation='vertical'
        onChange={handleEditResponseBoolean}
        value={
          answerBoolean === true ? 'yes' : answerBoolean === false ? 'no' : ''
        }
      >
        <Radio value='yes' label='Yes' />
        <Radio value='no' label='No' />
      </RadioGroup>
      {!props.question.isRequired && (
        <div>
          <Button
            size='xs'
            variant='outline'
            onClick={() => {
              setAnswerBoolean(null);
              deleteQuestionResponseMutation.mutate({
                questionResponseId: props.question.questionResponses[0].id,
                questionIndex: props.questionIndex,
              });
            }}
            disabled={answerBoolean === null || answerBoolean === undefined}
          >
            Remove answer
          </Button>
        </div>
      )}
    </Stack>
  );
};

export default TakeSurveyBooleanResponse;
