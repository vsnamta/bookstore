import { call, put, takeEvery } from 'redux-saga/effects';
import stockApi from '../../apis/stockApi';
import { Page } from '../../models/common';
import { StockFindPayload, StockResult } from '../../models/stocks';
import { createFindStockPageAction, createSaveStockAction, createSaveStockSuccessAction, findStockPageAsyncActionCreator } from './action';
import { FIND_STOCK_PAGE, SAVE_STOCK } from './actionType';

function* findStockPageSaga({ payload: stockFindPayload }: ReturnType<typeof createFindStockPageAction>) {
    yield put(findStockPageAsyncActionCreator.request(stockFindPayload));

    try {
        const stockPage: Page<StockResult> = yield call(stockApi.findAll, stockFindPayload);

        yield put(findStockPageAsyncActionCreator.success(stockPage));
    } catch (error) {
        yield put(findStockPageAsyncActionCreator.failure(error));
    }
};

function* saveStockSaga({ payload: stockSaveActionPayload }: ReturnType<typeof createSaveStockAction>) {
    try {
        const stock: StockResult = yield call(stockApi.save, stockSaveActionPayload.payload);

        const stockFindPayload: StockFindPayload = {
            productId: stockSaveActionPayload.payload.productId,
            pageCriteria: { page: 1, size: 10 }
        };

        const stockPage: Page<StockResult> = yield call(stockApi.findAll, stockFindPayload);

        yield put(createSaveStockSuccessAction({
            payload: stockFindPayload,
            result: stockPage,
            error: undefined
        }));  
        stockSaveActionPayload.onSuccess && stockSaveActionPayload.onSuccess(stock);
    } catch (error) {
        stockSaveActionPayload.onFailure && stockSaveActionPayload.onFailure(error);
    }
};

export default function* stocksSaga() {
    yield takeEvery(FIND_STOCK_PAGE, findStockPageSaga);
    yield takeEvery(SAVE_STOCK, saveStockSaga);
}