import { createReducer, PayloadAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { FindPayload, Page } from '../../models/common';
import { LoginMember, MemberDetailResult, MemberResult } from '../../models/members';
import { createSaveMemberSuccessAction, createUpdateMemberSuccessAction, findMemberAsyncActionCreator, findMemberPageAsyncActionCreator, MembersAction } from './action';
import { FIND_MEMBER_FAILURE, FIND_MEMBER_PAGE_FAILURE, FIND_MEMBER_PAGE_REQUEST, FIND_MEMBER_PAGE_SUCCESS, FIND_MEMBER_REQUEST, FIND_MEMBER_SUCCESS, SAVE_MEMBER_SUCCESS, SET_MY_DATA, UPDATE_MEMBER_SUCCESS } from './actionType';

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

export interface MembersState {
    loginMember?: LoginMember;
    memberPageAsync: MemberPageAsync;
    memberAsync: MemberAsync;
}

const initialState: MembersState = {
    loginMember: undefined,
    memberPageAsync: {
        payload : undefined,
        result: undefined,
        error: undefined
    },
    memberAsync: {
        payload: undefined,
        result: undefined,
        error: undefined
    }
};

export default createReducer<MembersState, MembersAction>(initialState, {
    // [SET_MY_DATA]: (state, action) => ({
    //     ...state,
    //     loginMember: action.payload
    // }),
    [FIND_MEMBER_PAGE_REQUEST]: (state, { payload: findPayload }: ReturnType<typeof findMemberPageAsyncActionCreator.request>) => ({
        ...state,
        memberPageAsync: {
            payload: findPayload,
            result: undefined,
            error: undefined
        }
    }),
    [FIND_MEMBER_PAGE_SUCCESS]: (state, { payload: memberPage }: ReturnType<typeof findMemberPageAsyncActionCreator.success>) => ({
        ...state,
        memberPageAsync: {
            ...state.memberPageAsync,
            result: memberPage
        } 
    }),
    [FIND_MEMBER_PAGE_FAILURE]: (state, { payload: error }: ReturnType<typeof findMemberPageAsyncActionCreator.failure>) => ({
        ...state,
        memberPageAsync: {
            ...state.memberPageAsync,
            error: error
        } 
    }),
    [FIND_MEMBER_REQUEST]: (state, { payload: id }: ReturnType<typeof findMemberAsyncActionCreator.request>) => ({
        ...state,
        memberAsync: {
            payload: id,
            result: undefined,
            error: undefined
        }
    }),
    [FIND_MEMBER_SUCCESS]: (state, { payload: member }: ReturnType<typeof findMemberAsyncActionCreator.success>) => ({
        ...state,
        memberAsync: {
            ...state.memberAsync,
            result: member
        }
    }),
    [FIND_MEMBER_FAILURE]: (state, { payload: error }: ReturnType<typeof findMemberAsyncActionCreator.failure>) => ({
        ...state,
        memberAsync: {
            ...state.memberAsync,
            error: error
        }
    }),
    [UPDATE_MEMBER_SUCCESS]: (state, { payload: member }: ReturnType<typeof createUpdateMemberSuccessAction>) => ({
        ...state,
        memberAsync: {
            ...state.memberAsync,
            result: member
        }
    }),
    [SAVE_MEMBER_SUCCESS]: (state, { payload: savedMember }: ReturnType<typeof createSaveMemberSuccessAction>) => ({
        memberPageAsync: initialState.memberPageAsync,
        memberAsync: {
            payload: savedMember.id,
            result: savedMember,
            error: undefined
        }
    })
});