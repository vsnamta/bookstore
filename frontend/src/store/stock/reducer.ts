import { createReducer } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { Page } from '../../models/common';
import { StockFindPayload, StockResult } from '../../models/stocks';
import { createStockSaveAction, createStockPageAsyncSetAction, StocksAction } from './action';
import { SAVE_STOCK, SET_STOCK_PAGE_ASYNC } from './actionType';

export interface StockPageAsync {
    payload?: StockFindPayload;
    result?: Page<StockResult>;
    error?: ApiError; 
}

export interface StocksState {
    stockPageAsync: StockPageAsync;
}

const initialState: StocksState = {
    stockPageAsync: {
        payload : undefined,
        result: undefined,
        error: undefined
    },
};

export default createReducer<StocksState, StocksAction>(initialState, {
    [SET_STOCK_PAGE_ASYNC]: (state, { payload: stockPageAsync }: ReturnType<typeof createStockPageAsyncSetAction>) => ({
        stockPageAsync: stockPageAsync
    }),
    [SAVE_STOCK]: (state, { payload: stockPage }: ReturnType<typeof createStockSaveAction>) => ({
        stockPageAsync: stockPage
    })
});