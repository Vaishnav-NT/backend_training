import express, { NextFunction } from "express";
import EmployeeService from "../service/employee.service";
import { plainToInstance } from "class-transformer";
import CreateEmployeeDto from "../dto/create-employee.dto";
import { validate } from "class-validator";

class EmployeeController {
    public router: express.Router;

    constructor(private employeeService: EmployeeService) {
        this.router = express.Router();

        this.router.get("/", this.find);
        this.router.get("/:id", this.findOneBy);
        this.router.post("/", this.create);
        this.router.put("/:id", this.put);
        this.router.delete("/:id", this.delete);
    }

    find = async (req: express.Request, res: express.Response) => {
        try {
            const employees = await this.employeeService.find();
            res.status(200).send(employees);
        } catch (e) {
            res.status(500).send(e);
        }
    };

    findOneBy = async (
        req: express.Request,
        res: express.Response,
        next: NextFunction
    ) => {
        try {
            const employee = await this.employeeService.findOneBy(
                parseInt(req.params.id)
            );
            res.status(200).send(employee);
        } catch (e) {
            next(e);
        }
    };

    create = async (
        req: express.Request,
        res: express.Response,
        next: NextFunction
    ) => {
        try {
            const createEmployeeDto = plainToInstance(
                CreateEmployeeDto,
                req.body
            );

            const errors = await validate(createEmployeeDto);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
            }
            const employee = await this.employeeService.create({
                name: req.body.name,
                email: req.body.email,
                address: req.body.address,
            });
            res.status(201).send(employee);
        } catch (e) {
            next(e);
        }
    };

    put = async (
        req: express.Request,
        res: express.Response,
        next: NextFunction
    ) => {
        try {
            const employee = await this.employeeService.put(
                parseInt(req.params.id),
                {
                    name: req.body.name,
                    email: req.body.email,
                    address: req.body.address,
                }
            );
            res.status(201).send(employee);
        } catch (e) {
            next(e);
        }
    };

    delete = async (
        req: express.Request,
        res: express.Response,
        next: NextFunction
    ) => {
        try {
            await this.employeeService.delete(parseInt(req.params.id));
            res.status(201).send("Employee deleted successfully");
        } catch (e) {
            next(e);
        }
    };
}

export default EmployeeController;
