import { ActionType, createAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { CartFindPayload, CartResult, CartSavePayload, CartUpdatePayload } from '../../models/carts';
import { CHECK_ALL_CART, CHECK_CART, FIND_CART_LIST, REMOVE_CART, REMOVE_CART_REQUEST, SAVE_CART, SAVE_CART_REQUEST, SET_CART_LIST_ASYNC, UPDATE_CART, UPDATE_CART_REQUEST } from './actionType';
import { CartListAsync } from './reducer';

export interface CartUpdateActionPayload { 
    id: number, 
    payload: CartUpdatePayload,
    onSuccess?: (cart: CartResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface CartSaveActionPayload { 
    payload: CartSavePayload,
    onSuccess?: (cart: CartResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface CartRemoveActionPayload { 
    ids: number[],
    onSuccess?: () => void,
    onFailure?: (error: ApiError) => void
}

export interface CartCheckActionPayload { 
    id: number,
    checked: boolean
}

export const createFindCartListAction = createAction(FIND_CART_LIST)<CartFindPayload>();
export const createSetCartListAsyncAction = createAction(SET_CART_LIST_ASYNC)<CartListAsync>();

export const createUpdateCartRequestAction = createAction(UPDATE_CART_REQUEST)<CartUpdateActionPayload>();
export const createUpdateCartAction = createAction(UPDATE_CART)<CartResult>();

export const createSaveCartRequestAction = createAction(SAVE_CART_REQUEST)<CartSaveActionPayload>();
export const createSaveCartAction = createAction(SAVE_CART)<CartResult>();

export const createRemoveCartRequestAction = createAction(REMOVE_CART_REQUEST)<CartRemoveActionPayload>();
export const createRemoveCartAction = createAction(REMOVE_CART)<number[]>();

export const createCheckAllCartAction = createAction(CHECK_ALL_CART)<boolean>();

export const createCheckCartAction = createAction(CHECK_CART)<CartCheckActionPayload>();

export const actions = { 
    createFindCartListAction, createSetCartListAsyncAction,
    createUpdateCartRequestAction, createUpdateCartAction, 
    createSaveCartRequestAction, createSaveCartAction,
    createRemoveCartRequestAction, createRemoveCartAction,
    createCheckAllCartAction, 
    createCheckCartAction
};

export type CartsAction = ActionType<typeof actions>;