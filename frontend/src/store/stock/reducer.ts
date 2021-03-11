import { createReducer } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { Page } from '../../models/common';
import { StockFindPayload, StockResult } from '../../models/stocks';
import { StocksAction } from './action';
import { FIND_STOCK_PAGE_FAILURE, FIND_STOCK_PAGE_REQUEST, FIND_STOCK_PAGE_SUCCESS, SAVE_STOCK_SUCCESS } from './actionType';

export interface StocksState {
    stockPageAsync: {
        payload?: StockFindPayload;
        result?: Page<StockResult>;
        error?: ApiError; 
    };
}

const initialState: StocksState = {
    stockPageAsync: {
        payload : undefined,
        result: undefined,
        error: undefined
    },
};

export default createReducer<StocksState, StocksAction>(initialState, {
    [FIND_STOCK_PAGE_REQUEST]: (state, action) => ({
        stockPageAsync: {
            payload: action.payload,
            result: undefined,
            error: undefined
        }
    }),
    [FIND_STOCK_PAGE_SUCCESS]: (state, action) => ({
        stockPageAsync: {
            ...state.stockPageAsync,
            result: action.payload
        } 
    }),
    [FIND_STOCK_PAGE_FAILURE]: (state, action) => ({
        stockPageAsync: {
            ...state.stockPageAsync,
            error: action.payload
        } 
    }),
    [SAVE_STOCK_SUCCESS]: (state, action) => ({
        stockPageAsync: initialState.stockPageAsync
    })
});