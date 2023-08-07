import { DataSource } from "typeorm";
import RoleRepository from "../../repository/role.repository";
import RoleService from "../../service/role.service";
import Role from "../../entity/role.entity";
import { when } from "jest-when";

describe("Role service tests", () => {
    let roleRepository: RoleRepository;
    let roleService: RoleService;

    beforeAll(() => {
        const dataSource: DataSource = {
            getRepository: jest.fn(),
        } as unknown as DataSource;

        roleRepository = new RoleRepository(dataSource.getRepository(Role));
        roleService = new RoleService(roleRepository);
    });

    describe("Tests for getting list of all roles", () => {
        test("No roles present", async () => {
            const mockedFunction = jest.fn();
            when(mockedFunction).calledWith().mockResolvedValueOnce([]);
            roleRepository.find = mockedFunction;
            const result = async () => await roleService.find();
            expect(result).rejects.toThrowError();
        });
    });
});
