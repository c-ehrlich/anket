import { Router, useRouter } from 'next/router';
import { useEffect } from 'react';
import { createSurvey } from '../hooks/useCreateSurvey';

/**
 * TODO: error checking (eg what happens if we navigate here while not being logged in? or the user
 * can't create a survey for some other reason such as not having that priviliege, etc.)
 */

const CreateSurveyRQ = () => {
  const router = useRouter();

  useEffect(() => {
    console.log('in CreateSurvey useEffect');
    createSurvey().then((survey) => router.push(`/survey/edit/${survey.id}`));
  }, [router]);

  return <div>Creating survey...</div>;
};

export default CreateSurveyRQ;
