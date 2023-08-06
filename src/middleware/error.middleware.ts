import express, { Request, Response } from "express";
import HttpException from "../exception/http.exception";
import { NextFunction } from "express";
import ValidationException from "../exception/validation.exception";
import FormattedResponse from "../utils/formattedResponse";
import { RequestWithStartTime } from "../utils/requestWithStartTime";

const errorHandlingMiddleware = (
    error: Error,
    req: RequestWithStartTime,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log(error.stack);
        if (error instanceof ValidationException) {
            // res.status(error.status).send({
            //     message: error.message,
            //     errors: {
            //         ...error.errors,
            //     },
            // });
            console.log(error.message);
            FormattedResponse.send(req, res, error.status, null, 0, {
                message: error.name,
                errors: error.errors,
            });
        } else if (error instanceof HttpException) {
            // res.status(error.status).send({ message: error.message });

            console.log(error.message);
            FormattedResponse.send(req, res, error.status, null, 0, {
                message: error.name,
                errors: error.message,
            });
        } else {
            res.status(500).send({ message: error.message });
        }
    } catch (err) {
        next(err);
    }
};

export default errorHandlingMiddleware;
