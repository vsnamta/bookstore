import { ActionType, createAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { FindPayload } from '../../models/common';
import { OrderDetailResult, OrderSavePayload, OrderUpdatePayload } from '../../models/orders';
import { FIND_ORDER, FIND_ORDER_PAGE, SAVE_ORDER, SAVE_ORDER_REQUEST, SET_ORDER_ASYNC, SET_ORDER_PAGE_ASYNC, UPDATE_ORDER, UPDATE_ORDER_REQUEST } from './actionType';
import { OrderAsync, OrderPageAsync } from './reducer';

export interface OrderUpdateRequestActionPayload { 
    id: number, 
    payload: OrderUpdatePayload,
    onSuccess?: (order: OrderDetailResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface OrderSaveRequestActionPayload { 
    payload: OrderSavePayload,
    onSuccess?: (order: OrderDetailResult) => void, 
    onFailure?: (error: ApiError) => void
}

export const createOrderPageFindAction = createAction(FIND_ORDER_PAGE)<FindPayload>();
export const createOrderPageAsyncSetAction = createAction(SET_ORDER_PAGE_ASYNC)<OrderPageAsync>();

export const createOrderFindAction = createAction(FIND_ORDER)<number>();
export const createOrderAsyncSetAction = createAction(SET_ORDER_ASYNC)<OrderAsync>();

export const createOrderUpdateRequestAction = createAction(UPDATE_ORDER_REQUEST)<OrderUpdateRequestActionPayload>();
export const createOrderUpdateAction = createAction(UPDATE_ORDER)<OrderDetailResult>();

export const createOrderSaveRequestAction = createAction(SAVE_ORDER_REQUEST)<OrderSaveRequestActionPayload>();
export const createOrderSaveAction = createAction(SAVE_ORDER)<OrderDetailResult>();

export const actions = {
    createOrderPageFindAction, createOrderPageAsyncSetAction,
    createOrderFindAction, createOrderAsyncSetAction,
    createOrderUpdateRequestAction, createOrderUpdateAction,
    createOrderSaveRequestAction, createOrderSaveAction
};

export type OrdersAction = ActionType<typeof actions>;