import {
  ActionIcon,
  Button,
  Card,
  Checkbox,
  Group,
  NativeSelect,
  Radio,
  RadioGroup,
  SegmentedControl,
  Stack,
  Textarea,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { motion } from 'framer-motion';
import React, { memo, useState } from 'react';
import { CaretDown, CaretUp, Trash } from 'tabler-icons-react';
import { useDebouncedCallback } from 'use-debounce';
import { EditQuestionData, QuestionFE } from '../api/question/question.schema';
import useCreateMultipleChoiceOption from '../hooks/useCreateMultipleChoiceOption';
import useDeleteQuestion from '../hooks/useDeleteQuestion';
import useEditQuestion from '../hooks/useEditQuestion';
import useReorderQuestion from '../hooks/useReorderQuestion';
import { QuestionTypeString } from '../types/questionType';
import animations from '../utils/framer-animations';
import EditSurveyMultipleChoiceOption from './EditSurveyMultipleChoiceOption';
import DeleteModal from './modals/DeleteModal';

type Props = {
  index: number;
  surveyId: string;
  question: QuestionFE;
  questionCount: number;
};

const EditSurveyQuestion = memo((props: Props) => {
  const theme = useMantineTheme();

  const xs = useMediaQuery('(max-width: 576px)');

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const [questionText, setQuestionText] = useState<string>(
    props.question.question
  );
  const [questionDetails, setQuestionDetails] = useState<string>(
    props.question.details
  );

  const editQuestion = useEditQuestion({
    surveyId: props.surveyId,
    questionIndex: props.index,
    questionId: props.question.id,
  });
  const deleteQuestion = useDeleteQuestion({
    surveyId: props.surveyId,
    questionIndex: props.index,
    questionId: props.question.id,
  });
  const reorderQuestion = useReorderQuestion({
    surveyId: props.surveyId,
    questionIndex: props.index,
    questionId: props.question.id,
  });
  const createMultipleChoiceOption = useCreateMultipleChoiceOption({
    surveyId: props.surveyId,
    questionId: props.question.id,
  });

  const debouncedEditQuestionText = useDebouncedCallback(
    (data: EditQuestionData) => editQuestion.mutate(data),
    1000
  );
  const debouncedEditQuestionDetails = useDebouncedCallback(
    (data: EditQuestionData) => editQuestion.mutate(data),
    1000
  );

  const handleEditQuestionName = (e: React.FormEvent<HTMLInputElement>) => {
    setQuestionText(e.currentTarget.value);
    debouncedEditQuestionText({ question: e.currentTarget.value });
  };

  const handleEditQuestionDetails = (e: React.FormEvent<HTMLInputElement>) => {
    setQuestionDetails(e.currentTarget.value);
    debouncedEditQuestionDetails({ details: e.currentTarget.value });
  };

  return (
    <>
      <DeleteModal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title='Delete Question'
        text='Are you sure? The question will be deleted permanently.'
        onClickDelete={() => deleteQuestion.mutate()}
      />
      <Card shadow='lg' radius='md' p='md' withBorder>
        <motion.div layout style={{ margin: '-16px', padding: '0 0 16px 0' }}>
          <Card.Section
            style={{
              backgroundColor:
                theme.colorScheme === 'light'
                  ? // ? theme.colors.green[0]
                    '#f1fff1'
                  : '#001b00',
              padding: '16px',
              marginBottom: '16px',
            }}
          >
            <Group style={{ justifyContent: 'space-between' }}>
              <Title order={3}>Question {props.index + 1}</Title>
              <Group>
                <ActionIcon
                  variant='default'
                  size='lg'
                  disabled={props.index === 0}
                  onClick={() => {
                    reorderQuestion.mutate({ order: props.index - 1 });
                  }}
                >
                  <CaretUp />
                </ActionIcon>
                <ActionIcon
                  variant='default'
                  size='lg'
                  disabled={props.index >= props.questionCount - 1}
                  onClick={() => {
                    reorderQuestion.mutate({ order: props.index + 1 });
                  }}
                >
                  <CaretDown />
                </ActionIcon>
                <ActionIcon
                  variant='filled'
                  color='red'
                  size='lg'
                  onClick={() => setDeleteModalOpen(true)}
                >
                  <Trash />
                </ActionIcon>
              </Group>
            </Group>
          </Card.Section>
        </motion.div>
        <Stack sx={{ flexGrow: 1 }}>
          <motion.div layout key={`options-${props.question.id}`}>
            <Stack sx={{ flexGrow: 1 }}>
              <Checkbox
                label='Required'
                checked={props.question.isRequired}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  editQuestion.mutate({
                    isRequired: e.currentTarget.checked,
                  });
                }}
              />
              <TextInput
                label='Question'
                required
                placeholder='Your question text'
                value={questionText}
                onChange={handleEditQuestionName}
              />
              <TextInput
                label='Details'
                placeholder='(optional)'
                value={questionDetails}
                onChange={handleEditQuestionDetails}
              />
              <NativeSelect
                label='Question Type'
                data={Object.values(QuestionTypeString)}
                // The 'value' and 'onChange' are like this due to limitations in Prisma's enums
                // we're mapping the values to a separate object which contains the 'nice' string names
                value={QuestionTypeString[props.question.questionType]}
                onChange={(e: React.FormEvent<HTMLSelectElement>) => {
                  editQuestion.mutate({
                    questionType: (
                      Object.keys(
                        QuestionTypeString
                      ) as (keyof typeof QuestionTypeString)[]
                    ).find(
                      (key) => QuestionTypeString[key] === e.currentTarget.value
                    ),
                  });
                }}
              />
            </Stack>
          </motion.div>
          {props.question.questionType === 'multipleChoiceMultiple' ||
          props.question.questionType === 'multipleChoiceSingle' ? (
            <>
              <motion.div key='title' layout>
                <Title order={4}>Answer Options</Title>
              </motion.div>
              {props.question.multipleChoiceOptions.map((mcOption, index) => (
                <motion.div key={mcOption.id} layout {...animations}>
                  <EditSurveyMultipleChoiceOption
                    key={mcOption.id}
                    index={index}
                    questionIndex={props.index}
                    questionId={props.question.id}
                    questionType={props.question.questionType}
                    surveyId={props.surveyId}
                    option={mcOption}
                    optionCount={props.question.multipleChoiceOptions.length}
                  />
                </motion.div>
              ))}
              <motion.div key='addAnswerOptionButton' layout {...animations}>
                <Button
                  onClick={() => createMultipleChoiceOption.mutate()}
                  fullWidth
                >
                  Add Answer Option
                </Button>
              </motion.div>
            </>
          ) : props.question.questionType === 'textResponse' ? (
            <Textarea
              disabled
              placeholder='Respondents will be able to type whatever they want'
            />
          ) : props.question.questionType === 'zeroToTen' ? (
            <SegmentedControl
              disabled
              fullWidth
              defaultValue='-1'
              orientation={xs ? 'vertical' : 'horizontal'}
              data={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
            />
          ) : props.question.questionType === 'yesNoBoolean' ? (
            <RadioGroup orientation='vertical'>
              <Radio value='yes' label='Yes' disabled />
              <Radio value='no' label='No' disabled />
            </RadioGroup>
          ) : null}
        </Stack>
      </Card>
    </>
  );
});

EditSurveyQuestion.displayName = 'EditSurveyName';

export default EditSurveyQuestion;
