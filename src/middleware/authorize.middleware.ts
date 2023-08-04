import { Response, NextFunction } from "express";
import { RequestWithUser } from "../utils/requestWithUser";
import { Role } from "../utils/role.enum";
import HttpException from "../exception/http.exception";

const authorize = ({ roles }) => {
    (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const role = req.role;
            if (!(role in roles)) {
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
