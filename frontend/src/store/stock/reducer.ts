import { createReducer } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { Page } from '../../models/common';
import { StockFindPayload, StockResult } from '../../models/stocks';
import { createSaveReviewSuccessAction } from '../review/action';
import { createSaveStockSuccessAction, findStockPageAsyncActionCreator, StocksAction } from './action';
import { FIND_STOCK_PAGE_FAILURE, FIND_STOCK_PAGE_REQUEST, FIND_STOCK_PAGE_SUCCESS, SAVE_STOCK_SUCCESS } from './actionType';

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
    [FIND_STOCK_PAGE_REQUEST]: (state, { payload: stockFindPayload }: ReturnType<typeof findStockPageAsyncActionCreator.request>) => ({
        stockPageAsync: {
            payload: stockFindPayload,
            result: undefined,
            error: undefined
        }
    }),
    [FIND_STOCK_PAGE_SUCCESS]: (state, { payload: stockPage }: ReturnType<typeof findStockPageAsyncActionCreator.success>) => ({
        stockPageAsync: {
            ...state.stockPageAsync,
            result: stockPage
        } 
    }),
    [FIND_STOCK_PAGE_FAILURE]: (state, { payload: error }: ReturnType<typeof findStockPageAsyncActionCreator.failure>) => ({
        stockPageAsync: {
            ...state.stockPageAsync,
            error: error
        } 
    }),
    [SAVE_STOCK_SUCCESS]: (state, { payload: stockPage }: ReturnType<typeof createSaveStockSuccessAction>) => ({
        stockPageAsync: stockPage
    })
});