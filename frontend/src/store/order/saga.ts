import { call, put, takeEvery } from 'redux-saga/effects';
import orderApi from '../../apis/orderApi';
import { Page } from '../../models/common';
import { OrderDetailResult, OrderResult } from '../../models/orders';
import { findOrder, findOrderAsync, findOrderPage, findOrderPageAsync, saveOrder, saveOrderSuccess, updateOrder, updateOrderSuccess } from './action';
import { FIND_ORDER, FIND_ORDER_PAGE, SAVE_ORDER, UPDATE_ORDER } from './actionType';

function* findOrderPageSaga(action: ReturnType<typeof findOrderPage>) {
    yield put(findOrderPageAsync.request(action.payload));

    try {
        const orderPage: Page<OrderResult> = yield call(orderApi.findAll, action.payload);

        yield put(findOrderPageAsync.success(orderPage));
    } catch (error) {
        yield put(findOrderPageAsync.failure(error));
    }
};

function* findOrderSaga(action: ReturnType<typeof findOrder>) {
    yield put(findOrderAsync.request(action.payload));

    try {
        const order: OrderDetailResult = yield call(orderApi.findOne, action.payload);

        yield put(findOrderAsync.success(order));
    } catch (error) {
        yield put(findOrderAsync.failure(error));
    }
};

function* updateOrderSaga(action: ReturnType<typeof updateOrder>) {
    try {
        const order: OrderDetailResult = yield call(orderApi.update, action.payload.id, action.payload.payload);

        yield put(updateOrderSuccess(order));
        action.payload.onSuccess && action.payload.onSuccess(order);
    } catch (error) {
        action.payload.onFailure && action.payload.onFailure(error);
    }
};

function* saveOrderSaga(action: ReturnType<typeof saveOrder>) {
    try {
        const order: OrderDetailResult = yield call(orderApi.save, action.payload.payload);

        yield put(saveOrderSuccess(order));
        action.payload.onSuccess && action.payload.onSuccess(order);
    } catch (error) {
        action.payload.onFailure && action.payload.onFailure(error);
    }
};

export default function* ordersSaga() {
    yield takeEvery(FIND_ORDER_PAGE, findOrderPageSaga);
    yield takeEvery(FIND_ORDER, findOrderSaga);
    yield takeEvery(UPDATE_ORDER, updateOrderSaga);
    yield takeEvery(SAVE_ORDER, saveOrderSaga);
}