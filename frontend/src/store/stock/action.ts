import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { Page } from '../../models/common';
import { StockFindPayload, StockResult, StockSavePayload } from '../../models/stocks';
import { FIND_STOCK_PAGE, FIND_STOCK_PAGE_FAILURE, FIND_STOCK_PAGE_REQUEST, FIND_STOCK_PAGE_SUCCESS, SAVE_STOCK, SAVE_STOCK_SUCCESS } from './actionType';

export const findStockPage = createAction(FIND_STOCK_PAGE)<StockFindPayload>();

export const findStockPageAsync = createAsyncAction(
    FIND_STOCK_PAGE_REQUEST,
    FIND_STOCK_PAGE_SUCCESS,
    FIND_STOCK_PAGE_FAILURE
)<StockFindPayload, Page<StockResult>, ApiError>();

export const saveStock = createAction(SAVE_STOCK)<{ 
    payload: StockSavePayload,
    onSuccess?: (stock: StockResult) => void, 
    onFailure?: (error: ApiError) => void
}>();

export const saveStockSuccess = createAction(SAVE_STOCK_SUCCESS)<StockResult>();

export const actions = {
    findStockPage, findStockPageAsync,
    saveStock, saveStockSuccess
};

export type StocksAction = ActionType<typeof actions>;