import { ActionType, createAction, createReducer } from 'typesafe-actions';
import { FindPayload, Page } from '../../models/common';
import { MemberDetailResult, MemberResult } from '../../models/member';
import { AsyncMember, AsyncMemberPage, MemberSaveAsyncPayload, MembersState, MemberUpdateAsyncPayload } from '../../models/member/store';

export const types ={
    FETCH_MEMBER_PAGE: 'member/FETCH_MEMBER_PAGE' as const,
    SET_ASYNC_MEMBER_PAGE: 'member/SET_ASYNC_MEMBER_PAGE' as const,
    FETCH_MEMBER: 'member/FETCH_MEMBER' as const,
    SET_ASYNC_MEMBER: 'member/SET_ASYNC_MEMBER' as const,
    UPDATE_MEMBER_ASYNC: 'member/UPDATE_MEMBER_ASYNC' as const,
    UPDATE_MEMBER: 'member/UPDATE_MEMBER' as const,
    SAVE_MEMBER_ASYNC: 'member/SAVE_MEMBER_ASYNC' as const,
    SET_MEMBERS_STATE: 'member/SET_MEMBERS_STATE' as const
};

export const actions = {
    fetchMemberPage: createAction(types.FETCH_MEMBER_PAGE)<FindPayload>(), 
    setAsyncMemberPage: createAction(types.SET_ASYNC_MEMBER_PAGE)<AsyncMemberPage>(),
    fetchMember: createAction(types.FETCH_MEMBER)<string>(), 
    setAsyncMember: createAction(types.SET_ASYNC_MEMBER)<AsyncMember>(),
    updateMemberAsync: createAction(types.UPDATE_MEMBER_ASYNC)<MemberUpdateAsyncPayload>(), 
    updateMember: createAction(types.UPDATE_MEMBER)<MemberDetailResult>(),
    saveMemberAsync: createAction(types.SAVE_MEMBER_ASYNC)<MemberSaveAsyncPayload>(),
    setMembersState: createAction(types.SET_MEMBERS_STATE)<MembersState>()
};

const initialState: MembersState = {
    asyncMemberPage: {
        payload : undefined,
        result: undefined,
        error: undefined
    },
    asyncMember: {
        payload: undefined,
        result: undefined,
        error: undefined
    }
};

const reducer = createReducer<MembersState, ActionType<typeof actions>>(initialState, {
    [types.SET_ASYNC_MEMBER_PAGE]: (state, { payload: asyncMemberPage }: ReturnType<typeof actions.setAsyncMemberPage>) => ({
        ...state,
        asyncMemberPage: asyncMemberPage, 
    }),
    [types.SET_ASYNC_MEMBER]: (state, { payload: asyncMember }: ReturnType<typeof actions.setAsyncMember>) => ({
        ...state,
        asyncMember: asyncMember, 
    }),
    [types.UPDATE_MEMBER]: (state, { payload: updatedMember }: ReturnType<typeof actions.updateMember>) => ({
        asyncMemberPage: JSON.stringify(state.asyncMemberPage) === JSON.stringify(initialState.asyncMemberPage)
        ? initialState.asyncMemberPage
        : {
            ...state.asyncMemberPage,
            result: {
                ...state.asyncMemberPage.result as Page<MemberResult>,
                list: (state.asyncMemberPage.result as Page<MemberResult>).list
                    .map(member => 
                        member.id === updatedMember.id
                            ? updatedMember
                            : member
                    )
            }
        },
        asyncMember: {
            ...state.asyncMember,
            result: updatedMember
        }
    }),
    [types.SET_MEMBERS_STATE]: (state, { payload: membersState }: ReturnType<typeof actions.setMembersState>) => (
        membersState
    )
});

export default reducer;