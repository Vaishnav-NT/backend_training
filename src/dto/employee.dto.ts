import {
    IsEmail,
    IsNotEmpty,
    IsString,
    ValidateNested,
    validate,
} from "class-validator";
import Address from "../entity/address.entity";
import { Type } from "class-transformer";
import AddressDto from "./address.dto";

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
}

export default EmployeeDto;
