import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { FindPayload, Page } from '../../models/common';
import { LoginMember, MemberDetailResult, MemberResult, MemberSavePayload, MemberUpdatePayload } from '../../models/members';
import { FIND_MEMBER, FIND_MEMBER_FAILURE, FIND_MEMBER_PAGE, FIND_MEMBER_PAGE_FAILURE, FIND_MEMBER_PAGE_REQUEST, FIND_MEMBER_PAGE_SUCCESS, FIND_MEMBER_REQUEST, FIND_MEMBER_SUCCESS, SAVE_MEMBER, SAVE_MEMBER_SUCCESS, SET_MY_DATA, UPDATE_MEMBER, UPDATE_MEMBER_SUCCESS } from './actionType';

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

export const createSetMyDataAction = createAction(SET_MY_DATA)<LoginMember | undefined>();

export const createFindMemberPageAction = createAction(FIND_MEMBER_PAGE)<FindPayload>();
export const findMemberPageAsyncActionCreator = createAsyncAction(FIND_MEMBER_PAGE_REQUEST, FIND_MEMBER_PAGE_SUCCESS, FIND_MEMBER_PAGE_FAILURE)<FindPayload, Page<MemberResult>, ApiError>();

export const createFindMemberAction = createAction(FIND_MEMBER)<number>();
export const findMemberAsyncActionCreator = createAsyncAction(FIND_MEMBER_REQUEST, FIND_MEMBER_SUCCESS, FIND_MEMBER_FAILURE)<number, MemberDetailResult, ApiError>();

export const createUpdateMemberAction = createAction(UPDATE_MEMBER)<MemberUpdateActionPayload>();
export const createUpdateMemberSuccessAction = createAction(UPDATE_MEMBER_SUCCESS)<MemberDetailResult>();

export const createSaveMemberAction = createAction(SAVE_MEMBER)<MemberSaveActionPayload>();
export const createSaveMemberSuccessAction = createAction(SAVE_MEMBER_SUCCESS)<MemberDetailResult>();

export const actions = { 
    createSetMyDataAction,
    createFindMemberPageAction, findMemberPageAsyncActionCreator,
    createFindMemberAction, findMemberAsyncActionCreator,
    createUpdateMemberAction, createUpdateMemberSuccessAction,
    createSaveMemberAction, createSaveMemberSuccessAction
};

export type MembersAction = ActionType<typeof actions>;