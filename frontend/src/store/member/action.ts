import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { FindPayload, Page } from '../../models/common';
import { LoginMember, MemberDetailResult, MemberResult, MemberUpdatePayload } from '../../models/members';
import { FIND_MEMBER, FIND_MEMBER_FAILURE, FIND_MEMBER_PAGE, FIND_MEMBER_PAGE_FAILURE, FIND_MEMBER_PAGE_REQUEST, FIND_MEMBER_PAGE_SUCCESS, FIND_MEMBER_REQUEST, FIND_MEMBER_SUCCESS, SET_MY_DATA, UPDATE_MEMBER, UPDATE_MEMBER_SUCCESS } from './actionType';

export const setMyData = createAction(SET_MY_DATA)<LoginMember | undefined>();

export const findMemberPage = createAction(FIND_MEMBER_PAGE)<FindPayload>();

export const findMemberPageAsync = createAsyncAction(
    FIND_MEMBER_PAGE_REQUEST,
    FIND_MEMBER_PAGE_SUCCESS,
    FIND_MEMBER_PAGE_FAILURE
)<FindPayload, Page<MemberResult>, ApiError>();

export const findMember = createAction(FIND_MEMBER)<number>();

export const findMemberAsync = createAsyncAction(
    FIND_MEMBER_REQUEST,
    FIND_MEMBER_SUCCESS,
    FIND_MEMBER_FAILURE
)<number, MemberDetailResult, ApiError>();

export const updateMember = createAction(UPDATE_MEMBER)<{ 
    id: number, 
    payload: MemberUpdatePayload,
    onSuccess?: (member: MemberDetailResult) => void, 
    onFailure?: (error: ApiError) => void
}>();

export const updateMemberSuccess = createAction(UPDATE_MEMBER_SUCCESS)<MemberDetailResult>();

export const actions = { 
    setMyData,
    findMemberPage, findMemberPageAsync,
    findMember, findMemberAsync,
    updateMember, updateMemberSuccess
};

export type MembersAction = ActionType<typeof actions>;