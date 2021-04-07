import { ActionType, createAction, createReducer } from 'typesafe-actions';
import { FindPayload, Page } from '../../models/common';
import { OrderDetailResult, OrderResult } from '../../models/order';
import { OrderAsync, OrderPageAsync, OrderSaveAsyncPayload, OrdersState, OrderUpdateAsyncPayload } from '../../models/order/store';

export const types ={
    SET_ORDERS_STATE: 'order/SET_ORDERS_STATE' as const,
    FETCH_ORDER_PAGE: 'order/FETCH_ORDER_PAGE' as const,
    SET_ORDER_PAGE_ASYNC: 'order/SET_ORDER_PAGE_ASYNC' as const,
    FIND_ORDER: 'order/FIND_ORDER' as const,
    SET_ORDER_ASYNC: 'order/SET_ORDER_ASYNC' as const,
    UPDATE_ORDER_ASYNC: 'order/UPDATE_ORDER_ASYNC' as const,
    UPDATE_ORDER: 'order/UPDATE_ORDER' as const,
    SAVE_ORDER_ASYNC: 'order/SAVE_ORDER_ASYNC' as const
};

export const actions = {
    setOrdersState: createAction(types.SET_ORDERS_STATE)<OrdersState>(),
    fetchOrderPage: createAction(types.FETCH_ORDER_PAGE)<FindPayload>(), 
    setOrderPageAsync: createAction(types.SET_ORDER_PAGE_ASYNC)<OrderPageAsync>(),
    fetchOrder: createAction(types.FIND_ORDER)<number>(), 
    setOrderAsync: createAction(types.SET_ORDER_ASYNC)<OrderAsync>(),
    updateOrderAsync: createAction(types.UPDATE_ORDER_ASYNC)<OrderUpdateAsyncPayload>(), 
    updateOrder: createAction(types.UPDATE_ORDER)<OrderDetailResult>(),
    saveOrderAsync: createAction(types.SAVE_ORDER_ASYNC)<OrderSaveAsyncPayload>()
};

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

const reducer = createReducer<OrdersState, ActionType<typeof actions>>(initialState, {
    [types.SET_ORDERS_STATE]: (state, { payload: ordersState }: ReturnType<typeof actions.setOrdersState>) => (
        ordersState
    ),
    [types.SET_ORDER_PAGE_ASYNC]: (state, { payload: orderPageAsync }: ReturnType<typeof actions.setOrderPageAsync>) => ({
        ...state,
        orderPageAsync: orderPageAsync
    }),
    [types.SET_ORDER_ASYNC]: (state, { payload: orderAsync }: ReturnType<typeof actions.setOrderAsync>) => ({
        ...state,
        orderAsync: orderAsync
    }),
    [types.UPDATE_ORDER]: (state, { payload: updatedOrder }: ReturnType<typeof actions.updateOrder>) => ({
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
    })
});

export default reducer;