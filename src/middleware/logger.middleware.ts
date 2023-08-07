import { Request, Response, NextFunction } from "express";
import buildLogger from "../utils/winstonLogger";
import { randomUUID } from "crypto";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.locals.traceID = randomUUID();
    const logger = buildLogger();
    logger.info(`${res.locals.traceID} ${req.method}: ${req.url}`);
    next();
};

export default loggerMiddleware;
