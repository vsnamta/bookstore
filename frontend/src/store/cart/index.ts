import { ActionType, createAction, createReducer } from 'typesafe-actions';
import { CartFindPayload, CartResult } from '../../models/cart';
import { CartCheckPayload, AsyncCartList, CartRemoveAsyncPayload, CartSaveAsyncPayload, CartsState, CartUpdateAsyncPayload } from '../../models/cart/store';

export const types = {
    FETCH_CART_LIST: 'cart/FETCH_CART_LIST' as const,
    SET_ASYNC_CART_LIST: 'cart/SET_ASYNC_CART_LIST' as const,
    CHECK_ALL_CART: 'cart/CHECK_ALL_CART' as const,
    CHECK_CART: 'cart/CHECK_CART' as const,
    UPDATE_CART_ASYNC: 'cart/UPDATE_CART_ASYNC' as const,
    UPDATE_CART: 'cart/UPDATE_CART' as const,
    REMOVE_CART_ASYNC: 'cart/REMOVE_CART_ASYNC' as const,
    REMOVE_CART: 'cart/REMOVE_CART' as const,
    SAVE_CART_ASYNC: 'cart/SAVE_CART_ASYNC' as const,
    SAVE_CART: 'cart/SAVE_CART' as const
}

export const actions = { 
    fetchCartList: createAction(types.FETCH_CART_LIST)<CartFindPayload>(), 
    setAsyncCartList: createAction(types.SET_ASYNC_CART_LIST)<AsyncCartList>(),
    checkAllCart: createAction(types.CHECK_ALL_CART)<boolean>(), 
    checkCart: createAction(types.CHECK_CART)<CartCheckPayload>(),
    updateCartAsync: createAction(types.UPDATE_CART_ASYNC)<CartUpdateAsyncPayload>(), 
    updateCart: createAction(types.UPDATE_CART)<CartResult>(), 
    removeCartAsync: createAction(types.REMOVE_CART_ASYNC)<CartRemoveAsyncPayload>(), 
    removeCart: createAction(types.REMOVE_CART)<number[]>(),
    saveCartAsync: createAction(types.SAVE_CART_ASYNC)<CartSaveAsyncPayload>(), 
    saveCart: createAction(types.SAVE_CART)<CartResult>()
};

const initialState: CartsState = {
    asyncCartList: {
        payload: undefined,
        result: undefined,
        error: undefined
    }
};

const reducer = createReducer<CartsState, ActionType<typeof actions>>(initialState, {
    [types.SET_ASYNC_CART_LIST]: (state, { payload: asyncCartList }: ReturnType<typeof actions.setAsyncCartList>) => ({
        asyncCartList: asyncCartList
    }),
    [types.CHECK_ALL_CART]: (state, { payload: checked }: ReturnType<typeof actions.checkAllCart>) => ({
        asyncCartList: {
            // ...state.asyncCartList,
            result: (state.asyncCartList.result as CartResult[]).map(cart => ({ ...cart, checked: checked })),
        }
    }),
    [types.CHECK_CART]: (state, { payload: checkedCart }: ReturnType<typeof actions.checkCart>) => ({
        asyncCartList: {
            // ...state.asyncCartList,
            result: (state.asyncCartList.result as CartResult[]).map(cart => 
                cart.id === checkedCart.id 
                    ? { ...cart, checked: checkedCart.checked } 
                    : cart
            )
        }
    }),
    [types.UPDATE_CART]: (state, { payload: updatedCart }: ReturnType<typeof actions.updateCart>) => ({
        asyncCartList: {
            // ...state.asyncCartList,
            result: (state.asyncCartList.result as CartResult[]).map(cart => 
                cart.id === updatedCart.id 
                    ? updatedCart
                    : cart
            )
        }
    }),
    [types.REMOVE_CART]: (state, { payload: removedIds }: ReturnType<typeof actions.removeCart>) => ({
        asyncCartList: {
            // ...state.asyncCartList,
            result: (state.asyncCartList.result as CartResult[]).filter(cart => !removedIds.includes(cart.id))
        }
    }),
    [types.SAVE_CART]: (state, { payload: savedCart }: ReturnType<typeof actions.saveCart>) => ({
        asyncCartList: {
            // ...state.asyncCartList,
            result: state.asyncCartList.result 
                ? state.asyncCartList.result.concat(savedCart)
                : undefined
        }  
    })
});

export default reducer;