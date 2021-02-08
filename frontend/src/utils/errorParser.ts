import { AxiosError } from "axios";
import { ErrorResult } from "../models/common";
import { ApiError } from "../types/ApiError";

const errorParser = {
    parse(axiosError: AxiosError<ErrorResult>) {
        if(axiosError.response) {
            const status = axiosError.response.status;
            const errorResult = axiosError.response.data;

            return new ApiError(status, errorResult.message, errorResult.fieldErrorResults);
        } else if(axiosError.request) {
            return new ApiError(undefined, "응답을 받지 못했습니다.", []);
        } else {
            return new ApiError(undefined, axiosError.message, []);
        }
    }
}

export default errorParser;