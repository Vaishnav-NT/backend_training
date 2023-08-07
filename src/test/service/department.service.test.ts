import { DataSource, getRepository } from "typeorm";
import DepartmentRepository from "../../repository/department.repository";
import DepartmentService from "../../service/department.service";
import Department from "../../entity/department.entity";
import { when } from "jest-when";
import UpdateDepartmentDto from "../../dto/updateDepartment.dto";
import DepartmentDto from "../../dto/department.dto";

describe("Department service tests", () => {
    let departmentService: DepartmentService;
    let departmentRepository: DepartmentRepository;

    beforeAll(() => {
        const dataSource: DataSource = {
            getRepository: jest.fn(),
        } as unknown as DataSource;

        departmentRepository = new DepartmentRepository(
            dataSource.getRepository(Department)
        );

        departmentService = new DepartmentService(departmentRepository);
    });

    describe("Tests for creating a department", () => {
        test("Test create a department", async () => {
            const mockedFunction = jest.fn();
            const mockData: Department = {
                name: "HR",
            } as Department;

            const mockDto: DepartmentDto = {
                name: "HR",
            } as DepartmentDto;

            departmentRepository.create = mockedFunction;
            when(mockedFunction)
                .calledWith(mockData)
                .mockResolvedValueOnce({ id: 1, name: "HR" });
            const department = await departmentService.create(mockDto);
            expect(department).toStrictEqual({ id: 1, name: "HR" });
        });
    });

    describe("Tests for getting a department by id", () => {
        test("Test to get department with id 1", async () => {
            const mockedFunction = jest.fn();
            const mockData = {
                id: 1,
                name: "HR",
            };
            when(mockedFunction).calledWith(1).mockResolvedValueOnce(mockData);
            departmentRepository.findById = mockedFunction;
            const department = await departmentService.findOneById(1);
            expect(department).toMatchObject(mockData);
        });

        test("Test to get department with id 1", async () => {
            const mockedFunction = jest.fn();
            when(mockedFunction).calledWith(1).mockReturnValueOnce(null);
            departmentRepository.findById = mockedFunction;
            const department = async () =>
                await departmentService.findOneById(1);
            expect(department).rejects.toThrowError();
        });
    });

    describe("Tests for get all department", () => {
        test("When department exists", async () => {
            const mockedFunction = jest.fn();
            const mockData = [
                {
                    id: 1,
                    name: "HR",
                },
            ];
            when(mockedFunction).calledWith().mockResolvedValueOnce(mockData);
            departmentRepository.find = mockedFunction;
            const department = await departmentService.find();
            expect(department).toMatchObject([
                {
                    id: 1,
                    name: "HR",
                },
            ]);
        });

        test("No department present", async () => {
            const mockedFunction = jest.fn();
            when(mockedFunction).calledWith().mockReturnValueOnce(null);
            departmentRepository.find = mockedFunction;
            const department = async () => await departmentService.find();
            expect(department).rejects.toThrowError();
        });
    });

    describe("Tests on update department", () => {
        test("When department exists", async () => {
            const mockData = {
                id: 1,
                name: "HR",
            };
            const mockResult = { id: 1, name: "QA" };

            const mockedFunction1 = jest.fn();
            departmentRepository.findById = mockedFunction1;
            when(mockedFunction1).calledWith(1).mockResolvedValueOnce(mockData);

            const mockedFunction2 = jest.fn();
            departmentRepository.patch = mockedFunction2;
            when(mockedFunction2)
                .calledWith({ id: 1, name: "QA" })
                .mockResolvedValueOnce({ id: 1, name: "QA" });

            const department = await departmentService.put(1, mockResult);
            expect(department).toStrictEqual(mockResult);
        });

        test("No department present", async () => {
            const mockedFunction = jest.fn();
            when(mockedFunction).calledWith().mockReturnValueOnce(null);
            departmentRepository.find = mockedFunction;
            const department = async () => await departmentService.find();
            expect(department).rejects.toThrowError();
        });
    });

    describe("Tests to delete an employee", () => {
        test("When department is present", async () => {
            const mockedFunction1 = jest.fn();
            departmentRepository.findById = mockedFunction1;
            when(mockedFunction1)
                .calledWith(1)
                .mockReturnValueOnce({ id: 1, name: "HR" });

            const mockedFunction2 = jest.fn();
            departmentRepository.delete = mockedFunction2;
            when(mockedFunction2)
                .calledWith({ id: 1, name: "HR" })
                .mockReturnValueOnce({
                    id: 1,
                    name: "John",
                });

            const result = await departmentService.delete(1);
            expect(result).toStrictEqual({
                id: 1,
                name: "John",
            });
        });
    });
});
