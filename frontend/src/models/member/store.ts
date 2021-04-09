import { MemberDetailResult, MemberResult, MemberSavePayload, MemberUpdatePayload } from ".";
import { ApiError } from "../../error/ApiError";
import { FindPayload, Page } from "../common";

export interface MembersState {
    asyncMemberPage: AsyncMemberPage;
    asyncMember: AsyncMember;
}

export interface AsyncMemberPage {
    payload?: FindPayload;
    result?: Page<MemberResult>;
    error?: ApiError; 
}

export interface AsyncMember {
    payload?: string;
    result?: MemberDetailResult;
    error?: ApiError;
}

export interface MemberUpdateAsyncPayload { 
    id: string, 
    payload: MemberUpdatePayload,
    onSuccess?: (member: MemberDetailResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface MemberSaveAsyncPayload { 
    payload: MemberSavePayload,
    onSuccess?: (category: MemberDetailResult) => void, 
    onFailure?: (error: ApiError) => void
}