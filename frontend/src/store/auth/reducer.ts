import { createReducer } from 'typesafe-actions';
import { MyData } from '../../models/auths';
import { AuthsAction, createMyDataSetAction } from './action';
import { SET_MY_DATA } from './actionType';

export interface AuthsState {
    myData?: MyData;
}

const initialState: AuthsState = {
    myData: undefined
};

export default createReducer<AuthsState, AuthsAction>(initialState, {
    [SET_MY_DATA]: (state, { payload: myData }: ReturnType<typeof createMyDataSetAction>) => ({
        myData: myData
    })
});