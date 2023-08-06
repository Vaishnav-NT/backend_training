import express from "express";
import { RequestWithStartTime } from "./requestWithStartTime";

class FormattedResponse {
    static async send(
        req: RequestWithStartTime,
        res: express.Response,
        statusCode: number,
        data: Object = null,
        count: number = 0,
        error: Object = null
    ) {
        const endTime = new Date();
        const took = endTime.getTime() - req.startTime.getTime();
        const msg = this.getMessageForStatusCode(statusCode);
        const responseData = {
            data: data,
            errors: error === null ? null : error["errors"],
            message: error === null ? msg : error["message"],
            meta: {
                length: count,
                took: took,
                total: count,
            },
        };
        console.log(responseData);
        res.status(statusCode).send(responseData);
    }

    static getMessageForStatusCode(statusCode: number): string {
        const codeToMessage = {
            "200": "OK",
            "201": "CREATED",
            "204": "NO CONTENT",
            "401": "UNAUTHORIZED",
            "403": "FORBIDDEN",
            "500": "INTERNAL SERVER ERROR",
        };
        return codeToMessage[statusCode as unknown as string];
    }
}

export default FormattedResponse;
