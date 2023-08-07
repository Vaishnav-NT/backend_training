import { DataSource } from "typeorm";
import EmployeeRepository from "../../repository/employee.repository";
import Employee from "../../entity/employee.entity";
import EmployeeService from "../../service/employee.service";
import { when } from "jest-when";
import UpdateEmployeeDto from "../../dto/updateEmployee.dto";

describe("Employee service tests", () => {
    let employeeService: EmployeeService;
    let employeeRepository: EmployeeRepository;
    beforeAll(() => {
        const dataSource: DataSource = {
            getRepository: jest.fn(),
        } as unknown as DataSource;
        employeeRepository = new EmployeeRepository(
            dataSource.getRepository(Employee)
        );
        employeeService = new EmployeeService(employeeRepository);
    });

    describe("Tests for getEmployeeById", () => {
        test("test employee for id 1", async () => {
            const mockedFunction = jest.fn();
            const mockData = {
                id: 1,
                name: "John Newman",
                username: "jo",
                role: {
                    id: 1,
                    name: "admin",
                },
                department: {
                    id: 1,
                    name: "HR",
                },
                address: {
                    id: 1,
                    line1: "line one",
                    line2: "line 2",
                    pincode: "686691",
                },
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
                    username: "jo",
                },
            ];
            when(mockedFunction)
                .calledWith()
                .mockReturnValueOnce([
                    {
                        id: 1,
                        name: "John Newman",
                        username: "jo",
                    },
                    {
                        id: 2,
                        name: "John Newman",
                        username: "jo",
                    },
                ]);
            employeeRepository.find = mockedFunction;
            const result = async () => await employeeService.find();
            expect(result).resolves.toStrictEqual([
                {
                    id: 1,
                    name: "John Newman",
                    username: "jo",
                },
                {
                    id: 1,
                    name: "John Newman",
                    username: "jo",
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
            const mockedFunction = jest.fn();
            employeeRepository.patch = mockedFunction;
            when(mockedFunction)
                .calledWith({ id: 1, name: "John", experience: 8 })
                .mockReturnValueOnce({
                    id: 1,
                    name: "John",
                    experience: 8,
                });
        });
    });

    // describe("Get all employee", () => {
    //     test("Should return users", async () => {
    //         const spy = jest.spyOn(employeeRepository, "find");
    //         expect(spy).toBeCalledTimes(1);
    //     });
    // });
});
