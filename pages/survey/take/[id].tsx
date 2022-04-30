import { useRouter } from 'next/router';
import React from 'react';
import TakeSurvey from '../../../components/TakeSurvey';

const GetSurveyInteractionPage = () => {
  const router = useRouter();

  const surveyId = Array.isArray(router.query.id)
    ? router.query!.id[0]
    : router.query!.id!;

  if (!surveyId) return <div>no id</div>;

  return <TakeSurvey surveyId={surveyId} />;
};

export default GetSurveyInteractionPage;
