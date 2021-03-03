import { FieldErrorResult } from "../models/common";

export class ApiError extends Error {
    statusCode: number | undefined;
    fieldErrors: FieldErrorResult[];

    constructor(statusCode: number | undefined, message: string, fieldErrors: FieldErrorResult[]) {
        super(message);
        
        this.name = ApiError.name;
        this.statusCode = statusCode;
        this.fieldErrors = fieldErrors;

        Object.setPrototypeOf(this, ApiError.prototype);
    }
}