import express, { NextFunction } from "express";
import EmployeeService from "../service/employee.service";
import { plainToInstance } from "class-transformer";
import EmployeeDto from "../dto/employee.dto";
import { validate } from "class-validator";
import ValidationException from "../exception/validation.exception";
import authenticateMiddleware from "../middleware/authenticate.middleware";
import authorize from "../middleware/authorize.middleware";
import UpdateEmployeeDto from "../dto/updateEmployee.dto";
import LoginEmployeeDto from "../dto/loginEmployee.dto";

// to : make use of dto and recheck status codes
// authorize dynamic
// list of roles kittan api
//keep format
// 90% test coverage in services
// C -> S -> R, S -> S
// handle all exceptions
// logging with winston to a  file
// env
// remove uneccesary async await
// cascade for dept, role

class EmployeeController {
    public router: express.Router;

    constructor(private employeeService: EmployeeService) {
        this.router = express.Router();

        this.router.post(
            "/",
            authenticateMiddleware,
            authorize(["admin"]),
            this.create
        );
        this.router.post("/login", this.loginEmployee);
        this.router.get("/", authenticateMiddleware, this.find);
        this.router.get("/:id", authenticateMiddleware, this.findOneById);
        this.router.patch(
            "/:id",
            authenticateMiddleware,
            authorize(["admin"]),
            this.patch
        );
        this.router.delete(
            "/:id",
            authenticateMiddleware,
            authorize(["admin"]),
            this.delete
        );
    }

    create = async (
        req: express.Request,
        res: express.Response,
        next: NextFunction
    ) => {
        try {
            const createEmployeeDto: EmployeeDto = plainToInstance(
                EmployeeDto,
                req.body
            );
            const errors = await validate(createEmployeeDto);
            if (errors.length > 0) {
                throw new ValidationException(errors);
            }
            const employee = await this.employeeService.create(
                createEmployeeDto
            );
            res.status(201).send(employee);
        } catch (e) {
            next(e);
        }
    };

    loginEmployee = async (
        req: express.Request,
        res: express.Response,
        next: NextFunction
    ) => {
        const loinEmployeeDto = plainToInstance(LoginEmployeeDto, req.body);
        try {
            const token = await this.employeeService.loginEmployee(
                loinEmployeeDto
            );
            res.status(200).send({ data: token });
        } catch (e) {
            next(e);
        }
    };

    find = async (
        req: express.Request,
        res: express.Response,
        next: NextFunction
    ) => {
        try {
            const employees = await this.employeeService.find();
            res.status(200).send(employees);
        } catch (e) {
            next(e);
        }
    };

    findOneById = async (
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

    patch = async (
        req: express.Request,
        res: express.Response,
        next: NextFunction
    ) => {
        try {
            const updateEmployeeDto: UpdateEmployeeDto = plainToInstance(
                UpdateEmployeeDto,
                req.body
            );
            const errors = await validate(updateEmployeeDto);
            if (errors.length > 0) {
                throw new ValidationException(errors);
            }
            const employee = await this.employeeService.patch(
                parseInt(req.params.id),
                updateEmployeeDto
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
