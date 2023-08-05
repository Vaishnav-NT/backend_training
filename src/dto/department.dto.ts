import { IsString } from "class-validator";

class DepartmentDto {
    @IsString()
    name: string;
}

export default DepartmentDto
