import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

class LoginEmployeeDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    // @IsStrongPassword()
    password: string;
}

export default LoginEmployeeDto;
