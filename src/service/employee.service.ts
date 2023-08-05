import EmployeeRepository from "../repository/employee.repository";
import Employee from "../entity/employee.entity";
import Address from "../entity/address.entity";
import HttpException from "../exception/http.exception";
import bcrypt, { hash } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import EmployeeDto from "../dto/employee.dto";
import { jwtPayload } from "../utils/jwtPayload.type";
import UpdateEmployeeDto from "../dto/updateEmployee.dto";
import LoginEmployeeDto from "../dto/loginEmployee.dto";

class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository) {}

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

    loginEmployee = async (loginData: LoginEmployeeDto) => {
        const employee = await this.employeeRepository.findOneByEmail(
            loginData.email
        );
        if (!employee) {
            throw new HttpException(400, "Employee not found");
        }
        const result = bcrypt.compare(loginData.password, employee.password);
        if (!result) {
            throw new HttpException(401, "Incorrect username or password");
        }

        const payload: jwtPayload = {
            name: employee.name,
            email: employee.email,
            role: employee.role,
        };

        const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRE_TIME,
        });

        return { token };
    };

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

    async patch(id: number, data: UpdateEmployeeDto): Promise<Employee> {
        const employee = await this.employeeRepository.findOneById(id);
        if (!employee) {
            throw new HttpException(404, `Employee not found with ${id}`);
        }
        employee[Object.keys(data)[0]] = data[Object.keys(data)[0]];
        console.log(data);
        return this.employeeRepository.patch(employee);
    }

    async delete(id: number): Promise<void> {
        const employee = await this.employeeRepository.findOneById(id);
        if (!employee) {
            throw new HttpException(404, `Employee not found with ${id}`);
        }
        return this.employeeRepository.delete(employee);
    }
}

export default EmployeeService;
