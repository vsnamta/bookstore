import { call, put, select, takeEvery } from 'redux-saga/effects';
import { actions, types } from '.';
import { RootState } from '..';
import orderApi from '../../apis/orderApi';
import { MyData } from '../../models/auth';
import { FindPayload, Page } from '../../models/common';
import { OrderDetailResult, OrderResult } from '../../models/order';
import { AsyncOrder, AsyncOrderPage, OrdersState } from '../../models/order/store';

function* fetchOrderPageSaga({ payload: findPayload }: ReturnType<typeof actions.fetchOrderPage>) {
    const asyncOrderPage: AsyncOrderPage = yield select((state: RootState) => state.orders.asyncOrderPage);
    
    if(asyncOrderPage.result !== undefined 
        && JSON.stringify(asyncOrderPage.payload) === JSON.stringify(findPayload)) {
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
    const asyncOrder: AsyncOrder = yield select((state: RootState) => state.orders.asyncOrder);
    
    if(asyncOrder.result !== undefined && asyncOrder.payload === id) {
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
        orderUpdateAsyncPayload.onSuccess?.(order);
    } catch (error) {
        orderUpdateAsyncPayload.onFailure?.(error);
    }
};

function* saveOrderAsyncSaga({ payload: orderSaveAsyncPayload }: ReturnType<typeof actions.saveOrderAsync>) {
    try {
        const order: OrderDetailResult = yield call(orderApi.save, orderSaveAsyncPayload.payload);

        const currentFindPayload: FindPayload = yield select((state: RootState) => state.orders.asyncOrderPage.payload);

        const myData: MyData = yield select((state: RootState) => state.auths.myData);
        
        const findPayload: FindPayload = {
            searchCriteria: { keyword: "memberId", column: myData.id + "" },
            pageCriteria: { page: 1, size: 10 }
        };

        if(JSON.stringify(currentFindPayload) === JSON.stringify(findPayload)) {
            yield put(actions.saveOrder(order));
        } else {
            yield put(actions.setAsyncOrder({
                payload: order.id,
                result: order,
                error: undefined
            }));
    
            const orderPage: Page<OrderResult> = yield call(orderApi.findAll, findPayload);
    
            yield put(actions.setAsyncOrderPage({
                payload: findPayload,
                result: orderPage,
                error: undefined
            }));
        }  

        orderSaveAsyncPayload.onSuccess?.(order);
    } catch (error) {
        orderSaveAsyncPayload.onFailure?.(error);
    }
};

export default function* ordersSaga() {
    yield takeEvery(types.FETCH_ORDER_PAGE, fetchOrderPageSaga);
    yield takeEvery(types.FETCH_ORDER, fetchOrderSaga);
    yield takeEvery(types.UPDATE_ORDER_ASYNC, updateOrderAsyncSaga);
    yield takeEvery(types.SAVE_ORDER_ASYNC, saveOrderAsyncSaga);
}