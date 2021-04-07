import { MemberDetailResult, MemberResult, MemberSavePayload, MemberUpdatePayload } from ".";
import { ApiError } from "../../error/ApiError";
import { FindPayload, Page } from "../common";

export interface MembersState {
    memberPageAsync: MemberPageAsync;
    memberAsync: MemberAsync;
}

export interface MemberPageAsync {
    payload?: FindPayload;
    result?: Page<MemberResult>;
    error?: ApiError; 
}

export interface MemberAsync {
    payload?: number;
    result?: MemberDetailResult;
    error?: ApiError;
}

export interface MemberUpdateAsyncPayload { 
    id: number, 
    payload: MemberUpdatePayload,
    onSuccess?: (member: MemberDetailResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface MemberSaveAsyncPayload { 
    payload: MemberSavePayload,
    onSuccess?: (category: MemberDetailResult) => void, 
    onFailure?: (error: ApiError) => void
}