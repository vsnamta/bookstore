import { createReducer, PayloadAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { FindPayload, Page } from '../../models/common';
import { MemberDetailResult, MemberResult } from '../../models/members';
import { createSaveMemberAction, createSetMemberAsyncAction, createSetMemberPageAsyncAction, createUpdateMemberAction, MembersAction } from './action';
import { SAVE_MEMBER, SET_MEMBER_ASYNC, SET_MEMBER_PAGE_ASYNC, UPDATE_MEMBER } from './actionType';

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
    memberPageAsync: MemberPageAsync;
    memberAsync: MemberAsync;
}

const initialState: MembersState = {
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
    [SET_MEMBER_PAGE_ASYNC]: (state, { payload: memberPageAsync }: ReturnType<typeof createSetMemberPageAsyncAction>) => ({
        ...state,
        memberPageAsync: memberPageAsync, 
    }),
    [SET_MEMBER_ASYNC]: (state, { payload: memberAsync }: ReturnType<typeof createSetMemberAsyncAction>) => ({
        ...state,
        memberAsync: memberAsync, 
    }),
    [UPDATE_MEMBER]: (state, { payload: updatedMember }: ReturnType<typeof createUpdateMemberAction>) => ({
        memberPageAsync: JSON.stringify(state.memberPageAsync) === JSON.stringify(initialState.memberPageAsync)
        ? initialState.memberPageAsync
        : {
            ...state.memberPageAsync,
            result: {
                ...state.memberPageAsync.result as Page<MemberResult>,
                list: (state.memberPageAsync.result as Page<MemberResult>).list
                    .map(member => 
                        member.id === updatedMember.id
                            ? updatedMember
                            : member
                    )
            }
        },
        memberAsync: {
            ...state.memberAsync,
            result: updatedMember
        }
    }),
    [SAVE_MEMBER]: (state, { payload: savedMember }: ReturnType<typeof createSaveMemberAction>) => ({
        memberPageAsync: initialState.memberPageAsync,
        memberAsync: {
            payload: savedMember.id,
            result: savedMember,
            error: undefined
        }
    })
});