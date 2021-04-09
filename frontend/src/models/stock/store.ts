import { StockFindPayload, StockResult, StockSavePayload } from ".";
import { ApiError } from "../../error/ApiError";
import { Page } from "../common";

export interface StocksState {
    asyncStockPage: AsyncStockPage;
}

export interface AsyncStockPage {
    payload?: StockFindPayload;
    result?: Page<StockResult>;
    error?: ApiError; 
}

export interface StockSaveAsyncPayload {
    payload: StockSavePayload,
    onSuccess?: (stock: StockResult) => void, 
    onFailure?: (error: ApiError) => void
}