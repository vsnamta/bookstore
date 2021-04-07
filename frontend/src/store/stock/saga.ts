import { call, put, select, takeEvery } from 'redux-saga/effects';
import { RootState } from '..';
import stockApi from '../../apis/stockApi';
import { Page } from '../../models/common';
import { StockFindPayload, StockResult } from '../../models/stock';
import { types, actions } from '.';
import { StocksState } from '../../models/stock/store';

function* findStockPageSaga({ payload: stockFindPayload }: ReturnType<typeof actions.fetchStockPage>) {
    const stocksState: StocksState = yield select((state: RootState) => state.products);
    
    if(JSON.stringify(stocksState.stockPageAsync.payload) === JSON.stringify(stockFindPayload) 
        && stocksState.stockPageAsync.result !== undefined) {
        return;
    }

    try {
        const stockPage: Page<StockResult> = yield call(stockApi.findAll, stockFindPayload);

        yield put(actions.setStockPageAsync({
            payload: stockFindPayload,
            result: stockPage,
            error: undefined
        }));
    } catch (error) {
        yield put(actions.setStockPageAsync({
            payload: stockFindPayload,
            result: undefined,
            error: error
        }));
    }
};

function* saveStockAsyncSaga({ payload: stockSaveAsyncPayload }: ReturnType<typeof actions.saveStockAsync>) {
    try {
        const stock: StockResult = yield call(stockApi.save, stockSaveAsyncPayload.payload);

        const stockFindPayload: StockFindPayload = {
            productId: stockSaveAsyncPayload.payload.productId,
            pageCriteria: { page: 1, size: 10 }
        };

        const stockPage: Page<StockResult> = yield call(stockApi.findAll, stockFindPayload);

        yield put(actions.setStockPageAsync({
            payload: stockFindPayload,
            result: stockPage,
            error: undefined
        }));  
        stockSaveAsyncPayload.onSuccess && stockSaveAsyncPayload.onSuccess(stock);
    } catch (error) {
        stockSaveAsyncPayload.onFailure && stockSaveAsyncPayload.onFailure(error);
    }
};

export default function* stocksSaga() {
    yield takeEvery(types.FETCH_STOCK_PAGE, findStockPageSaga);
    yield takeEvery(types.SAVE_STOCK_ASYNC, saveStockAsyncSaga);
}