import express, { NextFunction, Request, Response } from "express";
import userService from "../5-services/user-service";
import path from "path";
import verifyAdmin from "../4-middleware/verify-admin";
import fs from "fs";
import { ResourceNotFoundError } from "../3-models/error-models";
import verifyToken from "../4-middleware/verify-token";
import UserModel from "../3-models/user-model";
import { fileSaver } from "uploaded-file-saver";

const router = express.Router();

// Get One user
router.get(
  "/users/:id([0-9]+)",
  verifyToken,
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
router.put(
  "/user/:userUuid",
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
  "/vacation-reports/:id([0-9]+)",
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      const file = await userService.generateReport(id);
      const filePath = path.join(
        __dirname,
        "../1-assets",
        `/reports/reports.csv`
      );
      if (file) {
        response.download(filePath, "reports.csv");
      }
    } catch (err: any) {
      next(err);
    }
  }
);

// Get image
router.get(
  "/user/image/:imageName",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const imageName = request.params.imageName;
      const absolutePath = fileSaver.getFilePath(
        imageName,
        true,
        path.join(__dirname, "..", "1-assets", "user-images")
      );
      response.sendFile(absolutePath);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
