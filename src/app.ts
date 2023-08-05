import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
import "reflect-metadata";
import express from "express";
import employeeRoute from "./route/employee.route";
import loggerMiddleware from "./middleware/logger.middleware";
import dataSource from "./db/postgres.db";
import errorHandlingMiddleware from "./middleware/error.middleware";
import departmentRoute from "./route/department.route";
import roleRoute from "./route/role.route";

const server = express();

server.use(express.json());
server.use(loggerMiddleware);
server.use("/api/employees", employeeRoute);
server.use("/api/departments", departmentRoute);
server.use("/api/roles", roleRoute);

server.use(errorHandlingMiddleware);

(async () => {
    await dataSource.initialize();
    server.listen(3000, () => {
        console.log("Server is listening to 3000");
    });
})();
