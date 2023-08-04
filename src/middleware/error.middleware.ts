import express, { Request, Response } from "express";
import HttpException from "../exception/http.exception";
import { NextFunction } from "express";
import ValidationException from "../exception/validation.exception";

const errorHandlingMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log(error.stack);
        if (error instanceof ValidationException) {
            res.status(error.status).send({
                message: error.message,
                errors: {
                    ...error.errors,
                },
            });
        } else if (error instanceof HttpException) {
            res.status(error.status).send({ message: error.message });
        } else {
            res.status(500).send({ message: error.message });
        }
    } catch (err) {
        next(err);
    }
};

export default errorHandlingMiddleware;
