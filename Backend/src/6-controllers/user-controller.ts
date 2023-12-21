import express, { NextFunction, Request, Response } from "express";
import userService from "../5-services/user-service";

const router = express.Router();

// Get One user
router.get(
  "/users/:id([0-9]+)",
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

export default router;
