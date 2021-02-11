import { useCallback } from 'react';
import { CartResult, CartUpdatePayload } from "../../models/carts";
import cartService from '../../services/cartService';
import useCartList, { CartListState } from "./useCartList";

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
        return cartService.update(id, payload)
            .then(id => {
                setCartList(cartList =>
                    (cartList as CartResult[]).map(cart => 
                        cart.id === id
                            ? { ...cart, quantity: payload.quantity } 
                            : cart
                    )
                );
            });
    }, []);

    const removeCart = useCallback((ids: number[]) => {
        return cartService.remove(ids)
            .then(() => {               
                setCartList(cartList =>
                    (cartList as CartResult[]).filter(cart => !ids.includes(cart.id))
                );
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