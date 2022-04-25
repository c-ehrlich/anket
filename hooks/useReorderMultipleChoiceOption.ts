import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { QuestionResponse } from '../api/question/question.schema';
import { CreateDefaultSurveyResponse } from '../api/survey/survey.schema';

const useReorderMultipleChoiceOption = ({
  optionId,
  optionIndex,
  questionIndex,
  surveyId,
}: {
  optionId: string;
  optionIndex: number;
  questionIndex: number;
  surveyId: string;
}) => {
  const queryClient = useQueryClient();

  return useMutation(
    ['survey', surveyId],
    (newOrder: number) => {
      return axios.patch(`/api/multiplechoiceoption/reorder/${optionId}`, {
        order: newOrder,
      });
    },
    {
      onError: (e: any) => window.alert(e),
      onMutate: (newOrder) => {
        queryClient.cancelQueries(['survey', surveyId]);
        const oldSurvey: CreateDefaultSurveyResponse | undefined =
          queryClient.getQueryData(['survey', surveyId]);
        if (oldSurvey) {
          const oldOrder =
            oldSurvey.questions[questionIndex].multipleChoiceOptions[
              optionIndex
            ].order;
          if (newOrder > oldOrder) {
            // -1 to order of items with oder: gt oldOrder, lte newOrder
            const otherMovedItems = oldSurvey.questions[
              questionIndex
            ].multipleChoiceOptions
              .filter(
                (mcItem) => mcItem.order > oldOrder && mcItem.order <= newOrder
              )
              .map((mcItem) => {
                return { ...mcItem, order: mcItem.order - 1 };
              });
            // change order of the item we're actually moving
            const movedMultipleChoiceOption = {
              ...oldSurvey.questions[questionIndex].multipleChoiceOptions[
                optionIndex
              ],
              order: newOrder,
            };
            // rebuild survey object with new answerOptions
            queryClient.setQueryData(['survey', oldSurvey.id], {
              ...oldSurvey,
              questions: ([] as QuestionResponse[]).concat(
                oldSurvey.questions.slice(0, questionIndex),
                {
                  ...oldSurvey.questions[questionIndex],
                  multipleChoiceOptions: [
                    ...oldSurvey.questions[
                      questionIndex
                    ].multipleChoiceOptions.slice(0, oldOrder),
                    ...otherMovedItems,
                    movedMultipleChoiceOption,
                    ...oldSurvey.questions[
                      questionIndex
                    ].multipleChoiceOptions.slice(newOrder + 1),
                  ],
                },
                oldSurvey.questions.slice(questionIndex + 1)
              ),
            });
          }
          if (newOrder < oldOrder) {
            // +1 to order of items with order: lt oldOrder, gte newOrder
            const otherMovedItems = oldSurvey.questions[
              questionIndex
            ].multipleChoiceOptions
              .filter(
                (mcItem) => mcItem.order < oldOrder && mcItem.order >= newOrder
              )
              .map((mcItem) => {
                return { ...mcItem, order: mcItem.order + 1 };
              });
            // change order of the item we're actually moving
            const movedMultipleChoiceOption = {
              ...oldSurvey.questions[questionIndex].multipleChoiceOptions[
                optionIndex
              ],
              order: newOrder,
            };
            // rebuild survey object with new questions
            queryClient.setQueryData(['survey', oldSurvey.id], {
              ...oldSurvey,
              questions: ([] as QuestionResponse[]).concat(
                oldSurvey.questions.slice(0, questionIndex),
                {
                  ...oldSurvey.questions[questionIndex],
                  multipleChoiceOptions: [
                    ...oldSurvey.questions[
                      questionIndex
                    ].multipleChoiceOptions.slice(0, newOrder),
                    movedMultipleChoiceOption,
                    ...otherMovedItems,
                    ...oldSurvey.questions[
                      questionIndex
                    ].multipleChoiceOptions.slice(oldOrder + 1),
                  ],
                },
                oldSurvey.questions.slice(questionIndex + 1)
              ),
            });
          }
          // if they're the same, we don't need to do anything
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(['survey', surveyId]);
      },
    }
  );
};

export default useReorderMultipleChoiceOption;
