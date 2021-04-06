import { ActionType, createAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { FindPayload } from '../../models/common';
import { MemberDetailResult, MemberSavePayload, MemberUpdatePayload } from '../../models/members';
import { FIND_MEMBER, FIND_MEMBER_PAGE, SAVE_MEMBER, SAVE_MEMBER_REQUEST, SET_MEMBER_ASYNC, SET_MEMBER_PAGE_ASYNC, UPDATE_MEMBER, UPDATE_MEMBER_REQUEST } from './actionType';
import { MemberAsync, MemberPageAsync } from './reducer';

export interface MemberUpdateActionPayload { 
    id: number, 
    payload: MemberUpdatePayload,
    onSuccess?: (member: MemberDetailResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface MemberSaveActionPayload { 
    payload: MemberSavePayload,
    onSuccess?: (category: MemberDetailResult) => void, 
    onFailure?: (error: ApiError) => void
}

export const createFindMemberPageAction = createAction(FIND_MEMBER_PAGE)<FindPayload>();
export const createSetMemberPageAsyncAction = createAction(SET_MEMBER_PAGE_ASYNC)<MemberPageAsync>();

export const createFindMemberAction = createAction(FIND_MEMBER)<number>();
export const createSetMemberAsyncAction = createAction(SET_MEMBER_ASYNC)<MemberAsync>();

export const createUpdateMemberRequestAction = createAction(UPDATE_MEMBER_REQUEST)<MemberUpdateActionPayload>();
export const createUpdateMemberAction = createAction(UPDATE_MEMBER)<MemberDetailResult>();

export const createSaveMemberRequestAction = createAction(SAVE_MEMBER_REQUEST)<MemberSaveActionPayload>();
export const createSaveMemberAction = createAction(SAVE_MEMBER)<MemberDetailResult>();

export const actions = {
    createFindMemberPageAction, createSetMemberPageAsyncAction,
    createFindMemberAction, createSetMemberAsyncAction,
    createUpdateMemberRequestAction, createUpdateMemberAction,
    createSaveMemberRequestAction, createSaveMemberAction
};

export type MembersAction = ActionType<typeof actions>;