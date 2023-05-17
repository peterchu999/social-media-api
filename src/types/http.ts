import { Request as HttpRequest } from 'express';

interface UserJwtPayload {
  username: string;
  userId: string;
}
export type AuthRequest = HttpRequest & { user: UserJwtPayload };
