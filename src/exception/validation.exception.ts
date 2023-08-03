import { ValidationError } from "class-validator";
import HttpException from "./http.exception";

class ValidationException extends HttpException {
    public errors: Object;

    constructor(errors: ValidationError[], status: number, message: string) {
        super(400, message);
        this.errors = this.parseErrors(errors);
        console.log(this.errors);
    }

    parseErrors = (errors: ValidationError[]) => {
        let errorObject = {};
        for (let err of errors) {
            if (err.children.length === 0) {
                errorObject[err.property] = Object.values(err.constraints);
            } else {
                errorObject[err.property] = this.parseErrors(err.children);
            }
        }
        return errorObject;
    };
}

export default ValidationException;
