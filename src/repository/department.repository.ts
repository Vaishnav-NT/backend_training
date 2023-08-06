import { Repository } from "typeorm";
import Department from "../entity/department.entity";

class DepartmentRepository {
    constructor(private departmentRepository: Repository<Department>) {}

    create(newDepartment: Department): Promise<Department> {
        return this.departmentRepository.save(newDepartment);
    }

    find(): Promise<Department[]> {
        return this.departmentRepository.find();
    }

    findById(id: number): Promise<Department> {
        return this.departmentRepository.findOne({
            where: { id },
        });
    }

    patch(updatedDepartment: Department): Promise<Department> {
        return this.departmentRepository.save(updatedDepartment);
    }

    delete(deletedDepartment: Department): Promise<Department> {
        return this.departmentRepository.softRemove(deletedDepartment);
    }
}

export default DepartmentRepository;
