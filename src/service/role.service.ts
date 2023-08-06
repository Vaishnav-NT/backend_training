import RoleDto from "../dto/role.dto";
import Role from "../entity/role.entity";
import HttpException from "../exception/http.exception";
import RoleRepository from "../repository/role.repository";

class RoleService {
    constructor(private roleRepository: RoleRepository) {}

    async create(roleData: RoleDto) {
        const role = new Role();
        role.name = roleData.name;
        return this.roleRepository.create(role);
    }

    async find(): Promise<[Role[], number]> {
        const [roles, count] = await this.roleRepository.find();
        if (!roles) {
            throw new HttpException(404, `No roles found`);
        }
        return [roles, count];
    }

    async findOneByName(name: string) {
        const role = await this.roleRepository.findOneByName(name);
        if (!role) {
            throw new HttpException(404, `No role found with ${name}`);
        }
        return role;
    }

    async findOneByID(id: number) {
        const role = await this.roleRepository.findOneByID(id);
        if (!role) {
            throw new HttpException(404, `No roles found with ${id}`);
        }
        return role;
    }

    async put(id: number, updatedRoleData: RoleDto) {
        const role = await this.roleRepository.findOneByID(id);
        if (!role) {
            throw new HttpException(404, `No roles found with ${id}`);
        }
        role.name = updatedRoleData.name;
        return role;
    }

    async delete(id: number) {
        const role = await this.roleRepository.findOneByID(id);
        if (!role) {
            throw new HttpException(404, `No roles found with ${id}`);
        }
        return this.roleRepository.delete(role);
    }

    async count(): Promise<number> {
        return await this.roleRepository.count();
    }
}

export default RoleService;
