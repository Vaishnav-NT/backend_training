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
import FormattedResponse from "../utils/formattedResponse";
import { RequestWithStartTime } from "../utils/requestWithStartTime";

// tcheck status codes
// 90% test coverage in services
// env
// remove uneccesary async await
// cascade for dept, role

class EmployeeController {
    public router: express.Router;

    constructor(private employeeService: EmployeeService) {
        this.router = express.Router();

        this.router.post(
            "/",
            // authenticateMiddleware,
            // authorize(["admin"]),
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
        req: RequestWithStartTime,
        res: express.Response,
        next: NextFunction
    ) => {
        req.startTime = new Date();
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
            console.log(employee);
            FormattedResponse.send(req, res, 201, employee);
        } catch (e) {
            next(e);
        }
    };

    loginEmployee = async (
        req: RequestWithStartTime,
        res: express.Response,
        next: NextFunction
    ) => {
        req.startTime = new Date();
        const loinEmployeeDto = plainToInstance(LoginEmployeeDto, req.body);
        try {
            const token = await this.employeeService.loginEmployee(
                loinEmployeeDto
            );
            FormattedResponse.send(req, res, 200, token);
        } catch (e) {
            next(e);
        }
    };

    find = async (
        req: RequestWithStartTime,
        res: express.Response,
        next: NextFunction
    ) => {
        try {
            req.startTime = new Date();
            const employees = await this.employeeService.find();
            FormattedResponse.send(req, res, 200, employees);
        } catch (e) {
            next(e);
        }
    };

    findOneById = async (
        req: RequestWithStartTime,
        res: express.Response,
        next: NextFunction
    ) => {
        try {
            req.startTime = new Date();
            const employee = await this.employeeService.findOneBy(
                parseInt(req.params.id)
            );
            FormattedResponse.send(req, res, 200, employee);
        } catch (e) {
            next(e);
        }
    };

    patch = async (
        req: RequestWithStartTime,
        res: express.Response,
        next: NextFunction
    ) => {
        try {
            req.startTime = new Date();
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
            FormattedResponse.send(req, res, 200, employee);
        } catch (e) {
            next(e);
        }
    };

    delete = async (
        req: RequestWithStartTime,
        res: express.Response,
        next: NextFunction
    ) => {
        try {
            req.startTime = new Date();
            const employee = await this.employeeService.delete(
                parseInt(req.params.id)
            );
            FormattedResponse.send(req, res, 204, employee);
        } catch (e) {
            next(e);
        }
    };
}

export default EmployeeController;
