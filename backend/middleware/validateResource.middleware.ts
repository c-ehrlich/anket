// a curried function that takes the schema we created with Zod and validates
// a request against that schema
// so when we get to our controller, we know that the body is exactly what we expect

import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import { AnyZodObject } from 'zod';
import logger from '../utils/logger';

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
      // if our schema can not be parsed
      return res.status(400).send(e.errors);
    }
  };

export default validateResource;
