import { ActionType, createAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { CartFindPayload, CartResult, CartSavePayload, CartUpdatePayload } from '../../models/carts';
import { CHECK_ALL_CART, CHECK_CART, FIND_CART_LIST, REMOVE_CART, REMOVE_CART_REQUEST, SAVE_CART, SAVE_CART_REQUEST, SET_CART_LIST_ASYNC, UPDATE_CART, UPDATE_CART_REQUEST } from './actionType';
import { CartListAsync } from './reducer';

export interface CartUpdateRequestActionPayload { 
    id: number, 
    payload: CartUpdatePayload,
    onSuccess?: (cart: CartResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface CartSaveRequestActionPayload { 
    payload: CartSavePayload,
    onSuccess?: (cart: CartResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface CartRemoveRequestActionPayload { 
    ids: number[],
    onSuccess?: () => void,
    onFailure?: (error: ApiError) => void
}

export interface CartCheckActionPayload { 
    id: number,
    checked: boolean
}

export const createCartListFindAction = createAction(FIND_CART_LIST)<CartFindPayload>();
export const createCartListAsyncSetAction = createAction(SET_CART_LIST_ASYNC)<CartListAsync>();

export const createCartUpdateRequestAction = createAction(UPDATE_CART_REQUEST)<CartUpdateRequestActionPayload>();
export const createCartUpdateAction = createAction(UPDATE_CART)<CartResult>();

export const createCartSaveRequestAction = createAction(SAVE_CART_REQUEST)<CartSaveRequestActionPayload>();
export const createCartSaveAction = createAction(SAVE_CART)<CartResult>();

export const createCartRemoveRequestAction = createAction(REMOVE_CART_REQUEST)<CartRemoveRequestActionPayload>();
export const createCartRemoveAction = createAction(REMOVE_CART)<number[]>();

export const createCartCheckAllAction = createAction(CHECK_ALL_CART)<boolean>();

export const createCartCheckAction = createAction(CHECK_CART)<CartCheckActionPayload>();

export const actions = { 
    createCartListFindAction, createCartListAsyncSetAction,
    createCartUpdateRequestAction, createCartUpdateAction, 
    createCartSaveRequestAction, createCartSaveAction,
    createCartRemoveRequestAction, createCartRemoveAction,
    createCartCheckAllAction, 
    createCartCheckAction
};

export type CartsAction = ActionType<typeof actions>;