import React from 'react'
import CreateSurvey from '../../components/CreateSurvey'

/**
 * This is just a dummy page that awaits the creation of a survey (or 
 * the fetching of an in progress survey) and then redirects to the edit
 * page for that survey once it knows the id 
 */

const create = () => {
  return (
    <CreateSurvey />
  )
}

export default create