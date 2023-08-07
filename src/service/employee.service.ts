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
// import { roleService } from "../route/role.route";
// import { departmentService } from "../route/department.route";
import { activityStatusEnum } from "../utils/activityStatus.enum";
import RoleService from "./role.service";
import DepartmentService from "./department.service";

class EmployeeService {
    constructor(
        private employeeRepository: EmployeeRepository,
        private roleService: RoleService,
        private departmentService: DepartmentService
    ) {}

    async create(employeeData: EmployeeDto): Promise<Employee> {
        console.log(employeeData);
        const newEmployee = new Employee();
        newEmployee.name = employeeData.name;
        newEmployee.username = employeeData.username;
        newEmployee.password = await hash(employeeData.password, 10);
        newEmployee.joiningDate = employeeData.joiningDate;
        newEmployee.experience = employeeData.experience;
        newEmployee.activityStatus = activityStatusEnum.ACTIVE;

        if (employeeData.departmentId) {
            const department = await this.departmentService.findOneById(
                parseInt(employeeData.departmentId)
            );
            newEmployee.department = department;
        }

        if (employeeData.role !== undefined) {
            const role = await this.roleService.findOneByName(
                employeeData.role
            );
            newEmployee.role = role;
        }

        const newAddress = new Address();
        newAddress.address_line_1 = employeeData.address.address_line_1;
        newAddress.address_line_2 = employeeData.address.address_line_2;
        newAddress.city = employeeData.address.city;
        newAddress.state = employeeData.address.state;
        newAddress.country = employeeData.address.country;
        newAddress.pincode = employeeData.address.pincode;
        newEmployee.address = newAddress;

        ///console.log(newEmployee);
        return this.employeeRepository.create(newEmployee);
    }

    loginEmployee = async (loginData: LoginEmployeeDto) => {
        const employee = await this.employeeRepository.findOneByUsername(
            loginData.username
        );
        if (!employee) {
            throw new HttpException(404, "Employee not found");
        }
        const result = bcrypt.compare(loginData.password, employee.password);
        if (!result) {
            throw new HttpException(400, "Incorrect username or password");
        }
        console.log(employee.role.name);

        const payload: jwtPayload = {
            name: employee.name,
            username: employee.username,
            role: employee.role.name,
        };

        const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRE_TIME,
        });

        console.log(token);
        return employee;
        // return { token };
    };

    // async find(): Promise<[Employee[], number]> {
    //     const [employees, count] = await this.employeeRepository.find();
    //     if (!employees) {
    //         throw new HttpException(404, "No employee present");
    //     }
    //     return [employees, count];
    // }

    async find(): Promise<Employee[]> {
        const employees = await this.employeeRepository.find();
        return employees;
    }

    async findOneBy(id: number): Promise<Employee> {
        const employee = await this.employeeRepository.findOneById(id);
        if (!employee) {
            throw new HttpException(404, `Employee not found with ${id}`);
        }
        return employee;
    }

    // async count(): Promise<number> {
    //     return await this.employeeRepository.count();
    // }

    async patch(id: number, data: UpdateEmployeeDto): Promise<Employee> {
        const employee = await this.employeeRepository.findOneById(id);
        if (!employee) {
            throw new HttpException(404, `Employee not found with ${id}`);
        }

        for (const k in data)
            if (!(k in employee)) throw new HttpException(400, "Bad Request");

        const updatedEmployee = {
            ...employee,
            ...(data as unknown as Employee),
        };

        return await this.employeeRepository.patch(updatedEmployee);
    }

    async delete(id: number): Promise<Employee> {
        const employee = await this.employeeRepository.findOneById(id);
        if (!employee) {
            throw new HttpException(404, `Employee not found with ${id}`);
        }
        return await this.employeeRepository.delete(employee);
    }
}

export default EmployeeService;
