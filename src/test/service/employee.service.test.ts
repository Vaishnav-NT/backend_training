import { DataSource } from "typeorm";
import EmployeeRepository from "../../repository/employee.repository";
import Employee from "../../entity/employee.entity";
import EmployeeService from "../../service/employee.service";
import { when } from "jest-when";
import UpdateEmployeeDto from "../../dto/updateEmployee.dto";
import { plainToInstance } from "class-transformer";
import EmployeeDto from "../../dto/employee.dto";
import DepartmentService from "../../service/department.service";
import DepartmentRepository from "../../repository/department.repository";
import Department from "../../entity/department.entity";
import RoleService from "../../service/role.service";
import RoleRepository from "../../repository/role.repository";
import Role from "../../entity/role.entity";

describe("Employee service tests", () => {
    let employeeService: EmployeeService;
    let employeeRepository: EmployeeRepository;
    let departmentService: jest.Mocked<DepartmentService>;
    let roleService: jest.Mocked<RoleService>;
    beforeAll(() => {
        const dataSource: DataSource = {
            getRepository: jest.fn(),
        } as unknown as DataSource;
        employeeRepository = new EmployeeRepository(
            dataSource.getRepository(Employee)
        );

        let roleRepository = new RoleRepository(dataSource.getRepository(Role));
        roleService = new RoleService(
            roleRepository
        ) as jest.Mocked<RoleService>;

        let departmentRepository = new DepartmentRepository(
            dataSource.getRepository(Department)
        );
        departmentService = new DepartmentService(
            departmentRepository
        ) as jest.Mocked<DepartmentService>;

        employeeService = new EmployeeService(
            employeeRepository,
            roleService,
            departmentService
        );
    });

    describe("Tests to create an employee", () => {
        test("When employees is present", async () => {
            const roleData: Role = plainToInstance(Role, {
                id: 6,
                createdAt: new Date("2023-08-05T21:21:38.759Z"),
                updatedAt: new Date("2023-08-05T21:21:38.759Z"),
                deletedAt: null,
                name: "user",
            });

            const departmentData = plainToInstance(Department, {
                id: 5,
                createdAt: new Date("2023-08-05T22:14:46.367Z"),
                updatedAt: new Date("2023-08-05T22:14:46.367Z"),
                deletedAt: null,
                name: "QA",
            });

            const addressData = {
                address_line_1: "Edachira",
                address_line_2: "Kakkanad",
                city: "Ernakulam",
                state: "Kerala",
                country: "India",
                pincode: "682024",
                deletedAt: null,
                id: 39,
                createdAt: new Date("2023-08-07T05:19:56.079Z"),
                updatedAt: new Date("2023-08-07T05:19:56.079Z"),
            };

            const newEmployee = {
                name: "Ashok",
                username: "ash",
                password:
                    "$2b$10$g7axllovJzuRJuWmWITm0OyZQsdmyZ/YsSypDi/PGsbNKA6eujU4q",
                joiningDate: "11/02/2012",
                experience: 1,
                activityStatus: "Active",
                department: departmentData,
                role: roleData,
                address: addressData,
                deletedAt: null,
                id: 38,
                createdAt: new Date("2023-08-07T05:19:56.079Z"),
                updatedAt: new Date("2023-08-07T05:19:56.079Z"),
            };

            const newEmployeeDto = plainToInstance(EmployeeDto, newEmployee);

            jest.spyOn(departmentService, "findOneById").mockResolvedValueOnce(
                departmentData
            );

            jest.spyOn(roleService, "findOneByName").mockResolvedValueOnce(
                roleData
            );

            const mockedFunction = jest.fn();
            employeeRepository.create = mockedFunction;
            mockedFunction.mockReturnValueOnce(newEmployee);

            const result = await employeeService.create(newEmployeeDto);
            expect(result).toStrictEqual(newEmployee);
        });
    });

    describe("Test login employee", () => {
        test("Delete employee successs", () => {
            
        })
    })

    describe("Tests for getEmployeeById", () => {
        test("test employee for id 1", async () => {
            const mockedFunction = jest.fn();
            const mockData = {
                id: 1,
                name: "John Newman",
                username: "jo",
            };
            when(mockedFunction).calledWith(1).mockReturnValueOnce(mockData);
            employeeRepository.findOneById = mockedFunction;
            const employee = await employeeService.findOneBy(1);
            expect(employee).toMatchObject(mockData);
        });

        test("test employee for id 1", async () => {
            const mockedFunction = jest.fn();
            when(mockedFunction).calledWith(1).mockReturnValueOnce(null);
            employeeRepository.findOneById = mockedFunction;
            const employee = async () => await employeeService.findOneBy(1);
            expect(employee).rejects.toThrowError();
        });
    });

    describe("Tests for get all employees", () => {
        test("When employees are present", async () => {
            const mockedFunction = jest.fn();
            const mockData = [
                {
                    id: 1,
                    name: "John Newman",
                    username: "jo",
                },
                {
                    id: 2,
                    name: "John Newman",
                    username: "john",
                },
            ];
            mockedFunction.mockResolvedValueOnce(mockData);
            employeeRepository.find = mockedFunction;
            const result = await employeeService.find();
            expect(result).toStrictEqual([
                {
                    id: 1,
                    name: "John Newman",
                    username: "jo",
                },
                {
                    id: 2,
                    name: "John Newman",
                    username: "john",
                },
            ]);
        });

        test("No employees present", async () => {
            const mockedFunction = jest.fn();
            when(mockedFunction).calledWith().mockReturnValueOnce(null);
            employeeRepository.find = mockedFunction;
            const result = async () => await employeeService.find();
            expect(result).rejects.toThrowError();
        });
    });

    describe("Tests to update an employee details", () => {
        test("When employees is present", async () => {
            const mockedFunction1 = jest.fn();
            employeeRepository.findOneById = mockedFunction1;
            when(mockedFunction1)
                .calledWith(1)
                .mockReturnValueOnce({ name: "John", experience: 8 });

            const mockedFunction2 = jest.fn();
            employeeRepository.patch = mockedFunction2;
            when(mockedFunction2)
                .calledWith({ name: "John J", experience: 8 })
                .mockReturnValueOnce({
                    name: "John J",
                    experience: 8,
                });

            const mockData: UpdateEmployeeDto = {
                name: "John J",
                experience: 8,
            } as UpdateEmployeeDto;

            const result = await employeeService.patch(1, mockData);
            expect(result).toStrictEqual({
                name: "John J",
                experience: 8,
            });
        });
    });

    describe("Tests to delete an employee", () => {
        test("When employees is present", async () => {
            const mockedFunction1 = jest.fn();
            employeeRepository.findOneById = mockedFunction1;
            when(mockedFunction1)
                .calledWith(1)
                .mockReturnValueOnce({ name: "John", experience: 8 });

            const mockedFunction2 = jest.fn();
            employeeRepository.delete = mockedFunction2;
            when(mockedFunction2)
                .calledWith({ name: "John", experience: 8 })
                .mockReturnValueOnce({
                    name: "John",
                    experience: 8,
                });

            const result = await employeeService.delete(1);
            expect(result).toStrictEqual({
                name: "John",
                experience: 8,
            });
        });
    });
});
