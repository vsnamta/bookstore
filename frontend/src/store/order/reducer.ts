import { createReducer } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { FindPayload, Page } from '../../models/common';
import { OrderDetailResult, OrderResult } from '../../models/orders';
import { createSaveOrderAction, createSetOrderAsyncAction, createSetOrderPageAsyncAction, createUpdateOrderAction, OrdersAction } from './action';
import { SAVE_ORDER, SET_ORDER_ASYNC, SET_ORDER_PAGE_ASYNC, UPDATE_ORDER } from './actionType';

export interface OrderPageAsync {
    payload?: FindPayload;
    result?: Page<OrderResult>;
    error?: ApiError; 
}

export interface OrderAsync {
    payload?: number;
    result?: OrderDetailResult;
    error?: ApiError;
}

export interface OrdersState {
    orderPageAsync: OrderPageAsync;
    orderAsync: OrderAsync;
}

const initialState: OrdersState = {
    orderPageAsync: {
        payload : undefined,
        result: undefined,
        error: undefined
    },
    orderAsync: {
        payload: undefined,
        result: undefined,
        error: undefined
    },
};

export default createReducer<OrdersState, OrdersAction>(initialState, {
    [SET_ORDER_PAGE_ASYNC]: (state, { payload: orderPageAsync }: ReturnType<typeof createSetOrderPageAsyncAction>) => ({
        ...state,
        orderPageAsync: orderPageAsync
    }),
    [SET_ORDER_ASYNC]: (state, { payload: orderAsync }: ReturnType<typeof createSetOrderAsyncAction>) => ({
        ...state,
        orderAsync: orderAsync
    }),
    [UPDATE_ORDER]: (state, { payload: updatedOrder }: ReturnType<typeof createUpdateOrderAction>) => ({
        orderPageAsync: {
            ...state.orderPageAsync,
            result: {
                ...state.orderPageAsync.result as Page<OrderResult>,
                list: (state.orderPageAsync.result as Page<OrderResult>).list
                    .map(order => 
                        order.id === updatedOrder.id
                            ? { ...order, statusName: updatedOrder.statusName } 
                            : order
                    )
            }
        },
        orderAsync: {
            ...state.orderAsync,
            result: updatedOrder
        }
    }),
    [SAVE_ORDER]: (state, { payload: savedOrder }: ReturnType<typeof createSaveOrderAction>) => ({
        orderPageAsync: initialState.orderPageAsync,
        orderAsync: {
            payload: savedOrder.id,
            result: savedOrder,
            error: undefined
        }
    })
});