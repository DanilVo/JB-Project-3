import { NextFunction, Request, Response } from "express";
import logger from "../2-utils/logger";
import appConfig from "../2-utils/app-config";

function catchAll(err: any, request: Request, response: Response, next: NextFunction) {
    // Log the error: 
    logger.logError(err.message, err);
    console.log(err);

    const status = err.status || 500;

    const message = appConfig.isProduction && status >= 500 ? "Some error, please try again." : err.message;

    response.status(status).send(message);
}

export default catchAll;
