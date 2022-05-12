import { Radio } from '@mantine/core';
import { MultipleChoiceOptionFE } from '../../api/surveyParticipation/surveyParticipation.schema';
import useToggleMCSItem from '../../hooks/surveyParticipation/useToggleMCSItem';

const TakeSurveyMCSOption = ({
  surveyId,
  option,
  index,
  mcoIndex,
}: {
  surveyId: string;
  index: number;
  option: MultipleChoiceOptionFE;
  mcoIndex: number;
}) => {
  const toggleMCSItemMutation = useToggleMCSItem({
    surveyId,
    questionIndex: index,
    mcoIndex,
  });

  return (
    <Radio
      key={option.id}
      value={option.name}
      label={option.name}
      onClick={() => {
        toggleMCSItemMutation.mutate({
          selected: true,
          optionId: option.id,
        });
      }}
      checked={option.multipleChoiceOptionSelections[0]?.selected || false}
    />
  );
};

export default TakeSurveyMCSOption;
