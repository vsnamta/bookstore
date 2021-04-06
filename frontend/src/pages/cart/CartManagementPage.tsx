import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartManagementTemplate from '../../components/cart/CartManagementTemplate';
import { MyData } from '../../models/auths';
import { RootState } from '../../store';
import { CartRemoveActionPayload, CartUpdateActionPayload, createCheckAllCartAction, createCheckCartAction, createFindCartListAction, createRemoveCartRequestAction, createUpdateCartRequestAction } from '../../store/cart/action';

function CartManagementPage() {
    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.auths.myData) as MyData;
    const cartListAsync = useSelector((state: RootState) => state.carts.cartListAsync);

    useEffect(() => {
        dispatch(createFindCartListAction({ memberId: loginMember.id }));
    }, []);

    const updateCart = useCallback((payload: CartUpdateActionPayload) => {
        dispatch(createUpdateCartRequestAction(payload));
    }, []);

    const removeCart = useCallback((payload: CartRemoveActionPayload) => {
        dispatch(createRemoveCartRequestAction(payload));
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