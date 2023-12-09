import { NextFunction, Request, Response } from 'express';
import cyber from '../2-utils/cyber';

function verifyAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authorization = request.header('authorization');
  const token = authorization?.substring(7);
  cyber.verifyAdmin(token);
  next();
}

export default verifyAdmin;
