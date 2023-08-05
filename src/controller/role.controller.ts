import express, { NextFunction, Request, Response } from "express";
import RoleService from "../service/role.service";
import { plainToInstance } from "class-transformer";
import RoleDto from "../dto/role.dto";
import { validate } from "class-validator";
import ValidationException from "../exception/validation.exception";
import UpdateRoleDto from "../dto/updateRole.dto";

class RoleController {
    public router: express.Router;
    constructor(private roleService: RoleService) {
        this.router = express.Router();

        this.router.post("/", this.create);
        this.router.get("/", this.find);
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const roleDto = plainToInstance(RoleDto, req.body);
            const errors = await validate(roleDto);
            if (errors.length > 0) {
                throw new ValidationException(errors);
            }
            const role = await this.roleService.create(roleDto);
            res.status(200).send(role);
        } catch (e) {
            next(e);
        }
    };

    find = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const roles = await this.roleService.find();
            res.status(200).send(roles);
        } catch (e) {
            next(e);
        }
    };

    findOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const roles = await this.roleService.findOneByID(
                parseInt(req.params.id)
            );
            res.status(200).send(roles);
        } catch (e) {
            next(e);
        }
    };

    put = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updatedroleDto = plainToInstance(UpdateRoleDto, req.body);
            const errors = await validate(updatedroleDto);
            if (errors.length > 0) {
                throw new ValidationException(errors);
            }
            const roles = await this.roleService.put(
                parseInt(req.params.id),
                updatedroleDto
            );
            res.status(200).send(roles);
        } catch (e) {
            next(e);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.roleService.findOneByID(parseInt(req.params.id));
            res.status(200).send("Role deleted successfully");
        } catch (e) {
            next(e);
        }
    };
}

export default RoleController;
