import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import { AnyZodObject } from 'zod';

const validateResource =
  (schema: AnyZodObject) =>
  (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        // TODO create zod typings that also validate params for requests where it's necessary
        // until that is implemented, trying to validate params will _always_ throw an error
        // params: req.params,
      });
      next();
    } catch (e: any) {
      // if our schema can not be parsed
      return res.status(400).send(e.hasOwnProperty('errors') ? e.errors : e);
    }
  };

export default validateResource;
