import { call, put, select, takeEvery } from 'redux-saga/effects';
import { RootState } from '..';
import orderApi from '../../apis/orderApi';
import { Page } from '../../models/common';
import { OrderDetailResult, OrderResult } from '../../models/orders';
import { createFindOrderAction, createFindOrderPageAction, createSaveOrderAction, createSaveOrderRequestAction, createSetOrderAsyncAction, createSetOrderPageAsyncAction, createUpdateOrderAction, createUpdateOrderRequestAction } from './action';
import { FIND_ORDER, FIND_ORDER_PAGE, SAVE_ORDER_REQUEST, UPDATE_ORDER_REQUEST } from './actionType';
import { OrdersState } from './reducer';

function* findOrderPageSaga({ payload: findPayload }: ReturnType<typeof createFindOrderPageAction>) {
    const ordersState: OrdersState = yield select((state: RootState) => state.orders);
    
    if(JSON.stringify(ordersState.orderPageAsync.payload) === JSON.stringify(findPayload) 
        && ordersState.orderPageAsync.result !== undefined) {
        return;
    }

    try {
        const orderPage: Page<OrderResult> = yield call(orderApi.findAll, findPayload);

        yield put(createSetOrderPageAsyncAction({
            payload: findPayload,
            result: orderPage,
            error: undefined
        }));
    } catch (error) {
        yield put(createSetOrderPageAsyncAction({
            payload: findPayload,
            result: undefined,
            error: error
        }));
    }
};

function* findOrderSaga({ payload: id }: ReturnType<typeof createFindOrderAction>) {
    const ordersState: OrdersState = yield select((state: RootState) => state.orders);
    
    if(ordersState.orderAsync.payload === id && ordersState.orderAsync.result !== undefined) {
        return;
    }

    try {
        const order: OrderDetailResult = yield call(orderApi.findOne, id);

        yield put(createSetOrderAsyncAction({
            payload: id,
            result: order,
            error: undefined
        }));
    } catch (error) {
        yield put(createSetOrderAsyncAction({
            payload: id,
            result: undefined,
            error: error
        }));
    }
};

function* updateOrderRequestSaga({ payload: orderUpdateActionPayload }: ReturnType<typeof createUpdateOrderRequestAction>) {
    try {
        const order: OrderDetailResult = yield call(orderApi.update, orderUpdateActionPayload.id, orderUpdateActionPayload.payload);

        yield put(createUpdateOrderAction(order));
        orderUpdateActionPayload.onSuccess && orderUpdateActionPayload.onSuccess(order);
    } catch (error) {
        orderUpdateActionPayload.onFailure && orderUpdateActionPayload.onFailure(error);
    }
};

function* saveOrderRequestSaga({ payload: orderSaveActionPayload }: ReturnType<typeof createSaveOrderRequestAction>) {
    try {
        const order: OrderDetailResult = yield call(orderApi.save, orderSaveActionPayload.payload);

        yield put(createSaveOrderAction(order));
        orderSaveActionPayload.onSuccess && orderSaveActionPayload.onSuccess(order);
    } catch (error) {
        orderSaveActionPayload.onFailure && orderSaveActionPayload.onFailure(error);
    }
};

export default function* ordersSaga() {
    yield takeEvery(FIND_ORDER_PAGE, findOrderPageSaga);
    yield takeEvery(FIND_ORDER, findOrderSaga);
    yield takeEvery(UPDATE_ORDER_REQUEST, updateOrderRequestSaga);
    yield takeEvery(SAVE_ORDER_REQUEST, saveOrderRequestSaga);
}