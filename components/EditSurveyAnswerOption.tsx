import { ActionIcon, Checkbox, Group, Radio, TextInput } from '@mantine/core';
import React from 'react';
import { CaretDown, CaretUp, Trash } from 'tabler-icons-react';
import useEditMultipleChoiceOption from '../hooks/useEditMultipleChoiceOption';
import useDeleteMultipleChoiceOption from '../hooks/useDeleteMultipleChoiceOption';
import useReorderMultipleChoiceOption from '../hooks/useReorderMultipleChoiceOption';
import { MultipleChoiceOptionResponse } from '../api/multipleChoiceOption/multipleChoiceOption.schema';
import { QuestionType } from '@prisma/client';

// TODO see if we can do this with less props
type Props = {
  index: number;
  questionIndex: number;
  questionId: string;
  surveyId: string;
  option: MultipleChoiceOptionResponse;
  optionCount: number;
  questionType: QuestionType;
};

const EditSurveyAnswerOption = (props: Props) => {
  const editMultipleChoiceOption = useEditMultipleChoiceOption({
    surveyId: props.surveyId,
    optionId: props.option.id,
    optionIndex: props.index,
    questionIndex: props.questionIndex,
  });

  const deleteMultipleChoiceOption = useDeleteMultipleChoiceOption({
    surveyId: props.surveyId,
    optionId: props.option.id,
    optionIndex: props.index,
    questionIndex: props.questionIndex,
  });

  const reorderMultipleChoiceOptionMutation = useReorderMultipleChoiceOption({
    optionIndex: props.index,
    questionIndex: props.questionIndex,
    surveyId: props.surveyId,
  });

  return (
    <Group grow={false} style={{ width: '100%' }}>
      {props.questionType === 'multipleChoiceMultiple' ? (
        <Checkbox disabled />
      ) : props.questionType === 'multipleChoiceSingle' ? (
        <Radio disabled value='' />
      ) : null}
      <TextInput
        style={{ flexGrow: 1 }}
        placeholder='Answer Text'
        value={props.option!.name}
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
          disabled={props.index >= props.optionCount - 1}
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
  );
};

export default EditSurveyAnswerOption;
