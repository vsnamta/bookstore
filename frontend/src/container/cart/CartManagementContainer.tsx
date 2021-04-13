import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MyData } from '../../models/auth';
import { CartCheckPayload, CartRemoveAsyncPayload, CartUpdateAsyncPayload } from '../../models/cart/store';
import { rootActions, RootState } from '../../store';
import ErrorDetail from '../../components/general/ErrorDetail';
import CartManagement from '../../components/cart/CartManagement';

function CartManagementContainer() {
    const dispatch = useDispatch();
    const myData = useSelector((state: RootState) => state.auths.myData) as MyData;
    const asyncCartList = useSelector((state: RootState) => state.carts.asyncCartList);

    useEffect(() => {
        dispatch(rootActions.fetchCartList({ memberId: myData.id }));
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
        <>
            <CartManagement 
                cartList={asyncCartList.result} 
                onUpdateCart={updateCart} 
                onRemoveCart={removeCart}
                onCheckAllCart={checkAllCart}
                onCheckCart={checkCart}
            />
            {asyncCartList.error && <ErrorDetail message={asyncCartList.error.message} />}
        </>
    )
};

export default CartManagementContainer;