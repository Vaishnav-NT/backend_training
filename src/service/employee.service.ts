import EmployeeRepository from "../repository/employee.repository";
import Employee from "../entity/employee.entity";
import Address from "../entity/address.entity";
import HttpException from "../exception/http.exception";

class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository) {}

    async find(): Promise<Employee[]> {
        const employees = await this.employeeRepository.find();
        if (!employees) {
            throw new HttpException(404, "No employee present");
        }
        return employees;
    }

    async findOneBy(id: number): Promise<Employee> {
        const employee = await this.employeeRepository.findOneBy(id);
        if (!employee) {
            throw new HttpException(404, `Employee not found with ${id}`);
        }
        return employee;
    }

    create(employeeData): Promise<Employee> {
        const newEmployee = new Employee();
        newEmployee.name = employeeData.name;
        newEmployee.email = employeeData.email;

        const newAddress = new Address();
        newAddress.line1 = employeeData.address.line1;
        newAddress.pincode = employeeData.address.pincode;

        newEmployee.address = newAddress;
        return this.employeeRepository.create(newEmployee);
    }

    async put(id: number, data): Promise<Employee> {
        const employee = await this.employeeRepository.findOneBy(id);
        if (!employee) {
            throw new HttpException(404, `Employee not found with ${id}`);
        }
        employee.name = data.name;
        employee.email = data.email;
        employee.address.line1 = data.address.line1;
        employee.address.pincode = data.address.pincode;
        return this.employeeRepository.put(employee);
    }

    async delete(id: number): Promise<void> {
        const employee = await this.employeeRepository.findOneBy(id);
        if (!employee) {
            throw new HttpException(404, `Employee not found with ${id}`);
        }
        return this.employeeRepository.delete(employee);
    }
}

export default EmployeeService;
