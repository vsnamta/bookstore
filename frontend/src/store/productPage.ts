import { ActionType, createAction, createReducer } from 'typesafe-actions';
import { ApiError } from '../error/ApiError';
import { Page } from '../models/common';
import { ProductFindPayload, ProductResult } from '../models/products';

const INIT_PRODUCT_PAGE_STATE = 'products/INIT_PRODUCT_PAGE_STATE';
const SET_PRODUCT_PAGE_PAYLOAD = 'products/SET_PRODUCT_PAGE_PAYLOAD';
const SET_PRODUCT_PAGE = 'products/SET_PRODUCT_PAGE';
const SET_PRODUCT_PAGE_ERROR = 'products/SET_PRODUCT_PAGE_ERROR';

export const initProductPageState = createAction(INIT_PRODUCT_PAGE_STATE)();
export const setProductPagePayload = createAction(SET_PRODUCT_PAGE_PAYLOAD)<ProductFindPayload>();
export const setProductPage = createAction(SET_PRODUCT_PAGE)<Page<ProductResult> | undefined>();
export const setProductPageError = createAction(SET_PRODUCT_PAGE_ERROR)<ApiError | undefined>();

export const actions = { initProductPageState, setProductPagePayload, setProductPage, setProductPageError };

type ProductPageAction = ActionType<typeof actions>;

export interface ProductPageState {
    payload?: ProductFindPayload;
    result?: Page<ProductResult>;
    error?: ApiError;
}

const initialState: ProductPageState = {
    payload : undefined,
    result: undefined,
    error: undefined
};

export default createReducer<ProductPageState, ProductPageAction>(initialState, {
    [INIT_PRODUCT_PAGE_STATE]: () => initialState,
    [SET_PRODUCT_PAGE_PAYLOAD]: (state, action) => ({
        ...state,
        payload: action.payload
    }),
    [SET_PRODUCT_PAGE]: (state, action) => ({
        ...state,
        result: action.payload
    }),
    [SET_PRODUCT_PAGE_ERROR]: (state, action) => ({
        ...state,
        error: action.payload
    })
});