import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartManagementTemplate from '../../components/cart/CartManagementTemplate';
import { MyData } from '../../models/auths';
import { RootState } from '../../store';
import { CartRemoveRequestActionPayload, CartUpdateRequestActionPayload, createCartCheckAllAction, createCartCheckAction, createCartListFindAction, createCartRemoveRequestAction, createCartUpdateRequestAction } from '../../store/cart/action';

function CartManagementPage() {
    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.auths.myData) as MyData;
    const cartListAsync = useSelector((state: RootState) => state.carts.cartListAsync);

    useEffect(() => {
        dispatch(createCartListFindAction({ memberId: loginMember.id }));
    }, []);

    const updateCart = useCallback((payload: CartUpdateRequestActionPayload) => {
        dispatch(createCartUpdateRequestAction(payload));
    }, []);

    const removeCart = useCallback((payload: CartRemoveRequestActionPayload) => {
        dispatch(createCartRemoveRequestAction(payload));
    }, []);

    const checkAllCart = useCallback((checked: boolean) => {
        dispatch(createCartCheckAllAction(checked));
    }, []);

    const checkCart = useCallback((id: number, checked: boolean) => {
        dispatch(createCartCheckAction({
            id: id,
            checked: checked
        }));
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