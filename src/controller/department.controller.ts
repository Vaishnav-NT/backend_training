import { plainToInstance } from "class-transformer";
import express, { Request, Response, NextFunction } from "express";
import DepartmentDto from "../dto/department.dto";
import { ValidationError, validate } from "class-validator";
import ValidationException from "../exception/validation.exception";
import DepartmentService from "../service/department.service";
import UpdateDepartmentDto from "../dto/updateDepartment.dto";
import authenticateMiddleware from "../middleware/authenticate.middleware";
import authorize from "../middleware/authorize.middleware";
import FormattedResponse from "../utils/formattedResponse";
import { RequestWithStartTime } from "../utils/requestWithStartTime";

class DepartmentController {
    public router: express.Router;

    constructor(private departmentService: DepartmentService) {
        this.router = express.Router();

        this.router.post(
            "/",
            authenticateMiddleware,
            authorize(["admin"]),
            this.create
        );
        this.router.get("/", authenticateMiddleware, this.find);
        this.router.get("/:id", authenticateMiddleware, this.findOneById);
        this.router.put(
            "/:id",
            authenticateMiddleware,
            authorize(["admin"]),
            this.put
        );
        // this.router.patch(
        //     "/:id",
        //     authenticateMiddleware,
        //     authorize(["admin"]),
        //     this.patch
        // );
        this.router.delete(
            "/:id",
            authenticateMiddleware,
            authorize(["admin"]),
            this.delete
        );
    }

    create = async (
        req: RequestWithStartTime,
        res: Response,
        next: NextFunction
    ) => {
        try {
            req.startTime = new Date();
            const departmentDto = plainToInstance(DepartmentDto, req.body);
            const errors: ValidationError[] = await validate(departmentDto);
            if (errors.length > 0) {
                throw new ValidationException(errors);
            }
            const department = await this.departmentService.create(
                departmentDto
            );
            FormattedResponse.send(req, res, 201, department, 1);
        } catch (e) {
            next(e);
        }
    };

    find = async (
        req: RequestWithStartTime,
        res: Response,
        next: NextFunction
    ) => {
        try {
            req.startTime = new Date();
            const departments = await this.departmentService.find();
            FormattedResponse.send(req, res, 200, departments);
        } catch (e) {
            next(e);
        }
    };

    findOneById = async (
        req: RequestWithStartTime,
        res: Response,
        next: NextFunction
    ) => {
        try {
            req.startTime = new Date();
            const department = await this.departmentService.findOneById(
                parseInt(req.params.id)
            );

            FormattedResponse.send(req, res, 200, department);
        } catch (e) {
            next(e);
        }
    };

    put = async (
        req: RequestWithStartTime,
        res: Response,
        next: NextFunction
    ) => {
        try {
            req.startTime = new Date();
            const updateFUllDepartmentDto = plainToInstance(
                DepartmentDto,
                req.body
            );
            const errors: ValidationError[] = await validate(
                UpdateDepartmentDto
            );
            if (errors.length > 0) {
                throw new ValidationException(errors);
            }
            const updatedDepartment = await this.departmentService.put(
                parseInt(req.params.id),
                updateFUllDepartmentDto
            );
            FormattedResponse.send(req, res, 200, updatedDepartment);
        } catch (e) {
            next(e);
        }
    };

    // patch = async (
    //     req: RequestWithStartTime,
    //     res: Response,
    //     next: NextFunction
    // ) => {
    //     try {
    //         req.startTime = new Date();
    //         const updateDepartmentDto = plainToInstance(
    //             UpdateDepartmentDto,
    //             req.body
    //         );
    //         const errors: ValidationError[] = await validate(
    //             UpdateDepartmentDto
    //         );
    //         if (errors.length > 0) {
    //             throw new ValidationException(errors);
    //         }
    //         const updatedDepartment = await this.departmentService.patch(
    //             parseInt(req.params.id),
    //             updateDepartmentDto
    //         );

    //         FormattedResponse.send(req, res, 201, updatedDepartment);
    //     } catch (e) {
    //         next(e);
    //     }
    // };

    delete = async (
        req: RequestWithStartTime,
        res: Response,
        next: NextFunction
    ) => {
        try {
            req.startTime = new Date();
            const department = await this.departmentService.delete(
                parseInt(req.params.id)
            );

            FormattedResponse.send(req, res, 204, department);
        } catch (e) {
            next(e);
        }
    };
}

export default DepartmentController;
