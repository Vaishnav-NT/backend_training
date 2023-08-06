import { Response } from "express";

export interface ResponseWithTrace extends Response {
    trace: string;
}
