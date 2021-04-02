import { ActionType, createAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { LoginPayload, MyData } from '../../models/auths';
import { LOGIN, RELOAD_MY_DATA, LOGOUT, SET_MY_DATA } from './actionType';

export interface LoginActionPayload { 
    payload: LoginPayload,
    onSuccess?: () => void, 
    onFailure?: (error: ApiError) => void
}

export interface LogoutActionPayload {
    onSuccess?: () => void, 
    onFailure?: (error: ApiError) => void
}

export const createLoginAction = createAction(LOGIN)<LoginActionPayload>();

export const createLogoutAction = createAction(LOGOUT)<LogoutActionPayload>();

export const createReloadMyDataAction = createAction(RELOAD_MY_DATA)<void>();

export const createSetMyDataAction = createAction(SET_MY_DATA)<MyData | undefined>();

export const actions = { 
    createLoginAction,
    createLogoutAction,
    createReloadMyDataAction,
    createSetMyDataAction,
};

export type AuthsAction = ActionType<typeof actions>;