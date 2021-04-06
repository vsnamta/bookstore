import { createReducer, PayloadAction } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { CartFindPayload, CartResult } from '../../models/carts';
import { CartsAction, createCheckCartAction, createCheckAllCartAction, createSetCartListAsyncAction, createUpdateCartAction, createSaveCartAction, createRemoveCartAction } from './action';
import { CHECK_ALL_CART, CHECK_CART, REMOVE_CART, SAVE_CART, SET_CART_LIST_ASYNC, UPDATE_CART } from './actionType';

export interface CartListAsync {
    payload?: CartFindPayload;
    result?: CartResult[];
    error?: ApiError;
}

export interface CartsState {
    cartListAsync: CartListAsync;
}

const initialState: CartsState = {
    cartListAsync: {
        payload: undefined,
        result: undefined,
        error: undefined
    }
};

export default createReducer<CartsState, CartsAction>(initialState, {
    [SET_CART_LIST_ASYNC]: (state, { payload: cartListAsync }: ReturnType<typeof createSetCartListAsyncAction>) => ({
        cartListAsync: cartListAsync 
    }),
    [UPDATE_CART]: (state, { payload: updatedCart }: ReturnType<typeof createUpdateCartAction>) => ({
        cartListAsync: {
            result: (state.cartListAsync.result as CartResult[]).map(cart => 
                cart.id === updatedCart.id 
                    ? updatedCart
                    : cart
            ),
            error: undefined
        }
    }),
    [SAVE_CART]: (state, { payload: savedCart }: ReturnType<typeof createSaveCartAction>) => ({
        cartListAsync: {
            result: state.cartListAsync.result 
                ? state.cartListAsync.result.concat(savedCart)
                : undefined,
            error: undefined
        }  
    }),
    [REMOVE_CART]: (state, { payload: removedIds }: ReturnType<typeof createRemoveCartAction>) => ({
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