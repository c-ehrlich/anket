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
import axios from 'axios';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { CaretDown, CaretUp, Trash } from 'tabler-icons-react';
import { QuestionResponse } from '../api/question/question.schema';
import { CreateDefaultSurveyResponse } from '../api/survey/survey.schema';
import useGetSingleSurvey from '../hooks/useGetSingleSurvey';
import { QuestionTypeString } from '../types/questionType';
import EditSurveyAnswerOption from './EditSurveyAnswerOption';

type Props = { index: number; surveyId: string };

const EditSurveyQuestion = (props: Props) => {
  const queryClient = useQueryClient();
  const survey = useGetSingleSurvey(props.surveyId);
  const theme = useMantineTheme();

  const xs = useMediaQuery('(max-width: 576px)');

  const editQuestionMutation = useMutation(
    ['survey', props.surveyId],
    (
      data: Partial<
        Pick<
          QuestionResponse,
          'question' | 'details' | 'isRequired' | 'questionType'
        >
      >
    ) => {
      return axios.patch(
        `/api/question/${survey.data?.questions[props.index].id}`,
        data
      );
    },
    {
      onError: (e: any) => window.alert(e),
      onMutate: (data) => {
        queryClient.cancelQueries(['survey', props.surveyId]);
        const oldSurvey: CreateDefaultSurveyResponse | undefined =
          queryClient.getQueryData(['survey', props.surveyId]);
        if (oldSurvey) {
          queryClient.setQueryData(['survey', props.surveyId], {
            ...oldSurvey,
            questions: ([] as QuestionResponse[]).concat(
              oldSurvey.questions.slice(0, props.index),
              { ...oldSurvey.questions[props.index], ...data },
              oldSurvey.questions.slice(props.index + 1)
            ),
          });
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(['survey', props.surveyId]);
      },
    }
  );

  const deleteQuestionMutation = useMutation(
    ['survey', props.surveyId],
    () => {
      return axios.delete(
        `/api/question/${survey.data?.questions[props.index].id}`
      );
    },
    {
      onError: (e: any) => window.alert(e),
      onMutate: () => {
        queryClient.cancelQueries(['survey', props.surveyId]);
        const oldSurvey: CreateDefaultSurveyResponse | undefined =
          queryClient.getQueryData(['survey', props.surveyId]);
        if (oldSurvey) {
          queryClient.setQueryData(['survey', props.surveyId], {
            ...oldSurvey,
            questions: ([] as QuestionResponse[]).concat(
              oldSurvey.questions.slice(0, props.index),
              oldSurvey.questions.slice(props.index + 1)
            ),
          });
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(['survey', props.surveyId]);
      },
    }
  );

  const reorderQuestionMutation = useMutation(
    ['survey', survey.data!.id],
    (newOrder: number) => {
      return axios.patch(
        `/api/question/reorder/${survey.data?.questions[props.index].id}`,
        {
          order: newOrder,
        }
      );
    },
    {
      onError: (e: any) => window.alert(e),
      onMutate: (newOrder) => {
        queryClient.cancelQueries(['survey', props.surveyId]);
        const oldSurvey: CreateDefaultSurveyResponse | undefined =
          queryClient.getQueryData(['survey', props.surveyId]);
        if (oldSurvey) {
          const oldOrder = oldSurvey.questions[props.index].order;
          if (newOrder > oldOrder) {
            // -1 to order of items with order: gt oldorder, lte neworder
            const otherMovedItems = oldSurvey.questions
              .filter(
                (question) =>
                  question.order > oldOrder && question.order <= newOrder
              )
              .map((question) => {
                return { ...question, order: question.order - 1 };
              });
            // change order of the item we're actually moving
            const movedQuestion = {
              ...oldSurvey.questions[props.index],
              order: newOrder,
            };
            // rebuild survey object with new questions
            queryClient.setQueryData(['survey', oldSurvey.id], {
              ...oldSurvey,
              questions: ([] as QuestionResponse[]).concat(
                // the lower stuff
                oldSurvey.questions.slice(0, oldOrder),
                // the stuff we moved
                ...otherMovedItems,
                movedQuestion,
                // everything after the stuff we moved
                oldSurvey.questions.slice(newOrder + 1)
              ),
            });
          }
          if (newOrder < oldOrder) {
            // +1 to order of items with order: lt oldorder, gte newOrder
            const otherMovedItems = oldSurvey.questions
              .filter(
                (question) =>
                  question.order < oldOrder && question.order >= newOrder
              )
              .map((question) => {
                return { ...question, order: question.order + 1 };
              });
            // change order of the item we're actually moving
            const movedQuestion = {
              ...oldSurvey.questions[props.index],
              order: newOrder,
            };
            // rebuild survey object with new questions
            queryClient.setQueryData(['survey', oldSurvey.id], {
              ...oldSurvey,
              questions: ([] as QuestionResponse[]).concat(
                // the lower stuff
                oldSurvey.questions.slice(0, newOrder),
                // the stuff we moved
                movedQuestion,
                ...otherMovedItems,
                // everything after the stuff we moved
                oldSurvey.questions.slice(oldOrder + 1)
              ),
            });
          }
          // if they're the same, we don't need to do anything
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(['survey', props.surveyId]);
      },
    }
  );

  const createMultipleChoiceOptionMutation = useMutation(
    ['survey', props.surveyId],
    () => {
      return axios.post('/api/multiplechoiceoption', {
        questionId: survey.data?.questions[props.index].id,
      });
    },
    {
      onError: (e: any) => window.alert(e),
      onMutate: () => {
        // TODO: for the time being we're not doing optimistic updates here because
        // we're using the id for the element key in the frontend
        // and we don't have the id until we get a response from the server
        // we can't just use a bogus id because it messes with framer-motion
        // (or maybe we can? see if there is a way...)
      },
      onSettled: () => {
        queryClient.invalidateQueries(['survey', props.surveyId]);
      },
    }
  );

  return (
    <>
      {survey.isLoading ? (
        'Loading...'
      ) : survey.isError ? (
        'Error...'
      ) : !survey.isFetched ? (
        'Not yet fetched...'
      ) : !survey.data?.questions[props.index] ? (
        'That question does not exist'
      ) : (
        <Card shadow='lg' radius='md' p='md' withBorder>
          <Card.Section
            style={{
              backgroundColor:
                theme.colorScheme === 'light'
                  // ? theme.colors.green[0]
                  ? '#f1fff1'
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
                  disabled={props.index === 0}
                  onClick={() => {
                    reorderQuestionMutation.mutate(props.index - 1);
                  }}
                >
                  <CaretUp />
                </ActionIcon>
                <ActionIcon
                  variant='default'
                  disabled={props.index >= survey.data.questions.length - 1}
                  onClick={() => {
                    reorderQuestionMutation.mutate(props.index + 1);
                  }}
                >
                  <CaretDown />
                </ActionIcon>
                <ActionIcon
                  variant='default'
                  onClick={() => {
                    // TODO make user confirm in a modal first
                    deleteQuestionMutation.mutate();
                  }}
                >
                  <Trash />
                </ActionIcon>
              </Group>
            </Group>
          </Card.Section>
          <Stack sx={{ flexGrow: 1 }}>
            <Checkbox
              label='Required'
              checked={survey.data.questions[props.index].isRequired}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                editQuestionMutation.mutate({
                  isRequired: e.currentTarget.checked,
                });
              }}
            />
            <TextInput
              label='Question'
              required
              placeholder='Your question text'
              value={survey.data.questions[props.index].question}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                editQuestionMutation.mutate({
                  question: e.currentTarget.value,
                });
              }}
            />
            <TextInput
              label='Details'
              placeholder='(optional)'
              value={survey.data.questions[props.index].details}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                editQuestionMutation.mutate({
                  details: e.currentTarget.value,
                });
              }}
            />

            <NativeSelect
              label='Question Type'
              data={Object.values(QuestionTypeString)}
              // The 'value' and 'onChange' are like this due to limitations in Prisma's enums
              // we're mapping the values to a separate object which contains the 'nice' string names
              value={
                QuestionTypeString[
                  survey.data.questions[props.index].questionType
                ]
              }
              onChange={(e: React.FormEvent<HTMLSelectElement>) => {
                editQuestionMutation.mutate({
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
            {survey.data.questions[props.index].questionType ===
              'multipleChoiceMultiple' ||
            survey.data.questions[props.index].questionType ===
              'multipleChoiceSingle' ? (
              <>
                <Title order={4}>Answer Options</Title>
                {survey.data.questions[props.index].multipleChoiceOptions.map(
                  (mcOption, index) => (
                    <EditSurveyAnswerOption
                      key={mcOption.id}
                      index={index}
                      questionIndex={props.index}
                      questionId={survey.data.questions[props.index].id}
                      surveyId={props.surveyId}
                    />
                  )
                )}
                <Button
                  onClick={() => createMultipleChoiceOptionMutation.mutate()}
                >
                  Add Answer Option
                </Button>
              </>
            ) : survey.data.questions[props.index].questionType ===
              'textResponse' ? (
              <Textarea
                disabled
                placeholder='Respondents will be able to type whatever they want'
              />
            ) : survey.data.questions[props.index].questionType ===
              'zeroToTen' ? (
              <SegmentedControl
                disabled
                fullWidth
                defaultValue='-1'
                orientation={xs ? 'vertical' : 'horizontal'}
                data={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
              />
            ) : survey.data.questions[props.index].questionType ===
              'yesNoBoolean' ? (
              <RadioGroup orientation='vertical'>
                <Radio value='yes' label='Yes' disabled />
                <Radio value='no' label='No' disabled />
              </RadioGroup>
            ) : null}
          </Stack>
        </Card>
      )}
    </>
  );
};

export default EditSurveyQuestion;
