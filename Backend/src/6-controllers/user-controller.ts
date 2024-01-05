import express, { NextFunction, Request, Response } from 'express';
import userService from '../5-services/user-service';
import path from 'path';
import verifyAdmin from '../4-middleware/verify-admin';
import fs from 'fs';
import { ResourceNotFoundError } from '../3-models/error-models';
import verifyToken from '../4-middleware/verify-token';

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
  verifyToken,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = await userService.updateUser(request.body);
      response.json(user);
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
    try {
      const id = +request.params.id;
      const file = await userService.generateReport(id); 
      const filePath = `C:\\Users\\PC\\Desktop\\JB Project 3\\Backend\\src\\1-assets\\reports\\reports.csv`;
      if (file) {
        // response.header( 
        //   'Content-Disposition',
        //   'attachment; filename=reports.csv'
        // );
        response.download(filePath, 'reports.csv');
      }
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
