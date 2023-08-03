import EmployeeRepository from "../repository/employee.repository";
import Employee from "../entity/employee.entity";

class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository) {}

    find(): Promise<Employee[]> {
        return this.employeeRepository.find();
    }

    findOneBy(id: number): Promise<Employee | null> {
        return this.employeeRepository.findOneBy(id);
    }

    create(employeeData): Promise<Employee> {
        const newEmployee = new Employee();
        newEmployee.name = employeeData.name;
        newEmployee.email = employeeData.email;
        return this.employeeRepository.create(newEmployee);
    }

    async put(id: number, data): Promise<Employee | boolean> {
        const employee = await this.employeeRepository.findOneBy(id);
        if (employee) {
            employee.name = data.name;
            employee.email = data.email;
        } else {
            return false;
        }
        return this.employeeRepository.put(employee);
    }

    async delete(id: number): Promise<void | boolean> {
        const employee = await this.employeeRepository.findOneBy(id);
        if (employee) {
            return this.employeeRepository.delete(employee);
        } else {
            return false;
        }
    }
}

export default EmployeeService;
