import useGetOrCreateSurveyParticipation, {
} from '../hooks/useGetOrCreateSurveyParticipation';
import useGetSingleSurvey from '../hooks/useGetSingleSurvey';

/**
 * TODO: error checking (eg what happens if we navigate here while not being logged in?
 */

interface Props {
  surveyId: string;
}

const TakeSurvey = (props: Props) => {
  const survey = useGetSingleSurvey(props.surveyId);
  const interaction = useGetOrCreateSurveyParticipation({
    surveyId: props.surveyId,
  });
  if (!survey.data || !interaction.data) return <div>no data yet</div>;
  return (
    <div>
      <div>{JSON.stringify(interaction.data)}</div>
      <hr />
      <div>{JSON.stringify(survey.data)}</div>
    </div>
  );
};

export default TakeSurvey;
