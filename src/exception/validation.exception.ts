import { ValidationError } from "class-validator";
import HttpException from "./http.exception";

class ValidationException extends HttpException {
    public errors: Object;

    constructor(errors: ValidationError[]) {
        super(400, "Validation exception");
        this.errors = this.parseErrors(errors);
    }

    private parseErrors = (errors: ValidationError[]) => {
        let parsedErrorObject = {};
        for (let err of errors) {
            if (err.children.length === 0) {
                parsedErrorObject[err.property] = Object.values(
                    err.constraints
                );
            } else {
                parsedErrorObject[err.property] = this.parseErrors(
                    err.children
                );
            }
        }
        return parsedErrorObject;
    };
}

export default ValidationException;
