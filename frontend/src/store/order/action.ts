import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { FindPayload, Page } from '../../models/common';
import { OrderDetailResult, OrderResult, OrderSavePayload, OrderUpdatePayload } from '../../models/orders';
import { FIND_ORDER, FIND_ORDER_FAILURE, FIND_ORDER_PAGE, FIND_ORDER_PAGE_FAILURE, FIND_ORDER_PAGE_REQUEST, FIND_ORDER_PAGE_SUCCESS, FIND_ORDER_REQUEST, FIND_ORDER_SUCCESS, SAVE_ORDER, SAVE_ORDER_SUCCESS, UPDATE_ORDER, UPDATE_ORDER_SUCCESS } from './actionType';

export interface OrderUpdateActionPayload { 
    id: number, 
    payload: OrderUpdatePayload,
    onSuccess?: (order: OrderDetailResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface OrderSaveActionPayload { 
    payload: OrderSavePayload,
    onSuccess?: (order: OrderDetailResult) => void, 
    onFailure?: (error: ApiError) => void
}

export const createFindOrderPageAction = createAction(FIND_ORDER_PAGE)<FindPayload>();
export const findOrderPageAsyncActionCreator = createAsyncAction(FIND_ORDER_PAGE_REQUEST, FIND_ORDER_PAGE_SUCCESS, FIND_ORDER_PAGE_FAILURE)<FindPayload, Page<OrderResult>, ApiError>();

export const createFindOrderAction = createAction(FIND_ORDER)<number>();
export const findOrderAsyncActionCreator = createAsyncAction(FIND_ORDER_REQUEST, FIND_ORDER_SUCCESS, FIND_ORDER_FAILURE)<number, OrderDetailResult, ApiError>();

export const createUpdateOrderAction = createAction(UPDATE_ORDER)<OrderUpdateActionPayload>();
export const createUpdateOrderSuccessAction = createAction(UPDATE_ORDER_SUCCESS)<OrderDetailResult>();

export const createSaveOrderAction = createAction(SAVE_ORDER)<OrderSaveActionPayload>();
export const createSaveOrderSuccessAction = createAction(SAVE_ORDER_SUCCESS)<OrderDetailResult>();

export const actions = {
    createFindOrderPageAction, findOrderPageAsyncActionCreator,
    createFindOrderAction, findOrderAsyncActionCreator,
    createUpdateOrderAction, createUpdateOrderSuccessAction,
    createSaveOrderAction, createSaveOrderSuccessAction
};

export type OrdersAction = ActionType<typeof actions>;