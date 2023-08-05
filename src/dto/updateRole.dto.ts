import { ValidateIf } from "class-validator";
import { RoleEnum } from "../utils/role.enum";

class UpdateRoleDto {
    @ValidateIf((o) => o.value !== undefined)
    name: RoleEnum;
}

export default UpdateRoleDto;
