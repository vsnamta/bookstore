import { ActionType, createAction, createReducer } from 'typesafe-actions';
import { FindPayload } from '../../models/common';
import { OrderDetailResult, OrderResult } from '../../models/order';
import { AsyncOrder, AsyncOrderPage, OrderSaveAsyncPayload, OrdersState, OrderUpdateAsyncPayload } from '../../models/order/store';

export const types = {
    FETCH_ORDER_PAGE: 'order/FETCH_ORDER_PAGE' as const,
    SET_ASYNC_ORDER_PAGE: 'order/SET_ASYNC_ORDER_PAGE' as const,
    FETCH_ORDER: 'order/FETCH_ORDER' as const,
    SET_ASYNC_ORDER: 'order/SET_ASYNC_ORDER' as const,
    UPDATE_ORDER_ASYNC: 'order/UPDATE_ORDER_ASYNC' as const,
    UPDATE_ORDER: 'order/UPDATE_ORDER' as const,
    SAVE_ORDER_ASYNC: 'order/SAVE_ORDER_ASYNC' as const,
    SAVE_ORDER: 'order/SAVE_ORDER' as const
};

export const actions = {
    fetchOrderPage: createAction(types.FETCH_ORDER_PAGE)<FindPayload>(), 
    setAsyncOrderPage: createAction(types.SET_ASYNC_ORDER_PAGE)<AsyncOrderPage>(),
    fetchOrder: createAction(types.FETCH_ORDER)<number>(), 
    setAsyncOrder: createAction(types.SET_ASYNC_ORDER)<AsyncOrder>(),
    updateOrderAsync: createAction(types.UPDATE_ORDER_ASYNC)<OrderUpdateAsyncPayload>(), 
    updateOrder: createAction(types.UPDATE_ORDER)<OrderDetailResult>(),
    saveOrderAsync: createAction(types.SAVE_ORDER_ASYNC)<OrderSaveAsyncPayload>(),
    saveOrder: createAction(types.SAVE_ORDER)<OrderDetailResult>()
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
    [types.SAVE_ORDER]: (state, { payload: savedOrder }: ReturnType<typeof actions.saveOrder>) => ({
        ...state,
        asyncOrderPage: {
            ...state.asyncOrderPage,
            result: state.asyncOrderPage.result
                ? {
                    list: [
                        {
                            id: savedOrder.id,
                            memberName: savedOrder.memberName,
                            orderLineName: savedOrder.orderLineResults.length === 1 
                                ? savedOrder.orderLineResults[0].productName
                                : savedOrder.orderLineResults[0].productName + ` 외 + ${savedOrder.orderLineResults.length - 1} 건`,
                            totalAmounts: savedOrder.totalAmounts,
                            statusName: savedOrder.statusName,
                            orderDate: savedOrder.statusUpdatedDate,
                        }, 
                        ...state.asyncOrderPage.result.list.slice(0, 9)
                    ],
                    totalCount: state.asyncOrderPage.result.totalCount + 1
                }
                : undefined
        },
        asyncProduct: {
            payload: savedOrder.id,
            result: savedOrder,
            error: undefined
        }
    })
});

export default reducer;