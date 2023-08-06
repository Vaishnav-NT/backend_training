import {
    IsDateString,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
    ValidateIf,
    ValidateNested,
    validate,
} from "class-validator";
import Address from "../entity/address.entity";
import { Type } from "class-transformer";
import AddressDto from "./address.dto";
import { RoleEnum } from "../utils/role.enum";
import { activityStatusEnum } from "../utils/activityStatus.enum";

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

    @ValidateIf((o) => o.value !== undefined)
    //@IsEnum(RoleEnum)
    role: string;

    @ValidateIf((o) => o.value !== undefined)
    @IsString()
    departmentId: string;

    @IsNotEmpty()
    @IsString()
    joiningDate: string;

    @IsNotEmpty()
    @IsNumber()
    experience: number;

    @ValidateIf((o) => o.value !== undefined)
    activityStatus: activityStatusEnum;
}

export default EmployeeDto;
