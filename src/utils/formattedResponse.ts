import express from "express";
import { RequestWithStartTime } from "./requestWithStartTime";
import HttpStatusMessages from "./httpStatusMessage";

class FormattedResponse {
    static async send(
        req: RequestWithStartTime,
        res: express.Response,
        statusCode: number,
        data: Object = null,
        error: Object = null
    ) {
        const endTime = new Date();
        const took =
            req.startTime !== undefined
                ? endTime.getTime() - req.startTime.getTime()
                : 0;
        const msg = HttpStatusMessages[statusCode];
        const responseData = {
            data: data,
            errors: error === null ? null : error["errors"],
            message: error === null ? msg : error["message"],
            meta: {
                length: Array.isArray(data) ? data.length : 1,
                took: took,
                total: Array.isArray(data) ? data.length : 1,
            },
        };
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
