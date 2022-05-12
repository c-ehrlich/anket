import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { UpdateQuestionResponseRequest } from './questionResponse.schema';
import { upsertQuestionResponse } from './questionResponse.service';

export async function handleUpsertQuestionResponse(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const session = await getSession({ req });
  const userId = session!.user!.id;

  if (!userId) {
    return res.status(400).send('no userId');
  }

  // get stuff from the request
  const data: UpdateQuestionResponseRequest = req.body;

  // TODO make sure we have permission

  const questionResponse = await upsertQuestionResponse({
    ...data,
  });

  if (!questionResponse) {
    return res.status(400).send('failed to update questionresponse');
  }

  return questionResponse;
}
