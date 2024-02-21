import { NextFunction, Request, Response } from 'express';
import cyber from '../2-utils/cyber';

function verifyNotAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authorization = request.header('authorization');
  const token = authorization?.substring(7);
  cyber.verifyNotAdmin(token);
  next();
}

export default verifyNotAdmin;
