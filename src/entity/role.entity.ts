import { Column, Entity, OneToMany } from "typeorm";
import AbstractEntity from "./abstarct-entity";
import Employee from "./employee.entity";
import { RoleEnum } from "../utils/role.enum";

@Entity()
class Role extends AbstractEntity {
    @Column()
    name: string;

    @OneToMany(() => Employee, (employee) => employee.role)
    employees: Employee[];
}

export default Role;
