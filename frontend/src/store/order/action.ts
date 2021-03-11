import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { FindPayload, Page } from '../../models/common';
import { OrderDetailResult, OrderResult, OrderSavePayload, OrderUpdatePayload } from '../../models/orders';
import { FIND_ORDER, FIND_ORDER_FAILURE, FIND_ORDER_PAGE, FIND_ORDER_PAGE_FAILURE, FIND_ORDER_PAGE_REQUEST, FIND_ORDER_PAGE_SUCCESS, FIND_ORDER_REQUEST, FIND_ORDER_SUCCESS, SAVE_ORDER, SAVE_ORDER_SUCCESS, UPDATE_ORDER, UPDATE_ORDER_SUCCESS } from './actionType';

export const findOrderPage = createAction(FIND_ORDER_PAGE)<FindPayload>();

export const findOrderPageAsync = createAsyncAction(
    FIND_ORDER_PAGE_REQUEST,
    FIND_ORDER_PAGE_SUCCESS,
    FIND_ORDER_PAGE_FAILURE
)<FindPayload, Page<OrderResult>, ApiError>();

export const findOrder = createAction(FIND_ORDER)<number>();

export const findOrderAsync = createAsyncAction(
    FIND_ORDER_REQUEST,
    FIND_ORDER_SUCCESS,
    FIND_ORDER_FAILURE
)<number, OrderDetailResult, ApiError>();

export const updateOrder = createAction(UPDATE_ORDER)<{ 
    id: number, 
    payload: OrderUpdatePayload,
    onSuccess?: (order: OrderDetailResult) => void, 
    onFailure?: (error: ApiError) => void
}>();

export const updateOrderSuccess = createAction(UPDATE_ORDER_SUCCESS)<OrderDetailResult>();

export const saveOrder = createAction(SAVE_ORDER)<{ 
    payload: OrderSavePayload,
    onSuccess?: (order: OrderDetailResult) => void, 
    onFailure?: (error: ApiError) => void
}>();

export const saveOrderSuccess = createAction(SAVE_ORDER_SUCCESS)<OrderDetailResult>();

export const actions = {
    findOrderPage, findOrderPageAsync,
    findOrder, findOrderAsync,
    updateOrder, updateOrderSuccess,
    saveOrder, saveOrderSuccess
};

export type OrdersAction = ActionType<typeof actions>;