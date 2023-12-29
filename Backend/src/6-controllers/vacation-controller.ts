import express, { NextFunction, Request, Response } from "express";
import { fileSaver } from "uploaded-file-saver";
import StatusCode from "../3-models/status-codes";
import VacationModel from "../3-models/vacation-model";
import verifyAdmin from "../4-middleware/verify-admin";
import verifyToken from "../4-middleware/verify-token";
import vacationService from "../5-services/vacations-service";

const router = express.Router();

// Get All vacation
router.get(
  "/vacations",
  verifyToken,
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
  "/vacations/:vacationUuid",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacationUuid = request.params.vacationUuid;
      const vacations = await vacationService.getOneVacation(vacationUuid);
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }
);

// Add vacation
router.post(
  "/vacations",
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
  "/vacations/:vacationUuid",
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.vacationUuid = request.params.vacationUuid;
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
  "/vacations/:vacationUuid",
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacationUuid = request.params.vacationUuid;
      await vacationService.deleteVacation(vacationUuid);
      response.sendStatus(StatusCode.OK);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  "/vacations/image/:imageName",
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
