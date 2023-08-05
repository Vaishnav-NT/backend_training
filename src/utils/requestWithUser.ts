import { Request } from "express";
import Role from "../entity/role.entity";

export interface RequestWithUser extends Request {
    name: string;
    username: string;
    role: Role;
}
