import { call, put, select, takeEvery } from 'redux-saga/effects';
import { actions, types } from '.';
import { RootState } from '..';
import stockApi from '../../apis/stockApi';
import { Page } from '../../models/common';
import { StockFindPayload, StockResult } from '../../models/stock';
import { AsyncStockPage } from '../../models/stock/store';

function* fetchStockPageSaga({ payload: stockFindPayload }: ReturnType<typeof actions.fetchStockPage>) {
    const asyncStockPage: AsyncStockPage = yield select((state: RootState) => state.stocks.asyncStockPage);
    
    if(asyncStockPage.result !== undefined 
        && JSON.stringify(asyncStockPage.payload) === JSON.stringify(stockFindPayload)) {
        return;
    }

    try {
        const stockPage: Page<StockResult> = yield call(stockApi.findAll, stockFindPayload);

        yield put(actions.setAsyncStockPage({
            payload: stockFindPayload,
            result: stockPage,
            error: undefined
        }));
    } catch (error) {
        yield put(actions.setAsyncStockPage({
            payload: stockFindPayload,
            result: undefined,
            error: error
        }));
    }
};

function* saveStockAsyncSaga({ payload: stockSaveAsyncPayload }: ReturnType<typeof actions.saveStockAsync>) {
    try {
        const stock: StockResult = yield call(stockApi.save, stockSaveAsyncPayload.payload);

        const currentStockFindPayload: StockFindPayload = yield select((state: RootState) => state.stocks.asyncStockPage.payload);

        const stockFindPayload: StockFindPayload = {
            productId: stockSaveAsyncPayload.payload.productId,
            pageCriteria: { page: 1, size: 10 }
        };

        if(JSON.stringify(currentStockFindPayload) === JSON.stringify(stockFindPayload)) {
            yield put(actions.saveStock(stock));
        } else {
            const stockPage: Page<StockResult> = yield call(stockApi.findAll, stockFindPayload);

            yield put(actions.setAsyncStockPage({
                payload: stockFindPayload,
                result: stockPage,
                error: undefined
            }));
        }

        stockSaveAsyncPayload.onSuccess?.(stock);
    } catch (error) {
        stockSaveAsyncPayload.onFailure?.(error);
    }
};

export default function* stocksSaga() {
    yield takeEvery(types.FETCH_STOCK_PAGE, fetchStockPageSaga);
    yield takeEvery(types.SAVE_STOCK_ASYNC, saveStockAsyncSaga);
}