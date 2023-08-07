import { DataSource, getRepository } from "typeorm";
import DepartmentRepository from "../../repository/department.repository";
import DepartmentService from "../../service/department.service";
import Department from "../../entity/department.entity";
import { when } from "jest-when";

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
});
