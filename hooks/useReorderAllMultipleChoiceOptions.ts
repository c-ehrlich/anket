import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { ReorderAllMultipleChoiceOptionsData } from '../api/multipleChoiceOption/multipleChoiceOption.schema';
import { QuestionFE } from '../api/question/question.schema';
import { SurveyFE } from '../api/survey/survey.schema';

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
    ['survey', surveyId],
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
        queryClient.cancelQueries(['survey', surveyId]);
        const oldSurvey: SurveyFE | undefined = queryClient.getQueryData([
          'survey',
          surveyId,
        ]);
        if (oldSurvey) {
          queryClient.setQueryData(['survey', surveyId], {
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
      onSettled: () => queryClient.invalidateQueries(['survey', surveyId]),
    }
  );
};

export default useReorderAllMultipleChoiceOptions;
