import { useRouter } from 'next/router'
import React from 'react'
import EditSurvey from '../../../components/EditSurvey';
import useSurvey from '../../../hooks/useSurvey';

const EditSurveyPage = () => {
  const router = useRouter();

  console.log(router.query);
  
  const surveyId = Array.isArray(router.query.id) ? router.query!.id[0] : router.query!.id!;

  if (!surveyId) return <div>no id</div>

  return (
    <div>
      <EditSurvey surveyId={surveyId} />
    </div>
  )
}

export default EditSurveyPage