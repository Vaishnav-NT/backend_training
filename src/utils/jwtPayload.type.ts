import Role from "../entity/role.entity";
import { RoleEnum } from "./role.enum";

export type jwtPayload = {
    name: string;
    username: string;
    role: string;
};
