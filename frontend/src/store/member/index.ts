import { ActionType, createAction, createReducer } from 'typesafe-actions';
import { FindPayload, Page } from '../../models/common';
import { MemberDetailResult, MemberResult } from '../../models/member';
import { MemberAsync, MemberPageAsync, MemberSaveAsyncPayload, MembersState, MemberUpdateAsyncPayload } from '../../models/member/store';

export const types ={
    SET_MEMBERS_STATE: 'member/SET_MEMBERS_STATE' as const,
    FETCH_MEMBER_PAGE: 'member/FETCH_MEMBER_PAGE' as const,
    SET_MEMBER_PAGE_ASYNC: 'member/SET_MEMBER_PAGE_ASYNC' as const,
    FETCH_MEMBER: 'member/FETCH_MEMBER' as const,
    SET_MEMBER_ASYNC: 'member/SET_MEMBER_ASYNC' as const,
    UPDATE_MEMBER_ASYNC: 'member/UPDATE_MEMBER_ASYNC' as const,
    UPDATE_MEMBER: 'member/UPDATE_MEMBER' as const,
    SAVE_MEMBER_ASYNC: 'member/SAVE_MEMBER_ASYNC' as const
};

export const actions = {
    setMembersState: createAction(types.SET_MEMBERS_STATE)<MembersState>(),
    fetchMemberPage: createAction(types.FETCH_MEMBER_PAGE)<FindPayload>(), 
    setMemberPageAsync: createAction(types.SET_MEMBER_PAGE_ASYNC)<MemberPageAsync>(),
    fetchMember: createAction(types.FETCH_MEMBER)<number>(), 
    setMemberAsync: createAction(types.SET_MEMBER_ASYNC)<MemberAsync>(),
    updateMemberAsync: createAction(types.UPDATE_MEMBER_ASYNC)<MemberUpdateAsyncPayload>(), 
    updateMember: createAction(types.UPDATE_MEMBER)<MemberDetailResult>(),
    saveMemberAsync: createAction(types.SAVE_MEMBER_ASYNC)<MemberSaveAsyncPayload>()
};

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

const reducer = createReducer<MembersState, ActionType<typeof actions>>(initialState, {
    [types.SET_MEMBERS_STATE]: (state, { payload: membersState }: ReturnType<typeof actions.setMembersState>) => (
        membersState
    ),
    [types.SET_MEMBER_PAGE_ASYNC]: (state, { payload: memberPageAsync }: ReturnType<typeof actions.setMemberPageAsync>) => ({
        ...state,
        memberPageAsync: memberPageAsync, 
    }),
    [types.SET_MEMBER_ASYNC]: (state, { payload: memberAsync }: ReturnType<typeof actions.setMemberAsync>) => ({
        ...state,
        memberAsync: memberAsync, 
    }),
    [types.UPDATE_MEMBER]: (state, { payload: updatedMember }: ReturnType<typeof actions.updateMember>) => ({
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
    })
});

export default reducer;