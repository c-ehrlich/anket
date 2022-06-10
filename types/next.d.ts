import { IncomingMessage } from 'http';
declare module 'next' {
  export interface NextApiRequest extends IncomingMessage {
    user: {
      id: string;
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    };
  }
}
