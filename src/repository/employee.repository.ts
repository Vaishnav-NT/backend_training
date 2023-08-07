import { Repository } from "typeorm";
import Employee from "../entity/employee.entity";

class EmployeeRepository {
    constructor(private employeeRepository: Repository<Employee>) {}

    create(newEmployee: Employee): Promise<Employee> {
        console.log("\n\n\n", newEmployee);
        return this.employeeRepository.save(newEmployee);
    }

    // "test": "jest --verbose",
    find(): Promise<Employee[]> {
        return this.employeeRepository.find({
            relations: {
                address: true,
                department: true,
                role: true,
            },
        });
    }

    // count(): Promise<number> {
    //     return this.employeeRepository.count({
    //         relations: {
    //             address: true,
    //             department: true,
    //             role: true,
    //         },
    //     });
    // }

    findOneById(id: number): Promise<Employee> {
        return this.employeeRepository.findOne({
            where: { id: id },
            relations: {
                address: true,
                department: true,
                role: true,
            },
        });
    }

    findOneByUsername(username: string): Promise<Employee> {
        return this.employeeRepository.findOne({
            where: { username },
            relations: {
                address: true,
                department: true,
                role: true,
            },
        });
    }

    patch(updatedEmployee: Employee): Promise<Employee> {
        return this.employeeRepository.save(updatedEmployee);
    }

    delete(employee: Employee): Promise<Employee> {
        return this.employeeRepository.softRemove(employee);
    }
}

export default EmployeeRepository;
