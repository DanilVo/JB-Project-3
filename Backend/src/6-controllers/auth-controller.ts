import express, { Request, Response, NextFunction } from 'express';
import UserModel from '../3-models/user-model';
import StatusCode from '../3-models/status-codes';
import authService from '../5-services/auth-service';
import CredentialModel from '../3-models/credentials-model';

const router = express.Router();

router.post(
  '/auth/register',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = new UserModel(request.body);
      const token = await authService.register(user);
      response.status(StatusCode.Created).json(token);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  '/auth/login',
  async (request: Request, response: Response, next: NextFunction) => {
    console.log(request.body);

    try {
      const credentials = new CredentialModel(request.body);
      const token = await authService.login(credentials);
      response.json(token);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
