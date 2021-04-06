import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { CartFindPayload, CartResult, CartSavePayload, CartUpdatePayload } from '../../models/carts';
import { CHECK_ALL_CART, CHECK_CART, FIND_CART_LIST, FIND_CART_LIST_FAILURE, FIND_CART_LIST_REQUEST, FIND_CART_LIST_SUCCESS, REMOVE_CART, REMOVE_CART_SUCCESS, SAVE_CART, SAVE_CART_SUCCESS, UPDATE_CART, UPDATE_CART_SUCCESS } from './actionType';

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
export const findCartListAsyncActionCreator = createAsyncAction(FIND_CART_LIST_REQUEST, FIND_CART_LIST_SUCCESS, FIND_CART_LIST_FAILURE)<CartFindPayload, CartResult[], ApiError>();

export const createUpdateCartAction = createAction(UPDATE_CART)<CartUpdateActionPayload>();
export const createUpdateCartSuccessAction = createAction(UPDATE_CART_SUCCESS)<CartResult>();

export const createSaveCartAction = createAction(SAVE_CART)<CartSaveActionPayload>();
export const createSaveCartSuccessAction = createAction(SAVE_CART_SUCCESS)<CartResult>();

export const createRemoveCartAction = createAction(REMOVE_CART)<CartRemoveActionPayload>();
export const createRemoveCartSuccessAction = createAction(REMOVE_CART_SUCCESS)<number[]>();

export const createCheckAllCartAction = createAction(CHECK_ALL_CART)<boolean>();

export const createCheckCartAction = createAction(CHECK_CART)<CartCheckActionPayload>();

export const actions = { 
    createFindCartListAction, findCartListAsyncActionCreator,
    createUpdateCartAction, createUpdateCartSuccessAction, 
    createSaveCartAction, createSaveCartSuccessAction,
    createRemoveCartAction, createRemoveCartSuccessAction,
    createCheckAllCartAction, 
    createCheckCartAction
};

export type CartsAction = ActionType<typeof actions>;