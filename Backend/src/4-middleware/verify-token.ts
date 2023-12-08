import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";

function verifyToken(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  console.log("checking...");
  
  cyber.verifyToken(request);
  next();
}

export default verifyToken