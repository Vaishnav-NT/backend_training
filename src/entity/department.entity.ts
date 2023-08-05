import { Column, Entity, OneToMany } from "typeorm";
import Employee from "./employee.entity";
import AbstractEntity from "./abstarct-entity";

@Entity()
class Department extends AbstractEntity {
    @Column()
    name: string;

    @OneToMany(() => Employee, (employee) => employee.department)
    employee: Employee[];
}

export default Department;
