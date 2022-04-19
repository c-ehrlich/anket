import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import useSurvey from '../hooks/useSurvey';
import EditSurvey from './EditSurvey';

type Props = {
  surveyId: string;
};

const EditSurveyLoader = (props: Props) => {
  const survey = useSurvey(props.surveyId);

  if (!survey.isFetched) return <div>not yet fetched</div>;

  return (
    // FIXME!!! WHY DO I NEED TO DO THIS?
    <>
      {survey.isLoading ? 'loading' : survey.isError ? 'error' : (<div>{survey.status}</div>)}
      <EditSurvey survey={survey.data!.data} />
    </>
  );
};

export default EditSurveyLoader;
