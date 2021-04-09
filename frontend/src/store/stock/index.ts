import { ActionType, createAction, createReducer } from 'typesafe-actions';
import { StockFindPayload } from '../../models/stock';
import { AsyncStockPage, StockSaveAsyncPayload, StocksState } from '../../models/stock/store';

export const types = {
    FETCH_STOCK_PAGE: 'stock/FETCH_STOCK_PAGE' as const,
    SET_ASYNC_STOCK_PAGE: 'stock/SET_ASYNC_STOCK_PAGE' as const,
    SAVE_STOCK_ASYNC: 'stock/SAVE_STOCK_ASYNC' as const
};

export const actions = {
    fetchStockPage: createAction(types.FETCH_STOCK_PAGE)<StockFindPayload>(), 
    setAsyncStockPage: createAction(types.SET_ASYNC_STOCK_PAGE)<AsyncStockPage>(),
    saveStockAsync: createAction(types.SAVE_STOCK_ASYNC)<StockSaveAsyncPayload>()
};

const initialState: StocksState = {
    asyncStockPage: {
        payload : undefined,
        result: undefined,
        error: undefined
    },
};

const reducer = createReducer<StocksState, ActionType<typeof actions>>(initialState, {
    [types.SET_ASYNC_STOCK_PAGE]: (state, { payload: asyncStockPage }: ReturnType<typeof actions.setAsyncStockPage>) => ({
        asyncStockPage: asyncStockPage
    })
});

export default reducer;