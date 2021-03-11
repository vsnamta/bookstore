import { call, put, takeEvery } from 'redux-saga/effects';
import stockApi from '../../apis/stockApi';
import { Page } from '../../models/common';
import { StockResult } from '../../models/stocks';
import { findStockPage, findStockPageAsync, saveStock, saveStockSuccess } from './action';
import { FIND_STOCK_PAGE, SAVE_STOCK } from './actionType';

function* findStockPageSaga(action: ReturnType<typeof findStockPage>) {
    yield put(findStockPageAsync.request(action.payload));

    try {
        const stockPage: Page<StockResult> = yield call(stockApi.findAll, action.payload);

        yield put(findStockPageAsync.success(stockPage));
    } catch (error) {
        yield put(findStockPageAsync.failure(error));
    }
};

function* saveStockSaga(action: ReturnType<typeof saveStock>) {
    try {
        const stock: StockResult = yield call(stockApi.save, action.payload.payload);

        yield put(saveStockSuccess(stock));
        action.payload.onSuccess && action.payload.onSuccess(stock);
    } catch (error) {
        action.payload.onFailure && action.payload.onFailure(error);
    }
};

export default function* stocksSaga() {
    yield takeEvery(FIND_STOCK_PAGE, findStockPageSaga);
    yield takeEvery(SAVE_STOCK, saveStockSaga);
}