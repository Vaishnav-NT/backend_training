import express, { NextFunction } from "express";
import EmployeeService from "../service/employee.service";
import { plainToInstance } from "class-transformer";
import EmployeeDto from "../dto/employee.dto";
import { validate } from "class-validator";
import ValidationException from "../exception/validation.exception";
import authenticateMiddleware from "../middleware/authenticate.middleware";
import authorize from "../middleware/authorize.middleware";
import { Role } from "../utils/role.enum";
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
//

class EmployeeController {
    public router: express.Router;

    constructor(private employeeService: EmployeeService) {
        this.router = express.Router();

        this.router.post(
            "/",
            // authenticateMiddleware,
            // authorize([Role.HR]),
            this.create
        );
        this.router.post("/login", this.loginEmployee);
        this.router.get("/", this.find); // authenticateMiddleware,
        this.router.get("/:id", this.findOneBy); // authenticateMiddleware,
        this.router.put(
            "/:id",
            // authenticateMiddleware,
            // authorize([Role.HR]),
            this.put
        );
        this.router.patch(
            "/:id",
            // authenticateMiddleware,
            // authorize([Role.HR]),
            this.patch
        );
        this.router.delete(
            "/:id",
            // authenticateMiddleware,
            // authorize([Role.HR]),
            this.delete
        );
    }

    create = async (
        req: express.Request,
        res: express.Response,
        next: NextFunction
    ) => {
        try {
            const employeeDto: EmployeeDto = plainToInstance(
                EmployeeDto,
                req.body
            );
            const errors = await validate(employeeDto);
            if (errors.length > 0) {
                throw new ValidationException(errors);
            }
            const employee = await this.employeeService.create(employeeDto);
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

    patch = async (
        req: express.Request,
        res: express.Response,
        next: NextFunction
    ) => {
        try {
            const employeeDto: UpdateEmployeeDto = plainToInstance(
                UpdateEmployeeDto,
                req.body
            );
            const errors = await validate(employeeDto);
            if (errors.length > 0) {
                throw new ValidationException(errors);
            }
            const employee = await this.employeeService.patch(
                parseInt(req.params.id),
                employeeDto
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
