import { call, put, select, takeEvery } from 'redux-saga/effects';
import { RootState } from '..';
import orderApi from '../../apis/orderApi';
import { Page } from '../../models/common';
import { OrderDetailResult, OrderResult } from '../../models/orders';
import { createOrderFindAction, createOrderPageFindAction, createOrderSaveAction, createOrderSaveRequestAction, createOrderAsyncSetAction, createOrderPageAsyncSetAction, createOrderUpdateAction, createOrderUpdateRequestAction } from './action';
import { FIND_ORDER, FIND_ORDER_PAGE, SAVE_ORDER_REQUEST, UPDATE_ORDER_REQUEST } from './actionType';
import { OrdersState } from './reducer';

function* findOrderPageSaga({ payload: findPayload }: ReturnType<typeof createOrderPageFindAction>) {
    const ordersState: OrdersState = yield select((state: RootState) => state.orders);
    
    if(JSON.stringify(ordersState.orderPageAsync.payload) === JSON.stringify(findPayload) 
        && ordersState.orderPageAsync.result !== undefined) {
        return;
    }

    try {
        const orderPage: Page<OrderResult> = yield call(orderApi.findAll, findPayload);

        yield put(createOrderPageAsyncSetAction({
            payload: findPayload,
            result: orderPage,
            error: undefined
        }));
    } catch (error) {
        yield put(createOrderPageAsyncSetAction({
            payload: findPayload,
            result: undefined,
            error: error
        }));
    }
};

function* findOrderSaga({ payload: id }: ReturnType<typeof createOrderFindAction>) {
    const ordersState: OrdersState = yield select((state: RootState) => state.orders);
    
    if(ordersState.orderAsync.payload === id && ordersState.orderAsync.result !== undefined) {
        return;
    }

    try {
        const order: OrderDetailResult = yield call(orderApi.findOne, id);

        yield put(createOrderAsyncSetAction({
            payload: id,
            result: order,
            error: undefined
        }));
    } catch (error) {
        yield put(createOrderAsyncSetAction({
            payload: id,
            result: undefined,
            error: error
        }));
    }
};

function* updateOrderRequestSaga({ payload: orderUpdateRequestActionPayload }: ReturnType<typeof createOrderUpdateRequestAction>) {
    try {
        const order: OrderDetailResult = yield call(orderApi.update, orderUpdateRequestActionPayload.id, orderUpdateRequestActionPayload.payload);

        yield put(createOrderUpdateAction(order));
        orderUpdateRequestActionPayload.onSuccess && orderUpdateRequestActionPayload.onSuccess(order);
    } catch (error) {
        orderUpdateRequestActionPayload.onFailure && orderUpdateRequestActionPayload.onFailure(error);
    }
};

function* saveOrderRequestSaga({ payload: orderSaveRequestActionPayload }: ReturnType<typeof createOrderSaveRequestAction>) {
    try {
        const order: OrderDetailResult = yield call(orderApi.save, orderSaveRequestActionPayload.payload);

        yield put(createOrderSaveAction(order));
        orderSaveRequestActionPayload.onSuccess && orderSaveRequestActionPayload.onSuccess(order);
    } catch (error) {
        orderSaveRequestActionPayload.onFailure && orderSaveRequestActionPayload.onFailure(error);
    }
};

export default function* ordersSaga() {
    yield takeEvery(FIND_ORDER_PAGE, findOrderPageSaga);
    yield takeEvery(FIND_ORDER, findOrderSaga);
    yield takeEvery(UPDATE_ORDER_REQUEST, updateOrderRequestSaga);
    yield takeEvery(SAVE_ORDER_REQUEST, saveOrderRequestSaga);
}