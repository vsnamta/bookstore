import { ActionType, createAction, createReducer } from 'typesafe-actions';
import { Page } from '../../models/common';
import { ProductDetailResult, ProductFindPayload, ProductResult } from '../../models/product';
import { AsyncProduct, AsyncProductPage, ProductSaveAsyncPayload, ProductsState, ProductUpdateAsyncPayload } from '../../models/product/store';

export const types = {
    FETCH_PRODUCT_PAGE: 'product/FETCH_PRODUCT_PAGE' as const,
    SET_ASYNC_PRODUCT_PAGE: 'product/SET_ASYNC_PRODUCT_PAGE' as const,
    FETCH_PRODUCT: 'product/FETCH_PRODUCT' as const,
    SET_ASYNC_PRODUCT: 'product/SET_ASYNC_PRODUCT' as const,
    UPDATE_PRODUCT_ASYNC: 'product/UPDATE_PRODUCT_ASYNC' as const,
    UPDATE_PRODUCT: 'product/UPDATE_PRODUCT' as const,
    SAVE_PRODUCT_ASYNC: 'product/SAVE_PRODUCT_ASYNC' as const,
    SET_PRODUCTS_STATE: 'product/SET_PRODUCTS_STATE' as const
};

export const actions = {
    fetchProductPage: createAction(types.FETCH_PRODUCT_PAGE)<ProductFindPayload>(), 
    setAsyncProductPage: createAction(types.SET_ASYNC_PRODUCT_PAGE)<AsyncProductPage>(),
    fetchProduct: createAction(types.FETCH_PRODUCT)<number>(), 
    setAsyncProduct: createAction(types.SET_ASYNC_PRODUCT)<AsyncProduct>(),
    updateProductAsync: createAction(types.UPDATE_PRODUCT_ASYNC)<ProductUpdateAsyncPayload>(), 
    updateProduct: createAction(types.UPDATE_PRODUCT)<ProductDetailResult>(), 
    saveProductAsync: createAction(types.SAVE_PRODUCT_ASYNC)<ProductSaveAsyncPayload>(),
    setProductsState: createAction(types.SET_PRODUCTS_STATE)<ProductsState>(), 
};

const initialState: ProductsState = {
    asyncProductPage: {
        payload : undefined,
        result: undefined,
        error: undefined
    },
    asyncProduct: {
        payload: undefined,
        result: undefined,
        error: undefined
    }
};

const reducer = createReducer<ProductsState, ActionType<typeof actions>>(initialState, {
    [types.SET_ASYNC_PRODUCT_PAGE]: (state, { payload: asyncProductPage }: ReturnType<typeof actions.setAsyncProductPage>) => ({
        ...state,
        asyncProductPage: asyncProductPage
    }),
    [types.SET_ASYNC_PRODUCT]: (state, { payload: asyncProduct }: ReturnType<typeof actions.setAsyncProduct>) => ({
        ...state,
        asyncProduct: asyncProduct
    }),
    [types.UPDATE_PRODUCT]: (state, { payload: updatedProduct }: ReturnType<typeof actions.updateProduct>) => ({
        asyncProductPage: {
            ...state.asyncProductPage,
            result: {
                ...state.asyncProductPage.result as Page<ProductResult>,
                list: (state.asyncProductPage.result as Page<ProductResult>).list
                    .map(product => 
                        product.id === updatedProduct.id
                            ? updatedProduct
                            : product
                    )
            }
        },
        asyncProduct: {
            ...state.asyncProduct,
            result: updatedProduct
        }
    }),
    [types.SET_PRODUCTS_STATE]: (state, { payload: productsState }: ReturnType<typeof actions.setProductsState>) => (
        productsState
    )
});

export default reducer;