import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { CartFindPayload, CartResult, CartSavePayload, CartUpdatePayload } from '../../models/carts';
import { FIND_CART_LIST, FIND_CART_LIST_FAILURE, FIND_CART_LIST_REQUEST, FIND_CART_LIST_SUCCESS, REMOVE_CART, REMOVE_CART_SUCCESS, SAVE_CART, SAVE_CART_SUCCESS, UPDATE_CART, UPDATE_CART_SUCCESS } from './actionType';

export const findCartList = createAction(FIND_CART_LIST)<CartFindPayload>();

export const findCartListAsync = createAsyncAction(
    FIND_CART_LIST_REQUEST,
    FIND_CART_LIST_SUCCESS,
    FIND_CART_LIST_FAILURE
)<void, CartResult[], ApiError>();

export const updateCart = createAction(UPDATE_CART)<{ 
    id: number, 
    payload: CartUpdatePayload,
    onSuccess?: (cart: CartResult) => void, 
    onFailure?: (error: ApiError) => void
}>();

export const updateCartSuccess = createAction(UPDATE_CART_SUCCESS)<CartResult>();

export const saveCart = createAction(SAVE_CART)<{ 
    payload: CartSavePayload,
    onSuccess?: (cart: CartResult) => void, 
    onFailure?: (error: ApiError) => void
}>();

export const saveCartSuccess = createAction(SAVE_CART_SUCCESS)<CartResult>();

export const removeCart = createAction(REMOVE_CART)<{
    ids: number[],
    onSuccess?: () => void, 
    onFailure?: (error: ApiError) => void
}>();

export const removeCartSuccess = createAction(REMOVE_CART_SUCCESS)<number[]>();

export const actions = { 
    findCartList, findCartListAsync,
    updateCart, updateCartSuccess, 
    saveCart, saveCartSuccess,
    removeCart, removeCartSuccess
};

export type CartsAction = ActionType<typeof actions>;