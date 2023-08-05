import { DataSource, Repository } from "typeorm";
import Employee from "../entity/employee.entity";

class EmployeeRepository {
    constructor(private employeeRepository: Repository<Employee>) {}

    create(newEmployee: Employee): Promise<Employee> {
        return this.employeeRepository.save(newEmployee);
    }

    find(): Promise<Employee[]> {
        return this.employeeRepository.find({
            relations: {
                address: true,
            },
        });
    }

    findOneById(id: number): Promise<Employee> {
        return this.employeeRepository.findOne({
            where: { id: id },
            relations: {
                address: true,
            },
        });
    }

    findOneByEmail(email: string): Promise<Employee> {
        return this.employeeRepository.findOne({
            where: { email },
            relations: {
                address: true,
            },
        });
    }

    put(updatedEmployee: Employee): Promise<Employee> {
        return this.employeeRepository.save(updatedEmployee);
    }

    patch(updatedEmployee: Employee): Promise<Employee> {
        return this.employeeRepository.save(updatedEmployee);
    }

    delete(employee: Employee): void {
        this.employeeRepository.softRemove(employee);
    }
}

export default EmployeeRepository;
