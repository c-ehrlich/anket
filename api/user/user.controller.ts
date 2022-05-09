import { NextApiRequest, NextApiResponse } from 'next';
import getId from '../utils/getId';
import { UserWithSurveysFE } from './user.schema';
import { getUserWithSurveys } from './user.service';

export async function getUserProfileWithSurveysHandler(
  req: NextApiRequest,
  res: NextApiResponse<UserWithSurveysFE | { message: string }>
) {
  // figure out which profile we're getting
  const id = getId(req);
  if (!id) {
    return res.status(400).json({ message: 'failed to get ID from query' });
  }

  // try to get it
  const userProfile: UserWithSurveysFE | undefined = await getUserWithSurveys(
    id
  );
  if (!userProfile) {
    return res.status(400).json({ message: 'failed to get User profile' });
  }

  // return it
  return res.status(200).json(userProfile);
}
