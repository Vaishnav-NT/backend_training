import { Request, Response, NextFunction } from "express";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date()} --- ${req.url} --- ${req.method}`);
    next();
};

export default loggerMiddleware;
