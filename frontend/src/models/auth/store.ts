import { LoginPayload, MyData } from ".";
import { ApiError } from "../../error/ApiError";

export interface AuthsState {
    myData?: MyData;
}

export interface LoginAsyncPayload { 
    payload: LoginPayload,
    onSuccess?: () => void, 
    onFailure?: (error: ApiError) => void
}

export interface LogoutAsyncPayload {
    onSuccess?: () => void, 
    onFailure?: (error: ApiError) => void
}