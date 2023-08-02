import express from "express";
import employeeRouter from "./employee_router";
import loggerMiddleware from "./logger_middleware";

const server = express();

server.use(express.json());
server.use(loggerMiddleware);
server.use("/employees", employeeRouter);

server.listen(3000, () => {
    console.log("Server is listening to 3000");
});
