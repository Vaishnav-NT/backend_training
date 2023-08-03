import { DataSource, Repository } from "typeorm";
import Employee from "../entity/employee.entity";

class EmployeeRepository {
    constructor(private employeeRepository: Repository<Employee>) {}

    find(): Promise<Employee[]> {
        return this.employeeRepository.find({
            relations: {
                address: true,
            },
        });
    }

    findOneBy(id: number): Promise<Employee> {
        return this.employeeRepository.findOne({
            where: { id: id },
            relations: {
                address: true,
            },
        });
    }

    create(newEmployee: Employee): Promise<Employee> {
        return this.employeeRepository.save(newEmployee);
    }

    put(updatedEmployee: Employee): Promise<Employee> {
        return this.employeeRepository.save(updatedEmployee);
    }

    delete(employee: Employee): void {
        this.employeeRepository.softRemove(employee);
    }
}

export default EmployeeRepository;
