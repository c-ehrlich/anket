import axios from "axios";

const deleteSurveyRequest = (id: string) => {
  const deletedSurvey = axios
    .delete(`/api/survey/${id}`)
    .then((res) => res.data);
  return deletedSurvey;
};

export default deleteSurveyRequest;