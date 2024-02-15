import { NextFunction, Request, Response } from 'express';
import { RouteNotFoundError } from '../3-models/error-models';
import path from 'path';

export function routeNotFound(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const err = new RouteNotFoundError(request.originalUrl);

  next(err);
}
