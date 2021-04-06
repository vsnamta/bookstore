import { createReducer, PayloadAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { CartResult } from '../../models/carts';
import { findCartListAsyncActionCreator, CartsAction, createCheckCartAction, createSaveCartSuccessAction, createUpdateCartSuccessAction, createRemoveCartSuccessAction, createCheckAllCartAction } from './action';
import { CHECK_ALL_CART, CHECK_CART, FIND_CART_LIST_FAILURE, FIND_CART_LIST_REQUEST, FIND_CART_LIST_SUCCESS, REMOVE_CART_SUCCESS, SAVE_CART_SUCCESS, UPDATE_CART_SUCCESS } from './actionType';

export interface CartListAsync {
    result?: CartResult[];
    error?: ApiError;
}

export interface CartsState {
    cartListAsync: CartListAsync;
}

const initialState: CartsState = {
    cartListAsync: {
        result: undefined,
        error: undefined
    }
};

export default createReducer<CartsState, CartsAction>(initialState, {
    [FIND_CART_LIST_REQUEST]: (state, action) => ({
        cartListAsync: {
            result: undefined,
            error: undefined
        }
    }),
    [FIND_CART_LIST_SUCCESS]: (state, { payload: cartList }: ReturnType<typeof findCartListAsyncActionCreator.success>) => ({
        cartListAsync: {
            ...state.cartListAsync,
            result: cartList.map(cart => ({ ...cart, checked: true }))
        } 
    }),
    [FIND_CART_LIST_FAILURE]: (state, { payload: error }: ReturnType<typeof findCartListAsyncActionCreator.failure>) => ({
        cartListAsync: {
            ...state.cartListAsync,
            error: error
        } 
    }),
    [UPDATE_CART_SUCCESS]: (state, { payload: updatedCart }: ReturnType<typeof createUpdateCartSuccessAction>) => ({
        cartListAsync: {
            result: (state.cartListAsync.result as CartResult[]).map(cart => 
                cart.id === updatedCart.id 
                    ? updatedCart
                    : cart
            ),
            error: undefined
        }
    }),
    [SAVE_CART_SUCCESS]: (state, { payload: savedCart }: ReturnType<typeof createSaveCartSuccessAction>) => ({
        cartListAsync: {
            result: state.cartListAsync.result 
                ? state.cartListAsync.result.concat(savedCart)
                : undefined,
            error: undefined
        }  
    }),
    [REMOVE_CART_SUCCESS]: (state, { payload: removedIds }: ReturnType<typeof createRemoveCartSuccessAction>) => ({
        cartListAsync: {
            result: (state.cartListAsync.result as CartResult[]).filter(cart => !removedIds.includes(cart.id)),
            error: undefined
        }
    }),
    [CHECK_ALL_CART]: (state, { payload: checked }: ReturnType<typeof createCheckAllCartAction>) => ({
        cartListAsync: {
            result: (state.cartListAsync.result as CartResult[]).map(cart => ({ ...cart, checked: checked })),
            error: undefined
        }
    }),
    [CHECK_CART]: (state, { payload: checkedCart }: ReturnType<typeof createCheckCartAction>) => ({
        cartListAsync: {
            result: (state.cartListAsync.result as CartResult[]).map(cart => 
                cart.id === checkedCart.id 
                    ? { ...cart, checked: checkedCart.checked } 
                    : cart
            ),
            error: undefined
        }
    })
});