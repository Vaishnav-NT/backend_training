import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class AddressDto {
    @IsNotEmpty()
    @IsString()
    line1: string;

    @IsNotEmpty()
    @IsNumber()
    pincode: number;
}

export default AddressDto;
