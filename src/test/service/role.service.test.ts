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

    describe("Tests for get all department", () => {
        test("When department exists", async () => {
            const mockedFunction = jest.fn();
            const mockData = [
                {
                    id: 1,
                    name: "admin",
                },
            ];
            when(mockedFunction).calledWith().mockResolvedValueOnce(mockData);
            roleRepository.find = mockedFunction;
            const role = await roleService.find();
            expect(role).toMatchObject([
                {
                    id: 1,
                    name: "admin",
                },
            ]);
        });
    });
});
