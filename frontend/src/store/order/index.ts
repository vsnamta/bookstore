import { ActionType, createAction, createReducer } from 'typesafe-actions';
import { FindPayload, Page } from '../../models/common';
import { OrderDetailResult, OrderResult } from '../../models/order';
import { AsyncOrder, AsyncOrderPage, OrderSaveAsyncPayload, OrdersState, OrderUpdateAsyncPayload } from '../../models/order/store';

export const types ={
    FETCH_ORDER_PAGE: 'order/FETCH_ORDER_PAGE' as const,
    SET_ASYNC_ORDER_PAGE: 'order/SET_ASYNC_ORDER_PAGE' as const,
    FIND_ORDER: 'order/FIND_ORDER' as const,
    SET_ASYNC_ORDER: 'order/SET_ASYNC_ORDER' as const,
    UPDATE_ORDER_ASYNC: 'order/UPDATE_ORDER_ASYNC' as const,
    UPDATE_ORDER: 'order/UPDATE_ORDER' as const,
    SAVE_ORDER_ASYNC: 'order/SAVE_ORDER_ASYNC' as const,
    SET_ORDERS_STATE: 'order/SET_ORDERS_STATE' as const
};

export const actions = {
    fetchOrderPage: createAction(types.FETCH_ORDER_PAGE)<FindPayload>(), 
    setAsyncOrderPage: createAction(types.SET_ASYNC_ORDER_PAGE)<AsyncOrderPage>(),
    fetchOrder: createAction(types.FIND_ORDER)<number>(), 
    setAsyncOrder: createAction(types.SET_ASYNC_ORDER)<AsyncOrder>(),
    updateOrderAsync: createAction(types.UPDATE_ORDER_ASYNC)<OrderUpdateAsyncPayload>(), 
    updateOrder: createAction(types.UPDATE_ORDER)<OrderDetailResult>(),
    saveOrderAsync: createAction(types.SAVE_ORDER_ASYNC)<OrderSaveAsyncPayload>(),
    setOrdersState: createAction(types.SET_ORDERS_STATE)<OrdersState>(),
};

const initialState: OrdersState = {
    asyncOrderPage: {
        payload : undefined,
        result: undefined,
        error: undefined
    },
    asyncOrder: {
        payload: undefined,
        result: undefined,
        error: undefined
    },
};

const reducer = createReducer<OrdersState, ActionType<typeof actions>>(initialState, {
    [types.SET_ASYNC_ORDER_PAGE]: (state, { payload: asyncOrderPage }: ReturnType<typeof actions.setAsyncOrderPage>) => ({
        ...state,
        asyncOrderPage: asyncOrderPage
    }),
    [types.SET_ASYNC_ORDER]: (state, { payload: asyncOrder }: ReturnType<typeof actions.setAsyncOrder>) => ({
        ...state,
        asyncOrder: asyncOrder
    }),
    [types.UPDATE_ORDER]: (state, { payload: updatedOrder }: ReturnType<typeof actions.updateOrder>) => ({
        asyncOrderPage: {
            ...state.asyncOrderPage,
            result: state.asyncOrderPage.result
                ? {
                    ...state.asyncOrderPage.result,
                    list: state.asyncOrderPage.result.list.map(order => 
                        order.id === updatedOrder.id
                            ? { ...order, statusName: updatedOrder.statusName }
                            : order
                    )
                }
                : undefined
        },
        asyncOrder: {
            ...state.asyncOrder,
            result: updatedOrder
        }
    }),
    [types.SET_ORDERS_STATE]: (state, { payload: ordersState }: ReturnType<typeof actions.setOrdersState>) => (
        ordersState
    )
});

export default reducer;