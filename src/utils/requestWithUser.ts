import { Request } from "express";
import Role from "../entity/role.entity";
import { RoleEnum } from "./role.enum";

export interface RequestWithUser extends Request {
    name: string;
    username: string;
    role: string;
}
