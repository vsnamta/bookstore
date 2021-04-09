import { ProductDetailResult, ProductFindPayload, ProductResult, ProductSaveOrUpdatePayload } from ".";
import { ApiError } from "../../error/ApiError";
import { Page } from "../common";

export interface ProductsState {
    asyncProductPage: AsyncProductPage;
    asyncProduct: AsyncProduct;
}

export interface AsyncProductPage {
    payload?: ProductFindPayload;
    result?: Page<ProductResult>;
    error?: ApiError; 
}

export interface AsyncProduct {
    payload?: number;
    result?: ProductDetailResult;
    error?: ApiError;
}

export interface ProductUpdateAsyncPayload { 
    id: number, 
    payload: ProductSaveOrUpdatePayload,
    file?: File,
    onSuccess?: (product: ProductDetailResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface ProductSaveAsyncPayload { 
    payload: ProductSaveOrUpdatePayload,
    file: File,
    onSuccess?: (product: ProductDetailResult) => void, 
    onFailure?: (error: ApiError) => void
}