import { ValidateIf, IsNotEmpty, IsString, IsNumber } from "class-validator";
import AddressDto from "./address.dto";

class UpdateAddressDto extends AddressDto {
    @ValidateIf((o) => o.value !== undefined)
    address_line_1: string;

    @ValidateIf((o) => o.value !== undefined)
    address_line_2: string;

    @ValidateIf((o) => o.value !== undefined)
    city: string;

    @ValidateIf((o) => o.value !== undefined)
    state: string;

    @ValidateIf((o) => o.value !== undefined)
    country: string;

    @ValidateIf((o) => o.value !== undefined)
    pincode: string;

}

export default UpdateAddressDto;
