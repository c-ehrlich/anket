import { ActionIcon, Checkbox, Group, Radio, TextInput } from '@mantine/core';
import React from 'react';
import useGetSingleSurvey from '../hooks/useGetSingleSurvey';
import { CreateDefaultSurveyResponse } from '../api/survey/survey.schema';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { QuestionResponse } from '../api/question/question.schema';
import { MultipleChoiceOptionResponse } from '../api/multipleChoiceOption/multipleChoiceOption.schema';
import { CaretDown, CaretUp, Trash } from 'tabler-icons-react';
import useEditMultipleChoiceOption from '../hooks/useEditMultipleChoiceOption';
import useDeleteMultipleChoiceOption from '../hooks/useDeleteMultipleChoiceOption';

type Props = {
  index: number;
  questionIndex: number;
  questionId: string;
  surveyId: string;
};

const EditSurveyAnswerOption = (props: Props) => {
  const survey = useGetSingleSurvey(props.surveyId);
  const queryClient = useQueryClient();
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
  })

  const reorderMultipleChoiceOptionMutation = useMutation(
    ['survey', props.surveyId],
    (newOrder: number) => {
      return axios.patch(`/api/multiplechoiceoption/reorder/${option!.id}`, {
        order: newOrder,
      });
    },
    {
      onError: (e: any) => window.alert(e),
      onMutate: (newOrder) => {
        queryClient.cancelQueries(['survey', props.surveyId]);
        const oldSurvey: CreateDefaultSurveyResponse | undefined =
          queryClient.getQueryData(['survey', props.surveyId]);
        if (oldSurvey) {
          const oldOrder =
            oldSurvey.questions[props.questionIndex].multipleChoiceOptions[
              props.index
            ].order;
          if (newOrder > oldOrder) {
            // -1 to order of items with oder: gt oldOrder, lte newOrder
            const otherMovedItems = oldSurvey.questions[
              props.questionIndex
            ].multipleChoiceOptions
              .filter(
                (mcItem) => mcItem.order > oldOrder && mcItem.order <= newOrder
              )
              .map((mcItem) => {
                return { ...mcItem, order: mcItem.order - 1 };
              });
            // change order of the item we're actually moving
            const movedMultipleChoiceOption = {
              ...oldSurvey.questions[props.questionIndex].multipleChoiceOptions[
                props.index
              ],
              order: newOrder,
            };
            // rebuild survey object with new answerOptions
            queryClient.setQueryData(['survey', oldSurvey.id], {
              ...oldSurvey,
              questions: ([] as QuestionResponse[]).concat(
                oldSurvey.questions.slice(0, props.questionIndex),
                {
                  ...oldSurvey.questions[props.questionIndex],
                  multipleChoiceOptions: [
                    ...oldSurvey.questions[
                      props.questionIndex
                    ].multipleChoiceOptions.slice(0, oldOrder),
                    ...otherMovedItems,
                    movedMultipleChoiceOption,
                    ...oldSurvey.questions[
                      props.questionIndex
                    ].multipleChoiceOptions.slice(newOrder + 1),
                  ],
                },
                oldSurvey.questions.slice(props.questionIndex + 1)
              ),
            });
          }
          if (newOrder < oldOrder) {
            // +1 to order of items with order: lt oldOrder, gte newOrder
            const otherMovedItems = oldSurvey.questions[
              props.questionIndex
            ].multipleChoiceOptions
              .filter(
                (mcItem) => mcItem.order < oldOrder && mcItem.order >= newOrder
              )
              .map((mcItem) => {
                return { ...mcItem, order: mcItem.order + 1 };
              });
            // change order of the item we're actually moving
            const movedMultipleChoiceOption = {
              ...oldSurvey.questions[props.questionIndex].multipleChoiceOptions[
                props.index
              ],
              order: newOrder,
            };
            // rebuild survey object with new questions
            queryClient.setQueryData(['survey', oldSurvey.id], {
              ...oldSurvey,
              questions: ([] as QuestionResponse[]).concat(
                oldSurvey.questions.slice(0, props.questionIndex),
                {
                  ...oldSurvey.questions[props.questionIndex],
                  multipleChoiceOptions: [
                    ...oldSurvey.questions[
                      props.questionIndex
                    ].multipleChoiceOptions.slice(0, newOrder),
                    movedMultipleChoiceOption,
                    ...otherMovedItems,
                    ...oldSurvey.questions[
                      props.questionIndex
                    ].multipleChoiceOptions.slice(oldOrder + 1),
                  ],
                },
                oldSurvey.questions.slice(props.questionIndex + 1)
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
