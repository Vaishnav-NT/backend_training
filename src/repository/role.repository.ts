import { Repository } from "typeorm";
import Role from "../entity/role.entity";

class RoleRepository {
    constructor(private roleRepository: Repository<Role>) {}

    create(role: Role): Promise<Role> {
        return this.roleRepository.save(role);
    }

    find(): Promise<Role[]> {
        return this.roleRepository.find();
    }

    findOneByName(name: string): Promise<Role> {
        return this.roleRepository.findOne({
            where: { name },
        });
    }

    findOneByID(id: number): Promise<Role> {
        return this.roleRepository.findOne({
            where: { id },
        });
    }

    put(updatedRole: Role): Promise<Role> {
        return this.roleRepository.save(updatedRole);
    }

    delete(roleToBeDeleted: Role): Promise<Role> {
        return this.roleRepository.softRemove(roleToBeDeleted);
    }

    count(): Promise<number> {
        return this.roleRepository.count();
    }
}

export default RoleRepository;
