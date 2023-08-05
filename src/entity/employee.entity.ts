import { Entity, Column, OneToOne, ManyToOne } from "typeorm";
import Address from "./address.entity";
//import Department from "./department.entity";
import AbstractEntity from "./abstarct-entity";
import { Role } from "../utils/role.enum";

@Entity("employees")
class Employee extends AbstractEntity {
    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    joiningDate: string;

    @Column()
    experience: number;

    @Column({ default: Role.DEVELOPER })
    role: Role;

    @OneToOne(() => Address, (address) => address.employee, { cascade: true })
    address: Address;

    // @ManyToOne(() => Department, (department) => department.employee)
    // department: Department;
}

export default Employee;
