import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { QuestionFE, ReorderQuestionData } from '../backend/question/question.schema';
import { SurveyFE } from '../backend/survey/survey.schema';
import { QueryKeys } from '../types/queryKeys';

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
    (data: ReorderQuestionData) => {
      return axios.patch(`/api/question/reorder/${questionId}`, {
        order: data.order,
      });
    },
    {
      onError: (e: any) => window.alert(e),
      onMutate: (data) => {
        queryClient.cancelQueries([QueryKeys.survey, surveyId]);
        const oldSurvey: SurveyFE | undefined =
          queryClient.getQueryData([QueryKeys.survey, surveyId]);
        if (oldSurvey) {
          const oldOrder = oldSurvey.questions[questionIndex].order;
          if (data.order > oldOrder) {
            // -1 to order of items with order: gt oldorder, lte neworder
            const otherMovedItems = oldSurvey.questions
              .filter(
                (question) =>
                  question.order > oldOrder && question.order <= data.order
              )
              .map((question) => {
                return { ...question, order: question.order - 1 };
              });
            // change order of the item we're actually moving
            const movedQuestion = {
              ...oldSurvey.questions[questionIndex],
              order: data.order,
            };
            // rebuild survey object with new questions
            queryClient.setQueryData([QueryKeys.survey, oldSurvey.id], {
              ...oldSurvey,
              questions: ([] as QuestionFE[]).concat(
                // the lower stuff
                oldSurvey.questions.slice(0, oldOrder),
                // the stuff we moved
                ...otherMovedItems,
                movedQuestion,
                // everything after the stuff we moved
                oldSurvey.questions.slice(data.order + 1)
              ),
            });
          }
          if (data.order < oldOrder) {
            // +1 to order of items with order: lt oldorder, gte newOrder
            const otherMovedItems = oldSurvey.questions
              .filter(
                (question) =>
                  question.order < oldOrder && question.order >= data.order
              )
              .map((question) => {
                return { ...question, order: question.order + 1 };
              });
            // change order of the item we're actually moving
            const movedQuestion = {
              ...oldSurvey.questions[questionIndex],
              order: data.order,
            };
            // rebuild survey object with new questions
            queryClient.setQueryData([QueryKeys.survey, oldSurvey.id], {
              ...oldSurvey,
              questions: ([] as QuestionFE[]).concat(
                // the lower stuff
                oldSurvey.questions.slice(0, data.order),
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
        queryClient.invalidateQueries([QueryKeys.survey, surveyId]);
      },
    }
  );
};

export default useReorderQuestion;
