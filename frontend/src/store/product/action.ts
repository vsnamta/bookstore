import { ActionType, createAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { ProductDetailResult, ProductFindPayload, ProductSaveOrUpdatePayload } from '../../models/products';
import { FIND_PRODUCT, FIND_PRODUCT_PAGE, SAVE_PRODUCT, SAVE_PRODUCT_REQUEST, SET_PRODUCT_ASYNC, SET_PRODUCT_PAGE_ASYNC, UPDATE_PRODUCT, UPDATE_PRODUCT_REQUEST } from './actionType';
import { ProductAsync, ProductPageAsync } from './reducer';

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
export const createSetProductPageAsyncAction = createAction(SET_PRODUCT_PAGE_ASYNC)<ProductPageAsync>();

export const createFindProductAction = createAction(FIND_PRODUCT)<number>();
export const createSetProductAsyncAction = createAction(SET_PRODUCT_ASYNC)<ProductAsync>();

export const createUpdateProductRequestAction = createAction(UPDATE_PRODUCT_REQUEST)<ProductUpdateActionPayload>();
export const createUpdateProductAction = createAction(UPDATE_PRODUCT)<ProductDetailResult>();

export const createSaveProductRequestAction = createAction(SAVE_PRODUCT_REQUEST)<ProductSaveActionPayload>();
export const createSaveProductAction = createAction(SAVE_PRODUCT)<ProductDetailResult>();

export const actions = { 
    createFindProductPageAction, createSetProductPageAsyncAction,
    createFindProductAction, createSetProductAsyncAction,
    createUpdateProductRequestAction, createUpdateProductAction, 
    createSaveProductRequestAction, createSaveProductAction
};

export type ProductsAction = ActionType<typeof actions>;