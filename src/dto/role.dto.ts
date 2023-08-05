import { IsEnum } from "class-validator";
import { RoleEnum } from "../utils/role.enum";
import Role from "../entity/role.entity";

class RoleDto {
    @IsEnum(RoleEnum)
    name: RoleEnum;
}

export default RoleDto;
