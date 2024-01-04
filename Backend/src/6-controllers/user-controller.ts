import express, { NextFunction, Request, Response } from 'express';
import userService from '../5-services/user-service';
import path from 'path';

const router = express.Router();

// Get One user
router.get(
  '/users/:id([0-9]+)',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      const user = await userService.getOneUser(id);
      response.json(user);
    } catch (err: any) {
      next(err);
    }
  }
);

// Update user
router.post(
  '/user/:userUuid',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = await userService.updateUser(request.body);
      response.json(user);
    } catch (err: any) {
      next(err);
    }
  }
);

// Update user
router.get(
  '/vacation-reports',
  async (request: Request, response: Response, next: NextFunction) => {
    try {

      

      const file = userService.generateReport()
      // response.download(path.resolve('src/6-controllers/dummy.txt')) 
      // response.send()
      // const file = await userService.getReports();
      // response.download(file);
      response.send(file)
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
