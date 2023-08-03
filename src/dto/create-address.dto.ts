import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class CreateAddressDto {
    @IsNotEmpty()
    @IsString()
    line1: string;

    @IsNotEmpty()
    @IsNumber()
    pincode: number;
}

export default CreateAddressDto;
