import { createReducer } from 'typesafe-actions';
import { MyData } from '../../models/auths';
import { AuthsAction } from './action';
import { SET_MY_DATA } from './actionType';

export interface AuthsState {
    myData?: MyData;
}

const initialState: AuthsState = {
    myData: undefined
};

export default createReducer<AuthsState, AuthsAction>(initialState, {
    [SET_MY_DATA]: (state, action) => ({
        myData: action.payload
    })
});