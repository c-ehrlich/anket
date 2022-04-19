import React from 'react'
import CreateSurveyRQ from '../../components/CreateSurveyRQ'

/**
 * This is just a dummy page that awaits the creation of a survey (or 
 * the fetching of an in progress survey) and then redirects to the edit
 * page for that survey once it knows the id 
 */

const create = () => {
  return (
    <CreateSurveyRQ />
  )
}

export default create