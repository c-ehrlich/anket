import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { QuestionResponse } from '../api/question/question.schema';
import { CreateDefaultSurveyResponse } from '../api/survey/survey.schema';

const useReorderQuestion = ({
  surveyId,
  questionId,
  questionIndex,
}: {
  surveyId: string;
  questionId: string;
  questionIndex: number;
}) => {
  const queryClient = useQueryClient();

  return useMutation(
    [],
    (newOrder: number) => {
      return axios.patch(`/api/question/reorder/${questionId}`, {
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
          const oldOrder = oldSurvey.questions[questionIndex].order;
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
              ...oldSurvey.questions[questionIndex],
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
              ...oldSurvey.questions[questionIndex],
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
        queryClient.invalidateQueries(['survey', surveyId]);
      },
    }
  );
};

export default useReorderQuestion;
