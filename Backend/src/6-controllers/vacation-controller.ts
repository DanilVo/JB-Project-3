import express, { NextFunction, Request, Response } from 'express';
import { fileSaver } from 'uploaded-file-saver';
import StatusCode from '../3-models/status-codes';
import VacationModel from '../3-models/vacation-model';
import verifyAdmin from '../4-middleware/verify-admin';
import verifyToken from '../4-middleware/verify-token';
import vacationService from '../5-services/vacations-service';
import path from 'path';

const router = express.Router();

// Get One vacation
router.get(
  '/vacations/:id([0-9]+)',
  verifyToken,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      const vacations = await vacationService.getOneVacation(id);
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }
);

// Add vacation
router.post(
  '/add-vacation',
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.image = request.files?.image;
      const vacation = new VacationModel(request.body);
      const addedVacation = await vacationService.addVacation(vacation);
      response.status(StatusCode.Created).json(addedVacation);
    } catch (err: any) {
      next(err);
    }
  }
);

// Update vacation
router.put(
  '/vacations/:id([0-9]+)',
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.id = +request.params.id;
      request.body.image = request.files?.image;
      const vacation = new VacationModel(request.body);
      const updatedVacation = await vacationService.updateVacation(vacation);
      response.json(updatedVacation);
    } catch (err: any) {
      next(err);
    }
  }
);

// Delete vacation
router.delete(
  '/vacations/:id([0-9]+)',
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      await vacationService.deleteVacation(id);
      response.sendStatus(StatusCode.OK);
    } catch (err: any) {
      next(err);
    }
  }
);

// Get image
router.get(
  '/vacations/image/:imageName',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const imageName = request.params.imageName;
      const absolutePath = fileSaver.getFilePath(
        imageName,
        true,
        path.join(__dirname, '..', '1-assets', 'vacationImages')
      );
      response.sendFile(absolutePath);
    } catch (err: any) {
      next(err);
    }
  }
);

// Get all Vacations
router.get(
  '/vacations/subscriptions/:id([0-9]+)',
  verifyToken,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      const vacations = await vacationService.getVacations(id);
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  '/follow',
  verifyToken,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await vacationService.followVacation(request.body);
      response.sendStatus(StatusCode.OK);
    } catch (err: any) {
      next(err);
    }
  }
);

router.delete(
  '/follow',
  verifyToken,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await vacationService.unFollowVacation(request.body);
      response.sendStatus(StatusCode.OK);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
