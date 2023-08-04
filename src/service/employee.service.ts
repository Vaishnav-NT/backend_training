import EmployeeRepository from "../repository/employee.repository";
import Employee from "../entity/employee.entity";
import Address from "../entity/address.entity";
import HttpException from "../exception/http.exception";
import bcrypt, { hash } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import EmployeeDto from "../dto/employee.dto";
import { jwtPayload } from "../utils/jwtPayload.type";

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
        const employee = await this.employeeRepository.findOneById(id);
        if (!employee) {
            throw new HttpException(404, `Employee not found with ${id}`);
        }
        return employee;
    }

    async create(employeeData: EmployeeDto): Promise<Employee> {
        const newEmployee = new Employee();
        newEmployee.name = employeeData.name;
        newEmployee.email = employeeData.email;
        newEmployee.password = await hash(employeeData.password, 10);
        newEmployee.role = employeeData.role;
        const newAddress = new Address();
        newAddress.line1 = employeeData.address.line1;
        newAddress.pincode = employeeData.address.pincode;

        newEmployee.address = newAddress;
        return this.employeeRepository.create(newEmployee);
    }

    async put(id: number, data): Promise<Employee> {
        const employee = await this.employeeRepository.findOneById(id);
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
        const employee = await this.employeeRepository.findOneById(id);
        if (!employee) {
            throw new HttpException(404, `Employee not found with ${id}`);
        }
        return this.employeeRepository.delete(employee);
    }

    loginEmployee = async (email: string, password: string) => {
        const employee = await this.employeeRepository.findOneByEmail(email);
        if (!employee) {
            throw new HttpException(401, "Incorrect username or password");
        }
        const result = bcrypt.compare(password, employee.password);
        if (!result) {
            throw new HttpException(401, "Incorrect username or password");
        }

        const payload: jwtPayload = {
            name: employee.name,
            email: employee.email,
            role: employee.role,
        };

        const token = jsonwebtoken.sign(payload, "ABCDE", {
            expiresIn: "1h",
        });

        return { token };
    };
}

export default EmployeeService;
