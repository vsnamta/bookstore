import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { Page } from '../../models/common';
import { StockFindPayload, StockResult, StockSavePayload } from '../../models/stocks';
import { FIND_STOCK_PAGE, FIND_STOCK_PAGE_FAILURE, FIND_STOCK_PAGE_REQUEST, FIND_STOCK_PAGE_SUCCESS, SAVE_STOCK, SAVE_STOCK_SUCCESS } from './actionType';
import { StockPageAsync } from './reducer';

export interface StockSaveActionPayload { 
    payload: StockSavePayload,
    onSuccess?: (stock: StockResult) => void, 
    onFailure?: (error: ApiError) => void
}

export const createFindStockPageAction = createAction(FIND_STOCK_PAGE)<StockFindPayload>();
export const findStockPageAsyncActionCreator = createAsyncAction(FIND_STOCK_PAGE_REQUEST, FIND_STOCK_PAGE_SUCCESS, FIND_STOCK_PAGE_FAILURE)<StockFindPayload, Page<StockResult>, ApiError>();

export const createSaveStockAction = createAction(SAVE_STOCK)<StockSaveActionPayload>();
export const createSaveStockSuccessAction = createAction(SAVE_STOCK_SUCCESS)<StockPageAsync>();

export const actions = {
    createFindStockPageAction, findStockPageAsyncActionCreator,
    createSaveStockAction, createSaveStockSuccessAction
};

export type StocksAction = ActionType<typeof actions>;