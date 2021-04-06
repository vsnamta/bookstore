import { call, put, select, takeEvery } from 'redux-saga/effects';
import { RootState } from '..';
import orderApi from '../../apis/orderApi';
import { Page } from '../../models/common';
import { OrderDetailResult, OrderResult } from '../../models/orders';
import { createFindOrderAction, createFindOrderPageAction, createSaveOrderAction, createSaveOrderSuccessAction, createUpdateOrderAction, createUpdateOrderSuccessAction, findOrderAsyncActionCreator, findOrderPageAsyncActionCreator } from './action';
import { FIND_ORDER, FIND_ORDER_PAGE, SAVE_ORDER, UPDATE_ORDER } from './actionType';
import { OrdersState } from './reducer';

function* findOrderPageSaga({ payload: findPayload }: ReturnType<typeof createFindOrderPageAction>) {
    const ordersState: OrdersState = yield select((state: RootState) => state.orders);
    
    if(JSON.stringify(ordersState.orderPageAsync.payload) === JSON.stringify(findPayload) 
        && ordersState.orderPageAsync.result !== undefined) {
        return;
    }
    
    yield put(findOrderPageAsyncActionCreator.request(findPayload));

    try {
        const orderPage: Page<OrderResult> = yield call(orderApi.findAll, findPayload);

        yield put(findOrderPageAsyncActionCreator.success(orderPage));
    } catch (error) {
        yield put(findOrderPageAsyncActionCreator.failure(error));
    }
};

function* findOrderSaga({ payload: id }: ReturnType<typeof createFindOrderAction>) {
    const ordersState: OrdersState = yield select((state: RootState) => state.orders);
    
    if(ordersState.orderAsync.payload === id && ordersState.orderAsync.result !== undefined) {
        return;
    }
    
    yield put(findOrderAsyncActionCreator.request(id));

    try {
        const order: OrderDetailResult = yield call(orderApi.findOne, id);

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