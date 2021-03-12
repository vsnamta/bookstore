import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import CartManagement from '../../components/cart/CartManagement';
import ErrorDetail from '../../components/general/ErrorDetail';
import Layout from '../../components/layout/Layout';
import { CartUpdatePayload } from '../../models/carts';
import { OrderingProduct } from '../../models/orders';
import { RootState } from '../../store';
import { checkAllCart, checkCart, findCartList, removeCart, updateCart } from '../../store/cart/action';

function CartManagementPage() {
    const loginMember = useSelector((state: RootState) => state.members.loginMember);

    if(!loginMember) {
        return <Redirect to={{ pathname: "/login" }}/>
    }

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findCartList({memberId: loginMember.id}));
    }, []);

    const cartListState = useSelector((state: RootState) => state.carts.cartListAsync);

    const onUpdateCart = useCallback((id: number, payload: CartUpdatePayload) => {
        dispatch(updateCart({
            id: id,
            payload: payload,
            onSuccess: cart => alert("변경되었습니다."),
            onFailure: error => {}
        }));
    }, []);

    const onRemoveCart = useCallback((ids: number[]) => {
        dispatch(removeCart({
            ids: ids,
            onSuccess: () => {
                alert("삭제되었습니다.");
            },
            onFailure: error => {}
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
        <Layout>
            <CartManagement 
                cartList={cartListState.result} 
                onUpdateCart={onUpdateCart} 
                onRemoveCart={onRemoveCart}
                onCheckAllCart={onCheckAllCart}
                onCheckCart={onCheckCart}
                onPurchase={onPurchase}
            />
            {cartListState.error && <ErrorDetail message={"오류 발생"} />}
        </Layout>
    )
};

export default CartManagementPage;