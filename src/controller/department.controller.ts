import { plainToInstance } from "class-transformer";
import express, { Request, Response, NextFunction } from "express";
import DepartmentDto from "../dto/department.dto";
import { ValidationError, validate } from "class-validator";
import ValidationException from "../exception/validation.exception";
import DepartmentService from "../service/department.service";
import Department from "../entity/department.entity";
import UpdateDepartmentDto from "../dto/updateDepartment.dto";

class DepartmentController {
    public router: express.Router;

    // constructor(private departmentService: DepartmentService) {
    //     this.router = express.Router();

    //     this.router.post("/:id", this.create);
    //     this.router.get("/", this.find);
    //     this.router.get("/:id", this.findById);
    //     this.router.patch("/:id", this.patch);
    //     this.router.delete("/:id", this.delete);
    // }

    constructor(private departmentService: DepartmentService) {
        this.router = express.Router();

        this.router.post(
            "/",
            // authenticateMiddleware,
            // authorize([Role.HR]),
            this.create
        );
        this.router.get("/", this.find); // authenticateMiddleware,
        this.router.get("/:id", this.findOneById); // authenticateMiddleware,
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

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const departmentDto = plainToInstance(DepartmentDto, req.body);
            const errors: ValidationError[] = await validate(departmentDto);
            if (errors.length > 0) {
                throw new ValidationException(errors);
            }
            const department = await this.departmentService.create(
                departmentDto
            );
            res.status(200).send(department);
        } catch (e) {
            next(e);
        }
    };

    find = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const departments: Department[] =
                await this.departmentService.find();
            res.status(200).send(departments);
        } catch (e) {
            next(e);
        }
    };

    findOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const department = await this.departmentService.findOneById(
                parseInt(req.params.id)
            );
            res.status(200).send(department);
        } catch (e) {
            next(e);
        }
    };

    put = async (req: Request, res: Response, next: NextFunction) => {
        try {
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
            res.status(200).send(updatedDepartment);
        } catch (e) {
            next(e);
        }
    };

    patch = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateDepartmentDto = plainToInstance(
                UpdateDepartmentDto,
                req.body
            );
            const errors: ValidationError[] = await validate(
                UpdateDepartmentDto
            );
            if (errors.length > 0) {
                throw new ValidationException(errors);
            }
            const updatedDepartment = await this.departmentService.patch(
                parseInt(req.params.id),
                updateDepartmentDto
            );
            res.status(200).send(updatedDepartment);
        } catch (e) {
            next(e);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.departmentService.delete(parseInt(req.params.id));
        } catch (e) {
            next(e);
        }
    };
}

export default DepartmentController;
