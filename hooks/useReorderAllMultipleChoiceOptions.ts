import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { ReorderAllMultipleChoiceOptionsData } from '../backend/multipleChoiceOption/multipleChoiceOption.schema';
import { QuestionFE } from '../backend/question/question.schema';
import { SurveyFE } from '../backend/survey/survey.schema';
import { QueryKeys } from '../types/queryKeys';

const useReorderAllMultipleChoiceOptions = ({
  questionId,
  questionIndex,
  surveyId,
}: {
  questionId: string;
  questionIndex: number;
  surveyId: string;
}) => {
  const queryClient = useQueryClient();

  return useMutation(
    [QueryKeys.survey, surveyId],
    async (data: ReorderAllMultipleChoiceOptionsData) => {
      await new Promise((res) => setTimeout(res, 1000));
      return axios.patch(
        `/api/multiplechoiceoption/reorderall/${questionId}`,
        data
      );
    },
    {
      onError: (e: any) => window.alert(e),
      onMutate: (data) => {
        console.log(data);
        queryClient.cancelQueries([QueryKeys.survey, surveyId]);
        const oldSurvey: SurveyFE | undefined = queryClient.getQueryData([
          QueryKeys.survey,
          surveyId,
        ]);
        if (oldSurvey) {
          queryClient.setQueryData([QueryKeys.survey, surveyId], {
            ...oldSurvey,
            questions: ([] as QuestionFE[]).concat(
              oldSurvey.questions.slice(0, questionIndex),
              {
                ...oldSurvey.questions[questionIndex],
                multipleChoiceOptions: data,
              },
              oldSurvey.questions.slice(questionIndex + 1)
            ),
          });
        }
      },
      // TODO figure out how to not make reordering skippy without removing the
      // onSettled function
      // onSettled: () => queryClient.invalidateQueries([QueryKeys.survey, surveyId]),
    }
  );
};

export default useReorderAllMultipleChoiceOptions;
