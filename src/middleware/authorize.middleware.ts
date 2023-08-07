import { Response, NextFunction } from "express";
import { RequestWithUser } from "../utils/requestWithUser";
import HttpException from "../exception/http.exception";

const authorize = (roles: string[]) => {
    return (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const role = req.role;
            if (!roles.includes(role)) {
                throw new HttpException(
                    401,
                    "You are not authorized to perform this action"
                );
            }
            next();
        } catch (e) {
            next(e);
        }
    };
};

export default authorize;
