import express, { NextFunction, Request, Response } from "express";
import mailService from "../5-services/mail-service";
import StatusCode from "../3-models/status-codes";

const router = express.Router();

router.get(
  "/password-recovery/:email",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const email = request.params.email;
      await mailService.passwordRecovery(email);
      response.sendStatus(StatusCode.Accepted);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  "/verify-code/:code",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const code = +request.params.code;
      await mailService.verificationCodeCheck(code);
      response.sendStatus(StatusCode.Accepted);
    } catch (err: any) {
      next(err);
    }
  }
);


export default router;
