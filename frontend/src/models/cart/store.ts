import { CartFindPayload, CartResult, CartSavePayload, CartUpdatePayload } from ".";
import { ApiError } from "../../error/ApiError";

export interface CartsState {
    asyncCartList: AsyncCartList;
}

export interface AsyncCartList {
    payload?: CartFindPayload;
    result?: CartResult[];
    error?: ApiError;
}

export interface CartCheckPayload { 
    id: number,
    checked: boolean
}

export interface CartUpdateAsyncPayload { 
    id: number, 
    payload: CartUpdatePayload,
    onSuccess?: (cart: CartResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface CartRemoveAsyncPayload { 
    ids: number[],
    onSuccess?: () => void,
    onFailure?: (error: ApiError) => void
}

export interface CartSaveAsyncPayload { 
    payload: CartSavePayload,
    onSuccess?: (cart: CartResult) => void, 
    onFailure?: (error: ApiError) => void
}