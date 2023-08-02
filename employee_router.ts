import express from "express";
import Employee from "./Employee";

const employeeRouter = express.Router();
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

employeeRouter.get("/", (req, res) => {
    res.status(200).send(employees);
});

employeeRouter.get("/:id", (req, res) => {
    const employee = employees.find((emp) => {
        return emp.id === parseInt(req.params.id);
    });
    res.status(200).send(employee);
});

employeeRouter.post("/", (req, res) => {
    const newEmployee = new Employee();
    newEmployee.id = ++count;
    newEmployee.name = req.body.name;
    newEmployee.email = req.body.email;
    newEmployee.createdAt = new Date();
    newEmployee.updatedAt = new Date();
    employees.push(newEmployee);
    res.status(201).send(newEmployee);
});

employeeRouter.put("/:id", (req, res) => {
    const employee = employees.find((emp) => {
        return emp.id === parseInt(req.params.id);
    });
    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.updatedAt = new Date();
    res.status(201).send(employee);
});

employeeRouter.delete("/:id", (req, res) => {
    const employeeIndex = employees.findIndex((emp) => {
        if (emp.id === parseInt(req.params.id)) {
            return emp.id - 1;
        }
    });
    employees.splice(employeeIndex, 1);
    res.status(201).send("Employee deleted successfully");
});

export default employeeRouter;
