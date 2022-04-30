import { ActionIcon, Checkbox, Group, Radio, TextInput } from '@mantine/core';
import React, { useState, memo } from 'react';
import { CaretDown, CaretUp, GridDots, Trash } from 'tabler-icons-react';
import useEditMultipleChoiceOption from '../hooks/useEditMultipleChoiceOption';
import useDeleteMultipleChoiceOption from '../hooks/useDeleteMultipleChoiceOption';
import useReorderMultipleChoiceOption from '../hooks/useReorderMultipleChoiceOption';
import {
  EditMultipleChoiceOptionData,
  MultipleChoiceOptionFE,
} from '../api/multipleChoiceOption/multipleChoiceOption.schema';
import { QuestionType } from '@prisma/client';
import { useDebouncedCallback } from 'use-debounce';
import DeleteModal from './modals/DeleteModal';
import { Reorder, useDragControls } from 'framer-motion';

// TODO see if we can do this with less props
// For example we could pass a Pick<QuestionResponse> to get all the stuff from the question in one object
type Props = {
  index: number;
  questionIndex: number;
  questionId: string;
  surveyId: string;
  option: MultipleChoiceOptionFE;
  optionCount: number;
  questionType: QuestionType;
};

const EditSurveyMultipleChoiceOption = memo((props: Props) => {
  const controls = useDragControls();

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [multipleChoiceOptionText, setMultipleChoiceOptionText] =
    useState<string>(props.option.name);

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
    optionId: props.option.id,
    optionIndex: props.index,
    questionIndex: props.questionIndex,
    surveyId: props.surveyId,
  });

  const debouncedEditMultipleChoiceOption = useDebouncedCallback(
    (data: EditMultipleChoiceOptionData) =>
      editMultipleChoiceOption.mutate(data),
    1000
  );

  const handleEditMultipleChoiceOptionTitle = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    setMultipleChoiceOptionText(e.currentTarget.value);
    debouncedEditMultipleChoiceOption({ name: e.currentTarget.value });
  };

  return (
    <Reorder.Item
      as='div'
      key={props.option.id}
      value={props.option}
      dragListener={false}
      dragControls={controls}
    >
      <DeleteModal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title='Delete Answer Option'
        text='Are you sure? The answer option will be deleted permanently.'
        onClickDelete={() => deleteMultipleChoiceOption.mutate()}
      />
      <Group grow={false} style={{ width: '100%' }}>
        <ActionIcon
          className='reorder-handle'
          variant='transparent'
          size='lg'
          onPointerDown={(e: any) => controls.start(e)}
        >
          <GridDots />
        </ActionIcon>
        {props.questionType === 'multipleChoiceMultiple' ? (
          <Checkbox disabled />
        ) : props.questionType === 'multipleChoiceSingle' ? (
          <Radio disabled value='' />
        ) : null}
        <TextInput
          style={{ flexGrow: 1 }}
          placeholder='Answer Text'
          value={multipleChoiceOptionText}
          onChange={handleEditMultipleChoiceOptionTitle}
        />
        <ActionIcon
          color='red'
          variant='filled'
          size='lg'
          onClick={() => setDeleteModalOpen(true)}
        >
          <Trash />
        </ActionIcon>
      </Group>
    </Reorder.Item>
  );
});

EditSurveyMultipleChoiceOption.displayName = 'EditSurveyMultipleChoiceOption';

export default EditSurveyMultipleChoiceOption;
