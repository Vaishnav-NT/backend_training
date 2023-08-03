import "reflect-metadata";
import express from "express";
import employeeRoute from "./route/employee.route";
import loggerMiddleware from "./middleware/logger.middleware";
import dataSource from "./db/postgres.db";
import errorHandlingMiddleware from "./middleware/error.middleware";

const server = express();

server.use(express.json());
server.use(loggerMiddleware);
server.use("/employees", employeeRoute);

server.use(errorHandlingMiddleware);

(async () => {
    await dataSource.initialize();
    server.listen(3000, () => {
        console.log("Server is listening to 3000");
    });
})();
