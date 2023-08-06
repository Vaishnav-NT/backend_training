import { ValidateIf } from "class-validator";
import Address from "../entity/address.entity";
import EmployeeDto from "./employee.dto";
import Role from "../entity/role.entity";
import { RoleEnum } from "../utils/role.enum";
import Department from "../entity/department.entity";
import { activityStatusEnum } from "../utils/activityStatus.enum";

class UpdateEmployeeDto extends EmployeeDto {
    @ValidateIf((o) => o.value !== undefined)
    name: string;

    @ValidateIf((o) => o.value !== undefined)
    username: string;

    @ValidateIf((o) => o.value !== undefined)
    address: Address;

    @ValidateIf((o) => o.value !== undefined)
    departmentId: string;

    @ValidateIf((o) => o.value !== undefined)
    password: string;

    @ValidateIf((o) => o.value !== undefined)
    role: RoleEnum;

    @ValidateIf((o) => o.value !== undefined)
    joiningDate: string;

    @ValidateIf((o) => o.value !== undefined)
    experience: number;

    @ValidateIf((o) => o.value !== undefined)
    activityStatus: activityStatusEnum;
}

export default UpdateEmployeeDto;
