import { ActionType, createAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { FindPayload } from '../../models/common';
import { MemberDetailResult, MemberSavePayload, MemberUpdatePayload } from '../../models/members';
import { FIND_MEMBER, FIND_MEMBER_PAGE, SAVE_MEMBER, SAVE_MEMBER_REQUEST, SET_MEMBER_ASYNC, SET_MEMBER_PAGE_ASYNC, UPDATE_MEMBER, UPDATE_MEMBER_REQUEST } from './actionType';
import { MemberAsync, MemberPageAsync } from './reducer';

export interface MemberUpdateRequestActionPayload { 
    id: number, 
    payload: MemberUpdatePayload,
    onSuccess?: (member: MemberDetailResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface MemberSaveRequestActionPayload { 
    payload: MemberSavePayload,
    onSuccess?: (category: MemberDetailResult) => void, 
    onFailure?: (error: ApiError) => void
}

export const createMemberPageFindAction = createAction(FIND_MEMBER_PAGE)<FindPayload>();
export const createMemberPageAsyncSetAction = createAction(SET_MEMBER_PAGE_ASYNC)<MemberPageAsync>();

export const createMemberFindAction = createAction(FIND_MEMBER)<number>();
export const createMemberAsyncSetAction = createAction(SET_MEMBER_ASYNC)<MemberAsync>();

export const createMemberUpdateRequestAction = createAction(UPDATE_MEMBER_REQUEST)<MemberUpdateRequestActionPayload>();
export const createUpdateMemberAction = createAction(UPDATE_MEMBER)<MemberDetailResult>();

export const createMemberSaveRequestAction = createAction(SAVE_MEMBER_REQUEST)<MemberSaveRequestActionPayload>();
export const createSaveMemberAction = createAction(SAVE_MEMBER)<MemberDetailResult>();

export const actions = {
    createMemberPageFindAction, createMemberPageAsyncSetAction,
    createMemberFindAction, createMemberAsyncSetAction,
    createMemberUpdateRequestAction, createUpdateMemberAction,
    createMemberSaveRequestAction, createSaveMemberAction
};

export type MembersAction = ActionType<typeof actions>;