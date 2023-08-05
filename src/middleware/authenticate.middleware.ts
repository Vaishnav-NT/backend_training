import { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";
import { RequestWithUser } from "../utils/requestWithUser";
import { jwtPayload } from "../utils/jwtPayload.type";

const authenticateMiddleware = (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = getTokenFromRequestHeader(req);
        const payload: jwtPayload = jsonwebtoken.verify(
            token,
            "ABCDE"
        ) as jwtPayload;
        req.name = payload.name;
        req.username = payload.username;
        req.role = payload.role;
        next();
    } catch (e) {
        next(e);
    }
};

const getTokenFromRequestHeader = (req: Request) => {
    const bearerToken = req.header("Authorization");
    const token = bearerToken ? bearerToken.replace("Bearer ", "") : "";
    return token;
};

export default authenticateMiddleware;
