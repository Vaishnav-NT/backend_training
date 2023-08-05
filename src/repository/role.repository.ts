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

    findOneByID(id: number): Promise<Role> {
        return this.roleRepository.findOne({
            where: { id },
        });
    }

    put(updatedRole: Role): Promise<Role> {
        return this.roleRepository.save(updatedRole);
    }

    delete(roleToBeDeleted: Role): void {
        this.roleRepository.softDelete(roleToBeDeleted);
    }
}

export default RoleRepository;
