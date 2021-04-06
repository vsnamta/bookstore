import { createReducer } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { FindPayload, Page } from '../../models/common';
import { OrderDetailResult, OrderResult } from '../../models/orders';
import { createSaveOrderSuccessAction, createUpdateOrderSuccessAction, findOrderAsyncActionCreator, findOrderPageAsyncActionCreator, OrdersAction } from './action';
import { FIND_ORDER_FAILURE, FIND_ORDER_PAGE_FAILURE, FIND_ORDER_PAGE_REQUEST, FIND_ORDER_PAGE_SUCCESS, FIND_ORDER_REQUEST, FIND_ORDER_SUCCESS, SAVE_ORDER_SUCCESS, UPDATE_ORDER_SUCCESS } from './actionType';

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
    [FIND_ORDER_PAGE_REQUEST]: (state, { payload: findPayload }: ReturnType<typeof findOrderPageAsyncActionCreator.request>) => ({
        ...state,
        orderPageAsync: {
            payload: findPayload,
            result: undefined,
            error: undefined
        }
    }),
    [FIND_ORDER_PAGE_SUCCESS]: (state, { payload: orderPage }: ReturnType<typeof findOrderPageAsyncActionCreator.success>) => ({
        ...state,
        orderPageAsync: {
            ...state.orderPageAsync,
            result: orderPage
        } 
    }),
    [FIND_ORDER_PAGE_FAILURE]: (state, { payload: error }: ReturnType<typeof findOrderPageAsyncActionCreator.failure>) => ({
        ...state,
        orderPageAsync: {
            ...state.orderPageAsync,
            error: error
        } 
    }),
    [FIND_ORDER_REQUEST]: (state, { payload: id }: ReturnType<typeof findOrderAsyncActionCreator.request>) => ({
        ...state,
        orderAsync: {
            payload: id,
            result: undefined,
            error: undefined
        }
    }),
    [FIND_ORDER_SUCCESS]: (state, { payload: order }: ReturnType<typeof findOrderAsyncActionCreator.success>) => ({
        ...state,
        orderAsync: {
            ...state.orderAsync,
            result: order
        }
    }),
    [FIND_ORDER_FAILURE]: (state, { payload: error }: ReturnType<typeof findOrderAsyncActionCreator.failure>) => ({
        ...state,
        orderAsync: {
            ...state.orderAsync,
            error: error
        }
    }),
    [UPDATE_ORDER_SUCCESS]: (state, { payload: updatedOrder }: ReturnType<typeof createUpdateOrderSuccessAction>) => ({
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
    [SAVE_ORDER_SUCCESS]: (state, { payload: savedOrder }: ReturnType<typeof createSaveOrderSuccessAction>) => ({
        orderPageAsync: initialState.orderPageAsync,
        orderAsync: {
            payload: savedOrder.id,
            result: savedOrder,
            error: undefined
        }
    })
});