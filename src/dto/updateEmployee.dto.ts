import { ValidateIf } from "class-validator";
import Address from "../entity/address.entity";
import { Role } from "../utils/role.enum";
import EmployeeDto from "./employee.dto";

class UpdateEmployeeDto extends EmployeeDto {
    @ValidateIf((o) => o.value !== undefined)
    name: string;

    @ValidateIf((o) => o.value !== undefined)
    email: string;

    @ValidateIf((o) => o.value !== undefined)
    username: string;

    @ValidateIf((o) => o.value !== undefined)
    address: Address;

    @ValidateIf((o) => o.value !== undefined)
    password: string;

    @ValidateIf((o) => o.value !== undefined)
    role: Role;

    @ValidateIf((o) => o.value !== undefined)
    joiningDate: string;

    @ValidateIf((o) => o.value !== undefined)
    experience: number;
}

export default UpdateEmployeeDto;
