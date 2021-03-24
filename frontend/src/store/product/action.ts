import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { Page } from '../../models/common';
import { ProductDetailResult, ProductFindPayload, ProductResult, ProductSaveOrUpdatePayload } from '../../models/products';
import { FIND_PRODUCT, FIND_PRODUCT_FAILURE, FIND_PRODUCT_PAGE, FIND_PRODUCT_PAGE_FAILURE, FIND_PRODUCT_PAGE_REQUEST, FIND_PRODUCT_PAGE_SUCCESS, FIND_PRODUCT_REQUEST, FIND_PRODUCT_SUCCESS, SAVE_PRODUCT, SAVE_PRODUCT_SUCCESS, UPDATE_PRODUCT, UPDATE_PRODUCT_SUCCESS } from './actionType';

export interface ProductUpdateActionPayload { 
    id: number, 
    payload: ProductSaveOrUpdatePayload,
    file?: File,
    onSuccess?: (product: ProductDetailResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface ProductSaveActionPayload { 
    payload: ProductSaveOrUpdatePayload,
    file: File,
    onSuccess?: (product: ProductDetailResult) => void, 
    onFailure?: (error: ApiError) => void
}

export const createFindProductPageAction = createAction(FIND_PRODUCT_PAGE)<ProductFindPayload>();
export const findProductPageAsyncActionCreator = createAsyncAction(FIND_PRODUCT_PAGE_REQUEST, FIND_PRODUCT_PAGE_SUCCESS, FIND_PRODUCT_PAGE_FAILURE)<ProductFindPayload, Page<ProductResult>, ApiError>();

export const createFindProductAction = createAction(FIND_PRODUCT)<number>();
export const findProductAsyncActionCreator = createAsyncAction(FIND_PRODUCT_REQUEST, FIND_PRODUCT_SUCCESS, FIND_PRODUCT_FAILURE)<number, ProductDetailResult, ApiError>();

export const createUpdateProductAction = createAction(UPDATE_PRODUCT)<ProductUpdateActionPayload>();
export const createUpdateProductSuccessAction = createAction(UPDATE_PRODUCT_SUCCESS)<ProductDetailResult>();

export const createSaveProductAction = createAction(SAVE_PRODUCT)<ProductSaveActionPayload>();
export const createSaveProductSuccessAction = createAction(SAVE_PRODUCT_SUCCESS)<ProductDetailResult>();

export const actions = { 
    createFindProductPageAction, findProductPageAsyncActionCreator,
    createFindProductAction, findProductAsyncActionCreator,
    createUpdateProductAction, createUpdateProductSuccessAction, 
    createSaveProductAction, createSaveProductSuccessAction
};

export type ProductsAction = ActionType<typeof actions>;