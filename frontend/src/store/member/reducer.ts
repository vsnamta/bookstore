import { createReducer } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { FindPayload, Page } from '../../models/common';
import { LoginMember, MemberDetailResult, MemberResult } from '../../models/members';
import { MembersAction } from './action';
import { FIND_MEMBER_FAILURE, FIND_MEMBER_PAGE_FAILURE, FIND_MEMBER_PAGE_REQUEST, FIND_MEMBER_PAGE_SUCCESS, FIND_MEMBER_REQUEST, FIND_MEMBER_SUCCESS, SET_MY_DATA, UPDATE_MEMBER_SUCCESS } from './actionType';

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
    [SET_MY_DATA]: (state, action) => ({
        ...state,
        loginMember: action.payload
    }),
    [FIND_MEMBER_PAGE_REQUEST]: (state, action) => ({
        ...state,
        memberPageAsync: {
            payload: action.payload,
            result: undefined,
            error: undefined
        }
    }),
    [FIND_MEMBER_PAGE_SUCCESS]: (state, action) => ({
        ...state,
        memberPageAsync: {
            ...state.memberPageAsync,
            result: action.payload
        } 
    }),
    [FIND_MEMBER_PAGE_FAILURE]: (state, action) => ({
        ...state,
        memberPageAsync: {
            ...state.memberPageAsync,
            error: action.payload
        } 
    }),
    [FIND_MEMBER_REQUEST]: (state, action) => ({
        ...state,
        memberAsync: {
            payload: action.payload,
            result: undefined,
            error: undefined
        }
    }),
    [FIND_MEMBER_SUCCESS]: (state, action) => ({
        ...state,
        memberAsync: {
            ...state.memberAsync,
            result: action.payload
        }
    }),
    [FIND_MEMBER_FAILURE]: (state, action) => ({
        ...state,
        memberAsync: {
            ...state.memberAsync,
            error: action.payload
        }
    }),
    [UPDATE_MEMBER_SUCCESS]: (state, action) => ({
        ...state,
        memberAsync: {
            ...state.memberAsync,
            result: action.payload
        }
    })
});