import "reflect-metadata";
import express from "express";
import employeeRouter from "./employee_router";
import loggerMiddleware from "./logger_middleware";
import dataSource from "./data_source";

const server = express();

server.use(express.json());
server.use(loggerMiddleware);
server.use("/employees", employeeRouter);

(async () => {
    await dataSource.initialize();
    server.listen(3000, () => {
        console.log("Server is listening to 3000");
    });
})();
