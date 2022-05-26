import { Checkbox } from '@mantine/core';
import { MultipleChoiceOptionFE } from '../../backend/surveyParticipation/surveyParticipation.schema';
import useToggleMCMItem from '../../hooks/surveyParticipation/useToggleMCMItem';

const TakeSurveyMCMOption = ({
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
  const toggleMCMItemMutation = useToggleMCMItem({
    surveyId,
    questionIndex: index,
    mcoIndex,
  });

  return (
    <Checkbox
      key={option.id}
      label={option.name}
      onClick={() => {
        toggleMCMItemMutation.mutate({
          selected: !option.multipleChoiceOptionSelections[0]?.selected,
          optionId: option.id,
        });
      }}
      defaultChecked={option.multipleChoiceOptionSelections[0]?.selected}
    />
  );
};

export default TakeSurveyMCMOption;
