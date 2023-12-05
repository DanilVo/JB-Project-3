import express, { Request, Response, NextFunction } from "express";
import vocationService from "../5-services/vocations-service";

const router = express.Router();

router.get(
  "/vocations",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vocations = await vocationService.getAllVocations();
      response.json(vocations);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
