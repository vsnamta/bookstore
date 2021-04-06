import { ActionType, createAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { ProductDetailResult, ProductFindPayload, ProductSaveOrUpdatePayload } from '../../models/products';
import { FIND_PRODUCT, FIND_PRODUCT_PAGE, SAVE_PRODUCT, SAVE_PRODUCT_REQUEST, SET_PRODUCT_ASYNC, SET_PRODUCT_PAGE_ASYNC, UPDATE_PRODUCT, UPDATE_PRODUCT_REQUEST } from './actionType';
import { ProductAsync, ProductPageAsync } from './reducer';

export interface ProductUpdateRequestActionPayload { 
    id: number, 
    payload: ProductSaveOrUpdatePayload,
    file?: File,
    onSuccess?: (product: ProductDetailResult) => void, 
    onFailure?: (error: ApiError) => void
}

export interface ProductSaveRequestActionPayload { 
    payload: ProductSaveOrUpdatePayload,
    file: File,
    onSuccess?: (product: ProductDetailResult) => void, 
    onFailure?: (error: ApiError) => void
}

export const createProductPageFindAction = createAction(FIND_PRODUCT_PAGE)<ProductFindPayload>();
export const createProductPageAsyncSetAction = createAction(SET_PRODUCT_PAGE_ASYNC)<ProductPageAsync>();

export const createProductFindAction = createAction(FIND_PRODUCT)<number>();
export const createProductAsyncSetAction = createAction(SET_PRODUCT_ASYNC)<ProductAsync>();

export const createProductUpdateRequestAction = createAction(UPDATE_PRODUCT_REQUEST)<ProductUpdateRequestActionPayload>();
export const createProductUpdateAction = createAction(UPDATE_PRODUCT)<ProductDetailResult>();

export const createProductSaveRequestAction = createAction(SAVE_PRODUCT_REQUEST)<ProductSaveRequestActionPayload>();
export const createProductSaveAction = createAction(SAVE_PRODUCT)<ProductDetailResult>();

export const actions = { 
    createProductPageFindAction, createProductPageAsyncSetAction,
    createProductFindAction, createProductAsyncSetAction,
    createProductUpdateRequestAction, createProductUpdateAction, 
    createProductSaveRequestAction, createProductSaveAction
};

export type ProductsAction = ActionType<typeof actions>;