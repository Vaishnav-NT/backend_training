import express, { NextFunction, Request, Response } from "express";
import RoleService from "../service/role.service";
import { plainToInstance } from "class-transformer";
import RoleDto from "../dto/role.dto";
import { validate } from "class-validator";
import ValidationException from "../exception/validation.exception";
import UpdateRoleDto from "../dto/updateRole.dto";
import authenticateMiddleware from "../middleware/authenticate.middleware";
import authorize from "../middleware/authorize.middleware";

class RoleController {
    public router: express.Router;
    constructor(private roleService: RoleService) {
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
        this.router.delete(
            "/:id",
            authenticateMiddleware,
            authorize(["admin"]),
            this.delete
        );
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const roleDto = plainToInstance(RoleDto, req.body);
            const errors = await validate(roleDto);
            if (errors.length > 0) {
                throw new ValidationException(errors);
            }
            const role = await this.roleService.create(roleDto);
            res.status(201).send(role);
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
            res.status(201).send(roles);
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
            res.status(201).send(roles);
        } catch (e) {
            next(e);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.roleService.delete(parseInt(req.params.id));
            res.status(200).send("Role deleted successfully");
        } catch (e) {
            next(e);
        }
    };
}

export default RoleController;
