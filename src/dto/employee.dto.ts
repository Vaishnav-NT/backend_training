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
import { Role } from "../utils/role.enum";

class EmployeeDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => AddressDto)
    address: Address;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;

    @IsNotEmpty()
    @IsString()
    joiningDate: string;

    @IsNotEmpty()
    @IsNumber()
    experience: number;
}

export default EmployeeDto;
