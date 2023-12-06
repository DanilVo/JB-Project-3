import express, { Request, Response, NextFunction } from 'express';
import vocationService from '../5-services/vocations-service';
import StatusCode from '../3-models/status-codes';
import VocationModel from '../3-models/vocation-model';

const router = express.Router();

// Get All vocation
router.get(
  '/vocations',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vocations = await vocationService.getAllVocations();
      response.json(vocations);
    } catch (err: any) {
      next(err);
    }
  }
);

// Get One vocation
router.get(
  '/vocations/:id',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      const vocations = await vocationService.getOneVocation(id);
      response.json(vocations);
    } catch (err: any) {
      next(err);
    }
  }
);

// Add vocation
router.post(
  '/vocations',
  async (request: Request, response: Response, next: NextFunction) => {
    try {      
      request.body.image = request.files?.image;
      const vocation = new VocationModel(request.body);
      const addedVocation = await vocationService.addVocation(vocation);
      response.status(StatusCode.Created).json(addedVocation);
    } catch (err: any) {
      next(err);
    }
  }
);

// Update vocation
router.put(
  '/vocations/:id([0-9]+)',
  async (request: Request, response: Response, next: NextFunction) => {
    
    try {      
      request.body.id = +request.params.id;
      request.body.image = request.files?.image;      
      const vocation = new VocationModel(request.body);
      console.log(vocation);
      const addedVocation = await vocationService.updateVocation(vocation);
      response.json(addedVocation);
    } catch (err: any) {
      next(err);
    }
  }
);

// Delete vocation
router.delete(
  '/vocations/:id',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      const vocations = await vocationService.deleteVocation(id);
      response.json(vocations);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
