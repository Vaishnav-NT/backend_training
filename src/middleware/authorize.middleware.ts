import { Response, NextFunction } from "express";
import { RequestWithUser } from "../utils/requestWithUser";
import HttpException from "../exception/http.exception";
import Role from "../entity/role.entity";

const authorize = (roles: Role[]) => {
    return (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const role = req.role;
            if (!roles.includes(role)) {
                console.log("inside", role);
                throw new HttpException(
                    403,
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
