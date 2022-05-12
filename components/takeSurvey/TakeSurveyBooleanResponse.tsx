import { RadioGroup, Radio } from "@mantine/core";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { UpdateQuestionResponseRequest } from "../../api/questionResponse/questionResponse.schema";
import useUpsertQuestionResponse from "../../hooks/surveyParticipation/useUpsertQuestionResponse";

interface TakeSurveyBooleanResponseProps {
  surveyId: string;
  questionId: string;
  surveyParticipationId: string;
  answerBoolean: boolean | null;
}
const TakeSurveyBooleanResponse = (props: TakeSurveyBooleanResponseProps) => {
  const [answerBoolean, setAnswerBoolean] = useState<boolean | null>(
    props.answerBoolean
  );
  const upsertQuestionResponseMutation = useUpsertQuestionResponse({
    surveyId: props.surveyId,
  });

  const debouncedEditResponseBoolean = useDebouncedCallback(
    (data: UpdateQuestionResponseRequest) =>
      upsertQuestionResponseMutation.mutate(data),
    1000
  );

  const handleEditResponseBoolean = (value: string) => {
    const boolValue = value === 'yes' ? true : false;
    setAnswerBoolean(boolValue);
    debouncedEditResponseBoolean({
      questionId: props.questionId,
      surveyParticipationId: props.surveyParticipationId,
      answerBoolean: boolValue,
    });
  };

  return (
    <>
      <RadioGroup
        orientation='vertical'
        onChange={handleEditResponseBoolean}
        value={
          answerBoolean === true ? 'yes' : answerBoolean === false ? 'no' : ''
        }
      >
        <Radio value='yes' label='Yes' />
        <Radio value='no' label='No' />
      </RadioGroup>
    </>
  );
};

export default TakeSurveyBooleanResponse;
