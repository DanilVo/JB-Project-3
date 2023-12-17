import express, { NextFunction, Request, Response } from 'express';
import StatusCode from '../3-models/status-codes';
import VacationModel from '../3-models/vacation-model';
import verifyToken from '../4-middleware/verify-token';
import vacationService from '../5-services/vacations-service';
import { fileSaver } from 'uploaded-file-saver';

const router = express.Router();

// Get All vacation
router.get(
  '/vacations',
  async (request: Request, response: Response, next: NextFunction) => {
    try {  
      const vacations = await vacationService.getAllVacations();
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }
);

// Get One vacation
router.get(
  "/vacations/:id([0-9]+)",
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
  '/vacations',
  verifyToken,
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
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.vacationId = +request.params.id;
      request.body.image = request.files?.image;
      const vacation = new VacationModel(request.body);
      const addedVacation = await vacationService.updateVacation(vacation);
      response.json(addedVacation);
    } catch (err: any) {
      next(err);
    }
  }
);

// Delete vacation
router.delete(
  '/vacations/:id',
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

router.get(
  "/vacations/:imageName",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const imageName = request.params.imageName;
      const absolutePath = fileSaver.getFilePath(imageName);
      response.sendFile(absolutePath);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
