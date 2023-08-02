import express from "express";
import Employee from "./Employee";
import dataSource from "./data_source";

const employeeRouter = express.Router();
const employeeRepository = dataSource.getRepository(Employee);

let count: number = 2;
const employees: Employee[] = [
    {
        id: 1,
        name: "John",
        email: "John23@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        name: "Jane",
        email: "Jane11@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
employeeRouter.get("/", async (req, res) => {
    const employees = await employeeRepository.find();
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
    await employeeRepository.remove(employee);
    res.status(201).send("Employee deleted successfully");
});

export default employeeRouter;
