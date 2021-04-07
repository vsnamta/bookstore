import { OrderDetailResult, OrderResult, OrderSavePayload, OrderUpdatePayload } from ".";
import { ApiError } from "../../error/ApiError";
import { FindPayload, Page } from "../common";

export interface OrdersState {
    orderPageAsync: OrderPageAsync;
    orderAsync: OrderAsync;
}

export interface OrderPageAsync {
    payload?: FindPayload;
    result?: Page<OrderResult>;
    error?: ApiError; 
}

export interface OrderAsync {
    payload?: number;
    result?: OrderDetailResult;
    error?: ApiError;
}

export interface OrderUpdateAsyncPayload { 
    id: number, 
    payload: OrderUpdatePayload,
    onSuccess?: (order: OrderDetailResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface OrderSaveAsyncPayload { 
    payload: OrderSavePayload,
    onSuccess?: (order: OrderDetailResult) => void, 
    onFailure?: (error: ApiError) => void
}