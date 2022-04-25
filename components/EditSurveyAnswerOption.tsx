import { ActionIcon, Checkbox, Group, Radio, TextInput } from '@mantine/core';
import React from 'react';
import useGetSingleSurvey from '../hooks/useGetSingleSurvey';
import { CaretDown, CaretUp, Trash } from 'tabler-icons-react';
import useEditMultipleChoiceOption from '../hooks/useEditMultipleChoiceOption';
import useDeleteMultipleChoiceOption from '../hooks/useDeleteMultipleChoiceOption';
import useReorderMultipleChoiceOption from '../hooks/useReorderMultipleChoiceOption';

type Props = {
  index: number;
  questionIndex: number;
  questionId: string;
  surveyId: string;
};

const EditSurveyAnswerOption = (props: Props) => {
  const survey = useGetSingleSurvey(props.surveyId);
  const question = survey.data?.questions[props.questionIndex];
  const option = question?.multipleChoiceOptions[props.index];

  const editMultipleChoiceOption = useEditMultipleChoiceOption({
    surveyId: props.surveyId,
    optionId: question!.multipleChoiceOptions[props.index].id,
    optionIndex: props.index,
    questionIndex: props.questionIndex,
  });

  const deleteMultipleChoiceOption = useDeleteMultipleChoiceOption({
    surveyId: props.surveyId,
    optionId: question!.multipleChoiceOptions[props.index].id,
    optionIndex: props.index,
    questionIndex: props.questionIndex,
  });

  const reorderMultipleChoiceOptionMutation = useReorderMultipleChoiceOption({
    optionIndex: props.index,
    questionIndex: props.questionIndex,
    surveyId: props.surveyId,
  });

  return (
    <>
      {survey.isLoading ? (
        'Loading...'
      ) : survey.isError ? (
        'Error...'
      ) : !survey.isFetched ? (
        'Not yet fetched...'
      ) : !survey.data?.questions[props.questionIndex].multipleChoiceOptions[
          props.index
        ] ? (
        <>
          {console.log(`don't have id: ${option?.id}, name: ${option?.name}`)}
        </>
      ) : (
        <Group grow={false} style={{ width: '100%' }}>
          {question!.questionType === 'multipleChoiceMultiple' ? (
            <Checkbox disabled />
          ) : question!.questionType === 'multipleChoiceSingle' ? (
            <Radio disabled value='' />
          ) : null}
          <TextInput
            style={{ flexGrow: 1 }}
            placeholder='Answer Text'
            value={option!.name}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              editMultipleChoiceOption.mutate({
                name: e.currentTarget.value,
              });
            }}
          />
          <Group>
            <ActionIcon
              variant='default'
              disabled={props.index === 0}
              onClick={() => {
                console.log(props.index);
                reorderMultipleChoiceOptionMutation.mutate(props.index - 1);
              }}
            >
              <CaretUp />
            </ActionIcon>
            <ActionIcon
              variant='default'
              disabled={
                props.index >= question!.multipleChoiceOptions.length - 1
              }
              onClick={() => {
                console.log(props.index);
                reorderMultipleChoiceOptionMutation.mutate(props.index + 1);
              }}
            >
              <CaretDown />
            </ActionIcon>
            <ActionIcon
              variant='default'
              onClick={() => deleteMultipleChoiceOption.mutate()}
            >
              <Trash />
            </ActionIcon>
          </Group>
        </Group>
      )}
    </>
  );
};

export default EditSurveyAnswerOption;
