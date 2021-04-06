import { ActionType, createAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { FindPayload } from '../../models/common';
import { OrderDetailResult, OrderSavePayload, OrderUpdatePayload } from '../../models/orders';
import { FIND_ORDER, FIND_ORDER_PAGE, SAVE_ORDER, SAVE_ORDER_REQUEST, SET_ORDER_ASYNC, SET_ORDER_PAGE_ASYNC, UPDATE_ORDER, UPDATE_ORDER_REQUEST } from './actionType';
import { OrderAsync, OrderPageAsync } from './reducer';

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
export const createSetOrderPageAsyncAction = createAction(SET_ORDER_PAGE_ASYNC)<OrderPageAsync>();

export const createFindOrderAction = createAction(FIND_ORDER)<number>();
export const createSetOrderAsyncAction = createAction(SET_ORDER_ASYNC)<OrderAsync>();

export const createUpdateOrderRequestAction = createAction(UPDATE_ORDER_REQUEST)<OrderUpdateActionPayload>();
export const createUpdateOrderAction = createAction(UPDATE_ORDER)<OrderDetailResult>();

export const createSaveOrderRequestAction = createAction(SAVE_ORDER_REQUEST)<OrderSaveActionPayload>();
export const createSaveOrderAction = createAction(SAVE_ORDER)<OrderDetailResult>();

export const actions = {
    createFindOrderPageAction, createSetOrderPageAsyncAction,
    createFindOrderAction, createSetOrderAsyncAction,
    createUpdateOrderRequestAction, createUpdateOrderAction,
    createSaveOrderRequestAction, createSaveOrderAction
};

export type OrdersAction = ActionType<typeof actions>;