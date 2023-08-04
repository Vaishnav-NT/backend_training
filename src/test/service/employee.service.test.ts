import { DataSource } from "typeorm";
import EmployeeRepository from "../../repository/employee.repository";
import Employee from "../../entity/employee.entity";
import EmployeeService from "../../service/employee.service";
import { when } from "jest-when";

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
                id: 20,
                createdAt: new Date("2023-08-04T03:13:09.449Z"),
                updatedAt: new Date("2023-08-04T03:13:09.449Z"),
                deletedAt: null,
                name: "John Newman",
                email: "john@mail.com",
                age: null,
                password:
                    "$2b$10$V3PqZiOnyewT/Y6ai8Q9QeHv1A7TVe1pUQE0PQocDNKpSlBnrvAN.",
                role: "UI",
                address: {
                    id: 19,
                    createdAt: new Date("2023-08-04T03:13:09.449Z"),
                    updatedAt: new Date("2023-08-04T03:13:09.449Z"),
                    deletedAt: null,
                    line1: "adress line one",
                    line2: null,
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

    describe("Get all employee", () => {
        test("Should return users", async () => {
            const spy = jest.spyOn(employeeRepository, "find");
            expect(spy).toBeCalledTimes(1);
        });
    });
});
