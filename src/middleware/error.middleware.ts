import express, { Request, Response } from "express";
import HttpException from "../exception/http.exception";
import { NextFunction } from "express";
import ValidationException from "../exception/validation.exception";
import FormattedResponse from "../utils/formattedResponse";
import { RequestWithStartTime } from "../utils/requestWithStartTime";
import buildLogger from "../utils/winstonLogger";

const errorHandlingMiddleware = (
    error: Error,
    req: RequestWithStartTime,
    res: Response,
    next: NextFunction
) => {
    const logger = buildLogger();
    logger.error(error);
    try {
        console.log(error.stack);
        if (error instanceof ValidationException) {
            FormattedResponse.send(req, res, error.status, null, {
                message: error.message,
                errors: error.errors,
            });
        } else if (error instanceof HttpException) {
            FormattedResponse.send(req, res, error.status, null, {
                message: error.name,
                errors: error.message,
            });
        } else {
            FormattedResponse.send(req, res, 500, null, {
                message: "Internal Server Error",
                errors: error.message,
            });
        }
    } catch (err) {
        next(err);
    }
};

export default errorHandlingMiddleware;
