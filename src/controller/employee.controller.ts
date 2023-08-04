import express, { NextFunction } from "express";
import EmployeeService from "../service/employee.service";
import { plainToInstance } from "class-transformer";
import EmployeeDto from "../dto/employee.dto";
import { validate } from "class-validator";
import ValidationException from "../exception/validation.exception";
import authenticateMiddleware from "../middleware/authenticate.middleware";
import authorizeMiddleware from "../middleware/authorize.middleware";

// to : make use of dto and recheck status codes

class EmployeeController {
    public router: express.Router;

    constructor(private employeeService: EmployeeService) {
        this.router = express.Router();
        this.router.get("/", authenticateMiddleware, this.find);
        this.router.get("/:id", authenticateMiddleware, this.findOneBy);
        this.router.post(
            "/",
            authenticateMiddleware,
            authorizeMiddleware,
            this.create
        );
        this.router.put("/:id", this.put);
        this.router.delete("/:id", this.delete);
        this.router.post("/login", this.loginEmployee);
    }

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
            const employeeDto = plainToInstance(EmployeeDto, req.body);
            const errors = await validate(employeeDto);
            if (errors.length > 0) {
                throw new ValidationException(errors);
            }
            const employee = await this.employeeService.create({
                name: employeeDto.name,
                email: employeeDto.email,
                address: employeeDto.address,
                password: employeeDto.password,
                role: employeeDto.role,
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
            const employeeDto = plainToInstance(EmployeeDto, req.body);
            const errors = await validate(employeeDto);
            if (errors.length > 0) {
                throw new ValidationException(errors);
            }
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

    public loginEmployee = async (
        req: express.Request,
        res: express.Response,
        next: NextFunction
    ) => {
        const { email, password } = req.body;
        try {
            const token = await this.employeeService.loginEmployee(
                email,
                password
            );
            res.status(200).send({ data: token });
        } catch (e) {
            next(e);
        }
    };
}

export default EmployeeController;
