import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { Page } from '../../models/common';
import { ProductDetailResult, ProductFindPayload, ProductResult, ProductSaveOrUpdatePayload } from '../../models/products';
import { FIND_PRODUCT, FIND_PRODUCT_FAILURE, FIND_PRODUCT_PAGE, FIND_PRODUCT_PAGE_FAILURE, FIND_PRODUCT_PAGE_REQUEST, FIND_PRODUCT_PAGE_SUCCESS, FIND_PRODUCT_REQUEST, FIND_PRODUCT_SUCCESS, SAVE_PRODUCT, SAVE_PRODUCT_SUCCESS, UPDATE_PRODUCT, UPDATE_PRODUCT_SUCCESS } from './actionType';

export const findProductPage = createAction(FIND_PRODUCT_PAGE)<ProductFindPayload>();

export const findProductPageAsync = createAsyncAction(
    FIND_PRODUCT_PAGE_REQUEST,
    FIND_PRODUCT_PAGE_SUCCESS,
    FIND_PRODUCT_PAGE_FAILURE
)<ProductFindPayload, Page<ProductResult>, ApiError>();

export const findProduct = createAction(FIND_PRODUCT)<number>();

export const findProductAsync = createAsyncAction(
    FIND_PRODUCT_REQUEST,
    FIND_PRODUCT_SUCCESS,
    FIND_PRODUCT_FAILURE
)<number, ProductDetailResult, ApiError>();

export const updateProduct = createAction(UPDATE_PRODUCT)<{ 
    id: number, 
    payload: ProductSaveOrUpdatePayload,
    file?: File,
    onSuccess?: (product: ProductDetailResult) => void, 
    onFailure?: (error: ApiError) => void
}>();

export const updateProductSuccess = createAction(UPDATE_PRODUCT_SUCCESS)<ProductDetailResult>();

export const saveProduct = createAction(SAVE_PRODUCT)<{ 
    payload: ProductSaveOrUpdatePayload,
    file: File,
    onSuccess?: (product: ProductDetailResult) => void, 
    onFailure?: (error: ApiError) => void
}>();

export const saveProductSuccess = createAction(SAVE_PRODUCT_SUCCESS)<ProductDetailResult>();

export const actions = { 
    findProductPage, findProductPageAsync,
    findProduct, findProductAsync,
    updateProduct, updateProductSuccess, 
    saveProduct, saveProductSuccess
};

export type ProductsAction = ActionType<typeof actions>;