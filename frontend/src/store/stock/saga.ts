import { call, put, select, takeEvery } from 'redux-saga/effects';
import { RootState } from '..';
import stockApi from '../../apis/stockApi';
import { Page } from '../../models/common';
import { StockFindPayload, StockResult } from '../../models/stocks';
import { createStockPageFindAction, createStockSaveAction, createStockSaveRequestAction, createStockPageAsyncSetAction } from './action';
import { FIND_STOCK_PAGE, SAVE_STOCK_REQUEST } from './actionType';
import { StocksState } from './reducer';

function* findStockPageSaga({ payload: stockFindPayload }: ReturnType<typeof createStockPageFindAction>) {
    const stocksState: StocksState = yield select((state: RootState) => state.products);
    
    if(JSON.stringify(stocksState.stockPageAsync.payload) === JSON.stringify(stockFindPayload) 
        && stocksState.stockPageAsync.result !== undefined) {
        return;
    }

    try {
        const stockPage: Page<StockResult> = yield call(stockApi.findAll, stockFindPayload);

        yield put(createStockPageAsyncSetAction({
            payload: stockFindPayload,
            result: stockPage,
            error: undefined
        }));
    } catch (error) {
        yield put(createStockPageAsyncSetAction({
            payload: stockFindPayload,
            result: undefined,
            error: error
        }));
    }
};

function* saveStockRequestSaga({ payload: stockSaveRequestActionPayload }: ReturnType<typeof createStockSaveRequestAction>) {
    try {
        const stock: StockResult = yield call(stockApi.save, stockSaveRequestActionPayload.payload);

        const stockFindPayload: StockFindPayload = {
            productId: stockSaveRequestActionPayload.payload.productId,
            pageCriteria: { page: 1, size: 10 }
        };

        const stockPage: Page<StockResult> = yield call(stockApi.findAll, stockFindPayload);

        yield put(createStockSaveAction({
            payload: stockFindPayload,
            result: stockPage,
            error: undefined
        }));  
        stockSaveRequestActionPayload.onSuccess && stockSaveRequestActionPayload.onSuccess(stock);
    } catch (error) {
        stockSaveRequestActionPayload.onFailure && stockSaveRequestActionPayload.onFailure(error);
    }
};

export default function* stocksSaga() {
    yield takeEvery(FIND_STOCK_PAGE, findStockPageSaga);
    yield takeEvery(SAVE_STOCK_REQUEST, saveStockRequestSaga);
}