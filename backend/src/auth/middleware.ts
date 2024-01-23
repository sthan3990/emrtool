// /src/auth/middleware.ts
import { MiddlewareFn } from 'type-graphql';
import { Context } from '../types';
import { decodeFirebaseTokenFromRequest } from './firebase';

export const isUserAuthenticated: MiddlewareFn<Context> = async ({ context }, next) => {
  const decodedToken = decodeFirebaseTokenFromRequest(context.req);

  if (!decodedToken) {
    throw new Error('Unauthorized - Invalid or missing token');
  }

  context.user = decodedToken;
  return next();
};
