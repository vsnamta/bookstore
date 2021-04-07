import { ActionType, createAction, createReducer } from 'typesafe-actions';
import { CartCheckPayload, CartListAsync, CartRemoveAsyncPayload, CartSaveAsyncPayload, CartsState, CartUpdateAsyncPayload } from '../../models/cart/store';
import { CartFindPayload, CartResult } from '../../models/cart';

export const types = {
    FETCH_CART_LIST: 'cart/FETCH_CART_LIST' as const,
    SET_CART_LIST_ASYNC: 'cart/SET_CART_LIST_ASYNC' as const,
    CHECK_ALL_CART: 'cart/CHECK_ALL_CART' as const,
    CHECK_CART: 'cart/CHECK_CART' as const,
    UPDATE_CART_ASYNC: 'cart/UPDATE_CART_ASYNC' as const,
    UPDATE_CART: 'cart/UPDATE_CART' as const,
    SAVE_CART_ASYNC: 'cart/SAVE_CART_ASYNC' as const,
    SAVE_CART: 'cart/SAVE_CART' as const,
    REMOVE_CART_ASYNC: 'cart/REMOVE_CART_ASYNC' as const,
    REMOVE_CART: 'cart/REMOVE_CART' as const,
}

export const actions = { 
    fetchCartList: createAction(types.FETCH_CART_LIST)<CartFindPayload>(), 
    setCartListAsync: createAction(types.SET_CART_LIST_ASYNC)<CartListAsync>(),
    checkAllCart: createAction(types.CHECK_ALL_CART)<boolean>(), 
    checkCart: createAction(types.CHECK_CART)<CartCheckPayload>(),
    updateCartAsync: createAction(types.UPDATE_CART_ASYNC)<CartUpdateAsyncPayload>(), 
    updateCart: createAction(types.UPDATE_CART)<CartResult>(), 
    saveCartAsync: createAction(types.SAVE_CART_ASYNC)<CartSaveAsyncPayload>(), 
    saveCart: createAction(types.SAVE_CART)<CartResult>(),
    removeCartAsync: createAction(types.REMOVE_CART_ASYNC)<CartRemoveAsyncPayload>(), 
    removeCart: createAction(types.REMOVE_CART)<number[]>()
};

const initialState: CartsState = {
    cartListAsync: {
        payload: undefined,
        result: undefined,
        error: undefined
    }
};

const reducer = createReducer<CartsState, ActionType<typeof actions>>(initialState, {
    [types.SET_CART_LIST_ASYNC]: (state, { payload: cartListAsync }: ReturnType<typeof actions.setCartListAsync>) => ({
        cartListAsync: cartListAsync
    }),
    [types.CHECK_ALL_CART]: (state, { payload: checked }: ReturnType<typeof actions.checkAllCart>) => ({
        cartListAsync: {
            // ...state.cartListAsync,
            result: (state.cartListAsync.result as CartResult[]).map(cart => ({ ...cart, checked: checked })),
        }
    }),
    [types.CHECK_CART]: (state, { payload: checkedCart }: ReturnType<typeof actions.checkCart>) => ({
        cartListAsync: {
            // ...state.cartListAsync,
            result: (state.cartListAsync.result as CartResult[]).map(cart => 
                cart.id === checkedCart.id 
                    ? { ...cart, checked: checkedCart.checked } 
                    : cart
            )
        }
    }),
    [types.UPDATE_CART]: (state, { payload: updatedCart }: ReturnType<typeof actions.updateCart>) => ({
        cartListAsync: {
            // ...state.cartListAsync,
            result: (state.cartListAsync.result as CartResult[]).map(cart => 
                cart.id === updatedCart.id 
                    ? updatedCart
                    : cart
            )
        }
    }),
    [types.SAVE_CART]: (state, { payload: savedCart }: ReturnType<typeof actions.saveCart>) => ({
        cartListAsync: {
            // ...state.cartListAsync,
            result: state.cartListAsync.result 
                ? state.cartListAsync.result.concat(savedCart)
                : undefined
        }  
    }),
    [types.REMOVE_CART]: (state, { payload: removedIds }: ReturnType<typeof actions.removeCart>) => ({
        cartListAsync: {
            // ...state.cartListAsync,
            result: (state.cartListAsync.result as CartResult[]).filter(cart => !removedIds.includes(cart.id))
        }
    })
});

export default reducer;