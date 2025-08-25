import { Request } from 'express';

export type JWTRequest = Request & {
  userId: string;
};
