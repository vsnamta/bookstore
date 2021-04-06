import { createReducer } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { FindPayload, Page } from '../../models/common';
import { OrderDetailResult, OrderResult } from '../../models/orders';
import { createSaveOrderSuccessAction, createUpdateOrderSuccessAction, OrdersAction } from './action';
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
    [FIND_ORDER_PAGE_REQUEST]: (state, action) => ({
        ...state,
        orderPageAsync: {
            payload: action.payload,
            result: undefined,
            error: undefined
        }
    }),
    [FIND_ORDER_PAGE_SUCCESS]: (state, action) => ({
        ...state,
        orderPageAsync: {
            ...state.orderPageAsync,
            result: action.payload
        } 
    }),
    [FIND_ORDER_PAGE_FAILURE]: (state, action) => ({
        ...state,
        orderPageAsync: {
            ...state.orderPageAsync,
            error: action.payload
        } 
    }),
    [FIND_ORDER_REQUEST]: (state, action) => ({
        ...state,
        orderAsync: {
            payload: action.payload,
            result: undefined,
            error: undefined
        }
    }),
    [FIND_ORDER_SUCCESS]: (state, action) => ({
        ...state,
        orderAsync: {
            ...state.orderAsync,
            result: action.payload
        }
    }),
    [FIND_ORDER_FAILURE]: (state, action) => ({
        ...state,
        orderAsync: {
            ...state.orderAsync,
            error: action.payload
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