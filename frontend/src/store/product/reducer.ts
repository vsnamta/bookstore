import { createReducer } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { Page } from '../../models/common';
import { ProductDetailResult, ProductFindPayload, ProductResult } from '../../models/products';
import { createProductSaveAction, createProductAsyncSetAction, createProductPageAsyncSetAction, createProductUpdateAction, ProductsAction } from './action';
import { SAVE_PRODUCT, SET_PRODUCT_ASYNC, SET_PRODUCT_PAGE_ASYNC, UPDATE_PRODUCT } from './actionType';

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
    [SET_PRODUCT_PAGE_ASYNC]: (state, { payload: productPageAsync }: ReturnType<typeof createProductPageAsyncSetAction>) => ({
        ...state,
        productPageAsync: productPageAsync
    }),
    [SET_PRODUCT_ASYNC]: (state, { payload: productAsync }: ReturnType<typeof createProductAsyncSetAction>) => ({
        ...state,
        productAsync: productAsync
    }),
    [UPDATE_PRODUCT]: (state, { payload: updatedProduct }: ReturnType<typeof createProductUpdateAction>) => ({
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
    [SAVE_PRODUCT]: (state, { payload: savedProduct }: ReturnType<typeof createProductSaveAction>) => ({
        productPageAsync: initialState.productPageAsync,
        productAsync: {
            payload: savedProduct.id,
            result: savedProduct,
            error: undefined
        }
    })
});