import { ValidateIf, IsNotEmpty, IsString, IsNumber } from "class-validator";
import AddressDto from "./address.dto";

class UpdateAddressDto extends AddressDto {
    @ValidateIf((o) => o.value !== undefined)
    line1: string;

    @ValidateIf((o) => o.value !== undefined)
    pincode: number;
}

export default UpdateAddressDto;
