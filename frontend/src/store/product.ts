import { ActionType, createAction, createReducer } from 'typesafe-actions';
import { ProductDetailResult } from '../models/products';

const INIT_PRODUCT_STATE = 'products/INIT_PRODUCT_STATE';
const SET_PRODUCT_PAYLOAD = 'product/SET_PRODUCT_PAYLOAD';
const SET_PRODUCT_RESULT = 'product/SET_PRODUCT_RESULT';
const SET_PRODUCT_ERROR = 'product/SET_PRODUCT_ERROR';

export const initProductState = createAction(INIT_PRODUCT_STATE)();
export const setProductPayload = createAction(SET_PRODUCT_PAYLOAD)<number>();
export const setProductResult = createAction(SET_PRODUCT_RESULT)<ProductDetailResult | undefined>();
export const setProductError = createAction(SET_PRODUCT_ERROR)<Error | undefined>();

export const actions = { initProductState, setProductPayload, setProductResult, setProductError };

type ProductAction = ActionType<typeof actions>;

export interface ProductState {
    payload?: number;
    result?: ProductDetailResult;
    error?: Error;
}

const initialState: ProductState = {
    payload: undefined,
    result: undefined,
    error: undefined
};

export default createReducer<ProductState, ProductAction>(initialState, {
    [INIT_PRODUCT_STATE]: () => initialState,
    [SET_PRODUCT_PAYLOAD]: (state, action) => ({
        ...state,
        payload: action.payload
    }),
    [SET_PRODUCT_RESULT]: (state, action) => ({
        ...state,
        result: action.payload
    }),
    [SET_PRODUCT_ERROR]: (state, action) => ({
        ...state,
        error: action.payload
    })
});