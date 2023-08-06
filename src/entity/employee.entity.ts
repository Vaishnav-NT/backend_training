import { Entity, Column, OneToOne, ManyToOne } from "typeorm";
import Address from "./address.entity";
import Department from "./department.entity";
import AbstractEntity from "./abstarct-entity";
import Role from "./role.entity";
import { activityStatusEnum } from "../utils/activityStatus.enum";

@Entity("employees")
class Employee extends AbstractEntity {
    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    joiningDate: string;

    @Column()
    experience: number;

    @Column()
    activityStatus: boolean;

    @ManyToOne(() => Role, { nullable: true })
    role: Role;

    @OneToOne(() => Address, (address) => address.employee, { cascade: true })
    address: Address;

    @ManyToOne(() => Department, { nullable: true })
    department: Department;
}

export default Employee;
