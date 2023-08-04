import express, { NextFunction } from "express";
import EmployeeService from "../service/employee.service";
import { plainToInstance } from "class-transformer";
import EmployeeDto from "../dto/employee.dto";
import { validate } from "class-validator";
import ValidationException from "../exception/validation.exception";
import authenticateMiddleware from "../middleware/authenticate.middleware";
import authorize from "../middleware/authorize.middleware";
import { Role } from "../utils/role.enum";

// to : make use of dto and recheck status codes
// authorize dynamic
// list of roles kittan api
//keep format
// 90% test coverage in services
// C -> S -> R, S -> S
// handle all exceptions
// logging with winston to a  file
// env
//

class EmployeeController {
    public router: express.Router;

    constructor(private employeeService: EmployeeService) {
        this.router = express.Router();
        this.router.get("/", authenticateMiddleware, this.find);
        this.router.get("/:id", authenticateMiddleware, this.findOneBy);
        this.router.post(
            "/",
            authenticateMiddleware,
            authorize([Role.HR]),
            this.create
        );
        this.router.put(
            "/:id",
            authenticateMiddleware,
            authorize([Role.HR]),
            this.put
        );
        this.router.delete(
            "/:id",
            authenticateMiddleware,
            authorize([Role.HR]),
            this.delete
        );
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
                    name: employeeDto.name,
                    email: employeeDto.email,
                    address: employeeDto.address,
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
