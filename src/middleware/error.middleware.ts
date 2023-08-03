import express, { Request, Response } from "express";
import HttpException from "../exception/http.exception";
import { NextFunction } from "express";

const errorHandlingMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log(error.stack);
        if (error instanceof HttpException) {
            res.status(error.status).send({ error: error.message });
        } else {
            res.status(500).send({ error: error.message });
        }
    } catch (err) {
        next(err);
    }
};

export default errorHandlingMiddleware;
