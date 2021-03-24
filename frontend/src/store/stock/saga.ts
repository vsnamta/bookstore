import { call, put, takeEvery } from 'redux-saga/effects';
import stockApi from '../../apis/stockApi';
import { Page } from '../../models/common';
import { StockResult } from '../../models/stocks';
import { createFindStockPageAction, createSaveStockAction, createSaveStockSuccessAction, findStockPageAsyncActionCreator } from './action';
import { FIND_STOCK_PAGE, SAVE_STOCK } from './actionType';

function* findStockPageSaga(action: ReturnType<typeof createFindStockPageAction>) {
    yield put(findStockPageAsyncActionCreator.request(action.payload));

    try {
        const stockPage: Page<StockResult> = yield call(stockApi.findAll, action.payload);

        yield put(findStockPageAsyncActionCreator.success(stockPage));
    } catch (error) {
        yield put(findStockPageAsyncActionCreator.failure(error));
    }
};

function* saveStockSaga(action: ReturnType<typeof createSaveStockAction>) {
    try {
        const stock: StockResult = yield call(stockApi.save, action.payload.payload);

        yield put(createSaveStockSuccessAction(stock));
        action.payload.onSuccess && action.payload.onSuccess(stock);
    } catch (error) {
        action.payload.onFailure && action.payload.onFailure(error);
    }
};

export default function* stocksSaga() {
    yield takeEvery(FIND_STOCK_PAGE, findStockPageSaga);
    yield takeEvery(SAVE_STOCK, saveStockSaga);
}