import { useCallback } from 'react';
import { CartResult, CartUpdatePayload } from "../../models/carts";
import cartApi from '../../apis/cartApi';
import useCartList, { CartListState } from "./useCartList";
import { ApiError } from '../../error/ApiError';

interface CartManagementState {
    cartListState: CartListState;
}

interface UseCartManagementMethods {
    updateCart: (id: number, payload: CartUpdatePayload) => Promise<void>;
    removeCart: (ids: number[]) => Promise<void>;
}

function useCartManagement(memberId: number): [
    CartManagementState,
    UseCartManagementMethods
] {
    const [cartListState, setCartList] = useCartList(memberId);

    const updateCart = useCallback((id: number, payload: CartUpdatePayload) => {
        return cartApi.update(id, payload)
            .then(updatedCart => {
                setCartList(cartList =>
                    (cartList as CartResult[]).map(cart => 
                        cart.id === updatedCart.id ? updatedCart : cart
                    )
                );
            })
            .catch((error: ApiError) => {
                
            });
    }, []);

    const removeCart = useCallback((ids: number[]) => {
        return cartApi.remove(ids)
            .then(() => {               
                setCartList(cartList =>
                    (cartList as CartResult[]).filter(cart => !ids.includes(cart.id))
                );
            })
            .catch((error: ApiError) => {
                
            });
    }, []);
    
    return [{
        cartListState
    }, {
        updateCart,
        removeCart
    }];
}

export default useCartManagement;