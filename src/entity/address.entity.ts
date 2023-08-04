import { Column, Entity, OneToOne, JoinColumn } from "typeorm";
import Employee from "./employee.entity";
import e from "express";
import AbstractEntity from "./abstarct-entity";

@Entity()
class Address extends AbstractEntity {
    @Column()
    line1: string;

    @Column()
    pincode: string;

    @OneToOne(() => Employee, (employee) => employee.address)
    @JoinColumn()
    employee: Employee;
}

export default Address;
