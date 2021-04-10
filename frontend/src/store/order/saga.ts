import { call, put, select, takeEvery } from 'redux-saga/effects';
import { actions, types } from '.';
import { RootState } from '..';
import orderApi from '../../apis/orderApi';
import { MyData } from '../../models/auth';
import { FindPayload, Page } from '../../models/common';
import { OrderDetailResult, OrderResult } from '../../models/order';
import { OrdersState } from '../../models/order/store';

function* fetchOrderPageSaga({ payload: findPayload }: ReturnType<typeof actions.fetchOrderPage>) {
    const ordersState: OrdersState = yield select((state: RootState) => state.orders);
    
    if(ordersState.asyncOrderPage.result !== undefined 
        && JSON.stringify(ordersState.asyncOrderPage.payload) === JSON.stringify(findPayload)) {
        return;
    }

    try {
        const orderPage: Page<OrderResult> = yield call(orderApi.findAll, findPayload);

        yield put(actions.setAsyncOrderPage({
            payload: findPayload,
            result: orderPage,
            error: undefined
        }));
    } catch (error) {
        yield put(actions.setAsyncOrderPage({
            payload: findPayload,
            result: undefined,
            error: error
        }));
    }
};

function* fetchOrderSaga({ payload: id }: ReturnType<typeof actions.fetchOrder>) {
    const ordersState: OrdersState = yield select((state: RootState) => state.orders);
    
    if(ordersState.asyncOrder.result !== undefined && ordersState.asyncOrder.payload === id) {
        return;
    }

    try {
        const order: OrderDetailResult = yield call(orderApi.findOne, id);

        yield put(actions.setAsyncOrder({
            payload: id,
            result: order,
            error: undefined
        }));
    } catch (error) {
        yield put(actions.setAsyncOrder({
            payload: id,
            result: undefined,
            error: error
        }));
    }
};

function* updateOrderAsyncSaga({ payload: orderUpdateAsyncPayload }: ReturnType<typeof actions.updateOrderAsync>) {
    try {
        const order: OrderDetailResult = yield call(orderApi.update, orderUpdateAsyncPayload.id, orderUpdateAsyncPayload.payload);

        yield put(actions.updateOrder(order));
        orderUpdateAsyncPayload.onSuccess && orderUpdateAsyncPayload.onSuccess(order);
    } catch (error) {
        orderUpdateAsyncPayload.onFailure && orderUpdateAsyncPayload.onFailure(error);
    }
};

function* saveOrderAsyncSaga({ payload: orderSaveAsyncPayload }: ReturnType<typeof actions.saveOrderAsync>) {
    try {
        const order: OrderDetailResult = yield call(orderApi.save, orderSaveAsyncPayload.payload);

        const myData: MyData = yield select((state: RootState) => state.auths.myData);

        const findPayload: FindPayload = {
            searchCriteria: { keyword: "memberId", column: myData.id + "" },
            pageCriteria: { page: 1, size: 10 }
        };

        const orderPage: Page<OrderResult> = yield call(orderApi.findAll, findPayload);

        yield put(actions.setOrdersState({
            asyncOrderPage: {
                payload: findPayload,
                result: orderPage,
                error: undefined
            },
            asyncOrder: {
                payload: order.id,
                result: order,
                error: undefined
            }
        }));
        orderSaveAsyncPayload.onSuccess && orderSaveAsyncPayload.onSuccess(order);
    } catch (error) {
        orderSaveAsyncPayload.onFailure && orderSaveAsyncPayload.onFailure(error);
    }
};

export default function* ordersSaga() {
    yield takeEvery(types.FETCH_ORDER_PAGE, fetchOrderPageSaga);
    yield takeEvery(types.FIND_ORDER, fetchOrderSaga);
    yield takeEvery(types.UPDATE_ORDER_ASYNC, updateOrderAsyncSaga);
    yield takeEvery(types.SAVE_ORDER_ASYNC, saveOrderAsyncSaga);
}