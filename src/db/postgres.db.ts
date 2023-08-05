import { DataSource } from "typeorm";
import Employee from "../entity/employee.entity";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import Address from "../entity/address.entity";
//import Department from "../entity/department.entity";

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 8765,
    username: "postgres",
    password: "postgres",
    database: "training",
    entities: [Employee, Address], //, Department],
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
    migrations: ["dist/db/migrations/*.js"],
});

export default dataSource;
