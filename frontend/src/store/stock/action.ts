import { ActionType, createAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { StockFindPayload, StockResult, StockSavePayload } from '../../models/stocks';
import { FIND_STOCK_PAGE, SAVE_STOCK, SAVE_STOCK_REQUEST, SET_STOCK_PAGE_ASYNC } from './actionType';
import { StockPageAsync } from './reducer';

export interface StockSaveRequestActionPayload { 
    payload: StockSavePayload,
    onSuccess?: (stock: StockResult) => void, 
    onFailure?: (error: ApiError) => void
}

export const createStockPageFindAction = createAction(FIND_STOCK_PAGE)<StockFindPayload>();
export const createStockPageAsyncSetAction = createAction(SET_STOCK_PAGE_ASYNC)<StockPageAsync>();

export const createStockSaveRequestAction = createAction(SAVE_STOCK_REQUEST)<StockSaveRequestActionPayload>();
export const createStockSaveAction = createAction(SAVE_STOCK)<StockPageAsync>();

export const actions = {
    createStockPageFindAction, createStockPageAsyncSetAction,
    createStockSaveRequestAction, createStockSaveAction
};

export type StocksAction = ActionType<typeof actions>;