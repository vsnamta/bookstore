import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginMember } from '../../models/members';
import { RootState } from '../../store';
import { CartRemoveActionPayload, CartUpdateActionPayload, createCheckAllCartAction, createCheckCartAction, createFindCartListAction, createRemoveCartAction, createUpdateCartAction } from '../../store/cart/action';
import CartManagementTemplate from '../../components/cart/CartManagementTemplate';

function CartManagementPage() {
    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.members.loginMember) as LoginMember;
    const cartListAsync = useSelector((state: RootState) => state.carts.cartListAsync);

    useEffect(() => {
        dispatch(createFindCartListAction({ memberId: loginMember.id }));
    }, []);

    const updateCart = useCallback((payload: CartUpdateActionPayload) => {
        dispatch(createUpdateCartAction(payload));
    }, []);

    const removeCart = useCallback((payload: CartRemoveActionPayload) => {
        dispatch(createRemoveCartAction(payload));
    }, []);

    const checkAllCart = useCallback((checked: boolean) => {
        dispatch(createCheckAllCartAction(checked));
    }, []);

    const checkCart = useCallback((id: number, checked: boolean) => {
        dispatch(createCheckCartAction({
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