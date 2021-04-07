import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartManagementTemplate from '../../components/cart/CartManagementTemplate';
import { MyData } from '../../models/auth';
import { CartCheckPayload, CartRemoveAsyncPayload, CartUpdateAsyncPayload } from '../../models/cart/store';
import { RootState } from '../../store';
import { rootActions } from '../../store';

function CartManagementPage() {
    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.auths.myData) as MyData;
    const cartListAsync = useSelector((state: RootState) => state.carts.cartListAsync);

    useEffect(() => {
        dispatch(rootActions.fetchCartList({ memberId: loginMember.id }));
    }, []);

    const updateCart = useCallback((payload: CartUpdateAsyncPayload) => {
        dispatch(rootActions.updateCartAsync(payload));
    }, []);

    const removeCart = useCallback((payload: CartRemoveAsyncPayload) => {
        dispatch(rootActions.removeCartAsync(payload));
    }, []);

    const checkAllCart = useCallback((checked: boolean) => {
        dispatch(rootActions.checkAllCart(checked));
    }, []);

    const checkCart = useCallback((payload: CartCheckPayload) => {
        dispatch(rootActions.checkCart(payload));
    }, []);
    
    return (
        <CartManagementTemplate 
            cartListAsync={cartListAsync} 
            updateCart={updateCart} 
            removeCart={removeCart}
            checkAllCart={checkAllCart}
            checkCart={checkCart}
        />
    )
};

export default CartManagementPage;