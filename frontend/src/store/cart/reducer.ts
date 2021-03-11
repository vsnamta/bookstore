import { createReducer } from 'typesafe-actions';
import { ApiError } from '../../error/ApiError';
import { CartResult } from '../../models/carts';
import { CartsAction } from './action';
import { FIND_CART_LIST_FAILURE, FIND_CART_LIST_REQUEST, FIND_CART_LIST_SUCCESS, REMOVE_CART_SUCCESS, SAVE_CART_SUCCESS, UPDATE_CART_SUCCESS } from './actionType';

export interface CartsState {
    cartListAsync: {
        result?: CartResult[];
        error?: ApiError;
    }
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
    [FIND_CART_LIST_SUCCESS]: (state, action) => ({
        cartListAsync: {
            ...state.cartListAsync,
            result: action.payload
        } 
    }),
    [FIND_CART_LIST_FAILURE]: (state, action) => ({
        cartListAsync: {
            ...state.cartListAsync,
            error: action.payload
        } 
    }),
    [UPDATE_CART_SUCCESS]: (state, action) => {
        const cartList = state.cartListAsync.result as CartResult[];
        const updatedCart = action.payload;

        return {
            cartListAsync: {
                result: cartList.map(cart => 
                    cart.id === updatedCart.id 
                        ? updatedCart 
                        : cart
                ),
                error: undefined
            }
        }
    },
    [SAVE_CART_SUCCESS]: (state, action) => {
        const cartList = state.cartListAsync.result;
        const savedCart = action.payload;

        return {
            cartListAsync: {
                result: cartList 
                    ? cartList.concat(savedCart)
                    : undefined,
                error: undefined
            }
        }
    },
    [REMOVE_CART_SUCCESS]: (state, action) => {
        const cartList = state.cartListAsync.result as CartResult[];

        return {
            cartListAsync: {
                result: cartList.filter(cart => !action.payload.includes(cart.id)),
                error: undefined
            }
        }
    }
});