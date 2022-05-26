import { Button, Radio } from '@mantine/core';
import React, { useState } from 'react';
import { SurveyQuestionWithResponses } from '../../backend/surveyParticipation/surveyParticipation.schema';
import useDeleteMultipleChoiceOptions from '../../hooks/surveyParticipation/useDeleteMultipleChoiceOptions';
import useToggleMCSItem from '../../hooks/surveyParticipation/useToggleMCSItem';

type Props = {
  question: SurveyQuestionWithResponses;
  surveyId: string;
  questionIndex: number;
};

const TakeSurveyMCSResponse = (props: Props) => {
  const toggleMCSItemMutation = useToggleMCSItem({
    surveyId: props.surveyId,
  });

  const deleteMultipleChoiceOptionsMutation = useDeleteMultipleChoiceOptions({
    surveyId: props.surveyId,
  });

  const [answerBooleans, setAnswerBooleans] = useState<boolean[]>(
    props.question.multipleChoiceOptions.map((option) =>
      option.multipleChoiceOptionSelections[0]
        ? option.multipleChoiceOptionSelections[0].selected
        : false
    )
  );

  function setAnswerTrueAtIndex(index: number) {
    const newOptions: boolean[] = Array(
      props.question.multipleChoiceOptions.length
    );
    newOptions[index] = true;
    setAnswerBooleans(newOptions);
  }

  function atLeastOneTrue(question: SurveyQuestionWithResponses) {
    question.multipleChoiceOptions.forEach((option) => {
      if (option.multipleChoiceOptionSelections[0]?.selected === true) {
        return true;
      }
    });
    return false;
  }

  return (
    <>
      {props.question.multipleChoiceOptions.map((option, optionIndex) => (
        <Radio
          key={option.id}
          value={option.name}
          label={option.name}
          onClick={() => {
            setAnswerTrueAtIndex(optionIndex);
            toggleMCSItemMutation.mutate({
              selected: option.multipleChoiceOptionSelections[0]
                ? option.multipleChoiceOptionSelections[0].selected
                : true,
              questionIndex: props.questionIndex,
              optionId: option.id,
              optionIndex,
            });
          }}
          checked={answerBooleans[optionIndex] || false}
        />
      ))}
      {!props.question.isRequired && (
        <div>
          <Button
            size='xs'
            variant='outline'
            onClick={() => {
              setAnswerBooleans(
                Array(props.question.multipleChoiceOptions.length).fill(false)
              );
              deleteMultipleChoiceOptionsMutation.mutate({
                questionId: props.question.id,
                questionIndex: props.questionIndex,
              });
            }}
            disabled={atLeastOneTrue(props.question)}
          >
            Remove answer
          </Button>
        </div>
      )}
    </>
  );
};

export default TakeSurveyMCSResponse;
