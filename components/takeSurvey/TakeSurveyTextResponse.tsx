import { Textarea } from '@mantine/core';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { UpdateQuestionResponseRequest } from '../../backend/questionResponse/questionResponse.schema';
import useUpsertQuestionResponse from '../../hooks/surveyParticipation/useUpsertQuestionResponse';

interface TakeSurveyTextResponseProps {
  surveyId: string;
  questionId: string;
  surveyParticipationId: string;
  answerText: string;
}
const TakeSurveyTextResponse = (props: TakeSurveyTextResponseProps) => {
  const [answerText, setAnswerText] = useState<string>(props.answerText);
  const upsertQuestionResponseMutation = useUpsertQuestionResponse({
    surveyId: props.surveyId,
  });

  const debouncedEditResponseText = useDebouncedCallback(
    (data: UpdateQuestionResponseRequest) =>
      upsertQuestionResponseMutation.mutate(data),
    1000
  );

  const handleEditResponseText = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setAnswerText(e.currentTarget.value);
    debouncedEditResponseText({
      questionId: props.questionId,
      surveyParticipationId: props.surveyParticipationId,
      answerText: e.currentTarget.value,
    });
  };

  return (
    <Textarea
      autosize
      minRows={3}
      placeholder='Type your response here'
      value={answerText}
      onChange={handleEditResponseText}
    />
  );
};

export default TakeSurveyTextResponse;
