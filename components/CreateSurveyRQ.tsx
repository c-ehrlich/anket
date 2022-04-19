import useCreateSurvey from '../hooks/useCreateSurvey';
import CreateSurveyRQInner from './CreateSurveyRQInner';

const CreateSurveyRQ = () => {
  const survey = useCreateSurvey();

  survey.isFetched && console.log('createSurveyRQ mounted', survey.data)


  return (
    <>
      {survey.isFetched ? (
        <CreateSurveyRQInner survey={survey.data} />
      ) : (
        <div>loading...</div>
      )}

      <pre>{JSON.stringify(survey, null, 4)}</pre>
    </>
  );
};

export default CreateSurveyRQ;
