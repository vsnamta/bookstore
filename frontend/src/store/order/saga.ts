import { call, put, takeEvery } from 'redux-saga/effects';
import orderApi from '../../apis/orderApi';
import { Page } from '../../models/common';
import { OrderDetailResult, OrderResult } from '../../models/orders';
import { createFindOrderAction, createFindOrderPageAction, createSaveOrderAction, createSaveOrderSuccessAction, createUpdateOrderAction, createUpdateOrderSuccessAction, findOrderAsyncActionCreator, findOrderPageAsyncActionCreator } from './action';
import { FIND_ORDER, FIND_ORDER_PAGE, SAVE_ORDER, UPDATE_ORDER } from './actionType';

function* findOrderPageSaga(action: ReturnType<typeof createFindOrderPageAction>) {
    yield put(findOrderPageAsyncActionCreator.request(action.payload));

    try {
        const orderPage: Page<OrderResult> = yield call(orderApi.findAll, action.payload);

        yield put(findOrderPageAsyncActionCreator.success(orderPage));
    } catch (error) {
        yield put(findOrderPageAsyncActionCreator.failure(error));
    }
};

function* findOrderSaga(action: ReturnType<typeof createFindOrderAction>) {
    yield put(findOrderAsyncActionCreator.request(action.payload));

    try {
        const order: OrderDetailResult = yield call(orderApi.findOne, action.payload);

        yield put(findOrderAsyncActionCreator.success(order));
    } catch (error) {
        yield put(findOrderAsyncActionCreator.failure(error));
    }
};

function* updateOrderSaga({ payload: orderUpdateActionPayload }: ReturnType<typeof createUpdateOrderAction>) {
    try {
        const order: OrderDetailResult = yield call(orderApi.update, orderUpdateActionPayload.id, orderUpdateActionPayload.payload);

        yield put(createUpdateOrderSuccessAction(order));
        orderUpdateActionPayload.onSuccess && orderUpdateActionPayload.onSuccess(order);
    } catch (error) {
        orderUpdateActionPayload.onFailure && orderUpdateActionPayload.onFailure(error);
    }
};

function* saveOrderSaga({ payload: orderSaveActionPayload }: ReturnType<typeof createSaveOrderAction>) {
    try {
        const order: OrderDetailResult = yield call(orderApi.save, orderSaveActionPayload.payload);

        yield put(createSaveOrderSuccessAction(order));
        orderSaveActionPayload.onSuccess && orderSaveActionPayload.onSuccess(order);
    } catch (error) {
        orderSaveActionPayload.onFailure && orderSaveActionPayload.onFailure(error);
    }
};

export default function* ordersSaga() {
    yield takeEvery(FIND_ORDER_PAGE, findOrderPageSaga);
    yield takeEvery(FIND_ORDER, findOrderSaga);
    yield takeEvery(UPDATE_ORDER, updateOrderSaga);
    yield takeEvery(SAVE_ORDER, saveOrderSaga);
}