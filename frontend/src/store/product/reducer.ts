import { createReducer, PayloadAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { Page } from '../../models/common';
import { ProductDetailResult, ProductFindPayload, ProductResult } from '../../models/products';
import { createSaveProductSuccessAction, createUpdateProductSuccessAction, findProductAsyncActionCreator, findProductPageAsyncActionCreator, ProductsAction } from './action';
import { FIND_PRODUCT_FAILURE, FIND_PRODUCT_PAGE_FAILURE, FIND_PRODUCT_PAGE_REQUEST, FIND_PRODUCT_PAGE_SUCCESS, FIND_PRODUCT_REQUEST, FIND_PRODUCT_SUCCESS, SAVE_PRODUCT_SUCCESS, UPDATE_PRODUCT_SUCCESS } from './actionType';

export interface ProductPageAsync {
    payload?: ProductFindPayload;
    result?: Page<ProductResult>;
    error?: ApiError; 
}

export interface ProductAsync {
    payload?: number;
    result?: ProductDetailResult;
    error?: ApiError;
}

export interface ProductsState {
    productPageAsync: ProductPageAsync;
    productAsync: ProductAsync;
}

const initialState: ProductsState = {
    productPageAsync: {
        payload : undefined,
        result: undefined,
        error: undefined
    },
    productAsync: {
        payload: undefined,
        result: undefined,
        error: undefined
    }
};

export default createReducer<ProductsState, ProductsAction>(initialState, {
    [FIND_PRODUCT_PAGE_REQUEST]: (state, { payload: productFindPayload }: ReturnType<typeof findProductPageAsyncActionCreator.request>) => ({
        ...state,
        productPageAsync: {
            payload: productFindPayload,
            result: undefined,
            error: undefined
        }
    }),
    [FIND_PRODUCT_PAGE_SUCCESS]: (state, { payload: productPage }: ReturnType<typeof findProductPageAsyncActionCreator.success>) => ({
        ...state,
        productPageAsync: {
            ...state.productPageAsync,
            result: productPage
        } 
    }),
    [FIND_PRODUCT_PAGE_FAILURE]: (state, { payload: error }: ReturnType<typeof findProductPageAsyncActionCreator.failure>) => ({
        ...state,
        productPageAsync: {
            ...state.productPageAsync,
            error: error
        } 
    }),
    [FIND_PRODUCT_REQUEST]: (state, { payload: id }: ReturnType<typeof findProductAsyncActionCreator.request>) => ({
        ...state,
        productAsync: {
            payload: id,
            result: undefined,
            error: undefined
        }
    }),
    [FIND_PRODUCT_SUCCESS]: (state, { payload: product }: ReturnType<typeof findProductAsyncActionCreator.success>) => ({
        ...state,
        productAsync: {
            ...state.productAsync,
            result: product
        }
    }),
    [FIND_PRODUCT_FAILURE]: (state, { payload: error }: ReturnType<typeof findProductAsyncActionCreator.failure>) => ({
        ...state,
        productAsync: {
            ...state.productAsync,
            error: error
        }
    }),
    [UPDATE_PRODUCT_SUCCESS]: (state, { payload: updatedProduct }: ReturnType<typeof createUpdateProductSuccessAction>) => ({
        productPageAsync: {
            ...state.productPageAsync,
            result: {
                ...state.productPageAsync.result as Page<ProductResult>,
                list: (state.productPageAsync.result as Page<ProductResult>).list
                    .map(product => 
                        product.id === updatedProduct.id
                            ? updatedProduct
                            : product
                    )
            }
        },
        productAsync: {
            ...state.productAsync,
            result: updatedProduct
        }
    }),
    [SAVE_PRODUCT_SUCCESS]: (state, { payload: savedProduct }: ReturnType<typeof createSaveProductSuccessAction>) => ({
        productPageAsync: initialState.productPageAsync,
        productAsync: {
            payload: savedProduct.id,
            result: savedProduct,
            error: undefined
        }
    })
});