import { createReducer, PayloadAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { Page } from '../../models/common';
import { ProductDetailResult, ProductFindPayload, ProductResult } from '../../models/products';
import { createSaveProductSuccessAction, createUpdateProductSuccessAction, findProductPageAsyncActionCreator, ProductsAction } from './action';
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
    [FIND_PRODUCT_PAGE_SUCCESS]: (state, action) => ({
        ...state,
        productPageAsync: {
            ...state.productPageAsync,
            result: action.payload
        } 
    }),
    [FIND_PRODUCT_PAGE_FAILURE]: (state, action) => ({
        ...state,
        productPageAsync: {
            ...state.productPageAsync,
            error: action.payload
        } 
    }),
    [FIND_PRODUCT_REQUEST]: (state, action) => ({
        ...state,
        productAsync: {
            payload: action.payload,
            result: undefined,
            error: undefined
        }
    }),
    [FIND_PRODUCT_SUCCESS]: (state, action) => ({
        ...state,
        productAsync: {
            ...state.productAsync,
            result: action.payload
        }
    }),
    [FIND_PRODUCT_FAILURE]: (state, action) => ({
        ...state,
        productAsync: {
            ...state.productAsync,
            error: action.payload
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