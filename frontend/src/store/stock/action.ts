import { ActionType, createAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { StockFindPayload, StockResult, StockSavePayload } from '../../models/stocks';
import { FIND_STOCK_PAGE, SAVE_STOCK, SAVE_STOCK_REQUEST, SET_STOCK_PAGE_ASYNC } from './actionType';
import { StockPageAsync } from './reducer';

export interface StockSaveActionPayload { 
    payload: StockSavePayload,
    onSuccess?: (stock: StockResult) => void, 
    onFailure?: (error: ApiError) => void
}

export const createFindStockPageAction = createAction(FIND_STOCK_PAGE)<StockFindPayload>();
export const createSetStockPageAsyncAction = createAction(SET_STOCK_PAGE_ASYNC)<StockPageAsync>();

export const createSaveStockRequestAction = createAction(SAVE_STOCK_REQUEST)<StockSaveActionPayload>();
export const createSaveStockAction = createAction(SAVE_STOCK)<StockPageAsync>();

export const actions = {
    createFindStockPageAction, createSetStockPageAsyncAction,
    createSaveStockRequestAction, createSaveStockAction
};

export type StocksAction = ActionType<typeof actions>;