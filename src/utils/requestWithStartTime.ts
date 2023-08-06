import { Request } from "express";

export interface RequestWithStartTime extends Request {
    startTime: Date;
}
