import { ActionType, createAction, createReducer } from 'typesafe-actions';
import { MyData } from '../../models/auth';
import { AuthsState, LoginAsyncPayload, LogoutAsyncPayload } from '../../models/auth/store';

export const types = {
    FETCH_MY_DATA: 'auth/FETCH_MY_DATA' as const,
    SET_MY_DATA: 'auth/SET_MY_DATA' as const,
    LOGIN_ASYNC: 'auth/LOGIN_ASYNC' as const,
    LOGOUT_ASYNC: 'auth/LOGOUT_ASYNC' as const
};

export const actions = {
    fetchMyData: createAction(types.FETCH_MY_DATA)<undefined>(),
    setMyData: createAction(types.SET_MY_DATA)<MyData | undefined>(), 
    loginAsync: createAction(types.LOGIN_ASYNC)<LoginAsyncPayload>(),
    logoutAsync: createAction(types.LOGOUT_ASYNC)<LogoutAsyncPayload>(),
};

const initialState: AuthsState = {
    myData: undefined
};

const reducer = createReducer<AuthsState, ActionType<typeof actions>>(initialState, {
    [types.SET_MY_DATA]: (state, { payload: myData }: ReturnType<typeof actions.setMyData>) => ({
        myData: myData
    })
});

export default reducer;