import RoleDto from "../dto/role.dto";
import Role from "../entity/role.entity";
import HttpException from "../exception/http.exception";
import RoleRepository from "../repository/role.repository";

class RoleService {
    constructor(private roleRepository: RoleRepository) {}

    async create(roleData: RoleDto) {
        console.log("-----------", roleData);
        const role = new Role();
        role.name = roleData.name;
        return this.roleRepository.create(role);
    }

    async find() {
        const roles = await this.roleRepository.find();
        if (!roles) {
            throw new HttpException(404, `No roles found`);
        }
        return roles;
    }

    async findOneByID(id: number) {
        const role = await this.roleRepository.findOneByID(id);
        if (!role) {
            throw new HttpException(404, `No roles found`);
        }
        return role;
    }

    async put(id: number, updatedRoleData: RoleDto) {
        const role = await this.roleRepository.findOneByID(id);
        if (!role) {
            throw new HttpException(404, `No roles found`);
        }
        role.name = updatedRoleData.name;
        return role;
    }

    async delete(id: number) {
        const role = await this.roleRepository.findOneByID(id);
        if (!role) {
            throw new HttpException(404, `No roles found`);
        }
        return role;
    }
}

export default RoleService;
