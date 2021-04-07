import { ActionType, createAction, createReducer } from 'typesafe-actions';
import { StockFindPayload } from '../../models/stock';
import { StockPageAsync, StockSaveAsyncPayload, StocksState } from '../../models/stock/store';

export const types = {
    FETCH_STOCK_PAGE: 'stock/FETCH_STOCK_PAGE' as const,
    SET_STOCK_PAGE_ASYNC: 'stock/SET_STOCK_PAGE_ASYNC' as const,
    SAVE_STOCK_ASYNC: 'stock/SAVE_STOCK_ASYNC' as const
};

export const actions = {
    fetchStockPage: createAction(types.FETCH_STOCK_PAGE)<StockFindPayload>(), 
    setStockPageAsync: createAction(types.SET_STOCK_PAGE_ASYNC)<StockPageAsync>(),
    saveStockAsync: createAction(types.SAVE_STOCK_ASYNC)<StockSaveAsyncPayload>()
};

const initialState: StocksState = {
    stockPageAsync: {
        payload : undefined,
        result: undefined,
        error: undefined
    },
};

const reducer = createReducer<StocksState, ActionType<typeof actions>>(initialState, {
    [types.SET_STOCK_PAGE_ASYNC]: (state, { payload: stockPageAsync }: ReturnType<typeof actions.setStockPageAsync>) => ({
        stockPageAsync: stockPageAsync
    })
});

export default reducer;