import { ActionType, createAction, createReducer } from 'typesafe-actions';
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
    SAVE_PRODUCT: 'product/SAVE_PRODUCT' as const
};

export const actions = {
    fetchProductPage: createAction(types.FETCH_PRODUCT_PAGE)<ProductFindPayload>(), 
    setAsyncProductPage: createAction(types.SET_ASYNC_PRODUCT_PAGE)<AsyncProductPage>(),
    fetchProduct: createAction(types.FETCH_PRODUCT)<number>(), 
    setAsyncProduct: createAction(types.SET_ASYNC_PRODUCT)<AsyncProduct>(),
    updateProductAsync: createAction(types.UPDATE_PRODUCT_ASYNC)<ProductUpdateAsyncPayload>(), 
    updateProduct: createAction(types.UPDATE_PRODUCT)<ProductDetailResult>(), 
    saveProductAsync: createAction(types.SAVE_PRODUCT_ASYNC)<ProductSaveAsyncPayload>(),
    saveProduct: createAction(types.SAVE_PRODUCT)<ProductDetailResult>()
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
            result: state.asyncProductPage.result
                ? {
                    ...state.asyncProductPage.result,
                    list: state.asyncProductPage.result.list.map(product => 
                        product.id === updatedProduct.id
                            ? updatedProduct
                            : product
                    )
                }
                : undefined
        },
        asyncProduct: {
            ...state.asyncProduct,
            result: updatedProduct
        }
    }),
    [types.SAVE_PRODUCT]: (state, { payload: savedProduct }: ReturnType<typeof actions.saveProduct>) => ({
        ...state,
        asyncProductPage: {
            ...state.asyncProductPage,
            result: state.asyncProductPage.result 
                ? {
                    list: [savedProduct, ...state.asyncProductPage.result.list.slice(0, 9)],
                    totalCount: state.asyncProductPage.result.totalCount + 1
                }
                : undefined
        },
        asyncProduct: {
            payload: savedProduct.id,
            result: savedProduct,
            error: undefined
        }
    })
});

export default reducer;