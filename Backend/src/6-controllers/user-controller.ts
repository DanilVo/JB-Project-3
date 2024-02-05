import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import { fileSaver } from 'uploaded-file-saver';
import logger from '../2-utils/logger';
import UserModel from '../3-models/user-model';
import verifyAdmin from '../4-middleware/verify-admin';
import verifyToken from '../4-middleware/verify-token';
import userService from '../5-services/user-service';

const router = express.Router();

// Update user
router.put(
  '/user/:userUuid',
  verifyToken,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.image = request.files?.image;
      const user = new UserModel(request.body);
      const updatedUser = await userService.updateUser(user);
      response.json(updatedUser);
    } catch (err: any) {
      next(err);
    }
  }
);

// Download report
router.get(
  '/vacation-reports/:id([0-9]+)',
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    const reportFilePath = path.resolve(__dirname, '../1-assets/reports/reports.csv');
    try {
      const id = +request.params.id;
      const file = await logger.generateReport(id,reportFilePath);
      if (file) {
        response.download(reportFilePath, 'reports.csv');
      }
      setTimeout(() => logger.deleteReport(reportFilePath), 5000);
    } catch (err: any) {
      next(err);
    }
  }
);

// Get image
router.get(
  '/user/image/:imageName',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const imageName = request.params.imageName;
      const absolutePath = fileSaver.getFilePath(
        imageName,
        true,
        path.join(__dirname, '..', '1-assets', 'user-images')
      );
      response.sendFile(absolutePath);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
