import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
    ValidateNested,
    validate,
} from "class-validator";
import Address from "../entity/address.entity";
import { Type } from "class-transformer";
import AddressDto from "./address.dto";
import { RoleEnum } from "../utils/role.enum";
import RoleDto from "./role.dto";
import Role from "../entity/role.entity";

class EmployeeDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => AddressDto)
    address: Address;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => RoleDto)
    role: Role;

    @IsNotEmpty()
    @IsString()
    joiningDate: string;

    @IsNotEmpty()
    @IsNumber()
    experience: number;
}

export default EmployeeDto;
