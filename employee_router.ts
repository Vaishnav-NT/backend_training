import express from "express";
import Employee from "./Employee";
import dataSource from "./data_source";
import { FindOptionsSelect, FindOptionsWhere, ILike } from "typeorm";

const employeeRouter = express.Router();
const employeeRepository = dataSource.getRepository(Employee);

employeeRouter.get("/", async (req, res) => {
    const namefilter = req.query.name as string;
    const emaililter = req.query.email as string;

    const qb = employeeRepository.createQueryBuilder();

    if (namefilter) {
        qb.andWhere("name LIKE :name", { name: `${namefilter}%` });
    }

    if (emaililter) {
        qb.andWhere("email LIKE :email", { email: `%${emaililter}` });
    }

    const employees = await qb.getMany();
    res.status(200).send(employees);
});

employeeRouter.get("/:id", async (req, res) => {
    const employee = await employeeRepository.findOneBy({
        id: parseInt(req.params.id),
    });

    res.status(200).send(employee);
});

employeeRouter.post("/", async (req, res) => {
    const newEmployee = new Employee();
    newEmployee.name = req.body.name;
    newEmployee.email = req.body.email;
    const savedEmployee = await employeeRepository.save(newEmployee);
    res.status(201).send(savedEmployee);
});

employeeRouter.put("/:id", async (req, res) => {
    const employee = await employeeRepository.findOneBy({
        id: parseInt(req.params.id),
    });
    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.updatedAt = new Date();
    const updatedEmployee = await employeeRepository.save(employee);
    res.status(201).send(updatedEmployee);
});

employeeRouter.delete("/:id", async (req, res) => {
    const employee = await employeeRepository.findOneBy({
        id: parseInt(req.params.id),
    });
    await employeeRepository.softRemove(employee);
    res.status(201).send("Employee deleted successfully");
});

export default employeeRouter;
