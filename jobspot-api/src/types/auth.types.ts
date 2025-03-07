import { Request } from 'express';

interface AuthenticatedUser {
  sub: string;
  email: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}
