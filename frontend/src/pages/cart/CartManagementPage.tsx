import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import CartManagement from '../../components/cart/CartManagement';
import ErrorDetail from '../../components/general/ErrorDetail';
import Layout from '../../components/layout/Layout';
import { CartUpdatePayload } from '../../models/carts';
import { LoginMember } from '../../models/members';
import { OrderingProduct } from '../../models/orders';
import { RootState } from '../../store';
import { checkAllCart, checkCart, findCartList, removeCart, updateCart } from '../../store/cart/action';
import CartManagementTemplate from '../../templates/cart/CartManagementTemplate';

function CartManagementPage() {
    const history = useHistory();

    const dispatch = useDispatch();
    const loginMember = useSelector((state: RootState) => state.members.loginMember) as LoginMember;
    const cartListAsync = useSelector((state: RootState) => state.carts.cartListAsync);

    useEffect(() => {
        dispatch(findCartList({ memberId: loginMember.id }));
    }, []);

    const onUpdateCart = useCallback((id: number, payload: CartUpdatePayload) => {
        dispatch(updateCart({
            id: id,
            payload: payload,
            onSuccess: cart => alert("변경되었습니다."),
            onFailure: error => alert(`오류발생 = ${error.message}`)
        }));
    }, []);

    const onRemoveCart = useCallback((ids: number[]) => {
        dispatch(removeCart({
            ids: ids,
            onSuccess: () => {
                alert("삭제되었습니다.");
            },
            onFailure: error => alert(`오류발생 = ${error.message}`)
        }));
    }, []);

    const onCheckAllCart = useCallback((checked: boolean) => {
        dispatch(checkAllCart(checked));
    }, []);

    const onCheckCart = useCallback((id: number, checked: boolean) => {
        dispatch(checkCart({
            id: id,
            checked: checked
        }));
    }, []);

    const onPurchase = useCallback((orderingProductList: OrderingProduct[]) => {
        history.push("/order/form", { orderingProductList });
    }, []);
    
    return (
        <CartManagementTemplate 
            cartListAsync={cartListAsync} 
            onUpdateCart={onUpdateCart} 
            onRemoveCart={onRemoveCart}
            onCheckAllCart={onCheckAllCart}
            onCheckCart={onCheckCart}
            onPurchase={onPurchase}
        />
        // <Layout>
        //     <CartManagement 
        //         cartList={cartListAsync.result} 
        //         onUpdateCart={onUpdateCart} 
        //         onRemoveCart={onRemoveCart}
        //         onCheckAllCart={onCheckAllCart}
        //         onCheckCart={onCheckCart}
        //         onPurchase={onPurchase}
        //     />
        //     {cartListAsync.error && <ErrorDetail message={cartListAsync.error.message} />}
        // </Layout>
    )
};

export default CartManagementPage;