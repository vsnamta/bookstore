import { ActionType, createAction, createReducer } from 'typesafe-actions';
import { Page } from '../../models/common';
import { ProductDetailResult, ProductFindPayload, ProductResult } from '../../models/product';
import { ProductAsync, ProductPageAsync, ProductSaveAsyncPayload, ProductsState, ProductUpdateAsyncPayload } from '../../models/product/store';

export const types = {
    SET_PRODUCTS_STATE: 'product/SET_PRODUCTS_STATE' as const,
    FETCH_PRODUCT_PAGE: 'product/FETCH_PRODUCT_PAGE' as const,
    SET_PRODUCT_PAGE_ASYNC: 'product/SET_PRODUCT_PAGE_ASYNC' as const,
    FETCH_PRODUCT: 'product/FETCH_PRODUCT' as const,
    SET_PRODUCT_ASYNC: 'product/SET_PRODUCT_ASYNC' as const,
    UPDATE_PRODUCT_ASYNC: 'product/UPDATE_PRODUCT_ASYNC' as const,
    UPDATE_PRODUCT: 'product/UPDATE_PRODUCT' as const,
    SAVE_PRODUCT_ASYNC: 'product/SAVE_PRODUCT_ASYNC' as const
};

export const actions = {
    setProductsState: createAction(types.SET_PRODUCTS_STATE)<ProductsState>(), 
    fetchProductPage: createAction(types.FETCH_PRODUCT_PAGE)<ProductFindPayload>(), 
    setProductPageAsync: createAction(types.SET_PRODUCT_PAGE_ASYNC)<ProductPageAsync>(),
    fetchProduct: createAction(types.FETCH_PRODUCT)<number>(), 
    setProductAsync: createAction(types.SET_PRODUCT_ASYNC)<ProductAsync>(),
    updateProductAsync: createAction(types.UPDATE_PRODUCT_ASYNC)<ProductUpdateAsyncPayload>(), 
    updateProduct: createAction(types.UPDATE_PRODUCT)<ProductDetailResult>(), 
    saveProductAsync: createAction(types.SAVE_PRODUCT_ASYNC)<ProductSaveAsyncPayload>()
};

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

const reducer = createReducer<ProductsState, ActionType<typeof actions>>(initialState, {
    [types.SET_PRODUCTS_STATE]: (state, { payload: productsState }: ReturnType<typeof actions.setProductsState>) => (
        productsState
    ),
    [types.SET_PRODUCT_PAGE_ASYNC]: (state, { payload: productPageAsync }: ReturnType<typeof actions.setProductPageAsync>) => ({
        ...state,
        productPageAsync: productPageAsync
    }),
    [types.SET_PRODUCT_ASYNC]: (state, { payload: productAsync }: ReturnType<typeof actions.setProductAsync>) => ({
        ...state,
        productAsync: productAsync
    }),
    [types.UPDATE_PRODUCT]: (state, { payload: updatedProduct }: ReturnType<typeof actions.updateProduct>) => ({
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
    })
});

export default reducer;