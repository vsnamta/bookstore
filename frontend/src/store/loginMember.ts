import { ActionType, createAction, createReducer } from 'typesafe-actions';
import { LoginMember } from '../models/members';

const SET_MY_DATA = 'member/SET_MY_DATA';

export const setMyData = createAction(SET_MY_DATA)<LoginMember | undefined>();

export const actions = { setMyData };

type LoginMemberAction = ActionType<typeof actions>;

interface LoginMemberState {
    loginMember?: LoginMember;
}

const initialState: LoginMemberState = {
    loginMember : undefined
};

export default createReducer<LoginMemberState, LoginMemberAction>(initialState, {
    [SET_MY_DATA]: (state, action) => ({
        loginMember: action.payload
    })
});