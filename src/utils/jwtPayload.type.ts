import Role from "../entity/role.entity";

export type jwtPayload = {
    name: string;
    username: string;
    role: Role;
};
