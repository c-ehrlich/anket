import { useRouter } from 'next/router';
import React from 'react';
import PreviewSurvey from '../../../components/PreviewSurvey';

const PreviewSurveyPage = () => {
  const router = useRouter();

  const surveyId = Array.isArray(router.query.id)
    ? router.query!.id[0]
    : router.query!.id!;

  if (!surveyId) return <div>no id</div>;

  return <PreviewSurvey surveyId={surveyId} />;
};

export default PreviewSurveyPage;
