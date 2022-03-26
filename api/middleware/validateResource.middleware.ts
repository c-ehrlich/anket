// a curried function that takes the schema we created with Zod and validates
// a request against that schema
// so when we get to our controller, we know that the body is exactly what we expect

import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler, RequestHandler } from 'next-connect';
import { AnyZodObject } from 'zod';

const validateResource =
  (schema: AnyZodObject) =>
  (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        // params: req.params,
      });
      next();
    } catch (e: any) {
      console.log(req.body);
      console.log(req.query);
      // if our schema can not be parsed
      return res.status(400).send(e.errors); // TODO is this errors or error?
    }
  };

export default validateResource;

// const authMiddleware: RequestHandler<NextApiRequest, NextApiResponse> = async (
//   req,
//   res,
//   next
// ) => {
//   console.log('In the middleware');
//   next();
// };