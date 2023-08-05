import { ValidateIf } from "class-validator";
import DepartmentDto from "./department.dto";

class UpdateDepartmentDto extends DepartmentDto {
    @ValidateIf((o) => o.value !== undefined)
    name: string;
}

export default UpdateDepartmentDto;
