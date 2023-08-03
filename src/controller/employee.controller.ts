import express from "express";
import EmployeeService from "../service/employee.service";

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

    findOneBy = async (req: express.Request, res: express.Response) => {
        try {
            const employee = await this.employeeService.findOneBy(
                parseInt(req.params.id)
            );
            res.status(200).send(employee);
        } catch (e) {
            res.status(500).send(e);
        }
    };

    create = async (req: express.Request, res: express.Response) => {
        try {
            const employee = await this.employeeService.create({
                name: req.body.name,
                email: req.body.email,
            });
            res.status(200).send(employee);
        } catch (e) {
            res.status(500).send(e);
        }
    };

    put = async (req: express.Request, res: express.Response) => {
        try {
            const employee = await this.employeeService.put(
                parseInt(req.params.id),
                {
                    name: req.body.name,
                    email: req.body.email,
                }
            );
            if (employee === false) {
                res.status(404).send("ID does not exist");
            } else {
                res.status(200).send(employee);
            }
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    };

    delete = async (req: express.Request, res: express.Response) => {
        try {
            const result = await this.employeeService.delete(
                parseInt(req.params.id)
            );
            if (result === false) {
                res.status(404).send("ID does not exist");
            } else {
                res.status(200).send("Deleted successfully");
            }
        } catch (e) {
            res.status(500).send(e);
        }
    };
}

export default EmployeeController;
