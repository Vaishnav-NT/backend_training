import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    JoinColumn,
} from "typeorm";
import Employee from "./employee.entity";
import e from "express";

@Entity()
class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    line1: string;

    @Column()
    pincode: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToOne(() => Employee, (employee) => employee.address)
    @JoinColumn()
    employee: Employee;
}

export default Address;
